export interface UserConversation{
    id: string;
    userId: string;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Message{
    sender: string;
    content: string;
    timestamp: Date;
}