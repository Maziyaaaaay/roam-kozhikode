import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {lines} from '../src/story.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export function timedCaptions(text,alignment){
 const chars=alignment?.characters,starts=alignment?.character_start_times_seconds,ends=alignment?.character_end_times_seconds;
 if(!chars?.length||chars.length!==starts?.length||chars.length!==ends?.length||ends.some((t,i)=>!Number.isFinite(t)||t<starts[i]))throw new Error('Provider returned unusable caption timing');
 const transcript=chars.join('');const sentences=text.match(/[^.!?]+[.!?]*/g).map(s=>s.trim()).filter(Boolean);let cursor=0;
 const captions=sentences.map(sentence=>{const at=transcript.indexOf(sentence,cursor);if(at<0)return null;cursor=at+sentence.length;return {text:sentence,start:starts[at],end:ends[cursor-1]};});
 // A full-line measured caption remains valid if the provider normalizes punctuation.
 return {duration:ends.at(-1),captions:captions.every(Boolean)?captions:[{text,start:starts[0],end:ends.at(-1)}]};
}
async function readConfig(){const config={...process.env};try{const text=await fs.readFile(path.join(root,'.env.narration.local'),'utf8');for(const line of text.split(/\r?\n/)){const m=line.match(/^([A-Z_]+)\s*=\s*(.*?)\s*$/);if(m&&!config[m[1]])config[m[1]]=m[2].replace(/^(['"])(.*)\1$/,'$2');}}catch{}return config;}
async function main(){
 const config=await readConfig(),key=config.ELEVENLABS_API_KEY,voice=config.ELEVENLABS_VOICE_ID,model=config.ELEVENLABS_MODEL_ID||'eleven_v4';
 if(!key)throw new Error('Add ELEVENLABS_API_KEY to .env.narration.local; never use a VITE_ prefix.');
 async function request(endpoint,body){const response=await fetch('https://api.elevenlabs.io/v1/'+endpoint,{method:body?'POST':'GET',headers:{'xi-api-key':key,...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(90000)});if(!response.ok){let category='';try{const data=await response.json();const status=data.detail?.status;if(typeof status==='string'&&/^[a-z_]{1,60}$/.test(status))category=` (${status})`;}catch{}throw new Error(`ElevenLabs returned HTTP ${response.status}${category} at ${endpoint.split('?')[0].startsWith('text-to-speech/')?'speech generation':endpoint}. Check key permissions and account access. No provider message or secret is logged.`);}return response.json();}
 if(process.argv.includes('--list-voices')){const result=await request('voices');for(const v of result.voices||[])console.log(`${v.voice_id}  ${v.name}`);return;}
 if(!voice)throw new Error('Add ELEVENLABS_VOICE_ID from the voice you chose in ElevenLabs.');
 let models;try{models=await request('models');}catch(error){if(!error.message.includes('(missing_permissions)'))throw error;console.log('Model-list permission unavailable; testing the configured model through speech generation.');}if(models&&!models.some(m=>m.model_id===model&&m.can_do_text_to_speech))throw new Error(`Configured model ${model} is not available for this account. Choose an available model in .env.narration.local.`);
 const preview=process.argv.includes('--preview'),requested=process.argv.find(arg=>arg.startsWith('--ids='));if(!preview&&!requested&&!process.argv.includes('--all'))throw new Error('Use --preview, --ids=opening,ending, or --all to record narration.');
 const ids=preview?['introMarket']:requested?requested.slice('--ids='.length).split(',').filter(Boolean):Object.keys(lines);const directory=path.join(root,'public/audio');await fs.mkdir(directory,{recursive:true});let manifest={};try{manifest=JSON.parse(await fs.readFile(path.join(directory,'manifest.json'),'utf8'));}catch{}
 for(const id of ids){const text=lines[id];if(manifest[id]?.text===text&&manifest[id]?.voice===voice&&manifest[id]?.model===model){try{await fs.access(path.join(directory,manifest[id].file));console.log(`${id}: current recording retained`);continue;}catch{}}
 const payload={text,model_id:model,voice_settings:{stability:0.42,similarity_boost:0.78,style:0.28,speed:1.02,use_speaker_boost:true},...(id.endsWith('Ml')?{language_code:'ml'}:{})};const data=await request(`text-to-speech/${encodeURIComponent(voice)}/with-timestamps?output_format=mp3_44100_128`,payload);const timings=timedCaptions(text,data.normalized_alignment||data.alignment);const buffer=Buffer.from(data.audio_base64||'','base64');if(buffer.length<1000)throw new Error(`${id}: provider returned no usable audio`);
 const file=`${id}-${createHash('sha256').update(text+voice+model).digest('hex').slice(0,12)}.mp3`;await fs.writeFile(path.join(directory,file),buffer);manifest[id]={text,file,voice,model,...timings};const temp=path.join(directory,'manifest.pending.json');await fs.writeFile(temp,JSON.stringify(manifest,null,2));await fs.rename(temp,path.join(directory,'manifest.json'));console.log(`${id}: recorded, ${timings.duration.toFixed(1)} seconds`);
 }
 console.log(preview?'Opening recorded. Reload the app and pick the SM Street route to hear it.':'All current story recordings saved locally. Run npm run build and reload the demo.');
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(error=>{console.error(error.message);process.exitCode=1;});
