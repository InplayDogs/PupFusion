// src/pages/CollarInventory.js
import React from 'react';
import './CollarInventory.css';

import red from '../assets/collars/red.png';
import blue from '../assets/collars/blue.png';
import yellow from '../assets/collars/yellow.png';
import green from '../assets/collars/green.png';
import orange from '../assets/collars/orange.png';
import purple from '../assets/collars/purple.png';
import indigo from '../assets/collars/indigo.png';

const CollarInventory = () => {
  // Simulated inventory data — replace with Firebase logic later
  const inventory = {
    red: 2,
    blue: 1,
    yellow: 3,
    green: 0,
    orange: 0,
    purple: 0,
    indigo: 0,
  };

  const collars = [
    { color: 'red', img: red },
    { color: 'blue', img: blue },
    { color: 'yellow', img: yellow },
    { color: 'green', img: green },
    { color: 'orange', img: orange },
    { color: 'purple', img: purple },
    { color: 'indigo', img: indigo },
  ];

  return (
    <div className="collar-inventory">
      <h1>Collar Inventory</h1>
      <div className="collar-grid">
        {collars.map(({ color, img }) => {
          const owned = inventory[color] > 0;
          return (
            <div key={color} className="collar-card">
              <img
                src={img}
                alt={`${color} collar`}
                className={owned ? '' : 'grayscale'}
              />
              <div className="collar-label">
                {color.charAt(0).toUpperCase() + color.slice(1)} × {inventory[color]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CollarInventory;
