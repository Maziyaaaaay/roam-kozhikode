import {test} from 'node:test';
import assert from 'node:assert/strict';
import {locationDelta,demoSpeed,checkpointVoice} from '../src/movement.js';
import {routes,lines} from '../src/story.js';
import fs from 'node:fs';
const now=1791700000000;
const fix=(lat,lng,time=now,accuracy=5)=>({coords:{latitude:lat,longitude:lng,accuracy},timestamp:time});
test('GPS filters stale fixes, weak accuracy and impossible position jumps',()=>{
 const first=locationDelta(null,fix(11,75),now);
 assert.equal(first.moving,false);
 assert.equal(locationDelta(first.point,fix(11,75,now-16000),now).accepted,false);
 assert.equal(locationDelta(first.point,fix(11,75,now+1000,80),now+1000).accepted,false);
 assert.equal(locationDelta(first.point,fix(12,75,now+1000),now+1000).accepted,false);
});
test('stationary GPS noise does not move the avatar; physical steps retain direction',()=>{
 const first=locationDelta(null,fix(11,75),now).point;
 const jitter=locationDelta(first,fix(11.000001,75,now+1000),now+1000);
 assert.equal(jitter.moving,false);assert.equal(jitter.point,first);
 const north=locationDelta(first,fix(11.00003,75,now+3000),now+3000);
 assert.equal(north.moving,true);assert.ok(north.north>3);assert.ok(north.meters>3);
 const south=locationDelta(north.point,fix(11,75,now+6000),now+6000);
 assert.equal(south.moving,true);assert.ok(south.north< -3);
});
test('all corridors can be traversed in thirty seconds of held movement excluding tasks',()=>{
 for(const route of routes){const manual=route.length/demoSpeed(route.length),auto=route.length/demoSpeed(route.length,true);assert.ok(manual>=60&&manual<=120,`manual ${manual}s`);assert.ok(auto<manual&&auto>=45,`auto ${auto}s`);}
});
test('all route checkpoints resolve to bundled Malayalam dialogue in place order',()=>{
 const manifest=JSON.parse(fs.readFileSync(new URL('../public/audio/manifest.json',import.meta.url)));
 for(const route of routes)for(let i=0;i<route.stops.length;i++){const id=checkpointVoice(route.id,i)+'Ml';assert.ok(lines[id]);assert.equal(manifest[id].text,lines[id]);}
 assert.deepEqual([0,1,2,3].map(i=>checkpointVoice('rail',i)),['checkpointMarket1','checkpointMarket3','checkpointMarket2','checkpointMarket4']);
});
import {walkHereScale,walkHereStep,SCENE_UNITS} from '../src/movement.js';
test('Walk Here moves the scene one metre per real metre walked',()=>{const scale=walkHereScale(1380,0,1380,1);assert.equal(SCENE_UNITS*scale,1380);const step=walkHereStep({accepted:true,moving:true,meters:4},scale);assert.equal(step.walked,4);assert.equal(step.progress/1380*SCENE_UNITS,4);});
test('Walk Here never moves backwards or counts jitter',()=>{assert.deepEqual(walkHereStep({accepted:true,moving:false,meters:0},5),{walked:0,progress:0});assert.deepEqual(walkHereStep({accepted:false,moving:false},5),{walked:0,progress:0});const step=walkHereStep({accepted:true,moving:true,meters:3,east:-3,north:0},5);assert.ok(step.progress>0);});
test('Walk Here scale accounts for routes that start part-way through the scene',()=>{const scale=walkHereScale(1580,760,820,1);const unitsPerRouteMetre=SCENE_UNITS*(1580-760)/(1580*820);assert.ok(Math.abs(scale*unitsPerRouteMetre-1)<1e-9);});
test('Walk Here demo boost moves the explorer twice as far as the real walk',()=>{const boosted=walkHereScale(1380,0,1380),plain=walkHereScale(1380,0,1380,1);assert.equal(boosted/plain,2);});
