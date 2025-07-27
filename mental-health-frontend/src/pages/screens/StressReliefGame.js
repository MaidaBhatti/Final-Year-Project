import React, { useState, useEffect, useRef } from 'react';

const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

const Bubble = ({ onPop, popping }) => {
  const size = getRandom(50, 90);
  const left = getRandom(5, 80);
  const top = getRandom(10, 70);
  const style = {
    width: size,
    height: size,
    left: `${left}%`,
    top: `${top}%`,
    background: `radial-gradient(circle at 30% 30%, #fff8, #${Math.floor(Math.random()*16777215).toString(16)}99 80%, #fff0 100%)`,
    position: 'absolute',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 4px 24px 0 #b2ebf2, 0 0 0 4px #fff4',
    border: '2px solid #fff',
    outline: 'none',
    transition: popping
      ? 'transform 0.2s cubic-bezier(.68,-0.55,.27,1.55), opacity 0.2s'
      : 'transform 0.1s',
    transform: popping ? 'scale(0.1)' : 'scale(1)',
    opacity: popping ? 0 : 1,
    zIndex: 2,
  };
  return (
    <div
      style={style}
      onClick={onPop}
      aria-label="Pop bubble"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onPop()}
      className="bubble"
    />
  );
};

const GAME_TIME = 20; // seconds

const StressReliefGame = () => {
  const [score, setScore] = useState(0);
  const [bubbles, setBubbles] = useState(Array(7).fill({ id: Math.random(), popping: false }));
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [gameActive, setGameActive] = useState(false);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('bubbleHighScore')) || 0);
  const [scoreAnim, setScoreAnim] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('bubbleHighScore', score);
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [gameActive, timeLeft, score, highScore]);

  const popBubble = idx => {
    if (!gameActive) return;
    setBubbles(bubs =>
      bubs.map((b, i) =>
        i === idx ? { ...b, popping: true } : b
      )
    );
    setScore(s => s + 1);
    setScoreAnim(true);
    setTimeout(() => {
      setBubbles(bubs =>
        bubs.map((b, i) =>
          i === idx ? { id: Math.random(), popping: false } : b
        )
      );
      setScoreAnim(false);
    }, 180);
    // Optional: Play pop sound
    // new Audio('/pop.mp3').play();
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_TIME);
    setGameActive(true);
    setBubbles(Array(7).fill({ id: Math.random(), popping: false }));
  };

  // Animated background bubbles
  const bgBubbles = Array(12).fill(0).map((_, i) => (
    <div
      key={i}
      style={{
        position: 'absolute',
        left: `${getRandom(0, 95)}%`,
        top: `${getRandom(0, 95)}%`,
        width: getRandom(40, 100),
        height: getRandom(40, 100),
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.13)',
        filter: 'blur(2px)',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  ));

  return (
    <div
      style={{
        position: 'relative',
        height: 440,
        background: 'linear-gradient(135deg, #e0f7fa 60%, #b2ebf2 100%)',
        borderRadius: 20,
        margin: 24,
        overflow: 'hidden',
        boxShadow: '0 2px 24px #b2ebf2',
        maxWidth: 480,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {bgBubbles}
      <h2 style={{ textAlign: 'center', color: '#00796b', marginTop: 18, letterSpacing: 1, zIndex: 3, position: 'relative' }}>
        Pop the Bubbles!
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 6, zIndex: 3, position: 'relative' }}>
        <div style={{ fontSize: 18 }}>
          Time: <span style={{ color: '#d84315', fontWeight: 'bold' }}>{timeLeft}s</span>
        </div>
        <div style={{ fontSize: 18 }}>
          High: <span style={{ color: '#fbc02d', fontWeight: 'bold' }}>{highScore}</span>
        </div>
      </div>
      <div style={{
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 700,
        color: '#00796b',
        marginBottom: 8,
        marginTop: 2,
        transition: 'transform 0.2s',
        transform: scoreAnim ? 'scale(1.2)' : 'scale(1)',
        zIndex: 3,
        position: 'relative',
      }}>
        Score: {score}
      </div>
      {gameActive ? (
        bubbles.map((b, idx) => (
          <Bubble key={b.id} onPop={() => popBubble(idx)} popping={b.popping} />
        ))
      ) : (
        <div style={{ textAlign: 'center', marginTop: 70, zIndex: 3, position: 'relative' }}>
          {timeLeft === 0 && (
            <div style={{ fontSize: 22, color: '#388e3c', marginBottom: 16 }}>
              Game Over!<br />Your Score: <b>{score}</b>
            </div>
          )}
          <button
            onClick={startGame}
            style={{
              padding: '14px 38px',
              fontSize: 20,
              background: 'linear-gradient(90deg,#00bfae,#00b8d4)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              transition: 'background 0.3s',
              boxShadow: '0 2px 8px #b2dfdb',
              fontWeight: 600,
              letterSpacing: 1,
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#0097a7'}
            onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(90deg,#00bfae,#00b8d4)'}
          >
            {timeLeft === 0 ? 'Try Again' : 'Start Game'}
          </button>
        </div>
      )}
      <p style={{ textAlign: 'center', marginTop: 24, color: '#888', zIndex: 3, position: 'relative' }}>
        Tap or click the bubbles to pop them!
      </p>
    </div>
  );
};

export default StressReliefGame;