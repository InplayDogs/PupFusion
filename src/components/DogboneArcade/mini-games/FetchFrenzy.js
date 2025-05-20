// src/components/DogboneArcade/mini-games/FetchFrenzy.js
import React, { useEffect, useRef, useState, useCallback } from "react";
import { auth, db } from "../../../firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./FetchFrenzy.css";

const FetchFrenzy = () => {
  const gameAreaRef = useRef();
  const navigate = useNavigate();

  const [dogX, setDogX] = useState(150);
  const [bones, setBones] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [streakMultiplier, setStreakMultiplier] = useState(1);

  const DOG_WIDTH = 50;
  const BONE_WIDTH = 30;
  const GAME_WIDTH = 300;
  const GAME_HEIGHT = 400;

  const saveScore = useCallback(async (points) => {
    const user = auth.currentUser;
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) return;

    const data = snap.data();
    const oldHigh = data.fetchFrenzyHighScore || 0;
    const totalDogbone = data.totalDogbone || 0;

    await updateDoc(ref, {
      fetchFrenzyHighScore: Math.max(oldHigh, points),
      totalDogbone: totalDogbone + points * streakMultiplier
    });
  }, [streakMultiplier]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setDogX((prev) => {
        if (e.key === "ArrowLeft" || e.key === "a") {
          return Math.max(0, prev - 20);
        } else if (e.key === "ArrowRight" || e.key === "d") {
          return Math.min(GAME_WIDTH - DOG_WIDTH, prev + 20);
        }
        return prev;
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!playing) return;
    if (timeLeft <= 0) {
      setGameOver(true);
      setPlaying(false);
      saveScore(score);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, playing, score, saveScore]);

  useEffect(() => {
    if (gameOver || !playing) return;
    const gameLoop = setInterval(() => {
      setBones((prevBones) => {
        let updated = prevBones.map((b) => ({ ...b, y: b.y + 10 }));
        updated = updated.filter((b) => {
          if (b.y > GAME_HEIGHT - 50) {
            if (b.x + BONE_WIDTH > dogX && b.x < dogX + DOG_WIDTH) {
              const reward = b.type === "bonus" ? 5 : 1;
              setScore((prev) => prev + reward);
            }
            return false;
          }
          return true;
        });
        if (updated.length < 3) {
          const type = Math.random() < 0.1 ? "bonus" : "normal";
          const newBone = {
            x: Math.floor(Math.random() * (GAME_WIDTH - BONE_WIDTH)),
            y: 0,
            type
          };
          updated.push(newBone);
        }
        return updated;
      });
    }, 100);
    return () => clearInterval(gameLoop);
  }, [dogX, gameOver, playing]);

  useEffect(() => {
    const fetchMultiplier = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        const streak = data.loginStreak || 0;
        const multiplier = 1 + Math.floor(streak / 5);
        setStreakMultiplier(multiplier);
      }
    };
    fetchMultiplier();
  }, []);

  const handlePlayAgain = () => {
    setDogX(150);
    setBones([]);
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setPlaying(true);
  };

  return (
    <div className="fetch-container grayscale">
      <h2>🐶 Fetch Frenzy</h2>
      <div className="info">Score: {score} | Time Left: {timeLeft}s | Multiplier: x{streakMultiplier}</div>
      <div className="game-area" ref={gameAreaRef}>
        <div className="dog" style={{ left: `${dogX}px` }} />
        {bones.map((b, i) => (
          <div
            key={i}
            className={`bone ${b.type}`}
            style={{ top: `${b.y}px`, left: `${b.x}px` }}
          />
        ))}
      </div>
      {gameOver && (
        <div className="game-over">
          <p>Game Over! Your Score: {score}</p>
          <button onClick={handlePlayAgain}>Play Again</button>
          <button onClick={() => navigate("/dashboard")}>Quit</button>
        </div>
      )}
    </div>
  );
};

export default FetchFrenzy;
