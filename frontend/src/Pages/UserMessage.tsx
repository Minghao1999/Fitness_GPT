import React, { useEffect, useState } from 'react';
import './Styles/Dashboard.css';
import './Styles/UserMessage.css';
import BoardNavbar from '../Components/common/BoardNavbar.tsx';
import Footer from '../Components/common/Footer.tsx';
import { addMessageToConversation, getAllConversations, startConversation } from "../Services/conversationServices.tsx";
import { Message, UserConversation } from "../Types/Conversation.ts";

const UserMessage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [conversationHistory, setConversationHistory] = useState<UserConversation[]>([]);
    const [selectedConversationIndex, setSelectedConversationIndex] = useState<number | null>(null);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    useEffect(() => {
        const initializeConversation = async () => {
            try {
                const history = await getAllConversations() as UserConversation[];
                setConversationHistory(history);
                console.log('Fetched conversation history:', history);
            } catch (error) {
                console.error('Error fetching conversation history:', error);
            }
        };
        initializeConversation();
    }, []);

    const handleSelectConversation = (index: number) => {
        const conversation = conversationHistory[index];
        if (!conversation) {
            console.error('Selected conversation does not exist');
            return;
        }
        setSelectedConversationIndex(index);
        setMessages(conversation.messages as Message[]);
        console.log('Selected conversation messages:', conversationHistory[index].messages);
    };

    const handleSendMessage = async () => {
        if (input.trim() === '') return;

        let conversationId;
        if (selectedConversationIndex === null) {
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
                console.log('New conversation ID:', newConversation.id);
                console.log('Started new conversation:', newConversation);
            } catch (error) {
                console.error('Error starting new conversation:', error);
                return;
            }
        } else {
            conversationId = conversationHistory[selectedConversationIndex]?.id;
            console.log('History conversation ID:', conversationHistory[selectedConversationIndex].id);
            console.log('Conversation ID:', conversationId);
            if (!conversationId) {
                console.error('Invalid conversation ID');
                return;
            }
        }

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

    // Toggle the collapse state of the sidebar
    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    return (
        <div className="dashboard-container">
            <BoardNavbar />
            <div className="main-content">
                {/* Expand Button for Collapsed Sidebar */}
                {sidebarCollapsed && (
                    <button className="expand-button" onClick={toggleSidebar}>
                        ➕
                    </button>
                )}
                {/* Left Sidebar */}
                <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
                    <div className="sidebar-header">
                        <button className="toggle-button" onClick={toggleSidebar}>
                            {sidebarCollapsed ? '➕' : '➖'}
                        </button>
                        <h3>History</h3>
                    </div>
                    {!sidebarCollapsed && (
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
                    )}
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
