import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <img
        src="./assets/meditation.jpg" // Ensure the image path is correct in the public folder
        alt="Meditation"
        style={styles.image}
      />
      <h1 style={styles.title}>Time to meditate</h1>
      <p style={styles.subtitle}>Take a breath, and ease your mind</p>
      <button
        style={styles.button}
        onClick={() => navigate('/mood')}
      >
        Let's get started
      </button>
      <button
        style={styles.button}
        onClick={() => navigate('/login')}
      >
        Login
      </button>
      <button
        style={styles.button}
        onClick={() => navigate('/signup')}
      >
        Signup
      </button>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 16px',
    backgroundColor: '#E3BEA5',
  },
  image: {
    width: '200px',
    height: '200px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#888',
    marginBottom: '20px',
  },
  button: {
    width: '80%',
    padding: '15px',
    margin: '10px 0',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default WelcomeScreen;
