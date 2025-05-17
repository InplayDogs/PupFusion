// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import NavBar from "./components/layout/NavBar";

// Pages
import Login from "./components/auth/Login";
import Dashboard from "./pages/Dashboard";
import DogboneArcade from "./components/DogboneArcade/DogboneArcade";

// Mini-Games
import FetchFrenzy from "./components/DogboneArcade/mini-games/FetchFrenzy";
import DigYard from "./components/DogboneArcade/mini-games/DigYard";
import AlertDash from "./components/DogboneArcade/mini-games/AlertDash";
import PackMemory from "./components/DogboneArcade/mini-games/PackMemory";
import DogDockDiving from "./components/DogboneArcade/mini-games/DogDockDiving";

import "./App.css";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dogbone-arcade" element={<DogboneArcade />} />
        <Route path="/fetch-frenzy" element={<FetchFrenzy />} />
        <Route path="/dig-yard" element={<DigYard />} />
        <Route path="/alert-dash" element={<AlertDash />} />
        <Route path="/pack-memory" element={<PackMemory />} />
        <Route path="/dog-dock-diving" element={<DogDockDiving />} />
      </Routes>
    </Router>
  );
};

export default App;
