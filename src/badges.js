// Achievements are derived from the saved journal, so they need no new storage and can never disagree with points.
import {quests} from './quests.js';

const byId=new Map(quests.map(q=>[q.id,q]));
const questOf=e=>byId.get(e.questId)||{};
const dayIndex=day=>Math.round(Date.parse(day+'T00:00:00Z')/86400000);
// India is UTC+5:30 all year, matching the weekly board's timezone.
const indiaHour=time=>new Date(time+330*60000).getUTCHours();

export function bestStreak(player){
 const days=[...new Set(player.events.map(e=>dayIndex(e.day)))].sort((a,b)=>a-b);
 let best=0,run=0;days.forEach((d,i)=>{run=i&&d===days[i-1]+1?run+1:1;best=Math.max(best,run);});return best;
}

export const badges=[
 {id:'first-steps',icon:'01',title:'First Steps',detail:'Complete your first quest.',goal:1,count:p=>p.events.length},
 {id:'quest-collector',icon:'10',title:'Quest Collector',detail:'Complete 10 quests.',goal:10,count:p=>p.events.length},
 {id:'three-corridors',icon:'III',title:'Three Corridors',detail:'Complete a quest on every Kozhikode route.',goal:3,count:p=>new Set(p.events.map(e=>questOf(e).route).filter(Boolean)).size},
 {id:'heritage-hunter',icon:'H',title:'Heritage Hunter',detail:'Complete 3 heritage quests.',goal:3,count:p=>p.events.filter(e=>questOf(e).category==='Heritage').length},
 {id:'appetite-navigator',icon:'F',title:'Appetite Navigator',detail:'Complete 3 food quests.',goal:3,count:p=>p.events.filter(e=>questOf(e).category==='Food discovery').length},
 {id:'civic-voice',icon:'C',title:'Civic Voice',detail:'Save a practice civic report.',goal:1,count:p=>p.events.filter(e=>questOf(e).taskType==='civic-report').length},
 {id:'on-a-roll',icon:'3D',title:'On a Roll',detail:'Reach a 3-day streak.',goal:3,count:bestStreak},
 {id:'week-warrior',icon:'7D',title:'Week Warrior',detail:'Reach a 7-day streak.',goal:7,count:bestStreak},
 {id:'thousand-club',icon:'1K',title:'Thousand Club',detail:'Earn 1,000 points in total.',goal:1000,count:p=>p.events.reduce((sum,e)=>sum+e.points,0)},
 {id:'night-owl',icon:'N',title:'Night Owl',detail:'Complete a quest after 7 pm India time.',goal:1,count:p=>p.events.filter(e=>Number.isFinite(e.time)&&indiaHour(e.time)>=19).length},
 {id:'real-footsteps',icon:'GPS',title:'Real Footsteps',detail:'Complete a quest with live GPS on.',goal:1,count:p=>p.events.filter(e=>e.mode==='live'||e.mode==='gps-preview').length},
 {id:'one-kilometre',icon:'KM',title:'One Kilometre',detail:'Walk 1 km with live GPS.',goal:1000,count:p=>Math.floor(p.liveMeters||0),unit:'m'},
];

export function badgeProgress(player){
 return badges.map(({count,...b})=>{const value=count(player);return {...b,value:Math.min(value,b.goal),earned:value>=b.goal};});
}
export const earnedIds=player=>badgeProgress(player).filter(b=>b.earned).map(b=>b.id);
export function newlyEarned(before,after){const had=new Set(earnedIds(before));return badgeProgress(after).filter(b=>b.earned&&!had.has(b.id));}
