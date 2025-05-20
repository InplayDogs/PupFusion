// src/pages/NameYourDog.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInAnonymously,
  onAuthStateChanged,
} from "firebase/auth";
import "./NameYourDog.css";

const NameYourDog = () => {
  const [dogName, setDogName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!password) {
      setPasswordStrength("");
    } else if (password.length < 6) {
      setPasswordStrength("Weak");
    } else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      setPasswordStrength("Moderate");
    } else {
      setPasswordStrength("Strong");
    }
  }, [password]);

  const handleSubmit = async () => {
    setError("");
    if (!dogName.trim()) {
      setError("Please enter a name for your dog.");
      return;
    }

    try {
      let currentUser = user;

      if (!currentUser) {
        if (!email.trim() || !password.trim()) {
          setError("Please enter an email and password to create your account.");
          return;
        }

        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        currentUser = userCred.user;
      }

      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          dogName: dogName.trim(),
          totalDogbone: 0,
          loginStreak: 1,
          energy: 5,
          mood: "Happy",
          worldColorTier: "grayscale",
          unlockedColors: []
        },
        { merge: true } // ✅ fixes missing doc error
      );

      setSuccessMessage(`Great job! Your journey with ${dogName} begins now.`);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleSkip = async () => {
    try {
      const result = await signInAnonymously(auth);
      await setDoc(doc(db, "users", result.user.uid), {
        dogName: dogName.trim(),
        totalDogbone: 0,
        loginStreak: 1,
        energy: 5,
        mood: "Happy",
        worldColorTier: "grayscale",
        unlockedColors: []
      });
      setSuccessMessage(`Let's go! ${dogName} is waiting...`);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError("Failed to continue as guest.");
    }
  };

  return (
    <div className="name-your-dog">
      <h2>What is your dog's name?</h2>
      <input
        type="text"
        value={dogName}
        onChange={(e) => setDogName(e.target.value)}
        placeholder="Enter your dog's name"
      />

      {!user && (
        <>
          <p style={{ marginBottom: "10px", fontSize: "0.95rem" }}>
            We need your email and a password to create your account so you can come back and bring your world to color!
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {password && (
            <p
              style={{
                fontSize: "0.85rem",
                marginTop: "-6px",
                color:
                  passwordStrength === "Weak"
                    ? "crimson"
                    : passwordStrength === "Moderate"
                    ? "#f0ad4e"
                    : "green",
              }}
            >
              Password Strength: {passwordStrength}
            </p>
          )}
        </>
      )}

      <button onClick={handleSubmit}>Continue</button>
      {!user && (
        <button onClick={handleSkip} style={{ marginTop: "10px", background: "#555" }}>
          Skip (Continue without account)
        </button>
      )}

      {error && <p className="error-message">{error}</p>}
      {successMessage && (
        <p style={{ marginTop: "15px", fontWeight: "bold", color: "green" }}>{successMessage}</p>
      )}
    </div>
  );
};

export default NameYourDog;
