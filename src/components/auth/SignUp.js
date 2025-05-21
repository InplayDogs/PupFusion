import React, { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [dogName, setDogName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!dogName.trim()) {
      setError("Please enter a name for your dog.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save dogName in Firestore users collection
      await setDoc(doc(db, "users", user.uid), {
        dogName: dogName.trim(),
        unlockedColors: [],
        energy: 5,
        mood: "Happy",
        totalDogbone: 0,
        loginStreak: 0,
        worldColorTier: "grayscale"
      });

      // Send email verification
      await sendEmailVerification(user);

      setMessage("Account created! Verification email sent. Please check your inbox.");
      // Redirect to login page
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          Dog's Name:
          <input
            type="text"
            value={dogName}
            onChange={(e) => setDogName(e.target.value)}
            placeholder="Name your dog"
            required
            maxLength={20}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create password"
            required
            minLength={6}
          />
        </label>

        {/* Placeholder for Wallet Connection */}
        <div className="wallet-placeholder">
          <p><em>Connect your crypto wallet (coming soon)</em></p>
          <button type="button" disabled className="wallet-connect-btn">
            Connect Wallet
          </button>
        </div>

        <button type="submit" className="signup-submit-btn">Create Account</button>
      </form>

      {message && <p className="signup-message">{message}</p>}
      {error && <p className="signup-error">{error}</p>}
    </div>
  );
};

export default SignUp;
