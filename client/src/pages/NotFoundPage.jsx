// client/src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center bg-red-50">
      <h1 className="text-6xl font-extrabold text-red-700 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-6">Page Not Found</p>
      <p className="text-lg text-gray-600 mb-8">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
      >
        Go to Homepage
      </Link>
    </div>
  );
}

export default NotFoundPage;