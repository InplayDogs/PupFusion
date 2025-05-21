import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig'; // Correct path to firebaseConfig.js
import { doc, getDoc } from 'firebase/firestore';
import './Doghouse.css';

const Doghouse = () => {
  const [collarColors, setCollarColors] = useState([]);

  useEffect(() => {
    const loadUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, 'users', user.uid);
      const snapshot = await getDoc(userRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        const unlockedColors = data.unlockedColors || [];
        setCollarColors(unlockedColors);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    const doghousePage = document.querySelector('.doghouse-page');
    collarColors.forEach((color) => {
      if (color === 'red') {
        doghousePage.classList.add('highlight-red');
      }
      if (color === 'blue') {
        doghousePage.classList.add('highlight-blue');
      }
      if (color === 'yellow') {
        doghousePage.classList.add('highlight-yellow');
      }
      if (color === 'green') {
        doghousePage.classList.add('highlight-green');
      }
      if (color === 'orange') {
        doghousePage.classList.add('highlight-orange');
      }
      if (color === 'purple') {
        doghousePage.classList.add('highlight-purple');
      }
    });
  }, [collarColors]);

  return (
    <div className="doghouse-page">
      <h1>Welcome to Your Dog's House</h1>
      <div className="doghouse-sections">
        <div className="doghouse-section bed">
          <h2>Bed</h2>
          <p>Your dog can rest here and regain energy.</p>
        </div>
        <div className="doghouse-section trophy-wall">
          <h2>Trophy Wall</h2>
          <p>Display your earned trophies and achievements here.</p>
        </div>
        <div className="doghouse-section rename-dog">
          <h2>Rename Dog</h2>
          <p>Give your dog a new name to reflect your journey.</p>
        </div>
      </div>
    </div>
  );
};

export default Doghouse;
