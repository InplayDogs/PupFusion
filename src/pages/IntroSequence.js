// src/pages/IntroSequence.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import dogImg from "../assets/pixel-dogs/dog-level0.png";
import "./IntroSequence.css";

const IntroSequence = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [showContinue, setShowContinue] = useState(false);
  const [showSkip, setShowSkip] = useState(true);
  const navigate = useNavigate();

  const fullText = `Long ago, the world was only black and white. It was quiet. Still. And very pixelated.
A traveler wandered for ages… until one day, a dog appeared.
The two became friends.
The dog began to dig. And dig. And dig.
Until it found something glowing beneath the ground: a red collar.`;

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      navigate("/name-your-dog");
    }
  }, [navigate]);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.substring(0, index + 1));
        setIndex(index + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      setShowContinue(true);
      setShowSkip(false);
    }
  }, [index, fullText]);

  return (
    <div className="intro-sequence">
      <div className="intro-text-box">
        <p>{displayedText}</p>
        {showSkip && (
          <button className="skip-button" onClick={() => navigate("/name-your-dog")}>Skip</button>
        )}
        {showContinue && (
          <button className="intro-button" onClick={() => navigate("/name-your-dog")}>Continue</button>
        )}
      </div>
      <div className="walking-dog">
        <img src={dogImg} alt="Dog walking" />
      </div>
    </div>
  );
};

export default IntroSequence;
