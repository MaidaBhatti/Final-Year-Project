import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL} from '../config/constants';

class AuthService {
  private baseURL = API_BASE_URL;

  async login(email: string, password: string) {
    const response = await fetch(`${this.baseURL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return await response.json();
  }

  async register(userData: any) {
    const response = await fetch(`${this.baseURL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return await response.json();
  }

  async getCurrentUser() {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${this.baseURL}/users/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    return await response.json();
  }
}

export const authService = new AuthService();