import {revisedDialogue} from './dialogue.js';
// Narrator framing is fictional. Facts and discovery answers cite the sources below.
export const sources={
 street:{title:'Kerala Tourism: SM Street',url:'https://www.keralatourism.org/destination/sm-street-kozhikode/252/'},
 beach:{title:'Kozhikode District: Kozhikode Beach',url:'https://kozhikode.nic.in/en/tourist-place/kozhikode-beach/'},
 square:{title:'Kerala Tourism: Mananchira Square',url:'https://www.keralatourism.org/destination/mananchira-square-kozhikode/273/'},
 transport:{title:'Kozhikode District: Transportation',url:'https://kozhikode.nic.in/en/tourism/transportation/'},
 civic:{title:'Kozhikode Municipal Corporation',url:'https://kozhikodecorporation.lsgkerala.gov.in/en'}
};
export const routes = [
 {id:'coast',title:'A walk by the water',subtitle:'Corporation Office · Beach Road · historic piers and the promenade',start:'Calicut Corporation Office',end:'Kozhikode Beach promenade',startChoices:['Calicut Corporation Office','Beach Road junction'],endChoices:['Kozhikode Beach promenade','Kozhikode Beach old piers'],length:1380,coords:[{lat:11.2542,lng:75.7690},{lat:11.2553,lng:75.7688},{lat:11.2571,lng:75.7685},{lat:11.2580,lng:75.7683}],stops:[0,255,520,810,1110],stopNames:['Calicut Corporation Office','Beach Road corner','Kozhikode Beach old piers','Beach food stalls','Kozhikode Beach promenade'],stopPoints:[{lat:11.2542,lng:75.7690},{lat:11.2553,lng:75.7688},{lat:11.2571,lng:75.7685},{lat:11.258,lng:75.7683},{lat:11.2584,lng:75.7676}],color:'#b55c35',intro:'introCoast',ending:'finaleCoast'},
 {id:'market',title:'The old city, one sweet stop at a time',subtitle:'SM Street · shop windows · Mananchira Square',start:'SM Street entrance',end:'Mananchira Square',startChoices:['SM Street entrance','Court Road junction'],endChoices:['Mananchira Square','Mananchira Square pond'],length:1320,coords:[{lat:11.2500,lng:75.7810},{lat:11.2516,lng:75.7812},{lat:11.2531,lng:75.7809},{lat:11.2545,lng:75.7806}],stops:[235,495,780,1045],stopNames:['SM Street sweet lane','Court Road turn','Mittai Theruvu shopfronts','Mananchira Square pond'],stopPoints:[{lat:11.2510,lng:75.7812},{lat:11.2522,lng:75.7810},{lat:11.2532,lng:75.7808},{lat:11.2545,lng:75.7806}],color:'#245b50',intro:'introMarket',ending:'finaleMarket'},
 {id:'rail',title:'From the station into the old city',subtitle:'Railway Station · SM Street · Mananchira Square',start:'Kozhikode Railway Station',end:'Mananchira Square',startChoices:['Kozhikode Railway Station'],endChoices:['Mananchira Square'],length:1580,coords:[{lat:11.2449,lng:75.7803},{lat:11.2471,lng:75.7810},{lat:11.2500,lng:75.7810},{lat:11.2520,lng:75.7810},{lat:11.2545,lng:75.7806}],stops:[760,930,1150,1400],stopNames:['SM Street entrance','Sweet-shop lane','Court Road turn','Mananchira Square pond'],stopPoints:[{lat:11.2500,lng:75.7810},{lat:11.2510,lng:75.7812},{lat:11.2522,lng:75.7810},{lat:11.2545,lng:75.7806}],color:'#9a633d',intro:'introRail',ending:'finaleMarket'}
];
export const lines={
 introCoast:'We start at the Corporation Office and head for the sea. At each stop, find one real detail, take a local quest and earn your points. Keep your eyes on Kozhikode; I’ll keep the map behaving.',
 introMarket:'From SM Street to Mananchira, every corner has a clue. Pick a quest, look around properly, and save one thing you would have walked past with a map open.',
 introRail:'Step off at Kozhikode Railway Station and walk into the old city. SM Street is about eight hundred metres away; Mananchira is further on. Four stops, two good eyes, and absolutely no excuse to follow the snack smell alone.',
 coast1:'Here is your first fork. Stay with the old piers and look for the beach’s past, or turn toward the snack stalls and discover how this shore spends its evenings. What catches you first?',
 market1:'You have reached SM Street. The answer could be sitting in a sweet-shop window. Or hiding in the name everyone walks past. Pick your way into the story.',
 coastBoat:'Take a moment by the piers, from the public promenade. The district’s guide lists these ancient piers among the beach’s landmarks. A sunset photo has just become a picture with a past. Which landmark brought you here?',
 coastCastle:'The sea can wait a moment. The district guide names mussels among this beach’s local delicacies. Follow the food stalls, see what is on offer, and ask a question before ordering. A flavour can be a lead, too. No purchase is needed to keep exploring.',
 marketSweet:'There it is, in the sweet-shop window: Kozhikodan halwa. The street’s name is linked to sweet shops and bakeries. The clue was on the counter all along. Now, what gives a city its flavour: a recipe, or the people who keep making it?',
 marketMemory:'Read the name again: SM Street, Sweet Meat Street. Sweet shops and bakeries are the connection. Every time someone gives an address here, they carry a little of that history. You found it without leaving the pavement. Now let’s follow what the city kept.',
 coast2Heritage:'You followed the piers. Now give that history a different ending: notice the shoreline through your own photograph, or step toward the food stalls and meet the beach as it is today.',
 coast2Food:'You followed your appetite. Now change the pace. Look for the old piers to see the shoreline’s past, or stay with the promenade and frame the beach’s evening life.',
 market2Sweet:'You solved the sweet-shop clue. Before we finish at Mananchira, choose one more lens: look closer at the market’s shopfronts, or discover the royal connection behind the pond.',
 market2Name:'You followed the street’s name. Now follow its people through the shopfronts, or take the story toward Mananchira and its palace-era water source. Which page comes next?',
 coffee:'Try this: frame the same shoreline twice. Once with the sea filling the view; once with a pier or the public promenade included. Which image tells more of this place? The beach has become more than a backdrop.',
 horizon:'Your next landmark is an old pier, viewed from the public promenade. The beach’s ancient piers and old lighthouse are recorded in the district guide. Keep to public paths; the discovery is in noticing them, not climbing them.',
 food:'Pause at an SM Street shopfront. This is a living shopping street, known for sweets including Kozhikodan halwa. Ask a seller a question if they are free, or simply observe the display. Taking part does not have to mean buying.',
 keeper:'Look toward Mananchira’s water. Imagine this view before the traffic, before your phone: a freshwater pond built by the Zamorin Mana Vikrama, supplying the royal palace. The city grew around it. You came for a quiet moment and found a much older chapter.',
 finaleCoast:'Now take your sunset picture. You have noticed a shoreline with old landmarks and a life around them. Same beach. A richer memory. Your discoveries are saved, and the street with the strange name is waiting for another walk.',
 finaleMarket:'Sweet Meat Street is no longer just a curious name. And Mananchira is no longer just a pretty pond. You followed your own questions through Kozhikode. Keep those discoveries. Next time, let the sea tell its side of the story.'
};
Object.assign(lines,{
 roastPier:'You found the landmark. Your sense of direction survives another round.',
 roastFood:'A food quest. Brave choice for someone led here by their stomach.',
 roastFrame:'Evidence of curiosity. Finally, a reason for all those camera lenses.',
 reactCoastPier:'The old piers. Ambitious choice for a quest with absolutely no snack reward. Your discipline is either inspiring or concerning.',
 reactCoastFood:'Food intelligence. The stomach has seized control of navigation again. Honestly, it has a better success rate than the map.',
 reactCoastFrame:'A photo quest. At last, your camera roll has been promoted from evidence of procrastination to field equipment.',
 reactCoastLandmark:'Another landmark. You are collecting coastline facts like the beach is handing out loyalty stamps.',
 reactMarketHalwa:'Halwa reconnaissance. A serious investigator would bring a notebook. You brought excellent priorities.',
 reactMarketWindow:'Two shopfronts. The detective board is ready; the red string budget is still under review.',
 reactMarketPond:'Royal history, no palace invite required. Look at you, getting cultured between snack stops.',
 reactMarketNote:'A field note. Historians everywhere are relieved you finally opened the notes app for something useful.'
});

