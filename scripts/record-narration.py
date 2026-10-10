"""Build bundled English narration and measured sentence-caption timing on macOS."""
import json, re, subprocess, pathlib, tempfile
root=pathlib.Path(__file__).resolve().parents[1]
folder=root/'public/audio'
manifest={}
for key,line in json.loads((folder/'lines.json').read_text()).items():
    with tempfile.TemporaryDirectory() as temp:
        parts=[]; captions=[]; offset=0
        for i,text in enumerate(re.findall(r'[^.!?]+[.!?]*',line)):
            audio=pathlib.Path(temp)/f'{i}.aiff'
            subprocess.run(['say','-v','Daniel','-r','178','-o',str(audio),text.strip()],check=True)
            duration=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',str(audio)]))
            if duration<=0: raise RuntimeError('Speech output is empty; macOS speech access is required')
            captions.append({'start':round(offset,3),'end':round(offset+duration,3),'text':text.strip()})
            offset+=duration;parts.append(audio)
        listing=pathlib.Path(temp)/'concat.txt'
        listing.write_text(''.join(f"file '{p}'\n" for p in parts))
        subprocess.run(['ffmpeg','-y','-loglevel','error','-f','concat','-safe','0','-i',str(listing),'-codec:a','libmp3lame','-q:a','4',str(folder/(key+'.mp3'))],check=True)
        manifest[key]={'duration':round(offset,3),'captions':captions}
        print(key,round(offset,1),'seconds')
(folder/'captions.json').write_text(json.dumps(manifest,indent=2))
