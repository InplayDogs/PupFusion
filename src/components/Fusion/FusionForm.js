// src/components/Fusion/FusionForm.js
import React, { useState } from "react";
import "./FusionForm.css";

const FusionForm = ({ onFuse }) => {
  const [collar1, setCollar1] = useState("");
  const [collar2, setCollar2] = useState("");
  const [fusing, setFusing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!collar1 || !collar2) return alert("Select two collars to fuse.");
    setFusing(true);
    setTimeout(() => {
      onFuse(collar1, collar2);
      setFusing(false);
    }, 1000);
  };

  return (
    <div className="fusion-form">
      <form onSubmit={handleSubmit}>
        <h3>Fusion Console</h3>
        <div className="fusion-inputs">
          <select value={collar1} onChange={(e) => setCollar1(e.target.value)}>
            <option value="">Select Collar 1</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
          </select>

          <span className="plus">+</span>

          <select value={collar2} onChange={(e) => setCollar2(e.target.value)}>
            <option value="">Select Collar 2</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
          </select>
        </div>

        <button type="submit" disabled={fusing}>
          {fusing ? "Fusing..." : "Fuse Collars"}
        </button>
      </form>
    </div>
  );
};

export default FusionForm;
