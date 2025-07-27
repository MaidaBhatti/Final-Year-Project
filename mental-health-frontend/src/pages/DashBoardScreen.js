import React, { useState, useEffect } from 'react';
import './DashBoardScreen.css'; 

const DashboardScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [breathingCycles, setBreathingCycles] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [moodEntries, setMoodEntries] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError("No token found! Please log in again.");
      console.error("Token missing in localStorage.");
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Using token:", token);  // Debug token

        const response = await fetch('http://localhost:5000/api/users/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(`Failed to fetch user: ${errData.message || response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched user data:", data);
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchStats = async () => {
      try {
        const fetchWithToken = async (url) => {
          const res = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(`Failed to fetch ${url}: ${errData.message || res.statusText}`);
          }
          return res.json();
        };

        const [breathData, gameData, moodData] = await Promise.all([
          fetchWithToken('http://localhost:5000/api/stats/breathing'),
          fetchWithToken('http://localhost:5000/api/stats/game'),
          fetchWithToken('http://localhost:5000/api/stats/mood'),
        ]);

        setBreathingCycles(breathData.cycles || 0);
        setGameScore(gameData.score || 0);
        setMoodEntries(moodData.entries || 0);

        console.log("Stats fetched:", { breathData, gameData, moodData });
      } catch (err) {
        console.error("Error fetching stats:", err.message);
      }
    };

    fetchUser();
    fetchStats();
  }, []);

  const renderUser = () => {
    if (!user) return null;
    const imageUrl = user.image
      ? `http://localhost:5000/${user.image.replace(/\\/g, '/')}`
      : 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.username);

    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <img
          src={imageUrl}
          alt="User"
          className="avatar"
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '3px solid #fff',
            boxShadow: '0 2px 8px #b2ebf2',
            marginBottom: 18,
          }}
        />
        <h2>{user.username}</h2>
        <p><strong>Height:</strong> {user.height}</p>
        <p><strong>Weight:</strong> {user.weight}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Sleep Time:</strong> {user.sleepTime}</p>
        <hr />
        <h3>Statistics</h3>
        <p><strong>Breathing Cycles:</strong> {breathingCycles}</p>
        <p><strong>Game Score:</strong> {gameScore}</p>
        <p><strong>Mood Entries:</strong> {moodEntries}</p>
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}
      {!loading && !error && renderUser()}
    </div>
  );
};

export default DashboardScreen;
