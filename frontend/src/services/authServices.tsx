import axios from 'axios'
const API_BASE_URL: string = 'http://localhost:8080/auth';

const registerUser = async (user: { username: string; password: string; email: string; phone: string; }): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error('Failed to register user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const loginUser = async (email: string, password: string): Promise<string> => {
  try {
    const response: Response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error('Failed to log in user');
    }
    const token =await response.text()
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
interface User {
  username: string;
  email: string;
  phone: string;
  gender?: string;
  age?: string;
  height?: string;
  weight?: string;
}
const getUserInfo = async (): Promise<User> => {
  const token = localStorage.getItem('token');
  console.log('Token being sent:', token)
  if (!token) {
    throw new Error('No token found');
  }
  try {
    const response: Response = await fetch(`${API_BASE_URL}/user-info`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to get user info');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const updateUserInfo = async (updates: Partial<User>): Promise<User> => {
  const token = localStorage.getItem('token')
  if (!token){
    throw new Error('No token found')
  }

  const response = await fetch(`${API_BASE_URL}/update-info`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updates)
  })
  if (!response.ok){
    throw new Error('Failed to update user info')
  }

  return await response.json()
}

export {registerUser, loginUser, getUserInfo, updateUserInfo}
