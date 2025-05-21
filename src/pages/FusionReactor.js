// src/pages/FusionReactor.js
import React from 'react';
import './FusionReactor.css';
import reactorImage from '../assets/reactor-cartoon.png';

const FusionReactor = () => {
  // Simulated unlock state — replace with Firebase data later
  const foundColors = {
    red: true,
    blue: true,
    yellow: true,
    green: true,
    orange: false,
    purple: false,
    indigo: false,
  };

  const allColorsFound = Object.values(foundColors).every(Boolean);

  return (
    <div className="fusion-reactor-page">
      <div className="fusion-header">
        <h1>Fusion Reactor</h1>
        <p>
          Welcome to the Fusion Reactor — where you mix and match collars to unlock the full spectrum of color.
        </p>
      </div>

      <div className="fusion-image-wrapper">
        <img src={reactorImage} alt="Fusion Reactor" className="fusion-image" />
        {Object.entries(foundColors).map(([color, isFound]) => (
          <div key={color} className={`reactor-light ${color} ${isFound ? 'active' : ''}`} />
        ))}
        {allColorsFound && <div className="reactor-light rainbow active" />}
      </div>

      <div className="fusion-description">
        <p>
          Start with <strong>Red</strong>, <strong>Blue</strong>, and <strong>Yellow</strong>. Fuse them to discover
          <strong> Green</strong>, <strong>Orange</strong>, <strong>Purple</strong>, and <strong>Indigo</strong>.
          <br /><br />
          When all seven are created, you'll unlock the power of the Rainbow — and discover what's beyond!
        </p>
      </div>
    </div>
  );
};

export default FusionReactor;
