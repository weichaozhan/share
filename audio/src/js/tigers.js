// 产生声音
function productSound() {
  // 音阶频率
  // const arrFrequency = {
  //   0: 0, '·1': 262, '·2': 294, '·3': 330, '·4': 349, '·5': 392, '·6': 440, '·7': 494, '1': 523, '2': 587, '3': 659, '4': 698, '5': 784, '6': 880, '7': 988, '1·': 1047, '2·': 1175, '3·': 1319, '4·': 1397, '5·': 1568, '6·': 1760, '7·': 1967,
  // };
  const arrFrequency = {
    0: 0, '·1': 162, '·2': 194, '·3': 230, '·4': 249, '·5': 292, '·6': 340, '·7': 394, '1': 423, '2': 487, '3': 559, '4': 598, '5': 684, '6': 780, '7': 888, '1·': 947, '2·': 1075, '3·': 1219, '4·': 1297, '5·': 1468, '6·': 1660, '7·': 1867,
  };
  // const arrFrequency = {
  //   0: 0, '·1': 62, '·2': 94, '·3': 130, '·4': 149, '·5': 192, '·6': 240, '·7': 294, '1': 323, '2': 387, '3': 459, '4': 498, '5': 584, '6': 680, '7': 788, '1·': 847, '2·': 975, '3·': 1119, '4·': 1197, '5·': 1368, '6·': 1560, '7·': 1767,
  // };
  
  const tigers = [1,2,3,1, 1,2,3,1, 3,4,5, 3,4,5, 5,6,5,4, 3,1, 5,6,5,4, 3,1, 2,'·5', 1, 2,'·5', 1,0];
  
  const audioContext= new AudioContext(); // 音频上下文
  const oscillator = audioContext.createOscillator(); // 创建 OscillatorNode 表示一个周期性波形，音调
  const gainNode = audioContext.createGain(); // 创建一个GainNode，它可以控制音频的总音量
  
  oscillator.connect(gainNode); // 音频音量关联
  gainNode.connect(audioContext.destination); // 关联音频设备
  
  oscillator.type = 'sine'; // 设置波形
  oscillator.frequency.value = 196; // 设置频率
  
  // 音乐
  let index = 0;
  let timeout = null;
  let playSound = () => {
    const frequency = arrFrequency[tigers[index]];

    if (frequency === undefined) {
      index = 0;
      document.querySelector('#sound-created').innerHTML = '播放';
      isPlaying = false;
      return;
    }

    const timer = frequency === 0 ? 50 :  300;
    
    // oscillator.frequency.value = 500 + ((Math.random() * 100).toFixed(0) * 1);
    oscillator.frequency.value = frequency;
    
    
    if (frequency) {
      gainNode.gain.setValueAtTime(0, audioContext.currentTime); // 设置当前时间音量为 0， 0 - 1
      gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01); // audioContext.currentTime + 0.01 时音量线性变化到 1 
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + timer/1000); // audioContext.currentTime + 1 时音量指数变化到 0.001  
    }
    
    index ++;
    timeout = setTimeout(playSound, timer);
  }

  // 播放控制
  let isPlaying = false;
  let audioStart = false;
  document.querySelector('#sound-created').addEventListener('click', (e) => {
    if (!audioStart) {
      audioStart = true;
      oscillator.start(audioContext.currentTime); // 开始播放声音
    }

    if (!isPlaying) {
      e.target.innerHTML = '暂停';
      isPlaying = true;
      oscillator.connect(audioContext.destination); // 播放
      playSound();
    } else {
      e.target.innerHTML = '播放';
      isPlaying = false;
      oscillator.disconnect(audioContext.destination); //暂停
      clearTimeout(timeout);
    }
  })
}
productSound();