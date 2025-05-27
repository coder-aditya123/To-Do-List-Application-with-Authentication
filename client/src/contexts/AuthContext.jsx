// client/src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService'; // authService ko import karein

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user info if logged in
  const [loading, setLoading] = useState(true); // To check if initial user loading is done

  // Check for user in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user'); 
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Finished checking if user exists in localStorage
  }, []);

  // Login function: authService ka login function call karega
  const login = async (email, password) => {
    try {
      const userData = await authService.login(email, password);
      setUser(userData); // authService ne localStorage mein data store kar diya hai
      return userData;
    } catch (error) {
      // Error handling authService se aa raha hai, yahan re-throw kar denge
      throw error;
    }
  };

  // Register function: authService ka register function call karega
  const register = async (username, email, password) => {
    try {
      const userData = await authService.register(username, email, password);
      setUser(userData); // authService ne localStorage mein data store kar diya hai
      return userData;
    } catch (error) {
      // Error handling authService se aa raha hai, yahan re-throw kar denge
      throw error;
    }
  };

  // Logout function: authService ka logout function call karega
  const logout = () => {
    authService.logout(); // localStorage se user data remove karega
    setUser(null); // Context state ko clear karega
  };

  // Provide the context values to children components
  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children} {/* Render children only after initial loading is done */}
    </AuthContext.Provider>
  );
};