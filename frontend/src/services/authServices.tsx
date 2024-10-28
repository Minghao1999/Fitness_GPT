import axios from 'axios'
const API_BASE_URL: string = 'http://localhost:8080/auth';

const registerUser = async (user: { username: string; password: string; email: string; phone: string; }): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error('Failed to log in user');
    }
    return await response.text();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const getUserInfo = async (token: string): Promise<any> => {
  try {
    const response: Response = await fetch(`${API_BASE_URL}/user-info`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
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

export {registerUser, loginUser}
