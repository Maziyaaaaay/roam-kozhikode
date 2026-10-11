// Weekend board rows. With shared scores available, show real signed-in players only;
// otherwise fall back to the local board with labelled sample rivals.
import {leaderboard,weeklyScore} from './quests.js';

export function buildBoard(player,remote,time=Date.now()){
 if(!Array.isArray(remote))return {shared:false,rows:leaderboard(player,time)};
 const mine=weeklyScore(player,time),others=remote.filter(r=>!r.is_me).map(r=>({name:r.name,points:r.points}));
 const own=remote.find(r=>r.is_me),you={name:player.name||own?.name||'You',points:Math.max(mine,own?.points||0),you:true};
 return {shared:true,rows:[...others,you].sort((a,b)=>b.points-a.points||(a.you?-1:b.you?1:a.name.localeCompare(b.name)))};
}
