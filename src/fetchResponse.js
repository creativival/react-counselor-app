import axios from 'axios';

const fetchResponse = async (messages, text) => { // （1）
  try {
    // OpenAI APIを使用してテキストから音声を生成
    const updatedMessages = [...messages, {role: 'user', content: text}]; // （2）
    const response = await axios.post( // （3）
      'https://53wqn0vqg5.execute-api.ap-northeast-1.amazonaws.com/default/lambdaCounselor',
      {
        messages: updatedMessages,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );
    console.log('Response:', response);

    // 返答を取得
    let assistantMessage = ''; // ここから（3）

    if (response.status === 200) {
      assistantMessage = response.data.message;
    } else {
      assistantMessage = "エラーが発生しました";
    } // ここまで（3）

    // 返答を返却する
    return assistantMessage; // （4）
  } catch (error) {
    console.error('Error:', error);
    // エラーメッセージを返却する
    return "エラーが発生しました" // （5）
  }
};

export default fetchResponse;