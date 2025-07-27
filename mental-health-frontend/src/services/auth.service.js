import API from './api';

export const register = async (userData) => {
  const response = await API.post('/users/register', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const login = async (credentials) => {
  const response = await API.post('/users/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5000/api/users/dashboard', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch user');
  return await response.json();
};