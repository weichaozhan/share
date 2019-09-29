import { ARRFREQUENCY, TIGERSCLICK, } from './constant';

const btn = document.getElementById('sound-click');
let index = 0;

var audioCtx = new AudioContext();

btn.addEventListener('click', () => {   
  var oscillator = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.type = 'sine'; // 'sine', 'square', 'triangle', 'sawtooth'，自定义setPeriodicWave
  oscillator.frequency.value = ARRFREQUENCY[TIGERSCLICK[index]];
  // oscillator.frequency.value = 500; // 440
  
  gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
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

// audioCtx.close(); // 关闭一个音频环境, 释放任何正在使用系统资源的音频.
