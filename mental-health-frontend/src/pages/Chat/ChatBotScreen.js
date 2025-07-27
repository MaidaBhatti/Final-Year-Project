import React, { useState } from 'react';
import axios from 'axios';

const ChatBotScreen = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm your mental health assistant! How can I help you today?",
      sentTime: 'just now',
      sender: 'ChatBot',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: 'user',
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setIsTyping(true);
    await sendMessageToChatBot(message);
  };

  const sendMessageToChatBot = async (message) => {
    try {
      const response = await axios.post('http://localhost:5000/api/chatbot', { message });
      if (response.data && response.data.answer) {
        const apiResponseMessage = {
          message: response.data.answer,
          sender: 'ChatBot',
        };

        setMessages((prevMessages) => [...prevMessages, apiResponseMessage]);
      } else {
        console.error('No response from chatbot API');
      }
    } catch (error) {
      console.error('Error sending message to ChatBot API:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={msg.sender === 'ChatBot' ? styles.chatBotMessage : styles.userMessage}
          >
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      {isTyping && <p>ChatBot is typing...</p>}
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button
          style={styles.sendButton}
          onClick={() => {
            handleSend(input);
            setInput('');
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '10px',
    backgroundColor: '#FFE5E5',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  messagesContainer: {
    flex: 1,
    marginBottom: '10px',
    overflowY: 'scroll',
  },
  chatBotMessage: {
    backgroundColor: '#d3d3d3',
    padding: '10px',
    borderRadius: '10px',
    marginBottom: '5px',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#add8e6',
    padding: '10px',
    borderRadius: '10px',
    marginBottom: '5px',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: '1px',
    borderRadius: '10px',
    padding: '10px',
    marginRight: '10px',
  },
  sendButton: {
    backgroundColor: '#add8e6',
    padding: '10px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default ChatBotScreen;
