// src/components/DogboneArcade/DogboneArcade.js
import React from "react";
import { Link } from "react-router-dom";
import WeeklyLeaderboard from "../leaderboards/WeeklyLeaderboard";
import MonthlyLeaderboard from "../leaderboards/MonthlyLeaderboard";
import "./DogboneArcade.css";

const DogboneArcade = () => {
  return (
    <div className="dogbone-arcade-page">
      <h1>DOGBONE ARCADE</h1>

      <div className="game-links">
        <Link to="/fetch-frenzy" className="arcade-button">Fetch Frenzy</Link>
        <Link to="/dig-yard" className="arcade-button">Dig Yard</Link>
        <Link to="/alert-dash" className="arcade-button">Alert Dash</Link>
        <Link to="/pack-memory" className="arcade-button">Pack Memory</Link>
        <Link to="/dog-dock-diving" className="arcade-button">Dog Dock Diving</Link>
      </div>

      <div className="arcade-leaderboards">
        <WeeklyLeaderboard />
        <MonthlyLeaderboard />
      </div>
    </div>
  );
};

export default DogboneArcade;
