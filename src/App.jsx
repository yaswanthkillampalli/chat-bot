import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { getGeminiResponse } from './Gemini';
import { formatGeminiResponse } from './MessageFixerBot';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false); // Track loading state
  const chatResultsRef = useRef(null);

  // Scroll to the bottom when messages or loading state change
  useEffect(() => {
    if (chatResultsRef.current) {
      chatResultsRef.current.scrollTop = chatResultsRef.current.scrollHeight;
    }
  }, [messages, isBotTyping]);

  const handleSend = async () => {
    if (input.trim()) {
      // Add user message
      const newMessage = {
        id: messages.length + 1, // Simple ID generation (use uuid for production)
        sender: 'user',
        text: input,
      };
      setMessages([...messages, newMessage]);
      setInput('');
      setIsBotTyping(true); // Show loading indicator

      try {
        const geminiResponse = await getGeminiResponse(input);
        const formattedResponse = formatGeminiResponse(geminiResponse);
        const botMessage = {
          id: messages.length + 2,
          sender: 'bot',
          content: formattedResponse,
        };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error('Error fetching Gemini response:', error);
        const errorMessage = {
          id: messages.length + 2,
          sender: 'bot',
          content: <p className="mb-0">Sorry, I encountered an error. Please try again.</p>,
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsBotTyping(false); // Hide loading indicator
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <div className="d-flex flex-column vh-100 bg-light">
        {/* Chat Results Area */}
        {/* 
          Classes used:
          - flex-grow-1: Makes the div take up remaining vertical space
          - overflow-auto: Enables vertical scrolling for overflowing messages
          - p-3: Adds padding for spacing
          - chatResults: Custom class for smooth scrolling (defined in App.css)
        */}
        <div className="flex-grow-1 overflow-auto p-3 chatResults" ref={chatResultsRef}>
          {messages.map((message) => (
            <div
              key={message.id} // Unique ID for each message
              className={`d-flex mb-3 ${
                message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'
              }`}
              /* 
                Classes for message alignment:
                - d-flex: Enables flexbox for message positioning
                - mb-3: Adds bottom margin for spacing between messages
                - justify-content-end: Aligns user messages to the right
                - justify-content-start: Aligns bot messages to the left
              */
            >
              <div
                className={`p-2 rounded shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-white text-dark border'
                }`}
                style={{ maxWidth: '75%' }}
                /* 
                  Classes for message styling:
                  - p-2: Adds padding inside the message bubble
                  - rounded: Rounds corners for a modern look
                  - shadow-sm: Adds a subtle shadow for depth
                  - For user messages:
                    - bg-primary: Blue background (Bootstrap primary color)
                    - text-white: White text for contrast
                  - For bot messages:
                    - bg-white: White background
                    - text-dark: Dark text for readability
                    - border: Adds a light border for definition
                  - maxWidth: 75% ensures messages don't span the full width
                */
              >
                {message.sender === 'user' ? message.text : message.content}
              </div>
            </div>
          ))}
          {/* Loading Indicator */}
          {isBotTyping && (
            <div className="d-flex mb-3 justify-content-start">
              <div
                className="p-2 rounded shadow-sm bg-white text-dark border"
                style={{ maxWidth: '75%' }}
              >
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Typing Bar */}
        <div className="typingBarSettings bg-white border-top">
          <div className="container py-3">
            <div className="d-flex align-items-center">
              <input
                className="inputSettings form-control me-2"
                id="inputBar"
                placeholder="Question Anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress} // Fixed from onClick
              />
              <button
                id="sendButton"
                className="sendButton btn btn-primary"
                onClick={handleSend}
              >
                <i className="fa-solid fa-paper-plane sendFont"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;