// client/src/components/Navbar/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'; // Import AuthContext

function Navbar() {
  const { user, logout } = useContext(AuthContext); // Get user and logout from AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout function from AuthContext
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold hover:text-gray-300 transition duration-300">
          To-Do App
        </Link>
        <div className="space-x-4">
          {!user ? ( // If user is not logged in
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition duration-300">
                Login
              </Link>
              <Link to="/register" className="text-gray-300 hover:text-white transition duration-300">
                Register
              </Link>
            </>
          ) : ( // If user is logged in
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition duration-300">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white transition duration-300 bg-red-600 px-3 py-1 rounded"
              >
                Logout ({user.username})
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;