// src/components/World/CollarInventory.js
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "./CollarInventory.css";

import red from "../../assets/collars/red-collar.png";
import blue from "../../assets/collars/blue-collar.png";
import yellow from "../../assets/collars/yellow-collar.png";
import orange from "../../assets/collars/orange-collar.png";
import green from "../../assets/collars/green-collar.png";
import purple from "../../assets/collars/purple-collar.png";
import indigo from "../../assets/collars/indigo-collar.png";

const CollarInventory = () => {
  const [unlockedColors, setUnlockedColors] = useState([]);

  const collars = [
    { name: "red", image: red },
    { name: "blue", image: blue },
    { name: "yellow", image: yellow },
    { name: "orange", image: orange },
    { name: "green", image: green },
    { name: "purple", image: purple },
    { name: "indigo", image: indigo }
  ];

  useEffect(() => {
    const fetchUnlocked = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setUnlockedColors(data.unlockedColors || []);
      }
    };
    fetchUnlocked();
  }, []);

  return (
    <div className="collar-inventory">
      <h2>🎽 Collar Inventory</h2>
      <div className="collar-grid">
        {collars.map((collar, index) => (
          <div
            key={index}
            className={`collar-slot ${unlockedColors.includes(collar.name) ? "" : "grayscale"}`}
          >
            <img src={collar.image} alt={collar.name} />
            <p>{collar.name.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollarInventory;
