import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-creamMain px-6 text-center">
      <h1 className="text-9xl font-bold text-orangeMain mb-4 font-serif">404</h1>
      <h2 className="text-3xl font-bold text-greenExtra mb-6">Page Not Found</h2>
      <p className="text-xl text-gray-600 mb-8 max-w-lg">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="bg-orangeMain text-white py-3 px-8 rounded-full font-bold shadow-lg hover:bg-white hover:text-orangeMain border-2 border-transparent hover:border-orangeMain transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
