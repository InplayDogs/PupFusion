// src/components/auth/RequireAuth.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig'; // Correct path to firebaseConfig

const RequireAuth = ({ children }) => {
  const user = auth.currentUser; // Get current user

  if (!user) {
    // If no user, redirect to login page
    return <Navigate to="/login" />;
  }

  return children;  // If the user is authenticated, show the children components
};

export default RequireAuth;
