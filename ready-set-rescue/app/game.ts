export const levels:any = {
 outage:{name:'Power Outage',icon:'⚡',tag:'LIGHTS OUT. THINK FAST.',description:'The neighbourhood has gone dark. Get your household kit ready before the clock runs out.',tip:'Use flashlights instead of candles. Keep generators outdoors, away from windows.'},
 flood:{name:'Flood Watch',icon:'🌊',tag:'READY TO GO.',description:'Heavy rain is forecast. Pack your go-bag before an evacuation alert arrives.',tip:'Never walk or drive through floodwater. Follow evacuation instructions and move to higher ground.'},
 quake:{name:'Earthquake Prep',icon:'🪨',tag:'BUILD YOUR READY KIT.',description:'Prepare your household before an earthquake drill. Search carefully and work together.',tip:'During shaking, Drop, Cover and Hold On. This game is preparation before an emergency, not a reason to delay taking cover.'},
 tornado:{name:'Tornado',icon:'🌪️',tag:'READY BEFORE THE WARNING.',description:'Practise getting your shelter supplies ready before severe weather arrives.',tip:'A tornado warning means take shelter immediately. Use a basement, safe room, or small interior room on the lowest floor of a sturdy building, away from windows. Do not stop to collect supplies.',source:'https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/tornado.html'},
 hurricane:{name:'Hurricane',icon:'🌀',tag:'PACK AHEAD OF THE STORM.',description:'Prepare your household go-bag while there is still time before the storm.',tip:'Prepare ahead of the storm and follow evacuation instructions. Never walk or drive through floodwater, and stay sheltered even if the eye of the storm makes the weather seem calm.',source:'https://www.redcross.org/take-a-class/resources/articles/hurricane-supply-list'},
 winter:{name:'Winter Storm',icon:'❄️',tag:'STAY WARM. STAY READY.',description:'Gather warmth, food and essential supplies before ice and snow make travel unsafe.',tip:'Gather supplies before the storm, stay warm indoors, and avoid unnecessary travel. Never use a generator, charcoal grill, or outdoor heater indoors.',source:'https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/winter-storm.html'}
};
const kitVariants:any={
 outage:{core:['water','food','torch','batteries'],options:['radio','aid','charger','contacts','medicine','blanket','hygiene','cash','canopener','whistle','keys','tool']},
 flood:{core:['water','food','documents'],options:['torch','radio','aid','medicine','map','charger','contacts','hygiene','cash','blanket','raincoat','shoes','whistle','keys','workgloves']},
 quake:{core:['water','food','torch'],options:['radio','aid','medicine','blanket','contacts','charger','batteries','hygiene','map','tool','shoes','mask','whistle','workgloves','keys']},
 tornado:{core:['water','food','radio'],options:['torch','batteries','aid','medicine','charger','contacts','blanket','documents','hygiene','shoes','mask','whistle','workgloves','keys']},
 hurricane:{core:['water','food','radio'],options:['torch','batteries','aid','documents','hygiene','charger','medicine','map','cash','blanket','raincoat','shoes','whistle','canopener','workgloves','keys']},
 winter:{core:['water','food','blanket','warmclothes'],options:['torch','radio','medicine','charger','aid','batteries','contacts','hygiene','documents','coat','socks','shoes','canopener','whistle','keys']}
};
export const distractionKeys=['toy','console','cake','plant','painting','candle','deadbatteries','emptybottle','pluglamp','icecream','hairdryer','headphones','partyhat','beachball','trophy','snowglobe','heels','remote','electricopener','electricblanket'];
export function makeDistractions(previous:string[]=[]){let selected:string[]=[];for(let attempt=0;attempt<10;attempt++){selected=shuffleItems([...distractionKeys]).slice(0,8);if([...selected].sort().join(',')!==[...previous].sort().join(','))return selected;}selected[0]=distractionKeys.find(key=>!selected.includes(key))!;return selected;}
function shuffleItems<T>(arr:T[]):T[]{for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}
export function makeKit(level:string,previous:string[]=[]){const {core,options}=kitVariants[level];let selected:string[]=[];for(let attempt=0;attempt<10;attempt++){selected=[...core,...shuffleItems([...options]).slice(0,8-core.length)];if([...selected].sort().join(',')!==[...new Set(previous)].sort().join(','))return selected;}const oldOption=selected.find(key=>!core.includes(key));const replacement=options.find((key:string)=>!selected.includes(key));if(oldOption&&replacement)selected[selected.indexOf(oldOption)]=replacement;return selected;}
export const roundTimes=[{seconds:120,label:'2 minutes'},{seconds:60,label:'1 minute'},{seconds:30,label:'30 seconds'}];
export function validDuration(value:any){return typeof value==='number'&&roundTimes.some(t=>t.seconds===value)?value:120;}
export const difficulties:any={easy:{name:'Easy',description:'Full checklist. Find every listed supply.'},medium:{name:'Medium',description:'Partial checklist. Work out the missing supplies too.'},hard:{name:'Hard',description:'Only the total count. Identify the supplies yourself.'},extreme:{name:'Extreme',description:'No list or count. Decide when your kit is ready and submit it.'}};
export const items:any={water:['💧','Drinking water'],food:['🥫','Non-perishable food'],torch:['🔦','Flashlight'],radio:['📻','Battery radio'],batteries:['🔋','Spare batteries'],aid:['🧰','First aid kit'],charger:['📱','Phone & charger'],contacts:['📒','Emergency contacts'],medicine:['💊','Personal medication'],documents:['📁','Document copies'],map:['🗺️','Local map'],blanket:['🧣','Emergency blanket'],warmclothes:['🧤','Warm hat & gloves'],tool:['🔧','Multi-purpose tool'],cash:['💵','Emergency cash'],hygiene:['🧼','Hygiene supplies'],whistle:['📣','Emergency whistle'],mask:['😷','Dust mask'],shoes:['🥾','Sturdy shoes'],workgloves:['🧤','Work gloves'],raincoat:['🧥','Rain poncho'],canopener:['🥫','Manual can opener'],keys:['🔑','Spare house & car keys'],coat:['🧥','Winter coat'],socks:['🧦','Warm dry socks'],deadbatteries:['🪫','Dead batteries'],emptybottle:['🍶','Empty water bottle'],pluglamp:['💡','Plug-in lamp'],icecream:['🍦','Ice cream'],hairdryer:['💨','Hair dryer'],headphones:['🎧','Music headphones'],partyhat:['🥳','Party hat'],beachball:['🏐','Beach ball'],trophy:['🏆','Decorative trophy'],snowglobe:['🔮','Snow globe'],heels:['👠','High heels'],remote:['📺','TV remote'],electricopener:['🔌','Electric can opener'],electricblanket:['🔌','Plug-in heated blanket'],toy:['🧸','Teddy bear'],console:['🎮','Game controller'],cake:['🍰','Cream cake'],plant:['🪴','House plant'],painting:['🖼️','Picture frame'],candle:['🕯️','Decorative candle']};
const kitSource='https://www.redcross.org/get-help/how-to-prepare-for-emergencies/survival-kit-supplies.html';
export const itemLessons:any={

 whistle:"A whistle can help signal for assistance. It is one of the additional supplies to consider for a household kit.",
 mask:"A dust mask is included in earthquake bed-kit guidance for dust after an earthquake. It does not make damaged areas safe to enter.",
 shoes:"Sturdy shoes help protect your feet from debris. Keep them accessible when preparing for storms or earthquakes.",
 workgloves:"Work gloves are an additional preparedness supply for appropriate tasks. Follow official guidance and avoid damaged or hazardous areas.",
 raincoat:"Rain gear helps you prepare for wet conditions if you need to leave home. It does not make floodwater safe to enter.",
 canopener:"A manual can opener lets you open suitable canned food without household electricity. Check whether your stored food needs one.",
 keys:"A spare set of house and car keys is a useful personal addition to an emergency kit.",
 coat:"A warm coat is part of preparing suitable winter clothing before cold weather arrives.",
 socks:"Warm, dry socks are part of keeping suitable clothing ready for cold weather. A real winter kit needs clothing for everyone.",
 deadbatteries:"These batteries are dead, so they cannot power your emergency devices. Pack working spare batteries that match your equipment.",
 emptybottle:"This bottle contains no drinking water, so it does not count as stored water in this round. Clean refillable bottles can still be useful in a real kit.",
 pluglamp:"This lamp depends on household electricity. For an outage, a working battery flashlight is the more reliable kit choice.",
 icecream:"Ice cream needs a freezer and is not suitable as shelf-stable emergency food. Choose food that does not need refrigeration.",
 hairdryer:"A hair dryer is not a required emergency supply in this practice round. It also needs household power.",
 headphones:"Music headphones are not a required supply in this round. Personal or accessibility needs can differ; plan your real kit for your household.",
 partyhat:"A party hat is not part of this round\u2019s practice kit. Prioritise essential supplies first.",
 beachball:"A beach ball is not part of this round\u2019s practice kit. Games for children can be useful additions in real household kits.",
 trophy:"A decorative trophy is not a required emergency supply in this practice round.",
 snowglobe:"A decorative snow globe is not a required emergency supply in this practice round.",
 heels:"High heels are not the sturdy protective footwear this practice kit needs. Prepare suitable sturdy shoes for your real household kit.",
 remote:"A TV remote is not a battery radio. A battery-powered or hand-crank radio helps you follow alerts when household power is unavailable.",
 electricopener:"This opener depends on household electricity. A manual can opener can open suitable stored food during an outage.",
 electricblanket:"This blanket needs household power. A non-electric blanket and warm clothing are more dependable when preparing for a winter power outage.",
 water:'Clean drinking water is essential when your normal water supply is unavailable. A real household kit needs enough for everyone, not just one bottle.',
 food:'Non-perishable, easy-to-prepare food is useful when shops close or refrigeration and cooking are disrupted.',
 torch:'A flashlight provides light without an open flame. Choose flashlights instead of candles during a power outage.',
 radio:'A battery-powered or hand-crank radio helps you follow weather alerts and emergency information without mains electricity.',
 batteries:'Spare batteries keep your flashlight and battery radio working. Match them to the devices in your real kit.',
 aid:'A first aid kit keeps basic supplies together for minor injuries. Learn first aid before an emergency.',
 charger:'A phone and backup charging supplies help you stay in contact when household power is interrupted.',
 contacts:'A paper contact list helps you reach family and emergency contacts if you cannot access the details on your phone.',
 medicine:'Keep the prescribed medications and medical supplies you personally need in your emergency plan. Prepare before an emergency and follow your care plan.',
 documents:'Copies of identification, insurance and important records can help if you need to leave home. Protect paper copies from water.',
 map:'A paper map helps you plan routes if mobile navigation is unavailable. Follow official evacuation instructions.',
 blanket:'An emergency blanket adds warmth if heating is disrupted or you need to leave home.',
 warmclothes:'A warm hat and gloves help you prepare for cold weather. Winter kits should include warm clothing for everyone.',
 cash:'Emergency cash can help when payment systems or cash machines are unavailable.',
 hygiene:'Soap and other personal hygiene supplies help you meet everyday needs while normal services are disrupted.',
 tool:'A multi-purpose tool is one of the supplies recommended for an emergency kit. Use tools safely and only for tasks you understand.',
 toy:'A teddy bear is not a required supply in this practice round. Comfort items can still be useful for children in a real emergency kit.',
 console:'A game controller is not a required supply in this practice round. Prioritise the emergency supplies you need before entertainment items.',
 cake:'Cream cake needs refrigeration, so it is not the shelf-stable food this practice kit needs. Choose non-perishable food for emergency storage.',
 plant:'A house plant is not a required supply in this practice round. Focus on drinking water, food and essential supplies for people.',
 painting:'A decorative picture is not a required supply in this practice round. Important document copies have a different role in emergency preparation.',
 candle:'A decorative candle is not a required supply in this practice round. Flashlights are a safer lighting choice during a power outage.'
};
export function lessonFor(key:string){return {text:itemLessons[key]||'Review your household needs and the full preparedness checklist.',source:['warmclothes','coat','socks','electricblanket'].includes(key)?'https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/winter-storm.html':key==='mask'?'https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/earthquake.html':['torch','candle','pluglamp','deadbatteries','electricopener','remote'].includes(key)?'https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/power-outage.html':kitSource};}
const roomFurniture:any={
 'Bedroom':[['🛏️','Under the bed'],['🗄️','Bedside drawer'],['👕','Wardrobe'],['🧺','Laundry basket'],['🧳','Storage trunk'],['📦','Top shelf'],['🛏️','Pillow pocket'],['🧳','Suitcase']],
 'Kitchen':[['🚪','Pantry'],['🗄️','Kitchen drawer'],['🧊','Cooler'],['📦','Cupboard'],['👜','Shopping bag'],['🍽️','Under the table'],['📦','Counter basket'],['🚪','Tall cabinet']],
 'Living room':[['🛋️','Sofa cushions'],['📚','Bookcase'],['🗄️','Desk drawer'],['📦','Storage box'],['👜','Side table'],['🧳','Cabinet'],['🛋️','Footstool'],['🧺','Magazine basket']],
 'Garage':[['🧰','Tool bench'],['🎒','Backpack'],['📦','Supply shelf'],['🗄️','Locker'],['🧳','Travel bag'],['🪣','Utility cupboard'],['📦','Storage chest'],['🚪','Wall cabinet']],
 'Home office':[['🗄️','Desk drawer'],['📁','Filing cabinet'],['📚','Bookcase'],['💼','Work bag'],['📦','Document box']],
 'Entryway':[['👟','Shoe rack'],['🧥','Coat cupboard'],['🗄️','Console drawer'],['👜','Travel tote'],['📦','Hall basket']],
 'Utility room':[['📦','Supply cupboard'],['🧺','Linen shelf'],['🚪','Tall cabinet'],['🧺','Laundry basket'],['🗄️','Wall drawer'],['👜','Storage tote']],
 'Storage room':[['🧳','Old trunk'],['📦','Moving box'],['🚪','Storage rack'],['🧳','Suitcase'],['🧰','Toolbox'],['🎒','Camping bag'],['🗄️','Locker'],['📦','Top shelf']],
 'Hall closet':[['🧺','Linen shelf'],['🧥','Coat cupboard'],['🧳','Travel bag'],['👟','Shoe rack'],['🗄️','Small drawer'],['🧺','Basket'],['📦','Storage chest'],['📦','Supply box']],
 'Shelter room':[['📦','Kit shelf'],['🧰','Supply box'],['🎒','Backpack'],['🧳','Blanket chest'],['🚪','Cupboard'],['🪑','Under the bench'],['👜','Travel bag'],['🗄️','Wall cabinet']]
};
const makeRooms=(names:string[],slots:number)=>names.map(name=>({name,icon:({'Bedroom':'🛏️','Kitchen':'🍳','Living room':'🛋️','Garage':'🧰','Home office':'💻','Entryway':'🚪','Utility room':'🧺','Storage room':'📦','Hall closet':'🧥','Shelter room':'🛡️'} as any)[name],slots}));
export const roomLayouts:any={
 outage:makeRooms(['Bedroom','Kitchen','Living room','Garage'],6),
 flood:makeRooms(['Bedroom','Kitchen','Home office','Entryway','Utility room'],5),
 quake:makeRooms(['Bedroom','Living room','Storage room'],8),
 tornado:makeRooms(['Kitchen','Hall closet','Shelter room'],8),
 hurricane:makeRooms(['Bedroom','Kitchen','Living room','Home office','Utility room','Entryway'],4),
 winter:makeRooms(['Bedroom','Kitchen','Living room','Utility room'],6)
};
export function furnitureForLevel(level:string){return (roomLayouts[level]||roomLayouts.outage).flatMap((r:any)=>roomFurniture[r.name].slice(0,r.slots).map((f:any)=>[r.name,...f]));}
export function startRound(s:any,now:number){const furniture=furnitureForLevel(s.level);s.rooms=roomLayouts[s.level].map(({name,icon}:any)=>({name,icon}));s.difficulty=difficulties[s.difficulty]?s.difficulty:'easy';const keys=makeKit(s.level,s.previousKit||s.target||[]);s.previousKit=[...keys];s.roundId=crypto.randomUUID();s.feedback=[]; for(let p=1;p<s.players.length;p++)keys.push('water','food');// Balance useful supplies before randomising their hiding places.
const shuffle=(arr:any[])=>{for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;};
const roomNames=[...new Set(furniture.map((f:any)=>f[0]))];
const roomPools:any[][]=roomNames.map(()=>[]);
const required=shuffle(keys.map((key:string)=>({key,required:true})));
const requiredOffset=Math.floor(Math.random()*roomNames.length);
required.forEach((item:any,i:number)=>roomPools[(i+requiredOffset)%roomNames.length].push(item));
const selectedDistractions=makeDistractions(s.previousDistractions||[]);s.previousDistractions=[...selectedDistractions];
const distractions=selectedDistractions.map(key=>({key,required:false}));
const roomCapacities=roomNames.map(room=>furniture.filter((f:any)=>f[0]===room).length);
for(const item of distractions){const available=shuffle(roomNames.map((_,i)=>i).filter(i=>roomPools[i].length<roomCapacities[i]));available.sort((a,b)=>roomPools[a].filter(x=>!x.required).length-roomPools[b].filter(x=>!x.required).length);if(!available.length)throw Error('Not enough hiding places for this round.');roomPools[available[0]].push(item);}
const hiddenByRoom=roomPools.map((pool:any[],r:number)=>{const slots=furniture.filter((f:any)=>f[0]===roomNames[r]).length;return shuffle([...pool,...Array(slots-pool.length).fill(null)]);});
const roomIndexes=roomNames.map(()=>0);
s.spots=furniture.map((f:any,i:number)=>{const r=roomNames.indexOf(f[0]);const item=hiddenByRoom[r][roomIndexes[r]++];return {id:i,room:f[0],icon:f[1],name:f[2],opened:false,item:item?{...item,taken:false}:null};});
s.target=keys;const hintKeys=[...new Set(keys)] as string[];for(let i=hintKeys.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[hintKeys[i],hintKeys[j]]=[hintKeys[j],hintKeys[i]];}s.hints=hintKeys.slice(0,4);s.checkMessage='';s.duration=validDuration(s.duration);s.end=now+s.duration*1000;s.penalty=0;s.status='playing';s.players.forEach((p:any)=>{p.score=0;p.found=0;p.room=roomNames[0]});s.log=['Round started. Split up and search!'];}
export function finish(s:any,now:number){if(s.status==='playing'){const found=s.spots.filter((x:any)=>x.item?.required&&x.item.taken).length;if(found===s.target.length&&s.difficulty!=='extreme'){s.status='won';s.remaining=Math.max(0,Math.ceil((s.end-now)/1000));}else if(now>=s.end){s.status='lost';s.remaining=0;}}}
export function apply(s:any,body:any,now:number){const p=s.players.find((p:any)=>p.token===body.token);if(!p)throw Error('Rejoin this room to play.');finish(s,now);const host=p.id===s.host;
 if(body.action==='duration'){if(!host)throw Error('Only the host can select the timer.');if(s.status!=='lobby')throw Error('Choose the timer before the round starts.');s.duration=validDuration(body.duration);return;}
 if(body.action==='start'){if(!host)throw Error('Only the host can start.');if(s.status!=='lobby')throw Error('This round has already started.');if(!s.solo&&s.players.length<2)throw Error('Invite at least one friend, or choose Solo on the home screen.');startRound(s,now);return;}
 if(body.action==='reset'){if(!host)throw Error('Only the host can set up the next round.');s.status='lobby';s.level=levels[body.level]?body.level:s.level;s.difficulty=difficulties[body.difficulty]?body.difficulty:(s.difficulty||'easy');s.duration=body.duration===undefined?validDuration(s.duration):validDuration(body.duration);s.spots=[];s.rooms=roomLayouts[s.level].map(({name,icon}:any)=>({name,icon}));s.target=[];s.hints=[];s.feedback=[];s.checkMessage='';return;}
 if(s.status!=='playing')throw Error('The round is not running.');
 if(body.action==='move'){if(!s.spots.some((spot:any)=>spot.room===body.room))throw Error('Unknown room.');p.room=body.room;return;}
 if(body.action==='confirm'){if(s.difficulty!=='extreme')throw Error('Only Extreme requires a kit check.');const found=s.spots.filter((x:any)=>x.item?.required&&x.item.taken).length;if(found===s.target.length){s.status='won';s.remaining=Math.max(0,Math.ceil((s.end-now)/1000));s.checkMessage='Kit complete!';s.log.unshift(p.name+' submitted the complete kit.');}else{s.checkMessage='Your kit is incomplete. Keep searching, then check it again before time runs out.';s.log.unshift(p.name+' checked the kit. More supplies are needed.');}s.log=s.log.slice(0,6);return;}
 const spot=s.spots.find((x:any)=>x.id===body.spot);if(!spot||spot.room!==p.room)throw Error('Go to that room first.');
 if(body.action==='search'){spot.opened=true;return;}
 if(body.action==='pack'){if(!spot.opened||!spot.item)throw Error('Search this hiding place first.');if(spot.item.taken)throw Error('Someone already packed that item.');spot.item.taken=true;s.checkMessage='';const lesson=lessonFor(spot.item.key);s.feedback=[{id:crypto.randomUUID(),playerId:p.id,playerName:p.name,spotId:spot.id,key:spot.item.key,correct:spot.item.required,points:spot.item.required?100:-25,penalty:spot.item.required?0:5,text:lesson.text,source:lesson.source},...(s.feedback||[])].slice(0,8);if(spot.item.required){p.score+=100;p.found++;s.log.unshift(p.name+' packed '+items[spot.item.key][1]+'.');}else{p.score-=25;s.end-=5000;s.penalty+=5;s.log.unshift(p.name+' packed a distraction. −5 seconds.');}s.log=s.log.slice(0,6);finish(s,now);return;}
 throw Error('Unknown action.');}
export function view(s:any){
 const {players,target=[],hints=[],spots=[],previousKit,previousDistractions,roundId,...rest}=s;
 const difficulty=s.difficulty||'easy';const finished=s.status==='won'||s.status==='lost';
 const visibleTarget=finished||difficulty==='easy'?target:difficulty==='medium'?target.filter((key:string)=>hints.includes(key)):[];
 const rooms=s.status==='lobby'?roomLayouts[s.level].map(({name,icon}:any)=>({name,icon})):s.rooms||[...new Set(spots.map((spot:any)=>spot.room))].map(name=>({name,icon:roomLayouts.outage.find((r:any)=>r.name===name)?.icon||'🚪'}));
 return {...rest,roundId,rooms,duration:validDuration(s.duration),difficulty,target:visibleTarget,total:difficulty==='extreme'&&!finished?null:target.length,foundTotal:spots.filter((x:any)=>x.item?.required&&x.item.taken).length,
 spots:spots.map((spot:any)=>({...spot,item:spot.item&&(spot.opened||finished)?{key:spot.item.key,taken:spot.item.taken,...(finished?{required:spot.item.required}:{})}:null})),
 players:players.map(({token,...p}:any)=>p),serverNow:Date.now()};
}
