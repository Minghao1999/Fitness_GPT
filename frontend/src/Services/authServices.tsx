import axios from 'axios';
import { User } from '../Types/User.ts';

const API_BASE_URL = 'http://localhost:8080/auth';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,// Ensures credentials (such as cookies) are sent with requests.
  headers: {
    'Content-Type': 'application/json',// Indicating the server expects JSON-formatted data.
  },
});

const registerUser = async (user: { username: string; password: string; email: string; phone: string; }): Promise<unknown> => {
  try {
    const response = await api.post('/register', user);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

const loginUser = async (email: string, password: string): Promise<string> => {
  try {
    const response = await api.post('/login', { email, password });
    const token = response.data;
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};
const getUserInfo = async (): Promise<User> => {
  const token = localStorage.getItem('token');
  console.log('Token being sent:', token);
  if (!token) {
    throw new Error('No token found');
  }
  try {
    const response = await api.get('/user-info', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

const updateUserInfo = async (updates: Partial<User>): Promise<User> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  try {
    const response = await api.patch('/update-info', updates, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user info:', error);
    throw error;
  }
};

const uploadUserImage = async (file: File): Promise<string> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const formData = new FormData();
  formData.append('file', file);

  try{
    const response = await api.post('/upload-image', formData,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    })
    return response.data;
    }catch (error){
    console.error('Error uploading image:', error);
    throw error;
  }
}

export { registerUser, loginUser, getUserInfo, updateUserInfo, uploadUserImage};
