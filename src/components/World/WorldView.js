// src/components/World/WorldView.js
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import dogImg from "../../assets/pixel-dogs/dog-level0.png";
import { generateColorGradient } from "../../utils/loadUserColors";
import "./WorldView.css";

const WorldView = () => {
  const [tier, setTier] = useState("grayscale");
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const [dogName, setDogName] = useState("");
  const [energy, setEnergy] = useState(0);
  const [mood, setMood] = useState("");
  const [dogbone, setDogbone] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWorldData = async () => {
      const user = auth.currentUser;
      if (!user) return;
      setIsLoggedIn(true);

      const userRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(userRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        setTier(data.worldColorTier || "grayscale");
        setDogName(data.dogName || "");
        setEnergy(data.energy || 0);
        setMood(data.mood || "");
        setDogbone(data.totalDogbone || 0);
        setStreak(data.loginStreak || 0);

        const unlockedColors = data.unlockedColors || [];
        const gradient = generateColorGradient(unlockedColors);
        setBackgroundStyle({ background: gradient });
      }
    };

    loadWorldData();
  }, []);

  const handleJourneyStart = () => {
    navigate("/intro-sequence");
  };

  return (
    <div className="world-view" style={backgroundStyle}>
      <h2>Welcome, Traveler</h2>
      <p>Your world is currently in: <strong>{tier.toUpperCase()}</strong></p>

      <div className="dog-container">
        <img
          src={dogImg}
          alt="Pixel Dog"
          className="pixel-dog"
          onClick={() => alert("Woof!")}
        />
      </div>

      {isLoggedIn ? (
        <div className="bio-block">
          <h3>{dogName}</h3>
          <p><strong>Energy:</strong> {energy}/5</p>
          <p><strong>Mood:</strong> {mood}</p>
          <p><strong>Login Streak:</strong> {streak} days</p>
          <p><strong>DOGBONE:</strong> {dogbone}</p>
        </div>
      ) : (
        <div className="intro">
          <p>
            In a world of gray... a traveler wandered without purpose. Until one day, a dog appeared.
            Together, they began a journey to bring color back to the world.
          </p>
          <button onClick={handleJourneyStart}>Begin the Journey</button>
          <button onClick={() => navigate("/login")}>Log In</button>
        </div>
      )}
    </div>
  );
};

export default WorldView;
