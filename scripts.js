document.getElementById('audioFile').addEventListener('change', function(e) {
  const file = e.target.files[0];
  const audioElement = document.getElementById('originalAudio');

  audioElement.src = URL.createObjectURL(file);
});

function applyEcho() {
  const audioElement = document.getElementById('originalAudio');
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioContext.createMediaElementSource(audioElement);
  const destination = audioContext.destination;

  const delayNode = audioContext.createDelay();
  delayNode.delayTime.value = 0.5; // Adjust the delay time as needed

  const feedbackNode = audioContext.createGain();
  feedbackNode.gain.value = 0.5; // Adjust the feedback value as needed

  source.connect(delayNode);
  delayNode.connect(feedbackNode);
  feedbackNode.connect(delayNode);
  delayNode.connect(destination);

  audioElement.play();
}

function applyReverb() {
  const audioElement = document.getElementById('originalAudio');
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioContext.createMediaElementSource(audioElement);
  const destination = audioContext.destination;

  const convolverNode = audioContext.createConvolver();

  // Configurar o buffer de impulso para simular o efeito de reverb
  const reverbBuffer = createReverbBuffer(audioContext);
  convolverNode.buffer = reverbBuffer;

  source.connect(convolverNode);
  convolverNode.connect(destination);

  audioElement.play();
}

function createReverbBuffer(audioContext) {
  // Crie um buffer de impulso para simular o efeito de reverb
  const bufferSize = 2 * audioContext.sampleRate;
  const buffer = audioContext.createBuffer(2, bufferSize, audioContext.sampleRate);
  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
      const dataArray = buffer.getChannelData(channel);
      for (let i = 0; i < bufferSize; i++) {
          // Adicione valores ao buffer para criar o efeito desejado de reverb
          // Exemplo: Simplesmente deixando os primeiros e últimos 10% do buffer como 0
          if (i < bufferSize * 0.1 || i > bufferSize * 0.9) {
              dataArray[i] = 0;
          } else {
              // Adicione outros valores conforme necessário para o efeito desejado
              dataArray[i] = Math.random() * 2 - 1;
          }
      }
  }
  return buffer;
}

function applyCompressor() {
  const audioElement = document.getElementById('originalAudio');
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioContext.createMediaElementSource(audioElement);
  const destination = audioContext.destination;

  const compressorNode = audioContext.createDynamicsCompressor();

  // Configurar os parâmetros do compressor conforme necessário
  compressorNode.threshold.value = -30;
  compressorNode.knee.value = 10;
  compressorNode.ratio.value = 4;
  compressorNode.attack.value = 0.003;
  compressorNode.release.value = 0.25;

  source.connect(compressorNode);
  compressorNode.connect(destination);

  audioElement.play();
}

