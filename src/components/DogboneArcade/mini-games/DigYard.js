// src/components/DogboneArcade/mini-games/DigYard.js
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import GameHighScoreLeaderboard from "../../leaderboards/GameHighScoreLeaderboard";
import "./DigYard.css";

const DigYard = () => {
  const [user, setUser] = useState(null);
  const [score, setScore] = useState(0);
  const [energy, setEnergy] = useState(5);
  const [dogbone, setDogbone] = useState(0);
  const [message, setMessage] = useState("Click a patch to dig!");
  const [grid, setGrid] = useState(Array(25).fill(null));
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      if (u) {
        setUser(u);
        const userRef = doc(db, "users", u.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setDogbone(data.totalDogbone || 0);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleDig = async (index) => {
    if (gameOver || grid[index]) return;
    if (energy <= 0) {
      setMessage("You're out of energy!");
      return;
    }

    const outcome = Math.random();
    let reward = 0;
    let emoji = "❌";

    if (outcome > 0.85) {
      reward = 50;
      emoji = "💎";
    } else if (outcome > 0.6) {
      reward = 20;
      emoji = "🦴";
    } else if (outcome > 0.3) {
      reward = 10;
      emoji = "🎾";
    }

    const newGrid = [...grid];
    newGrid[index] = emoji;
    setGrid(newGrid);
    setScore((prev) => prev + reward);
    setDogbone((prev) => prev + reward);
    setEnergy((prev) => prev - 1);

    setMessage(
      reward > 0
        ? `You found ${emoji} and earned ${reward} DOGBONE!`
        : "Nothing here..."
    );

    if (energy - 1 <= 0) {
      setGameOver(true);
      await saveScore();
    }
  };

  const saveScore = async () => {
    if (!user || score === 0) return;

    await updateDoc(doc(db, "users", user.uid), {
      totalDogbone: dogbone,
    });

    await setDoc(doc(db, "gameScores", `${user.uid}_digyard_${Date.now()}`), {
      userId: user.uid,
      username: user.email,
      game: "Dig Yard",
      score,
      dogboneEarned: score,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="mini-game-page">
      <GameHighScoreLeaderboard game="Dig Yard" />
      <div className="game-container">
        <h3>Score: {score}</h3>
        <h4>Energy: {energy}</h4>
        <h4>DOGBONE: {dogbone}</h4>
        <p className="message">{message}</p>
        <div className="yard">
          {grid.map((cell, index) => (
            <div
              key={index}
              className={`dirt-patch ${cell ? "dug" : ""}`}
              onClick={() => handleDig(index)}
            >
              {cell}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DigYard;
