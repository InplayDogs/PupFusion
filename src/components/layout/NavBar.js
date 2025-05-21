// src/components/layout/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../../assets/logos/pupfusion-logo2.png'; // Updated logo path
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import useAuth from '../../hooks/useAuth'; // Import useAuth hook

const NavBar = () => {
  const user = useAuth(); // Get current user from useAuth

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/login'; // Redirect to login page after logout
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={logo} alt="PupFusion Logo" className="logo-icon" />
        PupFusion
      </Link>
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/fusion">Fusion</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/doghouse">Doghouse</Link>
        <Link to="/arcade">Arcade</Link>
        <Link to="/explore">Explore</Link>
      </div>
      <div className="navbar-login">
        {user ? (
          <button onClick={handleLogout} className="login-button">
            Log Out
          </button>
        ) : (
          <Link to="/login" className="login-button">Log In</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
