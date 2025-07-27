import React from 'react';
import { useNavigate } from 'react-router-dom';

const OptionsScreen = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>What would you like to do?</h1>
      <button style={styles.optionButton} onClick={() => navigate('/chat')}>
        <span style={styles.optionText}>Talk</span>
      </button>
      <button style={styles.optionButton} onClick={() => navigate('/questions')}>
        <span style={styles.optionText}>Test Yourself</span>
      </button>
      <button style={styles.optionButton} onClick={() => navigate('/musicplayer')}>
        <span style={styles.optionText}>Listen to Music</span>
      </button>
      <button style={styles.optionButton} onClick={() => navigate('/exercise')}>
        <span style={styles.optionText}>Exercise Tips</span>
      </button>
      <button style={styles.optionButton} onClick={() => navigate('/food')}>
        <span style={styles.optionText}>Food Suggestions</span>
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
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    fontFamily: 'Avenir, sans-serif',
    color: '#333',
  },
  optionButton: {
    width: '80%',
    padding: '15px',
    margin: '10px 0',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontFamily: 'Avenir, sans-serif',
  },
  optionText: {
    fontSize: '16px',
  },
};

export default OptionsScreen;
