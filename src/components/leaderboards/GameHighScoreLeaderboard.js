// src/components/leaderboards/GameHighScoreLeaderboard.js
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import "./GameHighScoreLeaderboard.css";

const GameHighScoreLeaderboard = ({ game }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const q = query(
          collection(db, "gameScores"),
          where("game", "==", game),
          orderBy("score", "desc"),
          limit(5)
        );
        const snapshot = await getDocs(q);
        const topScores = snapshot.docs.map((doc) => doc.data());
        setScores(topScores);
      } catch (error) {
        console.error("Error fetching high score leaderboard:", error);
      }
    };

    fetchScores();
  }, [game]);

  return (
    <div className="game-highscore-leaderboard">
      <h2>{game} High Scores</h2>
      <ul>
        {scores.map((entry, index) => (
          <li key={index}>
            <span className="rank">#{index + 1}</span>
            <span className="name">{entry.username || "Anonymous"}</span>
            <span className="score">{entry.score || 0}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameHighScoreLeaderboard;
