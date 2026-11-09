import assert from 'node:assert/strict';
import {startRound,apply,finish,view,levels,difficulties} from '../app/game.ts';
const now=10000;
function state(level,difficulty,n=1){const s={level,difficulty,host:'a',solo:n===1,status:'lobby',players:Array.from({length:n},(_,i)=>({id:i?'b':'a',token:i?'two':'one',name:i?'Bob':'Alice'})),spots:[],log:[]};apply(s,{action:'start',token:'one'},now);return s;}
function pack(s,spot,token='one'){const t=now+100;apply(s,{action:'move',token,room:spot.room},t);apply(s,{action:'search',token,spot:spot.id},t);apply(s,{action:'pack',token,spot:spot.id},t);}
for(const level of Object.keys(levels))for(const difficulty of Object.keys(difficulties))for(const n of [1,2,4]){
 const s=state(level,difficulty,n),v=view(s);
 assert.equal(s.target.length,8+2*(n-1));assert.equal(v.foundTotal,0);assert.ok(v.players.every(p=>!('token' in p)));
 assert.ok(v.spots.every(x=>x.item===null),'Unsearched furniture must not leak hidden items');
 if(difficulty==='easy')assert.deepEqual(v.target,s.target);
 if(difficulty==='medium'){assert.equal(new Set(v.target).size,4);assert.ok(v.target.length<s.target.length);assert.equal(v.total,s.target.length);}
 if(difficulty==='hard'){assert.deepEqual(v.target,[]);assert.equal(v.total,s.target.length);}
 if(difficulty==='extreme'){assert.deepEqual(v.target,[]);assert.equal(v.total,null);apply(s,{action:'confirm',token:'one'},now);assert.equal(s.status,'playing');assert.match(s.checkMessage,/incomplete/);}
 const needed=s.spots.filter(x=>x.item?.required);
 for(const spot of needed)pack(s,spot,n>1?'two':'one');
 if(difficulty==='extreme'){assert.equal(s.status,'playing');assert.equal(view(s).total,null);finish(s,now+200);assert.equal(s.status,'playing');apply(s,{action:'confirm',token:n>1?'two':'one'},now+300);}
 assert.equal(s.status,'won');assert.equal(view(s).total,s.target.length);assert.deepEqual(view(s).target,s.target);
 assert.ok(view(s).spots.filter(x=>x.item).every(x=>'required' in x.item),'End-of-round review reveals correct/missing supplies');
}
const extreme=state('outage','extreme');for(const x of extreme.spots.filter(x=>x.item?.required))pack(extreme,x);finish(extreme,extreme.end);assert.equal(extreme.status,'lost','A complete but unsubmitted Extreme kit must lose at timeout');assert.throws(()=>apply(extreme,{action:'confirm',token:'one'},extreme.end),/not running/);
const medium=state('flood','medium');const omitted=medium.spots.find(x=>x.item?.required&&!medium.hints.includes(x.item.key));const hinted=medium.spots.filter(x=>x.item?.required&&medium.hints.includes(x.item.key));hinted.forEach(x=>pack(medium,x));assert.equal(medium.status,'playing','Completing visible hints alone cannot win');assert.equal(view(medium).foundTotal,hinted.length);pack(medium,omitted);assert.equal(view(medium).foundTotal,hinted.length+1);
const penalty=state('quake','extreme');const bad=penalty.spots.find(x=>x.item&&!x.item.required);pack(penalty,bad);assert.equal(penalty.end,now+115000);assert.equal(penalty.players[0].score,-25);assert.throws(()=>apply(penalty,{action:'confirm',token:'invalid'},now+200),/Rejoin/);
apply(penalty,{action:'reset',token:'one',difficulty:'hard',level:'flood'},now+200);assert.equal(penalty.difficulty,'hard');assert.equal(penalty.level,'flood');assert.deepEqual(view(penalty).target,[]);
const old={...state('outage','easy')};delete old.difficulty;assert.equal(view(old).difficulty,'easy');
console.log('PASS: 72 disaster/difficulty/player-count combinations, partial-list completeness, hidden server data, Extreme submission and timeout, shared team submission, wrong-item penalties, difficulty reset, legacy-room compatibility.');
