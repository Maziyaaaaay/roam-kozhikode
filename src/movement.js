// Filter location fixes before allowing them to move the player.
export function locationDelta(previous, fix, now=Date.now()) {
 const {latitude,longitude,accuracy}=fix.coords;
 if(![latitude,longitude,accuracy].every(Number.isFinite)||accuracy>45||now-fix.timestamp>15000)return {accepted:false,moving:false};
 const point={latitude,longitude,accuracy,timestamp:fix.timestamp};
 if(!previous)return {accepted:true,point,meters:0,moving:false};
 const seconds=(fix.timestamp-previous.timestamp)/1000;
 if(seconds<=0)return {accepted:false,moving:false};
 const east=(longitude-previous.longitude)*111320*Math.cos(latitude*Math.PI/180),north=(latitude-previous.latitude)*111320,meters=Math.hypot(east,north);
 const threshold=Math.max(1.2,Math.min(6,Math.max(accuracy,previous.accuracy)*.2));
 if(meters< threshold)return {accepted:true,point:previous,meters:0,moving:false};
 if(meters/seconds>7)return {accepted:false,moving:false};
 return {accepted:true,point,meters,east,north,moving:true};
}
export function demoSpeed(length,auto=false){return Math.max(auto?45:22,length/(auto?18:30));}
export function checkpointVoice(routeId,index){const order=routeId==='rail'?[1,3,2,4]:null;return `checkpoint${routeId==='coast'?'Coast':'Market'}${order?order[index]||4:Math.min(index+1,routeId==='coast'?5:4)}`;}
