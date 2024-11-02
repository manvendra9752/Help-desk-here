import React from "react";
import { Link } from "react-router-dom";

const Pagenotfound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center p-8">
      <h1 className="text-8xl font-extrabold text-red-600 mb-4">404</h1>
      <p className="text-3xl font-semibold mb-4">Page Not Found</p>
      <p className="text-lg text-gray-300 mb-8">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Pagenotfound;
