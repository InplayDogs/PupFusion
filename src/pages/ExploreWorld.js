// src/pages/ExploreWorld.js
import React from "react";
import "./ExploreWorld.css";
import { useNavigate } from "react-router-dom";
import forest from "../assets/base-dog.jpg";
import woods from "../assets/base-dog.jpg";
import desert from "../assets/base-dog.jpg";
import tundra from "../assets/base-dog.jpg";
import river from "../assets/base-dog.jpg";
import beach from "../assets/base-dog.jpg";

const ExploreWorld = () => {
  const navigate = useNavigate();

  const regions = [
    {
      name: "🌲 Forest",
      description: "Lush trees, hidden bones, and secret trails.",
      image: forest,
      available: true,
      path: "/explore/forest"
    },
    {
      name: "🌳 Woods",
      description: "Quiet and mysterious. Only the brave explore here.",
      image: woods,
      available: false,
      path: ""
    },
    {
      name: "🏜️ Desert",
      description: "Hot winds, buried treasures, and ancient ruins.",
      image: desert,
      available: false,
      path: ""
    },
    {
      name: "❄️ Tundra",
      description: "Cold as ice. Bring a coat.",
      image: tundra,
      available: false,
      path: ""
    },
    {
      name: "🌊 River",
      description: "Waterways where glints of color shimmer.",
      image: river,
      available: false,
      path: ""
    },
    {
      name: "🏖️ Beach",
      description: "Sandy paws, sunny skies, buried loot.",
      image: beach,
      available: false,
      path: ""
    }
  ];

  return (
    <div className="explore-container grayscale">
      <h2 className="explore-header">Explore the World</h2>
      <div className="explore-grid">
        {regions.map((region, index) => (
          <div key={index} className="explore-card">
            <img src={region.image} alt={region.name} className="explore-image" />
            <h3>{region.name}</h3>
            <p>{region.description}</p>
            <button
              onClick={() => region.available && navigate(region.path)}
              disabled={!region.available}
            >
              {region.available ? "Visit" : "Coming Soon"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreWorld;
