import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(''); // Track selected question
  const [isBotTyping, setIsBotTyping] = useState(false); // Track loading state
  const chatResultsRef = useRef(null);
  const chatArray = [
    ["Hello!", "Hi there! How can I assist you today?"],
    ["What is the capital of France?", "The capital of France is Paris."],
    ["Tell me a joke.", "Why don't scientists trust atoms? Because they make up everything!"],
    ["What is the weather like today?", "I'm not sure, but you can check a weather app for the latest updates."],
    ["Can you help me with my homework?", "Sure! What subject do you need help with?"],
    ["What is your name?", "I am an AI assistant created to help you."],
    ["How do I reset my password?", "You can reset your password by going to the settings page and clicking on 'Reset Password'."],
    ["What is the meaning of life?", "The meaning of life is subjective and varies from person to person."],
    ["Can you recommend a good book?", "Sure! 'To Kill a Mockingbird' by Harper Lee is a classic."],
    ["How do I contact support?", "You can contact support via email or through the support page on our website."],
    ["Can you tell me a fun fact?", "Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still perfectly edible."],
    ["What is the largest planet in our solar system?", "Jupiter is the largest planet in our solar system."],
    ["How do I make a cup of coffee?", "Boil water, add ground coffee to a filter, pour hot water over it, and let it drip into a cup."],
    ["What is the tallest mountain in the world?", "Mount Everest is the tallest mountain, standing at 8,848 meters."],
    ["Can you suggest a movie to watch?", "I recommend 'The Shawshank Redemption' for a gripping story."],
    ["What time is it in New York right now?", "I don't have real-time data, but New York is in the Eastern Time Zone (ET). You can check a world clock app for the exact time."],
    ["How do I tie a tie?", "Try the Windsor knot: Drape the tie around your neck, cross the wide end over the narrow end, loop it through, and follow a step-by-step guide for the rest."],
    ["What is the capital of Japan?", "The capital of Japan is Tokyo."],
    ["Can you tell me about dinosaurs?", "Dinosaurs were a diverse group of reptiles that lived millions of years ago, with species like T-Rex and Velociraptor."],
    ["How do I bake a cake?", "Mix flour, sugar, eggs, butter, and baking powder, pour into a pan, and bake at 350°F for about 30 minutes."],
    ["What is the smallest country in the world?", "Vatican City is the smallest country, with an area of about 44 hectares."],
    ["Can you suggest a hobby?", "Try painting! It’s creative and relaxing, and you can start with simple watercolors."],
    ["What is the boiling point of water?", "The boiling point of water is 100°C (212°F) at standard atmospheric pressure."],
    ["How do I learn a new language?", "Start with apps like Duolingo, practice daily, and immerse yourself by watching shows or talking with native speakers."],
    ["What is the longest river in the world?", "The Nile River is considered the longest, stretching about 6,650 kilometers."],
    ["Can you recommend a healthy snack?", "Try apple slices with peanut butter—it's nutritious and delicious!"],
    ["What is the speed of light?", "The speed of light is approximately 299,792 kilometers per second in a vacuum."],
    ["How do I change a tire?", "Loosen lug nuts, jack up the car, remove the tire, mount the spare, tighten nuts, and lower the car."],
    ["What is the largest ocean?", "The Pacific Ocean is the largest, covering about 155 million square kilometers."],
    ["Can you tell me a riddle?", "What has keys but can't open locks? A piano!"],
    ["How do I start a garden?", "Choose a sunny spot, prepare the soil, pick easy plants like tomatoes, and water regularly."],
    ["What is the capital of Brazil?", "The capital of Brazil is Brasília."],
    ["Can you suggest a workout routine?", "Try 30 minutes of cardio, like jogging, followed by bodyweight exercises like push-ups and squats."],
    ["What is the main ingredient in guacamole?", "The main ingredient in guacamole is avocado."],
    ["How do I clean a laptop screen?", "Use a microfiber cloth slightly dampened with water or a screen-cleaning solution, and wipe gently."],
    ["What is the largest animal ever?", "The blue whale is the largest animal, growing up to 100 meters long."]
];

  useEffect(() => {
    if (chatResultsRef.current) {
      chatResultsRef.current.scrollTop = chatResultsRef.current.scrollHeight;
    }
  }, [messages, isBotTyping]);

  // Function to handle sending messages
  const handleSend = () => {
    if (!selectedQuestion.trim()) return; // Ignore empty selection

    // Add user message to messages state
    const userMessage = {
      id: Date.now(), // Unique ID based on timestamp
      sender: 'user',
      text: selectedQuestion,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsBotTyping(true); // Show typing indicator

    // Find matching response in chatArray (case-insensitive)
    const matchedResponse = chatArray.find(
      ([question]) => question.toLowerCase() === selectedQuestion.trim().toLowerCase()
    );

    // Prepare bot response
    const botMessage = {
      id: Date.now() + 1, // Unique ID for bot message
      sender: 'bot',
      content: matchedResponse
        ? matchedResponse[1] // Use the second element (index 1) of the matched pair
        : "Sorry, I don't have an answer for that. Try selecting another question!",
    };

    // Simulate bot typing delay
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsBotTyping(false); // Hide typing indicator
    }, 2000); // 1-second delay for realism

    setSelectedQuestion(''); // Reset dropdown
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <div className="d-flex flex-column vh-100 bg-light">
        <div className="flex-grow-1 overflow-auto p-3 chatResults" ref={chatResultsRef}>
          {messages.map((message) => (
            <div
              key={message.id} // Unique ID for each message
              className={`d-flex mb-3 ${
                message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'
              }`}
            >
              <div
                className={`p-2 rounded shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-white text-dark border'
                }`}
                style={{ maxWidth: '75%' }}
              >
                {message.sender === 'user' ? message.text : message.content}
              </div>
            </div>
          ))}
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
        <div className="typingBarSettings bg-white border-top">
          <div className="container py-2"> {/* Reduced padding to minimize height */}
            <div className="d-flex align-items-center">
              <select
                className="form-select me-2"
                id="questionSelect"
                value={selectedQuestion}
                onChange={(e) => setSelectedQuestion(e.target.value)}
                onKeyDown={handleKeyPress}
                style={{ maxHeight: '38px' }} // Minimize height
              >
                <option value="">
                  Select a question...
                </option>
                {chatArray.map(([question], index) => (
                  <option key={index} value={question}>
                    {question}
                  </option>
                ))}
              </select>
              <button
                id="sendButton"
                className="sendButton btn btn-primary"
                onClick={handleSend}
                style={{ maxHeight: '38px' }} // Match dropdown height
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