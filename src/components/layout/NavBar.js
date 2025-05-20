// src/components/layout/NavBar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logos/pupfusion-logo.png";
import "./NavBar.css";

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <img src={logo} alt="PupFusion Logo" className="nav-logo" />
        <span className="nav-title">PupFusion</span>
      </div>
      <ul className="nav-links">
        <li className={location.pathname === "/dashboard" ? "active" : ""}>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className={location.pathname === "/doghouse" ? "active" : ""}>
          <Link to="/doghouse">Doghouse</Link>
        </li>
        <li className={location.pathname === "/dogbone-arcade" ? "active" : ""}>
          <Link to="/dogbone-arcade">Arcade</Link>
        </li>
        <li className={location.pathname === "/fusion" ? "active" : ""}>
          <Link to="/fusion">Fusion</Link>
        </li>
        <li className={location.pathname === "/inventory" ? "active" : ""}>
          <Link to="/inventory">Inventory</Link>
        </li>
        <li className={location.pathname === "/portfolio" ? "active" : ""}>
          <Link to="/portfolio">Portfolio</Link>
        </li>
        <li className={location.pathname.startsWith("/explore") ? "active" : ""}>
          <Link to="/explore">Explore</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
