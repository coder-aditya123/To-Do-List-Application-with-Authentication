// client/src/components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // Get user from AuthContext

  // If user is logged in, render the children (DashboardPage in this case)
  // Otherwise, redirect to login page
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;