Object.assign(lines,{
});
const option=(id,title,detail,destination,variant,source,question,answers,correct,fact)=>({id,title,detail,destination,variant,source,question,answers,correct,fact});
const pier=option('coastBoat','Follow the old piers','A landmark hunt from the public promenade.','Kozhikode Beach · old piers','piers','beach','Which historic feature are you looking for?',['The old piers','A royal palace pond'],0,'The district guide identifies ancient piers and an old lighthouse at Kozhikode Beach.');
const snacks=option('coastCastle','Follow your appetite','Notice the evening food scene; buying is optional.','Kozhikode Beach · snack stalls','food','beach','Which local delicacy does the district guide mention?',['Mussels','Maple taffy'],0,'The district guide mentions mussels among the beach’s seafood delicacies. Check actual menus, ingredients and prices on site.');
const sweet=option('marketSweet','Let the halwa answer','Find the sweet-shop window that explains the name.','SM Street · sweet-shop windows','sweets','street','Which sweet is SM Street especially known for?',['Kozhikodan halwa','Banana chips'],0,'Kerala Tourism identifies Kozhikodan halwa among SM Street’s signature sweets.');
const name=option('marketMemory','Investigate the street name','Connect the name to what the shopfronts sell.','SM Street · shopping lane','archive','street','What does the tourism guide link the name to?',['Sweet shops and bakeries','A beach lighthouse'],0,'Kerala Tourism connects the name Sweet Meat Street to the sweet shops and bakeries that lined it.');
const photo=option('coffee','Make a photo with a story','Find a frame that includes the beach’s human life.','Kozhikode Beach · promenade','garden','beach','Which frame adds a sense of place?',['Only an anonymous patch of sky','The shoreline with a local landmark'],1,'An optional observation challenge: include a pier or public promenade in your own frame.');
const history=option('horizon','Find the shore’s older chapter','Notice the old piers without entering unsafe structures.','Kozhikode Beach · pier viewpoint','viewpoint','beach','Which other old landmark does the district guide name?',['A lighthouse','A palace water tank'],0,'Observe the beach’s historic landmarks from public paths and follow local access restrictions.');
const shops=option('food','Meet the market through its windows','Observe a display or ask a seller a question.','SM Street · shopfront trail','food','street','What makes this a local discovery?',['Learning from the street and its sellers','Making a compulsory purchase'],0,'SM Street is a shopping street associated with Kozhikodan halwa and other sweets.');
const pond=option('keeper','Find the pond’s royal connection','Finish at Mananchira with a different way of seeing it.','Mananchira Square · pond','pond','square','What did the pond supply in the Zamorin era?',['Water for the royal palace','Water for visiting ships'],0,'Kerala Tourism describes Mananchira as a palace water source built by the Zamorin Mana Vikrama.');
export function choices(route,checkpoint,previous=[]){
 if(checkpoint===0)return route==='coast'?[pier,snacks]:[sweet,name];
 if(route==='coast')return previous[0]?.id==='coastCastle'?[history,photo]:[photo,{...snacks,id:'coastSnack',fact:snacks.fact}];
 return previous[0]?.id==='marketMemory'?[pond,shops]:[shops,pond];
}
lines.coastSnack=lines.coastCastle;
export function checkpointLine(run){if(run.checkpoint===0)return run.routeId+'1';return run.routeId==='coast'?(run.choices[0]?.id==='coastCastle'?'coast2Food':'coast2Heritage'):(run.choices[0]?.id==='marketMemory'?'market2Name':'market2Sweet');}
export const initialRun=(routeId='coast')=>({phase:'picker',routeId,progress:0,checkpoint:0,choices:[],xp:0,variant:'default',line:routes.find(r=>r.id===routeId).intro,completed:[],mode:'demo',discoveries:[],observationDone:false});
export function advance(run,distance,route){if(run.phase!=='walking')return run;const progress=Math.max(0,Math.min(route.length,distance));const next=route.stops[run.checkpoint];if(next!==undefined&&progress>=next)return {...run,progress:next,phase:'choice',line:checkpointLine(run)};if(progress>=route.length)return {...run,progress:route.length,phase:'finale',line:route.ending,xp:run.xp+100};return {...run,progress};}
export function choose(run,option){if(run.phase!=='choice')return run;return {...run,phase:'reaction',line:option.id,variant:option.variant,checkpoint:run.checkpoint+1,choices:[...run.choices,option],completed:[...run.completed,run.checkpoint],xp:run.xp+50,observationDone:false};}
export function observe(run,answer){const choice=run.choices.at(-1);if(run.phase!=='reaction'||run.observationDone||answer!==choice?.correct)return run;return {...run,observationDone:true,xp:run.xp+50,discoveries:[...run.discoveries,{title:choice.destination,fact:choice.fact,source:choice.source}]};}
export const nearby=[
 {title:'SM Street',kind:'Food + shopping',activity:'Look for Kozhikodan halwa at the sweet-shop windows.',source:'street'},
 {title:'Kozhikode Beach',kind:'Coast + heritage',activity:'Observe the old piers and lighthouse from public paths.',source:'beach'},
 {title:'Mananchira Square',kind:'History + a quieter walk',activity:'Discover the palace-era connection of the freshwater pond.',source:'square'}
];
export function positionAt(route,progress){
 const lat0=route.coords[0].lat*Math.PI/180;const lengths=route.coords.slice(1).map((p,i)=>Math.hypot((p.lng-route.coords[i].lng)*111320*Math.cos(lat0),(p.lat-route.coords[i].lat)*111320));const total=lengths.reduce((a,b)=>a+b,0),offset=route.progressOffset||0,span=Math.max(1,route.length-offset);let remaining=Math.max(0,Math.min(1,(progress-offset)/span))*total;
 for(let i=0;i<lengths.length;i++){if(remaining<=lengths[i]||i===lengths.length-1){const t=lengths[i]?Math.min(1,remaining/lengths[i]):0;return {lat:route.coords[i].lat+(route.coords[i+1].lat-route.coords[i].lat)*t,lng:route.coords[i].lng+(route.coords[i+1].lng-route.coords[i].lng)*t};}remaining-=lengths[i];}return route.coords[0];
}
export function navigationAt(route,progress){let offset=route.progressOffset||0;const steps=route.steps||[];for(let index=0;index<steps.length;index++){const step=steps[index],start=offset;offset+=step.distanceMeters||0;if(progress<offset)return {...step,remaining:Math.ceil(offset-progress),distanceInto:Math.max(0,progress-start),next:steps[index+1]||null};}return steps.at(-1)?{...steps.at(-1),remaining:0,distanceInto:steps.at(-1).distanceMeters||0,next:null}:null;}
export function routeHeadingAt(route,progress){let offset=route.progressOffset||0,heading=0;for(const step of route.steps||[]){const maneuver=step.maneuver||'';if(progress>=offset){if(/RIGHT/.test(maneuver))heading+=.52;else if(/LEFT/.test(maneuver))heading-=.52;}offset+=step.distanceMeters||0;}return Math.max(-1.25,Math.min(1.25,heading));}
export function projectFix(coords,fix){const lat0=coords[0].lat*Math.PI/180; const xy=p=>({x:p.lng*111320*Math.cos(lat0),y:p.lat*111320}); const p=xy(fix); let total=0,best={error:Infinity,distance:0,signedOffset:0},length=0;for(let i=0;i<coords.length-1;i++){const a=xy(coords[i]),b=xy(coords[i+1]);const dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy);if(!len)continue;const t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/(len*len))),qx=a.x+t*dx,qy=a.y+t*dy;const error=Math.hypot(p.x-qx,p.y-qy);if(error<best.error)best={error,distance:total+t*len,signedOffset:(dx*(p.y-qy)-dy*(p.x-qx))/len};total+=len;}length=total;return {...best,length};}
Object.assign(lines,revisedDialogue);
