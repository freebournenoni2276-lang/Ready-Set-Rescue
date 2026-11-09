import assert from 'node:assert/strict';
import {createPackAudio,createResultTracker} from '../app/pack-audio.ts';
let created=0;const oscillators=[];
class Param {setValueAtTime(value,time){this.value=value;this.time=time;}exponentialRampToValueAtTime(value,time){this.end=value;this.endTime=time;}}
class AudioMock {
 constructor(){created++;this.state='suspended';this.currentTime=10;this.destination={};}
 resume(){this.state='running';return Promise.resolve();}
 close(){this.state='closed';return Promise.resolve();}
 createOscillator(){const o={frequency:new Param(),connect(){},disconnect(){this.disconnected=true},start(t){this.startTime=t},stop(t){this.stopTime=t}};oscillators.push(o);return o;}
 createGain(){return {gain:new Param(),connect(){},disconnect(){}};}
}
const audio=createPackAudio();assert.equal(audio.play(true),false);assert.equal(audio.unlock(),false);globalThis.window={AudioContext:AudioMock};
assert.equal(audio.unlock(),true);assert.equal(created,1);assert.equal(audio.play(true),true);assert.equal(oscillators.length,3);assert.ok(oscillators.every(o=>o.type==='sine'));assert.ok(oscillators[0].frequency.value<oscillators[2].frequency.value);
assert.equal(audio.play(false),true);assert.equal(oscillators.length,5);assert.ok(oscillators.slice(3).every(o=>o.type==='triangle'));assert.ok(oscillators[3].frequency.value>oscillators[4].frequency.value);
assert.equal(audio.playResult(true),true);assert.equal(oscillators.length,11);assert.ok(oscillators.slice(5).every(o=>o.type==='sine'));assert.equal(audio.playResult(false),true);assert.equal(oscillators.length,15);assert.ok(oscillators.slice(11).every(o=>o.type==='triangle'));assert.ok(oscillators[11].frequency.value>oscillators[14].frequency.value);
audio.setMuted(true);assert.equal(audio.playResult(true),false);assert.equal(audio.playResult(false),false);assert.equal(audio.play(true),false);assert.equal(audio.unlock(),false);assert.equal(oscillators.length,15);audio.setMuted(false);assert.equal(audio.unlock(),true);assert.equal(created,1);
for(const o of oscillators){assert.ok(o.stopTime>o.startTime);o.onended();assert.ok(o.disconnected);}
audio.dispose();assert.equal(audio.play(true),false);globalThis.window={AudioContext:class {constructor(){throw Error('Audio unavailable')}}};assert.equal(audio.unlock(),false);delete globalThis.window;
console.log('PASS: audio gesture unlock, distinct correct/incorrect tones, mute suppression, context reuse, node cleanup and unsupported-browser fallback.');

const track=createResultTracker();const state=(roundId,status,code='ROOM')=>({code,roundId,status});
assert.equal(track(state('a','won')),null); // restored results
assert.equal(track(state('b','playing')),null);
assert.equal(track(state('b','won')),'won');
assert.equal(track(state('b','won')),null); // repeated polling
assert.equal(track(state('c','playing')),null);
assert.equal(track(state('c','lost')),'lost');
assert.equal(track(state('c','lost')),null);
assert.equal(track(state('d','playing')),null);
assert.equal(track(state('e','won')),null); // different round
assert.equal(track(state('f','playing')),null);
assert.equal(track(state('f','lost','OTHER')),null); // different room
console.log('PASS: celebration and timeout effects, muted results, one sound per result transition, quiet restored results and room changes.');
