import assert from 'node:assert/strict';
import {startRound,levels,difficulties,furnitureForLevel,roomLayouts} from '../app/game.ts';
const layouts=new Set();
for(const level of Object.keys(levels))for(const difficulty of Object.keys(difficulties))for(let n=1;n<=4;n++)for(let trial=0;trial<100;trial++){
 const s={level,difficulty,players:Array.from({length:n},()=>({}))};startRound(s,0);
 const rooms=s.rooms.map(r=>r.name);const counts=rooms.map(r=>s.spots.filter(x=>x.room===r&&x.item?.required).length);
 assert.equal(counts.reduce((a,b)=>a+b,0),8+2*(n-1));
 assert.ok(Math.min(...counts)>=1,'Every room needs useful supplies');
 assert.ok(Math.max(...counts)-Math.min(...counts)<=1,'Useful supplies must be evenly distributed');
 assert.equal(s.spots.filter(x=>x.item&&!x.item.required).length,8);
 assert.ok(rooms.every(r=>s.spots.some(x=>x.room===r&&x.item&&!x.item.required)),'Every room has a distraction');
 assert.equal(s.spots.length,furnitureForLevel(level).length);assert.equal(s.spots.filter(x=>x.item).length,16+2*(n-1));
 layouts.add(s.spots.map(x=>x.item?.key||'-').join(','));
}
assert.ok(layouts.size>100,'Hiding places should vary between rounds');
console.log('PASS: 9,600 rounds across every disaster, difficulty and player count: every room has useful supplies across 3–6 rooms, counts differ by at most one, distractions are spread out, hiding places vary.');
