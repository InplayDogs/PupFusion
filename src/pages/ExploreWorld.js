// src/pages/ExploreWorld.js
import React from 'react';
import './ExploreWorld.css';

import dog6 from '../assets/pixel-dogs/dog6.png';
import dog7 from '../assets/pixel-dogs/dog7.png';
import dog8 from '../assets/pixel-dogs/dog8.png';
import dog9 from '../assets/pixel-dogs/dog9.png';
import dog10 from '../assets/pixel-dogs/dog10.png';
import dog11 from '../assets/pixel-dogs/dog11.png';

const ExploreWorld = () => {
  const worlds = [
    { name: 'Forest Trail', img: dog6 },
    { name: 'Desert Run', img: dog7 },
    { name: 'Snowy Peak', img: dog8 },
    { name: 'City Streets', img: dog9 },
    { name: 'Mystic Lake', img: dog10 },
    { name: 'Rainbow Plains', img: dog11 }
  ];

  return (
    <div className="explore-page">
      <h1>Explore the PupFusion World</h1>
      <div className="world-grid">
        {worlds.map((world, index) => (
          <div key={index} className="world-card">
            <img src={world.img} alt={world.name} className="grayscale" />
            <h2>{world.name}</h2>
            <p className="coming-soon">Coming Soon</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreWorld;
