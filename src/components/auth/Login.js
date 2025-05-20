// src/components/auth/Login.js
import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isLogin) {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        if (!user.emailVerified) {
          setMessage("Please verify your email before continuing.");
        } else {
          navigate("/dashboard");
        }
      } else {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(user);
        setMessage("Verification email sent. Please check your inbox.");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? "Log In" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">{isLogin ? "Log In" : "Create Account"}</button>
      </form>

      <p style={{ color: "lime", marginTop: "10px" }}>{message}</p>

      <button onClick={toggleMode} style={{ marginTop: "10px", textDecoration: "underline" }}>
        {isLogin ? "Need an account? Sign Up" : "Already have an account? Log In"}
      </button>
    </div>
  );
};

export default Login;
