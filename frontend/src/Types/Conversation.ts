export interface UserConversation{
    id: string;
    userId: string;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Message {
    sender: 'user' | 'bot';
    content: string;
    timestamp?: Date;
}