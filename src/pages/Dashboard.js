import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import './Dashboard.css';

const Dashboard = () => {
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
    const dashboardPage = document.querySelector('.dashboard-page');
    collarColors.forEach((color) => {
      if (color === 'red') {
        dashboardPage.classList.add('highlight-red');
      }
      if (color === 'blue') {
        dashboardPage.classList.add('highlight-blue');
      }
      if (color === 'yellow') {
        dashboardPage.classList.add('highlight-yellow');
      }
      if (color === 'green') {
        dashboardPage.classList.add('highlight-green');
      }
      if (color === 'orange') {
        dashboardPage.classList.add('highlight-orange');
      }
      if (color === 'purple') {
        dashboardPage.classList.add('highlight-purple');
      }
    });
  }, [collarColors]);

  return (
    <div className="dashboard-page">
      <h1>Welcome to Your Dashboard</h1>
      <div className="bio-info">
        <p>Your collar colors will light up the background as you unlock them!</p>
      </div>
    </div>
  );
};

export default Dashboard;
