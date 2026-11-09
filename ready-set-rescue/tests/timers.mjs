import assert from 'node:assert/strict';
import {levels,difficulties,roundTimes,validDuration,apply,finish,view} from '../app/game.ts';
const now=10000;
function make(level,difficulty,duration,n){return {level,difficulty,duration,host:'a',solo:n===1,status:'lobby',players:Array.from({length:n},(_,i)=>({id:i?'b'+i:'a',token:i?'token'+i:'host',name:'Player'})),spots:[],log:[]};}
let checked=0;
for(const level of Object.keys(levels))for(const difficulty of Object.keys(difficulties))for(const {seconds} of roundTimes)for(let n=1;n<=4;n++){
 const s=make(level,difficulty,seconds,n);apply(s,{action:'start',token:'host'},now);assert.equal(s.end,now+seconds*1000);assert.equal(view(s).duration,seconds);assert.equal(s.target.length,8+2*(n-1));finish(s,s.end-1);assert.equal(s.status,'playing');finish(s,s.end);assert.equal(s.status,'lost');checked++;
}
for(const {seconds} of roundTimes){
 const s=make('outage','extreme',seconds,2);
 assert.throws(()=>apply(s,{action:'duration',token:'token1',duration:30},now),/host/);
 apply(s,{action:'duration',token:'host',duration:seconds},now);assert.equal(s.duration,seconds);
 apply(s,{action:'start',token:'host'},now);
 assert.throws(()=>apply(s,{action:'duration',token:'host',duration:120},now),/before/);
 apply(s,{action:'confirm',token:'token1'},now+10);assert.equal(s.status,'playing');assert.match(s.checkMessage,/incomplete/);
 const wrong=s.spots.find(x=>x.item&&!x.item.required);apply(s,{action:'move',token:'host',room:wrong.room},now);apply(s,{action:'search',token:'host',spot:wrong.id},now);apply(s,{action:'pack',token:'host',spot:wrong.id},now);assert.equal(s.end,now+(seconds-5)*1000);
 for(const x of s.spots.filter(x=>x.item?.required)){apply(s,{action:'move',token:'host',room:x.room},now);apply(s,{action:'search',token:'host',spot:x.id},now);apply(s,{action:'pack',token:'host',spot:x.id},now);}
 assert.equal(s.status,'playing');apply(s,{action:'confirm',token:'token1'},now+100);assert.equal(s.status,'won');
 apply(s,{action:'reset',token:'host',duration:30,level:'winter',difficulty:'hard'},now+200);assert.equal(s.duration,30);apply(s,{action:'start',token:'host'},now+200);assert.equal(s.end,now+30200);
}
for(const bad of [undefined,null,0,45,90,3600,'30',NaN])assert.equal(validDuration(bad),120);
const legacy=make('outage','easy',undefined,1);assert.equal(view(legacy).duration,120);apply(legacy,{action:'start',token:'host'},now);assert.equal(legacy.end,now+120000);
console.log(`PASS: ${checked} disaster/difficulty/timer/player combinations, timeout boundaries, host-only timer selection, five-second penalties, Extreme checks and resets, invalid values and legacy defaults.`);
