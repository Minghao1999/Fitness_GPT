import axios from 'axios';
import { Message, UserConversation } from '../Types/Conversation.ts';

const API_BASE_URI = 'http://localhost:8080/conversations';

const getAuthToken = (): string | null => {
    const token = localStorage.getItem('token');
    return token ? `Bearer ${token}` : null;
};

const api = axios.create({
    baseURL: API_BASE_URI,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = token;
    } else {
        throw new Error('No token found');
    }
    return config;
});

const getAllConversations = async (): Promise<UserConversation[]> => {
    try {
        const response = await api.get<UserConversation[]>('/get-message');
        return response.data;
    } catch (error) {
        console.log('Error fetching conversations:', error);
        throw error;
    }
};

const startConversation = async (): Promise<UserConversation> => {
    try {
        const response = await api.post<UserConversation>('/start');
        return response.data;
    } catch (error) {
        console.log('Error starting conversation:', error);
        throw error;
    }
};

const addMessageToConversation = async (conversationId: string, message: Message): Promise<UserConversation> => {
    try {
        const response = await api.post<UserConversation>(`/add-message/${conversationId}`, message);
        return response.data;
    } catch (error) {
        console.log('Error adding message:', error);
        throw error;
    }
};

export { getAllConversations, startConversation, addMessageToConversation };
