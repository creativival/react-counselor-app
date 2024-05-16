import React, { useState } from 'react';
import { Box } from '@mui/material';
import './App.css';
import MessageList from './MessageList';
import InputField from './InputField';
import fetchResponse from './fetchResponse';
import speakWithOpenAI from './speakWithOpenAI';

function App() {
  const [messages, setMessages] = useState([]); // （1）

  const handleSend = async (text) => { // （2）
    // メッセージを追加する
    setMessages((prevMessages) => [ // （3）
      ...prevMessages,
      { content: text, role: 'user' },
    ]);

    // // そのまま返す
    // const response = text // （4）

    // ChatGPTを使って返す
    const response = await fetchResponse(messages, text);

    // メッセージを追加する
    setMessages((prevMessages) => [ // （5）
      ...prevMessages,
      { content: response, role: 'assistant' },
    ]);

    // TTSで音声出力する
    await speakWithOpenAI(response);
  };

  return ( // （6）
    <Box className="App">
      <MessageList messages={messages} />
      <InputField onSend={handleSend} />
    </Box>
  );
}

export default App;