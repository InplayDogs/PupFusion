// src/pages/ForestWorld.js
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./ForestWorld.css";

const ForestWorld = () => {
  const [dogPosition, setDogPosition] = useState(0);
  const [dogItems, setDogItems] = useState([]);
  const [walking, setWalking] = useState(false);
  const [energy, setEnergy] = useState(0);
  const [message, setMessage] = useState("");
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
        setEnergy(data.energy || 0);
        setDogItems(data.forestItems || []);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (!walking) return;
    const interval = setInterval(() => {
      setDogPosition((prev) => prev + 1);
      if (Math.random() < 0.05) {
        const found = Math.random();
        let newItem = "bone";
        if (found < 0.01) newItem = "red-collar";
        setDogItems((prev) => [...prev, newItem]);
        setMessage(`Your dog found a ${newItem.replace("-", " ")}!`);
        setTimeout(() => setMessage(""), 3000);
      }
    }, 800);
    return () => clearInterval(interval);
  }, [walking]);

  const startWalk = async () => {
    if (energy <= 0) {
      setMessage("Your dog is too tired to walk. Try feeding it on the dashboard.");
      return;
    }
    setWalking(true);
    const newEnergy = energy - 1;
    setEnergy(newEnergy);
    setMessage("Your dog starts walking through the forest...");

    const ref = doc(db, "users", userId);
    await updateDoc(ref, {
      energy: newEnergy,
      forestItems: [...dogItems]
    });
  };

  return (
    <div className="forest-container">
      <h2>🌲 Forest World</h2>
      <p>{message}</p>
      <div className="forest-walk">
        <div
          className="forest-dog"
          style={{ transform: `translateX(${dogPosition}px)` }}
        />
      </div>
      {!walking && (
        <button className="forest-btn" onClick={startWalk}>
          Begin Walk (1 Energy)
        </button>
      )}
    </div>
  );
};

export default ForestWorld;
