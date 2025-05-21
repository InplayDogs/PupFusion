// src/components/World/WorldView.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WorldView.css';

const WorldView = () => {
  const navigate = useNavigate();

  const handleJourneyStart = () => {
    navigate("/name-your-dog");  // Correct route to NameYourDog page
  };

  return (
    <div className="world-view">
      <h2>Welcome, Traveler</h2>
      <p>Your world is currently in: <strong>Grayscale</strong></p>

      <div className="dog-container">
        <img
          src="dog-image-url" // Placeholder dog image
          alt="Pixel Dog"
          className="pixel-dog"
          onClick={() => alert("Woof!")}
        />
      </div>

      <div className="intro">
        <p>Welcome to your adventure. Click below to start your journey!</p>
        <button onClick={handleJourneyStart}>Begin the Journey</button>
      </div>
    </div>
  );
};

export default WorldView;
