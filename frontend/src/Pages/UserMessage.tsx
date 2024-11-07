import React, { useEffect, useState } from 'react';
import './Styles/Dashboard.css';
import './Styles/UserMessage.css';
import BoardNavbar from '../Components/common/BoardNavbar.tsx';
import Footer from '../Components/common/Footer.tsx';
import { addMessageToConversation, getAllConversations, startConversation } from "../Services/conversationServices.tsx";
import { Message, UserConversation } from "../Types/Conversation.ts";

const UserMessage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);  // Messages for the selected conversation
    const [input, setInput] = useState('');
    const [conversationHistory, setConversationHistory] = useState<UserConversation[]>([]);  // Store each conversation and its messages
    const [selectedConversationIndex, setSelectedConversationIndex] = useState<number | null>(null);

    useEffect(() => {
        const initializeConversation = async () => {
            try {
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
        const conversation = conversationHistory[index];
        if (!conversation) {
            console.error('Selected conversation does not exist');
            return;
        }
        setSelectedConversationIndex(index);
        setMessages(conversation.messages as Message[]);
        console.log('Selected Conversation Messages:', conversationHistory[index].messages);
    };

    // Handle sending a message
    const handleSendMessage = async () => {
        if (input.trim() === '') return;

        let conversationId;
        if (selectedConversationIndex === null) {
            // Start a new conversation if none is selected
            try {
                const newConversation = await startConversation();
                if (!newConversation.id) {
                    console.error('No conversation ID returned from backend');
                    return;
                }
                setConversationHistory([...conversationHistory, newConversation]);
                setSelectedConversationIndex(conversationHistory.length);
                setMessages(newConversation.messages as Message[]);
                conversationId = newConversation.id;
                console.log('new conversation id', newConversation.id)
                console.log('Started a new conversation:', newConversation);
            } catch (error) {
                console.error('Error starting a new conversation:', error);
                return;
            }
        } else {
            // Get the ID of the selected conversation
            conversationId = conversationHistory[selectedConversationIndex]?.id;
            console.log('history conversation',conversationHistory[selectedConversationIndex].id )
            console.log('conversation ID', conversationId)
            if (!conversationId) {
                console.error('Invalid conversation ID');
                return;
            }
        }

        // Create the user message
        const userMessage: Message = { sender: 'user', content: input };
        setMessages([...messages, userMessage]);
        setInput('');

        try {
            const updatedConversation = await addMessageToConversation(conversationId, userMessage);
            const updatedHistory = [...conversationHistory];
            if (selectedConversationIndex !== null) {
                updatedHistory[selectedConversationIndex] = updatedConversation;
            } else {
                updatedHistory.push(updatedConversation);
            }
            setConversationHistory(updatedHistory);
            setMessages(updatedConversation.messages);
        } catch (error) {
            console.log('Error adding message to conversation:', error);
        }
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
                                key={`${index} - ${conversation.id}`}
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
