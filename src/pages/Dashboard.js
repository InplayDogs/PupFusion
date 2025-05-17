// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import TotalDogboneLeaderboard from "../components/leaderboards/TotalDogboneLeaderboard";

const Dashboard = () => {
  const [username, setUsername] = useState("Loading...");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || user.email || "Trainer");
      } else {
        setUsername("Guest");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-page" style={{ padding: "24px", textAlign: "center" }}>
      <h1>Welcome, {username}!</h1>
      <p>This is your Inplay Dogs Dashboard.</p>

      <div style={{ marginTop: "40px" }}>
        <TotalDogboneLeaderboard />
      </div>
    </div>
  );
};

export default Dashboard;
