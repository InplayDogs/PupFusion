// src/pages/Doghouse.js
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./Doghouse.css";

const Doghouse = () => {
  const [dogName, setDogName] = useState("Your");
  const [bedLevel, setBedLevel] = useState(1);
  const [trophies, setTrophies] = useState([]);
  const [newName, setNewName] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const user = auth.currentUser;
      if (!user) return;
      setUserId(user.uid);
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setDogName(data.dogName || "Your");
        setBedLevel(data.bedLevel || 1);
        setTrophies(data.trophies || []);
      }
    };
    loadUser();
  }, []);

  const handleRename = async () => {
    if (!newName.trim()) return;
    setDogName(newName);
    setNewName("");
    if (userId) {
      const ref = doc(db, "users", userId);
      await updateDoc(ref, { dogName: newName });
    }
  };

  return (
    <div className="doghouse-container">
      <h2>🏠 Welcome to {dogName}'s Doghouse</h2>

      <div className="doghouse-section">
        <h3>Rename Your Dog</h3>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter new name"
        />
        <button onClick={handleRename}>Rename</button>
      </div>

      <div className="doghouse-section">
        <h3>🏆 Trophy Wall</h3>
        {trophies.length === 0 ? (
          <p>No trophies yet.</p>
        ) : (
          <ul>
            {trophies.map((trophy, i) => (
              <li key={i}>{trophy}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="doghouse-section">
        <h3>🛏️ Bed Level: {bedLevel}</h3>
        <p>Upgrade your bed by collecting items and rewards.</p>
      </div>
    </div>
  );
};

export default Doghouse;
