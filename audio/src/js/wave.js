import Audio from '../images/audio.mp3';

// audio 操作
function buildAudioWave() {
  const audio = document.querySelector('audio');
  
  audio.src = Audio;
  audio.load();
  
  audio.addEventListener('loadedmetadata', () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    const source = audioCtx.createMediaElementSource(audio);
    const analyser = audioCtx.createAnalyser();
    const bufferLength = 512;
    const dataArray = new Uint8Array(bufferLength);
    source.connect(analyser);
    source.connect(audioCtx.destination);
    
    // canvas
    const waveCanvas = document.getElementById('wave-surver');
    const canvasWidth = waveCanvas.offsetWidth;
    const canvasHeight = waveCanvas.offsetHeight;
  
    const waveCanvasCtx = waveCanvas.getContext('2d');
    const rectWidth = Math.ceil(canvasWidth/bufferLength*100)/100;
    const radgrad4 = waveCanvasCtx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    
    radgrad4.addColorStop(0, '#f3cd13');
    radgrad4.addColorStop(0.8, '#20ddf1');
    radgrad4.addColorStop(1, '#f16d20');
    
    // audio.addEventListener('timeupdate', () => {
    //   analyser.getByteFrequencyData(dataArray);
    // });
  
    let isPlaying = false;
    const doAnimate = () => {
      if (isPlaying) {
        requestAnimationFrame(doAnimate);
      }
      
      analyser.getByteFrequencyData(dataArray);
      waveCanvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      waveCanvasCtx.lineWidth = rectWidth;
      waveCanvasCtx.strokeStyle = radgrad4;
      
      dataArray.forEach((item, index) => {
        waveCanvasCtx.beginPath();
        waveCanvasCtx.moveTo(rectWidth * index, canvasHeight/2);
        waveCanvasCtx.lineTo(rectWidth * index, (canvasHeight - item)/2);
        waveCanvasCtx.lineTo(rectWidth * index, (canvasHeight + item)/2);
        waveCanvasCtx.stroke();
        waveCanvasCtx.closePath();
      });
    }
  
    audio.addEventListener('play', () => {
      isPlaying = true;
      doAnimate();
    });
  
    audio.addEventListener('pause', () => {
      isPlaying = false;
    });
  
    // audioCtx.resume().then(() => {
    //   audio.play();
    // });
  });
};
buildAudioWave();