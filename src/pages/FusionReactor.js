// src/pages/FusionReactor.js
import React, { useState } from 'react';
import './FusionReactor.css';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Toast from '../components/Toast';

const FusionReactor = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [result, setResult] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const user = getAuth().currentUser;
  const userRef = user ? doc(db, 'users', user.uid) : null;

  const fusionTable = {
    redblue: 'purple',
    bluered: 'purple',
    blueyellow: 'green',
    yellowblue: 'green',
    redyellow: 'orange',
    yellowred: 'orange',
  };

  const handleFusion = async () => {
    if (!input1 || !input2) return;

    const key = input1 + input2;
    const fusionResult = fusionTable[key];
    if (!fusionResult) {
      setToastMessage('Invalid fusion combination');
      return;
    }

    setResult(fusionResult);
    setToastMessage(`You discovered ${fusionResult.charAt(0).toUpperCase() + fusionResult.slice(1)}!`);

    if (userRef) {
      const docSnap = await getDoc(userRef);
      const existingColors = docSnap.exists() ? docSnap.data().colorsUnlocked || [] : [];

      if (!existingColors.includes(fusionResult)) {
        await updateDoc(userRef, {
          colorsUnlocked: [...existingColors, fusionResult],
        });
      }
    }
  };

  return (
    <div className="fusion-container">
      <h1>Fusion Reactor</h1>
      <div className="fusion-inputs">
        <select value={input1} onChange={(e) => setInput1(e.target.value)}>
          <option value="">Select First Collar</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
        </select>
        <select value={input2} onChange={(e) => setInput2(e.target.value)}>
          <option value="">Select Second Collar</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
        </select>
      </div>
      <button onClick={handleFusion}>Fuse</button>
      {result && <div className="fusion-result">Result: {result.toUpperCase()}</div>}
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
    </div>
  );
};

export default FusionReactor;
