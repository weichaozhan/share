import { ARRFREQUENCY, TIGERS, } from './constant'

// 产生声音
function productSound() {
  // 音阶频率
  const arrFrequency = ARRFREQUENCY;
  
  const tigers = TIGERS;
  
  const audioContext= new AudioContext(); // 音频上下文
  
  // 音乐
  let index = 0;
  let timeout = null;
  let playSound = () => {
    const frequency = arrFrequency[tigers[index]];
    const oscillator = audioContext.createOscillator(); // 创建 OscillatorNode 表示一个周期性波形，音调
    const gainNode = audioContext.createGain(); // 创建一个GainNode，它可以控制音频的总音量
    
    oscillator.connect(gainNode); // 音频音量关联
    gainNode.connect(audioContext.destination); // 关联音频设备
    
    oscillator.type = 'sine'; // 设置波形
    oscillator.frequency.value = 196; // 设置频率

    if (frequency === undefined) {
      index = 0;
      document.querySelector('#sound-created').innerHTML = '播放';
      isPlaying = false;
      return;
    }

    const timer = frequency === 0 ? 50 : 800;
    
    // oscillator.frequency.value = 500 + ((Math.random() * 100).toFixed(0) * 1);
    oscillator.frequency.value = frequency;
    
    
    if (frequency) {
      oscillator.start(audioContext.currentTime); // 开始播放声音
      gainNode.gain.setValueAtTime(0, audioContext.currentTime); // 设置当前时间音量为 0， 0 - 1
      gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + timer/100000); // audioContext.currentTime + 0.01 时音量线性变化到 1 
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + timer/1000); // audioContext.currentTime + 1 时音量指数变化到 0.001
      oscillator.stop(audioContext.currentTime + timer/1000 + 0.01); // 开始播放声音
    }
    
    index ++;
    timeout = setTimeout(playSound, timer/2);
  }

  // 播放控制
  let isPlaying = false;
  let audioStart = false;
  document.querySelector('#sound-created').addEventListener('click', (e) => {
    if (!audioStart) {
      audioStart = true;
    }

    if (!isPlaying) {
      e.target.innerHTML = '暂停';
      isPlaying = true;
      playSound();
    } else {
      e.target.innerHTML = '播放';
      isPlaying = false;
      clearTimeout(timeout);
    }
  })
}
productSound();