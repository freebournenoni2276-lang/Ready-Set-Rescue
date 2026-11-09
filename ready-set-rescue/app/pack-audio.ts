// Short local game effects. Audio starts only from a player gesture.
export function createPackAudio(){
 let context:AudioContext|null=null,muted=false;
 function unlock(){if(muted||typeof window==='undefined')return false;try{const Constructor=window.AudioContext||(window as any).webkitAudioContext;if(!Constructor)return false;if(!context||context.state==='closed')context=new Constructor();if(context!.state==='suspended')void context!.resume().catch(()=>{});return true;}catch{return false;}}
 function tones(notes:number[],gap:number,duration:number,volume:number,type:OscillatorType){
  if(muted||!context||context.state!=='running')return false;
  try{const ctx=context;notes.forEach((frequency,i)=>{const oscillator=ctx.createOscillator(),gain=ctx.createGain();const start=ctx.currentTime+i*gap;oscillator.type=type;oscillator.frequency.setValueAtTime(frequency,start);gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(volume,start+.012);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);oscillator.connect(gain);gain.connect(ctx.destination);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};oscillator.start(start);oscillator.stop(start+duration+.015);});return true;}catch{return false;}
 }
 function play(correct:boolean){return correct?tones([523.25,659.25,783.99],.09,.16,.065,'sine'):tones([220,146.83],.12,.19,.055,'triangle');}
 function playResult(won:boolean){return won?tones([523.25,659.25,783.99,1046.5,783.99,1046.5],.15,.3,.07,'sine'):tones([392,329.63,261.63,196],.22,.3,.055,'triangle');}
 function setMuted(value:boolean){muted=value;}
 function dispose(){const old=context;context=null;if(old&&old.state!=='closed')void old.close().catch(()=>{});}
 return {unlock,play,playResult,setMuted,dispose};
}

// Observe accepted server states, so polling and restored finished rooms stay quiet.
export function createResultTracker(){
 let previous:{code:string;roundId?:string;status:string}|null=null;
 return (state:{code:string;roundId?:string;status:string})=>{
  const ended=previous?.code===state.code&&previous?.roundId===state.roundId&&previous?.status==='playing'&&(state.status==='won'||state.status==='lost');
  previous={code:state.code,roundId:state.roundId,status:state.status};
  return ended?state.status:null;
 };
}
