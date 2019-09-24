import Audio from '../images/audio.mp3';

// 完整曲目波形
function buildWholeWave() {
  fetch(Audio)
    .then(res => {
      return res.arrayBuffer();
    })
    .then(buffer => {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioCtx.createBufferSource();
  
      audioCtx.decodeAudioData(buffer)
        .then(decodedData => {
          // 交叉合并左右声道的数据
          function interleaveLeftAndRight (left, right) {
            let totalLength = left.length + right.length;
            let data = new Float32Array(totalLength);
            for (let i = 0; i < left.length; i++) {
                let k = i * 2;
                data[k] = left[i];
                data[k + 1] = right[i];
            }
            return data;
          }
          const leftChannel = decodedData.getChannelData(0);
          const rightChannel = decodedData.getChannelData(1);
          
          let dataArray = interleaveLeftAndRight(leftChannel, rightChannel).map(item => item * 32768/128/255).map(item => item * 255/2).filter((item, index) => !(index%2048));
          
          // // canvas
          const waveCanvas = document.getElementById('wave-surver2');
          const canvasWidth = waveCanvas.offsetWidth;
          const canvasHeight = waveCanvas.offsetHeight;
        
          const waveCanvasCtx = waveCanvas.getContext('2d');
          const rectWidth = Math.floor(canvasWidth/dataArray.length*100)/100;
          const radgrad4 = waveCanvasCtx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
          
          radgrad4.addColorStop(0, '#1890ff');
          radgrad4.addColorStop(0.8, '#1890ff');
          radgrad4.addColorStop(1, '#1890ff');
          
          waveCanvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
          waveCanvasCtx.lineWidth = rectWidth;
          waveCanvasCtx.strokeStyle = '#1890ff';
  
          const middle = canvasHeight/2;
  
          const draw = (item, index) => {
            const width = rectWidth * index;
  
            waveCanvasCtx.beginPath();
            waveCanvasCtx.moveTo(width, middle);
            waveCanvasCtx.lineTo(width, middle - item);
            waveCanvasCtx.moveTo(width, middle);
            waveCanvasCtx.lineTo(width, middle + item);
            waveCanvasCtx.stroke();
            waveCanvasCtx.closePath();
          }
          dataArray.forEach(draw);
        });
    });
}
buildWholeWave();