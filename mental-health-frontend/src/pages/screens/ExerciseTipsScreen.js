import React, { useState, useEffect } from 'react';
import './ExerciseTipsScreen.css';

const PHYSICAL = 'physical';
const MENTAL = 'mental';

const ExerciseTipsScreen = () => {
  const [tips, setTips] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState(PHYSICAL);

  const fetchPhysicalExercises = async (part = '') => {
    try {
      setLoading(true);
      const url = part
        ? `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${part}`
        : 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back';

      const response = await fetch(url, {
        headers: {
          'X-RapidAPI-Key': 'f2dacec6dfmsh8cb7a8024826691p19b9a5jsn0be357d5031e',
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setTips(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      setError('Failed to fetch physical exercise tips.');
      setTips([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMentalExercises = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://type.fit/api/quotes');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setTips(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      setError('Failed to fetch motivational quotes.');
      setTips([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mode === PHYSICAL) {
      fetchPhysicalExercises();
    } else {
      fetchMentalExercises();
    }
    // eslint-disable-next-line
  }, [mode]);

  const handleSearch = () => {
    if (mode === PHYSICAL) {
      fetchPhysicalExercises(searchQuery);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Exercise Tips</h1>
      <div className="mode-toggle">
        <button
          className={mode === PHYSICAL ? 'active' : ''}
          onClick={() => setMode(PHYSICAL)}
        >
          Physical Exercise
        </button>
        <button
          className={mode === MENTAL ? 'active' : ''}
          onClick={() => setMode(MENTAL)}
        >
          Mental Exercise
        </button>
      </div>

      {mode === PHYSICAL && (
        <div className="search-container">
          <input
            className="search-bar"
            type="text"
            placeholder="Search for a body part..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="tips-list">
          {mode === PHYSICAL
            ? tips.map((tip, index) => (
                <div className="card" key={index}>
                  <img src={tip.gifUrl || 'https://via.placeholder.com/150'} alt={tip.name} className="image" />
                  <h3>{tip.name}</h3>
                  <p>Target: {tip.target}</p>
                  <p>Equipment: {tip.equipment}</p>
                </div>
              ))
            : tips.map((tip, index) => (
                <div className="card" key={index}>
                  <img src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png" alt="Mental Exercise" className="image" />
                  <h3 style={{ fontStyle: 'italic' }}>{tip.text}</h3>
                  <p style={{ fontWeight: 'bold', color: '#f594bd' }}>{tip.author || 'Unknown'}</p>
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseTipsScreen;
