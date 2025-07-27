import React, {createContext, useState, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContextType, User} from '../types';
import {authService} from '../services/authService';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const userData = await authService.getCurrentUser();
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      await AsyncStorage.setItem('token', response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      return {success: true};
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await authService.register(userData);
      await AsyncStorage.setItem('token', response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      return {success: true};
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};