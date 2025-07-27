import React, { useState } from 'react';
import './LoginScreen.css'; // import styles
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token); 
        alert('Login successful');
        console.log('Navigating to dashboard');
        navigate('/options'); 
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <div className="login-input-group">
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="login-input-group">
        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin} className="login-button">Login</button>
      <p className="signup-redirect">
        Don't have an account? <span onClick={() => navigate('/signup')}>Sign up here</span>
      </p>
    </div>
  );
};

export default LoginScreen;
