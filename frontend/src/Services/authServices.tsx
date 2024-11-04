import axios from 'axios';
import { User } from '../Types/User.ts';

const API_BASE_URL = 'http://localhost:8080/auth';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const registerUser = async (user: { username: string; password: string; email: string; phone: string; }): Promise<any> => {
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

export { registerUser, loginUser, getUserInfo, updateUserInfo };
