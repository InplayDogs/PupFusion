// src/components/DogboneArcade/mini-games/FetchFrenzy.js
import React, { useEffect, useRef, useState } from "react";
import GameHighScoreLeaderboard from "../../leaderboards/GameHighScoreLeaderboard";
import { db, auth } from "../../../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import "./FetchFrenzy.css";

const FetchFrenzy = () => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);

    intervalRef.current = setInterval(() => {
      setScore((prevScore) => {
        const newScore = prevScore + Math.floor(Math.random() * 5) + 1;
        if (newScore >= 75) {
          clearInterval(intervalRef.current);
          endGame(newScore);
        }
        return newScore;
      });
    }, 200);
  };

  const endGame = async (finalScore) => {
    setGameOver(true);
    setIsPlaying(false);

    const user = auth.currentUser;
    if (!user) return;

    const scoreData = {
      userId: user.uid,
      username: user.displayName || user.email || "Anonymous",
      game: "Fetch Frenzy",
      score: finalScore,
      dogboneEarned: finalScore,
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "gameScores"), scoreData);
    } catch (error) {
      console.error("Failed to save score:", error);
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current); // Cleanup
  }, []);

  return (
    <div className="mini-game-page">
      <GameHighScoreLeaderboard game="Fetch Frenzy" />
      <div className="game-container">
        <h3>Score: {score}</h3>
        {!isPlaying && !gameOver && (
          <button onClick={startGame}>Start Fetch Frenzy</button>
        )}
        {gameOver && (
          <p>Game Over! Your score: <strong>{score}</strong></p>
        )}
      </div>
    </div>
  );
};

export default FetchFrenzy;
