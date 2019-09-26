import { ARRFREQUENCY, TIGERSCLICK, } from './constant';

const btn = document.getElementById('sound-click');
let index = 0;

var audioCtx = new AudioContext();

btn.addEventListener('click', () => {
  console.log(index, ARRFREQUENCY[TIGERSCLICK[index]]);
  
  var oscillator = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.type = 'sine'; // 'sine', 'square', 'triangle', 'sawtooth'，自定义setPeriodicWave
  oscillator.frequency.value = ARRFREQUENCY[TIGERSCLICK[index]];
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
  oscillator.start(audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
  oscillator.stop(audioCtx.currentTime + 1);
  
  if (index < TIGERSCLICK.length - 1) {
    index++;
  } else {
    index = 0;
  }
});
