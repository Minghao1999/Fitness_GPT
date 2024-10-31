import {UserConversation} from "../Types/Conversation.ts";

const API_BASE_URI = 'http://localhost:8080/conversations'

const getAuthToken = () : string | null => {
    return localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : null
}

export const getAllConversations = async (): Promise<UserConversation[]> => {
    const token = getAuthToken()
    if(!token){
        throw new Error('No token found')
    }

    try{
        const response = await fetch(`${API_BASE_URI}/get-message`,{
            method: 'GET',
            headers:{
                'Authorization': token,
            },
            credentials: 'include',
        })
        if (!response.ok){
            throw new Error('Failed to fetch conversations')
        }
        return await response.json()
    }catch (error){
        console.log('Error fetching conversations:', error)
        throw error
    }
}

export {getAllConversations}