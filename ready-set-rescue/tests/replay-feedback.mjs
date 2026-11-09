import assert from 'node:assert/strict';
import {levels,items,itemLessons,makeKit,startRound,apply,view} from '../app/game.ts';
for(const level of Object.keys(levels)){
 const variations=new Set();let previous=[];
 for(let i=0;i<200;i++){
  const kit=makeKit(level,previous);assert.equal(kit.length,8);assert.equal(new Set(kit).size,8);assert.ok(kit.includes('water')&&kit.includes('food'));assert.ok(kit.every(key=>items[key]&&itemLessons[key]));
  if(level==='outage')assert.ok(kit.includes('torch')&&kit.includes('batteries'));
  if(level==='winter')assert.ok(kit.includes('blanket')&&kit.includes('warmclothes'));
  if(previous.length)assert.notEqual([...kit].sort().join(','),[...previous].sort().join(','));
  variations.add([...kit].sort().join(','));previous=kit;
 }
 assert.ok(variations.size>10,level+' needs multiple distinct kits');
 const s={level,difficulty:'extreme',duration:30,host:'a',solo:false,status:'lobby',players:[{id:'a',token:'one',name:'Alice'},{id:'b',token:'two',name:'Bob'}],spots:[]};
 apply(s,{action:'start',token:'one'},1000);assert.equal(s.target.length,10);const before=[...new Set(s.target)].sort().join(',');
 assert.ok(!('previousKit' in view(s)));assert.deepEqual(view(s).target,[]);assert.equal(view(s).total,null);assert.deepEqual(s.feedback,[]);
 function pack(spot){apply(s,{action:'move',token:'two',room:spot.room},1000);apply(s,{action:'search',token:'two',spot:spot.id},1000);apply(s,{action:'pack',token:'two',spot:spot.id},1000);}
 const right=s.spots.find(x=>x.item?.required);pack(right);let f=view(s).feedback[0];assert.equal(f.spotId,right.id);assert.equal(f.playerId,'b');assert.equal(f.correct,true);assert.equal(f.points,100);assert.equal(f.penalty,0);assert.equal(f.text,itemLessons[right.item.key]);assert.match(f.source,/redcross\.org/);
 const wrong=s.spots.find(x=>x.item&&!x.item.required);pack(wrong);f=view(s).feedback[0];assert.equal(f.correct,false);assert.equal(f.points,-25);assert.equal(f.penalty,5);assert.equal(f.text,itemLessons[wrong.item.key]);assert.equal(s.end,26000);assert.equal(s.players[1].score,75);
 assert.throws(()=>pack(wrong),/already/);assert.equal(s.feedback.length,2);
 const firstRound=s.roundId;apply(s,{action:'reset',token:'one'},1000);assert.deepEqual(s.feedback,[]);apply(s,{action:'start',token:'one'},1000);assert.notEqual(s.roundId,firstRound);assert.notEqual([...new Set(s.target)].sort().join(','),before);
}
for(const key of Object.keys(items))assert.ok(itemLessons[key],key+' needs a learning explanation');
assert.match(itemLessons.toy,/Comfort items/);assert.match(itemLessons.candle,/Flashlights/);
console.log('PASS: 1,200 rotating kits, no immediate kit repeats, disaster essentials retained, team extras, own and shared packing lessons, penalties, duplicate pickup protection, hidden Extreme data, reset feedback and all item explanations.');
