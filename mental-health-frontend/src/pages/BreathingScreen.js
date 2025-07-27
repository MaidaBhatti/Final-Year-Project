import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const phases = [
  { label: 'Inhale', duration: 4000, color: '#f594bd' },
  { label: 'Hold', duration: 2000, color: '#e69fa8' },
  { label: 'Exhale', duration: 4000, color: '#a3d8f4' },
  { label: 'Hold', duration: 2000, color: '#e69fa8' },
];

const totalPhases = phases.length;

const BreathingScreen = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [cycleCount, setCycleCount] = useState(0); // Local session count
  const [totalCycles, setTotalCycles] = useState(0); // Total from DB
  const intervalRef = useRef(null);

  // Fetch total breathing cycles from DB on component mount
  useEffect(() => {
    const fetchTotalCycles = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await axios.get('http://localhost:5000/api/stats/breathing', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTotalCycles(res.data.cycles || 0);
      } catch (err) {
        console.error('Error fetching total breathing cycles:', err);
      }
    };

    fetchTotalCycles();
  }, []);

  // Handle breathing phases
  useEffect(() => {
    setProgress(0);
    const { duration } = phases[phaseIndex];
    const start = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(elapsed / duration, 1));
      if (elapsed >= duration) {
        clearInterval(intervalRef.current);
        setTimeout(() => {
          if (phaseIndex === totalPhases - 1) {
            const newCycleCount = cycleCount + 1;
            setCycleCount(newCycleCount);
            saveBreathingCycle(); // Save to backend
            setTotalCycles(prev => prev + 1); // Update total on UI
            setPhaseIndex(0);
          } else {
            setPhaseIndex(phaseIndex + 1);
          }
        }, 100);
      }
    }, 16);

    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line
  }, [phaseIndex, cycleCount]);

  const saveBreathingCycle = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await axios.post(
        'http://localhost:5000/api/stats/breathing',
        { cycles: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Breathing cycle saved.');
    } catch (error) {
      console.error('Error saving breathing cycle:', error);
    }
  };

  const { label, color } = phases[phaseIndex];

  // Animate circle size
  const minSize = 120;
  const maxSize = 240;
  let circleSize = minSize;
  if (label === 'Inhale') {
    circleSize = minSize + (maxSize - minSize) * progress;
  } else if (label === 'Exhale') {
    circleSize = maxSize - (maxSize - minSize) * progress;
  } else {
    circleSize = label === 'Hold' && phaseIndex === 1 ? maxSize : minSize;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Breathing Exercise</h2>
      <div style={styles.cycleText}>
        Session cycles: <b>{cycleCount}</b>
      </div>
      <div style={styles.cycleText}>
        Total cycles (all time): <b>{totalCycles}</b>
      </div>
      <div style={styles.breathingArea}>
        <div
          style={{
            ...styles.circle,
            background: color,
            width: circleSize,
            height: circleSize,
            transition: 'width 0.4s, height 0.4s, background 0.4s',
            boxShadow: `0 0 40px 10px ${color}55`,
          }}
        >
          <span style={styles.phaseText}>{label}</span>
        </div>
      </div>
      <button style={styles.button} onClick={() => setCycleCount(0)}>
        Reset Session
      </button>
    </div>
  );
};

const styles = {
  container: {
    background: 'linear-gradient(135deg, #ffe5e5 0%, #a3d8f4 100%)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'inherit',
    padding: '2rem',
  },
  heading: {
    color: '#f594bd',
    fontWeight: 'bold',
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  cycleText: {
    color: '#333',
    marginBottom: '1rem',
    fontSize: '1.1rem',
  },
  breathingArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2rem',
    minHeight: 260,
  },
  circle: {
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'width 0.4s, height 0.4s, background 0.4s',
    boxShadow: '0 0 40px 10px #f594bd55',
  },
  phaseText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '2rem',
    letterSpacing: '2px',
    textShadow: '0 2px 8px #0002',
    userSelect: 'none',
  },
  button: {
    marginTop: '1rem',
    padding: '0.7rem 2rem',
    background: '#f594bd',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 2px 8px #f594bd44',
  },
};

export default BreathingScreen;
