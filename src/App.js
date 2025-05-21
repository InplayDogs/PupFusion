import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your pages
import Dashboard from './pages/Dashboard';
import FusionReactor from './pages/FusionReactor';
import CollarInventory from './pages/CollarInventory';
import Doghouse from './pages/Doghouse';
import ExploreWorld from './pages/ExploreWorld';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import IntroSequence from './pages/IntroSequence';
import NameYourDog from './pages/NameYourDog';

// Import the auth wrapper
import RequireAuth from './components/auth/RequireAuth';

// Import navigation
import NavBar from './components/layout/NavBar';
import WorldView from './components/World/WorldView';

// Import Arcade
import DogboneArcade from './components/DogboneArcade/DogboneArcade';

// Import global CSS from the correct path
import './assets/styles/global.css';

function App() {
  return (
    <Router>
      <NavBar /> {/* NavBar always visible */}
      <Routes>
        {/* Unauthenticated Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/intro-sequence" element={<IntroSequence />} />
        <Route path="/name-your-dog" element={<NameYourDog />} />

        {/* Protected Routes */}
        <Route path="/" element={<WorldView />} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/fusion" element={<RequireAuth><FusionReactor /></RequireAuth>} />
        <Route path="/inventory" element={<RequireAuth><CollarInventory /></RequireAuth>} />
        <Route path="/doghouse" element={<RequireAuth><Doghouse /></RequireAuth>} />
        <Route path="/arcade" element={<RequireAuth><DogboneArcade /></RequireAuth>} />
        <Route path="/explore" element={<RequireAuth><ExploreWorld /></RequireAuth>} />
      </Routes>
    </Router>
  );
}

export default App;
