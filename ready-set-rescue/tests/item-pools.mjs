import assert from 'node:assert/strict';
import {levels,items,itemLessons,distractionKeys,makeKit,makeDistractions,startRound,apply,view} from '../app/game.ts';
const allUseful=new Set();
for(const level of Object.keys(levels)){
 const useful=new Set(),fakes=new Set();let lastKit=[],lastFakes=[];
 for(let i=0;i<300;i++){
  const kit=makeKit(level,lastKit),distractions=makeDistractions(lastFakes);assert.equal(kit.length,8);assert.equal(distractions.length,8);assert.equal(new Set(distractions).size,8);assert.ok(distractions.every(k=>!kit.includes(k)&&items[k]&&itemLessons[k]));assert.notEqual([...distractions].sort().join(','),[...lastFakes].sort().join(','));kit.forEach(k=>{useful.add(k);allUseful.add(k)});distractions.forEach(k=>fakes.add(k));lastKit=kit;lastFakes=distractions;
 }
 assert.ok(useful.size>=15,level+' should have an expanded useful pool');assert.equal(fakes.size,distractionKeys.length);
 for(let players=1;players<=4;players++){
  const s={level,difficulty:'easy',host:'a',solo:players===1,players:Array.from({length:players},(_,i)=>({id:i?'b':'a',token:i?'two':'one',name:'Player'})),spots:[]};startRound(s,1000);
  assert.equal(s.spots.filter(x=>x.item&&!x.item.required).length,8);
  assert.ok(s.rooms.every(r=>s.spots.some(x=>x.room===r.name&&x.item?.required)));
  assert.ok(!('previousDistractions' in view(s)));
  const before=[...s.previousDistractions].sort().join(',');apply(s,{action:'reset',token:'one',level},1000);apply(s,{action:'start',token:'one'},1000);assert.notEqual([...s.previousDistractions].sort().join(','),before);
 }
}
for(const key of ['whistle','mask','shoes','workgloves','raincoat','canopener','keys','coat','socks'])assert.ok(allUseful.has(key));
console.log(`PASS: ${allUseful.size} useful supplies, ${distractionKeys.length} distractions, 1,800 randomised pools, no consecutive fake-set repeats, all new lessons, eight distractions and useful supplies in every room for 1–4 players.`);
