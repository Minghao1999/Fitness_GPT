import React, { useState } from 'react';
import './Styles/Dashboard.css';
import './Styles/ChatWindow.css';
import BoardNavbar from '../Components/common/BoardNavbar.tsx';
import Footer from '../Components/common/Footer.tsx';

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

const UserMessage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    const handleSendMessage = () => {
        if (input.trim() === '') return;

        // Add user message to the chat
        const userMessage: Message = { sender: 'user', text: input };
        setMessages([...messages, userMessage]);
        setInput('');

        // Simulate bot response
        setTimeout(() => {
            const botMessage: Message = { sender: 'bot', text: 'This is a response from Fitness GPT.' };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        }, 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="dashboard-container">
            <BoardNavbar />
            <div className="main-content">
                <div className="sidebar">
                    <h3>History</h3>
                    <ul className="chat-history"></ul>
                </div>
                <div className="chat-container">
                    <h2>Chat with Fitness GPT</h2>
                    <div className="chat-window">
                        <div className="chat-messages">
                            {messages.map((message, index) => (
                                <div key={index} className={`chat-message ${message.sender}`}>
                                    <span className="message-text">{message.text}</span>
                                </div>
                            ))}
                        </div>
                        <div className="chat-input">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type your message..."
                            />
                            <button onClick={handleSendMessage}>Send</button>
                        </div>
                    </div>
                    <div className="chat-options">
                        <button className="chat-option-button"><span className="icon">🌄</span> Create Image</button>
                        <button className="chat-option-button"><span className="icon">🎁</span> Surprise Me</button>
                        <button className="chat-option-button"><span className="icon">📝</span> Summarize Text</button>
                        <button className="chat-option-button"><span className="icon">📊</span> Analyze Image</button>
                        <button className="chat-option-button"><span className="icon">✍️</span> Help Me Write</button>
                        <button className="chat-option-button"><span className="icon">➕</span> More</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserMessage;
