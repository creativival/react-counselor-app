import axios from 'axios';

const speakWithOpenAI = async (text) => {
  try {
    console.log('Request:', text)
    // OpenAI APIを使用してテキストから音声を生成
    const response = await axios.post( // （1）
      'https://kuc2kh1hhg.execute-api.ap-northeast-1.amazonaws.com/default/lambdaOpenAITTS',
      {text},
      {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer' // （2）
      },
    );
    console.log('Response:', response);

    const audioData = response.data; // （3）
    console.log('Audio data:', audioData)

    // オーディオデータをBlobに変換してソースに設定
    const audioBlob = new Blob([audioData], {type: 'audio/mpeg'}); // （4）
    console.log('Audio blob:', audioBlob);
    const audioUrl = URL.createObjectURL(audioBlob); // （5）
    console.log('Audio URL:', audioUrl);

    // Audioオブジェクトを作成
    const audio = new Audio(); // ここから（6）
    audio.src = audioUrl; // ここまで（6）

    // 音声再生
    await audio.play(); // （7）

    // 再生が終わるまで待機
    await new Promise((resolve) => { // （8）
      audio.onended = resolve;
    });

    console.log('TTS playback completed.');
  } catch (error) {
    console.error('Error:', error);
    console.error("Sorry, I couldn't generate the TTS output.");
  }
};

export default speakWithOpenAI;