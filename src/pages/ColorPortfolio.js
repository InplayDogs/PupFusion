// src/pages/ColorPortfolio.js
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "./ColorPortfolio.css";

const ColorPortfolio = () => {
  const [unlockedColors, setUnlockedColors] = useState([]);

  const allColors = [
    "red",
    "blue",
    "yellow",
    "green",
    "orange",
    "purple",
    "indigo",
    "rainbow",
    "stripes",
    "polkadots",
    "shiny",
    "sparkle",
    "holographic",
    "sunset",
    "galaxy",
    "fire",
    "ice",
    "gold",
    "silver",
    "mystic"
  ];

  useEffect(() => {
    const fetchColors = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setUnlockedColors(data.unlockedColors || []);
      }
    };
    fetchColors();
  }, []);

  return (
    <div className="portfolio-container">
      <h2>🎨 Color Portfolio</h2>
      <p className="portfolio-sub">Each color you unlock changes your world. Can you collect them all?</p>
      <div className="color-grid">
        {allColors.map((color, index) => (
          <div
            key={index}
            className={`color-box ${unlockedColors.includes(color) ? "" : "grayscale"}`}
          >
            <p>{color.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPortfolio;
