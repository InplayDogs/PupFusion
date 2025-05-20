// src/components/DogboneArcade/DogboneArcade.js
import React from "react";
import "./DogboneArcade.css";

import dog1 from "../../assets/pixel-dogs/dog1.png";
import dog2 from "../../assets/pixel-dogs/dog2.png";
import dog3 from "../../assets/pixel-dogs/dog3.png";
import dog4 from "../../assets/pixel-dogs/dog4.png";
import dog5 from "../../assets/pixel-dogs/dog5.png";

const DogboneArcade = () => {
  const games = [
    {
      title: "Fetch Frenzy",
      description: "Catch as many bones as you can!",
      route: "/fetch-frenzy",
      image: dog1
    },
    {
      title: "Dig Yard",
      description: "Dig up bones and hidden treasures.",
      route: "/dig-yard",
      image: dog2
    },
    {
      title: "Alert Dash",
      description: "Tap to alert! Speed is everything.",
      route: "/alert-dash",
      image: dog3
    },
    {
      title: "Pack Memory",
      description: "Flip the cards, match the pups.",
      route: "/pack-memory",
      image: dog4
    },
    {
      title: "Dock Diving",
      description: "Launch and score the longest jump!",
      route: "/dock-diving",
      image: dog5
    }
  ];

  return (
    <div className="arcade-container">
      <h2 className="arcade-header">Dogbone Arcade</h2>
      <div className="arcade-grid">
        {games.map((game, index) => (
          <div key={index} className="arcade-card">
            <img src={game.image} alt="Game Preview" className="arcade-image" />
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            <button onClick={() => window.location.href = game.route}>
              Play Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DogboneArcade;
