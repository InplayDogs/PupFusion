// src/pages/NameYourDog.js
import React, { useState } from 'react';
import './NameYourDog.css';

const NameYourDog = () => {
  const [dogName, setDogName] = useState('');

  const handleNameChange = (e) => {
    setDogName(e.target.value);
  };

  const handleSubmit = () => {
    // Logic to store the name (e.g., in Firebase)
    console.log('Dog name:', dogName);
  };

  return (
    <div className="name-your-dog">
      <h1>Name Your Dog</h1>
      <input 
        type="text" 
        value={dogName} 
        onChange={handleNameChange} 
        placeholder="Enter your dog's name" 
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default NameYourDog;
