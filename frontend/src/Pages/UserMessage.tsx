import React, { useEffect, useState } from 'react';
import './Styles/Dashboard.css';
import './Styles/UserMessage.css';
import BoardNavbar from '../Components/common/BoardNavbar.tsx';
import Footer from '../Components/common/Footer.tsx';
import { getAllConversations } from "../Services/conversationServices.tsx";
import { UserConversation } from "../Types/Conversation.ts";

interface Message {
    sender: 'user' | 'bot';
    content: string;
    timestamp?: string
}

const UserMessage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);  // Messages for the selected conversation
    const [input, setInput] = useState('');
    const [conversationHistory, setConversationHistory] = useState<UserConversation[]>([]);  // Store each conversation and its messages
    const [selectedConversationIndex, setSelectedConversationIndex] = useState<number | null>(null);

    useEffect(() => {
        const initializeConversation = async () => {
            try {
                // Fetch conversations from backend and set them in state
                const history = await getAllConversations() as UserConversation[];
                setConversationHistory(history);

                console.log('Fetched Conversation History:', history);
            } catch (error) {
                console.error('Error fetching conversation history:', error);
            }
        };
        initializeConversation();
    }, []);

    // Handle selecting a conversation from the sidebar
    const handleSelectConversation = (index: number) => {
        setSelectedConversationIndex(index);

        // Update messages with the messages from the selected conversation
        setMessages(conversationHistory[index].messages as Message[]);

        console.log('Selected Conversation Messages:', conversationHistory[index].messages); // Debugging
    };

    // Handle sending a message
    const handleSendMessage = () => {
        if (input.trim() === '' || selectedConversationIndex === null) return;

        const userMessage: Message = { sender: 'user', content: input };
        setMessages([...messages, userMessage]);
        setInput('');

        // Simulate a bot response after a short delay
        setTimeout(() => {
            const botMessage: Message = { sender: 'bot', content: 'This is a response from Fitness GPT.' };
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
                {/* Left Sidebar */}
                <div className="sidebar">
                    <h3>History</h3>
                    <ul className="chat-history">
                        {conversationHistory.map((conversation, index) => (
                            <li
                                key={conversation.id}
                                className={`conversation-item ${selectedConversationIndex === index ? 'selected' : ''}`}
                                onClick={() => handleSelectConversation(index)}
                            >
                                <h4>Conversation {index + 1}</h4>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Chat Container */}
                <div className="chat-container">
                    <h2>Chat with Fitness GPT</h2>
                    <div className="chat-window">
                        <div className="chat-messages">
                            {messages.map((message, index) => (
                                <div key={index} className={`chat-message ${message.sender}`}>
                                    <span className="message-text">{message.content}</span>
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
