import React, { useState, useContext, useEffect } from 'react';
import './CRChatbot.css';
import img from './compliance.png'
import person from './person.png'
import { CRContext } from '../CRContext';

const CRChatbot = () => {

  const { pdfURL, title } = useContext(CRContext);
  console.log(pdfURL, title)

  const [inputText, setInputText] = useState('');
  const formatDate = (date) => {
    const h = `0${date.getHours()}`;
    const m = `0${date.getMinutes()}`;
    return `${h.slice(-2)}:${m.slice(-2)}`;
  };

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (pdfURL) {
      startConversation();
    }
  }, [pdfURL]);

  const startConversation = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/upload_pdf_url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pdf_url: pdfURL }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error starting conversation:', error);
    }
  };

  const botResponse = async (rawText) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: rawText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const msgText = data.response;
      appendMessage('Chat Bot', img, 'left', msgText);
    } catch (error) {
      console.error('Error fetching bot response:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputText) return;

    appendMessage('You', person, 'right', inputText);
    setInputText('');
    await botResponse(inputText);
  };

  const appendMessage = (name, img, side, text) => {
    const updatedMessages = [...messages, {
      name,
      img,
      side,
      text,
      time: formatDate(new Date()),
    }];
    setMessages(updatedMessages);
  };

  return (
    <div>
        <h1 className='text-3xl py-3 px-2'>Learn More About - {title}</h1>
        <div className="msger">
            <main className="msger-chat">
                {messages.map((msg, index) => (
                <div key={index} className={`msg ${msg.side}-msg`}>
                    <div className="msg-img" style={{ backgroundImage: `url(${msg.img})`}}>
                    </div>
                    <div className="msg-bubble">
                    <div className="msg-info">
                        <div className="msg-info-name">{msg.name}</div>
                        <div className="msg-info-time">{msg.time}</div>
                    </div>
                    <div className="msg-text">{msg.text}</div>
                    </div>
                </div>
                ))}
            </main>
            <form className="msger-inputarea" onSubmit={handleSubmit}>
                <input
                type="text"
                className="msger-input"
                id="textInput"
                placeholder="Enter your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                />
                
                <button type="submit" className="msger-send-btn">
                Send
                </button>
            </form>
        </div>
    </div>
  );
};

export default CRChatbot;
