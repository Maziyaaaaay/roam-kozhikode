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
// Walk Here: one real metre walked moves the explorer one metre through the 3D scene.
export const SCENE_UNITS=176;
// Demo boost: each real metre walked moves the explorer this many metres, so a short walk shows the route quickly.
export const WALK_HERE_BOOST=2;
export function walkHereScale(sceneLength,sceneOffset,routeSpan,boost=WALK_HERE_BOOST){const units=SCENE_UNITS*Math.max(1,sceneLength-sceneOffset)/Math.max(1,sceneLength);return Math.max(1,routeSpan)/units*boost;}
// Distance covered counts as forward progress whatever the compass direction, so GPS jitter cannot walk you backwards.
export function walkHereStep(delta,scale){return delta.accepted&&delta.moving?{walked:delta.meters,progress:delta.meters*scale}:{walked:0,progress:0};}
