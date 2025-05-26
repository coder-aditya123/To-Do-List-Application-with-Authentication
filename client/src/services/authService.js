// client/src/services/authService.js
import api from './api'; // Axios instance ko import karein

const API_URL = '/auth'; // Backend auth routes ka base path

// Register user
const register = async (username, email, password) => {
  try {
    const response = await api.post(`${API_URL}/register`, { username, email, password });
    // Successful registration ke baad user data localStorage mein store karein
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    // Error handling
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    throw message;
  }
};

// Login user
const login = async (email, password) => {
  try {
    const response = await api.post(`${API_URL}/login`, { email, password });
    // Successful login ke baad user data localStorage mein store karein
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    // Error handling
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    throw message;
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;