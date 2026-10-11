// Real-time Walk Here motion. GPS confirms distance every second or so; the phone's motion
// sensor detects each step immediately. Between fixes the explorer glides at the measured
// walking pace, never running more than a few metres ahead of what GPS has confirmed
// (the allowed lead grows with time since the last GPS movement, because phone GPS releases distance in chunks).
const DEFAULT_PACE=1.3,MAX_PACE=3.2,MAX_LEAD=8,STEP_WINDOW=1300,GPS_WINDOW=3000;

export function createLiveMotion(){return {confirmed:0,shown:0,pace:0,lastStep:-Infinity,lastGpsMove:-Infinity,anchor:null,firstFix:null,lastFix:null,steps:[]};}

// GPS reports metres walked since the previous accepted fix (0 when standing).
export function motionFromGps(m,meters,now,speed){
 if(meters>0){
  m.firstFix??=now;const since=Number.isFinite(m.lastGpsMove)?m.lastGpsMove:m.anchor??m.firstFix,seconds=since===null?0:(now-since)/1000;
  const measured=Number.isFinite(speed)&&speed>0?speed:seconds>0?meters/seconds:0;
  if(measured>0)m.pace=m.pace?m.pace*.6+Math.min(measured,MAX_PACE)*.4:Math.min(measured,MAX_PACE);
  m.confirmed+=meters;m.lastGpsMove=now;m.anchor=now;
 }
 m.lastFix=now;return m;
}

// A detected step means the player is walking right now; cadence refines the pace.
export function motionFromStep(m,now){
 if(!isWalking(m,now))m.anchor=now;m.lastStep=now;m.steps=[...m.steps.filter(t=>now-t<4000),now];
 if(!m.pace&&m.steps.length>=3){const cadence=(m.steps.length-1)/((now-m.steps[0])/1000);m.pace=Math.min(MAX_PACE,Math.max(.6,cadence*.72));}
 return m;
}

// With a working step sensor, steps alone decide start/stop; GPS takes over only when no steps have been seen recently.
const SENSOR_TRUST=10000;
export function isWalking(m,now){if(now-m.lastStep<SENSOR_TRUST)return now-m.lastStep<STEP_WINDOW;return now-m.lastGpsMove<GPS_WINDOW;}

// Advance the displayed distance for one animation frame; returns metres to move this frame.
export function motionTick(m,dt,now){
 const walking=isWalking(m,now),behind=m.confirmed-m.shown;
 let speed=walking?(m.pace||DEFAULT_PACE):0;
 // With steps confirming the walk, glide ahead of lagging GPS; without a step sensor, trail GPS at the measured pace.
 const sensor=now-m.lastStep<SENSOR_TRUST;
 if(behind>.5)speed=Math.max(speed,Math.min(MAX_PACE*1.5,behind/(sensor?1.1:2.5)));
 const sinceGps=m.anchor===null?0:Math.max(0,now-m.anchor)/1000,lead=walking&&sensor?Math.min(MAX_LEAD,1.5+(m.pace||DEFAULT_PACE)*sinceGps):0,limit=m.confirmed+lead;
 const next=Math.min(limit,m.shown+speed*dt),delta=Math.max(0,next-m.shown);
 m.shown+=delta;if(!walking&&behind<=.5)m.pace*=Math.pow(.2,dt);
 return {delta,walking:walking||delta>.002,speed:delta/Math.max(dt,1e-3)};
}

// Step detector over accelerometer magnitude (m/s², gravity included).
export function createStepDetector({threshold=1.1,rearm=.35,minGap=280}={}){
 let smooth=null,base=null,armed=true,last=-Infinity;
 return (magnitude,now)=>{
  if(!Number.isFinite(magnitude))return false;
  smooth=smooth===null?magnitude:smooth*.75+magnitude*.25;base=base===null?magnitude:base*.97+magnitude*.03;
  const lift=smooth-base;
  if(armed&&lift>threshold&&now-last>=minGap){armed=false;last=now;return true;}
  if(lift<rearm)armed=true;return false;
 };
}
