import React, { useState, useEffect } from 'react';
import './FoodScreen.css';

const FoodScreen = () => {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const fetchRandomMeal = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json();
      setMeal(data.meals[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching the meal:', error);
      setLoading(false);
    }
  };

  const fetchMealByName = async (name) => {
    try {
      setLoading(true);
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
      const data = await response.json();
      if (data.meals) {
        setMeal(data.meals[0]);
      } else {
        setMeal(null);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching the meal:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isSearching) {
      fetchRandomMeal();
    }
  }, [isSearching]);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      fetchMealByName(searchQuery);
      setIsSearching(true);
    } else {
      fetchRandomMeal();
      setIsSearching(false);
    }
  };

  return (
    <div className="food-container">
      <h1 className="heading">Recipe of the Day</h1>
      <input
        className="search-bar"
        type="text"
        placeholder="Search for a recipe..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      {loading ? (
        <div className="loader">Loading...</div>
      ) : meal ? (
        <div className="meal-info">
          <h2 className="title">{meal.strMeal}</h2>
          <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-img" />
          <p className="details"><strong>Category:</strong> {meal.strCategory}</p>
          <p className="details"><strong>Area:</strong> {meal.strArea}</p>
          <h3>Instructions:</h3>
          <p className="instructions">{meal.strInstructions}</p>
          <button className="black-btn" onClick={fetchRandomMeal}>Get Another Meal</button>
        </div>
      ) : (
        <p>No meal found.</p>
      )}
    </div>
  );
};

export default FoodScreen;
