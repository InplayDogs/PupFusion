// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Login from "./components/auth/Login";
import Dashboard from "./pages/Dashboard";
import DogboneArcade from "./components/DogboneArcade/DogboneArcade";
import FetchFrenzy from "./components/DogboneArcade/mini-games/FetchFrenzy";
import DigYard from "./components/DogboneArcade/mini-games/DigYard";
import AlertDash from "./components/DogboneArcade/mini-games/AlertDash";
import PackMemory from "./components/DogboneArcade/mini-games/PackMemory";
import DockDiving from "./components/DogboneArcade/mini-games/DockDiving";
import Doghouse from "./pages/Doghouse";
import FusionReactor from "./pages/FusionReactor";
import CollarInventory from "./components/World/CollarInventory";
import ColorPortfolio from "./pages/ColorPortfolio";
import WorldView from "./components/World/WorldView";
import IntroSequence from "./pages/IntroSequence";
import NameYourDog from "./pages/NameYourDog";
import ExploreWorld from "./pages/ExploreWorld";
import ForestWorld from "./pages/ForestWorld";

import "./App.css";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<WorldView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dogbone-arcade" element={<DogboneArcade />} />
        <Route path="/fetch-frenzy" element={<FetchFrenzy />} />
        <Route path="/dig-yard" element={<DigYard />} />
        <Route path="/alert-dash" element={<AlertDash />} />
        <Route path="/pack-memory" element={<PackMemory />} />
        <Route path="/dock-diving" element={<DockDiving />} />
        <Route path="/doghouse" element={<Doghouse />} />
        <Route path="/fusion" element={<FusionReactor />} />
        <Route path="/inventory" element={<CollarInventory />} />
        <Route path="/portfolio" element={<ColorPortfolio />} />
        <Route path="/intro-sequence" element={<IntroSequence />} />
        <Route path="/name-your-dog" element={<NameYourDog />} />
        <Route path="/explore" element={<ExploreWorld />} />
        <Route path="/explore/forest" element={<ForestWorld />} />
      </Routes>
    </Router>
  );
};

export default App;
