// client/src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center bg-gradient-to-br from-blue-100 to-purple-100">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
        Welcome to Your MERN To-Do App
      </h1>
      <p className="text-xl text-gray-700 mb-8 max-w-2xl">
        Organize your tasks and boost your productivity.
        <br />
        Login or Register to get started!
      </p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default HomePage;