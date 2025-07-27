import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MoodScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || { username: 'Guest' };

  const moods = [
    { name: 'HAPPY', emoji: '😊' },
    { name: 'SAD', emoji: '😢' },
    { name: 'CONFUSED', emoji: '😕' },
    { name: 'ANGRY', emoji: '😡' },
    { name: 'TIRED', emoji: '😴' },
    { name: 'AWFUL', emoji: '😖' },
    { name: 'OVERTHINKING', emoji: '🤔' },
    { name: 'ANXIOUS', emoji: '😟' },
    { name: 'STRESSED', emoji: '😫' },
    { name: 'BURNT OUT', emoji: '😵' },
  ];

  const tips = {
    HAPPY: 'Keep smiling and spread the joy!',
    SAD: 'Take deep breaths and allow yourself to feel.',
    CONFUSED: 'Take a step back and clear your mind.',
    ANGRY: 'Try some physical exercise to release tension.',
    TIRED: 'Rest or take a short nap if possible.',
    AWFUL: 'Talk to someone you trust about how you feel.',
    OVERTHINKING: 'Distract yourself with a hobby or activity.',
    ANXIOUS: 'Practice mindfulness or meditation.',
    STRESSED: 'Take a break and do something you enjoy.',
    'BURNT OUT': 'Prioritize self-care and relaxation.',
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.greeting}>Hello {username},</h2>
      <p style={styles.question}>How Are You Feeling Right Now?</p>

      <div style={styles.listContainer}>
        {moods.map((item) => (
          <div
            key={item.name}
            style={styles.moodBox}
            onClick={() => navigate('/options')}
          >
            <div style={styles.moodEmoji}>{item.emoji}</div>
            <div style={styles.moodText}>{item.name}</div>
            <div style={styles.tipBox}>
              <strong style={styles.tipMood}>{item.name}:</strong>
              <p style={styles.tipText}>{tips[item.name]}</p>
            </div>
          </div>
        ))}
      </div>

      <button style={styles.button} onClick={() => navigate('/options')}>
        Start Therapy Session
      </button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#FFE5E5',
    minHeight: '100vh',
    padding: '2rem',
    textAlign: 'center',
  },
  greeting: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
  },
  question: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    color: '#333',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  moodBox: {
    backgroundColor: '#E3BEA5',
    borderRadius: '10px',
    padding: '1rem',
    width: '90%',
    maxWidth: '500px',
    cursor: 'pointer',
    color: '#fff',
    boxShadow: '0 5px 10px rgba(0,0,0,0.1)',
  },
  moodEmoji: {
    fontSize: '2rem',
  },
  moodText: {
    fontWeight: 'bold',
    marginTop: '0.5rem',
  },
  tipBox: {
    marginTop: '1rem',
    backgroundColor: '#fff',
    color: '#333',
    padding: '0.75rem',
    borderRadius: '8px',
  },
  tipMood: {
    fontSize: '1rem',
  },
  tipText: {
    fontSize: '0.9rem',
    marginTop: '0.5rem',
  },
  button: {
    padding: '1rem 2rem',
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '10px',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

export default MoodScreen;
