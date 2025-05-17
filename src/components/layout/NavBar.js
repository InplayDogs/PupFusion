// src/components/layout/NavBar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        <Link to="/">Inplay Dogs</Link>
      </div>
      <ul className="nav-links">
        <li className={pathname === "/" ? "active" : ""}>
          <Link to="/">Dashboard</Link>
        </li>
        <li className={pathname === "/dogbone-arcade" ? "active" : ""}>
          <Link to="/dogbone-arcade">Dogbone Arcade</Link>
        </li>
        <li className={pathname === "/login" ? "active" : ""}>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
