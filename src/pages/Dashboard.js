// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import dogImg from "../assets/pixel-dogs/dog-level0.png";
import "./Dashboard.css";

const Dashboard = () => {
  const [dogName, setDogName] = useState("Your Dog");
  const [dogbone, setDogbone] = useState(0);
  const [streak, setStreak] = useState(0);
  const [energy, setEnergy] = useState(5);
  const [mood, setMood] = useState("Happy");
  const [toast, setToast] = useState("");
  const [cooldown, setCooldown] = useState(false);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      setUserId(user.uid);
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setDogName(data.dogName || "Your Dog");
        setDogbone(data.totalDogbone || 0);
        setStreak(data.loginStreak || 0);
        setEnergy(data.energy || 5);
        setMood(data.mood || "Happy");
      }
    };

    loadUserData();
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  const saveCareState = async (newEnergy, newMood, newDogbone) => {
    if (!userId) return;
    const ref = doc(db, "users", userId);
    await updateDoc(ref, {
      energy: newEnergy,
      mood: newMood,
      totalDogbone: newDogbone,
    });
  };

  const handleCare = (action) => {
    if (cooldown) {
      showToast("Slow down! Your pup needs a moment.");
      return;
    }

    let updatedMood = mood;
    let updatedEnergy = energy;
    let reward = 1;
    let message = "";

    if (action === "Feed" && energy < 5) {
      updatedEnergy++;
      message = "+1 Energy!";
    } else if (action === "Walk") {
      updatedEnergy = Math.max(0, energy - 1);
      message = "Went for a walk!";
    } else if (action === "Pet") {
      updatedMood = "Excited";
      message = "Your dog is excited!";
    } else if (action === "Play") {
      updatedMood = "Excited";
      message = "Playtime success!";
    } else {
      message = "Already full!";
      reward = 0;
    }

    setEnergy(updatedEnergy);
    setMood(updatedMood);
    setDogbone((prev) => prev + reward);
    showToast(message);
    saveCareState(updatedEnergy, updatedMood, dogbone + reward);

    setCooldown(true);
    setTimeout(() => setCooldown(false), 1500);
  };

  return (
    <div className="dashboard">
      {toast && <div className="toast">{toast}</div>}

      <div className="stats-bar">
        <div><strong>DOGBONE:</strong> {dogbone}</div>
        <div><strong>Login Streak:</strong> {streak} days</div>
      </div>

      <div className="dog-profile">
        <h2>{dogName}</h2>
        <img src={dogImg} alt="Dog" className="dashboard-dog" />
        <p><strong>Mood:</strong> {mood}</p>
        <p><strong>Energy:</strong> {energy}/5</p>
      </div>

      <div className="care-actions">
        <h3>Care for Your Dog</h3>
        <button onClick={() => handleCare("Feed")} disabled={cooldown}>Feed</button>
        <button onClick={() => handleCare("Pet")} disabled={cooldown}>Pet</button>
        <button onClick={() => handleCare("Walk")} disabled={cooldown}>Walk</button>
        <button onClick={() => handleCare("Play")} disabled={cooldown}>Play</button>
      </div>

      <div className="explore-link">
        <h3>Explore</h3>
        <button onClick={() => navigate("/explore")}>Explore Regions</button>
      </div>

      <div className="doghouse-link">
        <h3>Doghouse</h3>
        <button onClick={() => navigate("/doghouse")}>Enter Doghouse</button>
      </div>

      <div className="arcade-link">
        <h3>Dogbone Arcade</h3>
        <button onClick={() => navigate("/dogbone-arcade")}>Play Mini-Games</button>
      </div>

      <div className="fusion-link">
        <h3>Fusion Reactor</h3>
        <button onClick={() => navigate("/fusion")}>Enter Fusion Lab</button>
      </div>

      <div className="portfolio-link">
        <h3>Rainbows, Colors & My World</h3>
        <button onClick={() => navigate("/portfolio")}>View Color Portfolio</button>
      </div>
    </div>
  );
};

export default Dashboard;
