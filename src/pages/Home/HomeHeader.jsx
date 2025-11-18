import React from "react";
import { Link } from "react-router-dom";

const HomeHeader = () => {
  return (
    <header className="backdrop-blur-md bg-white/70 shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        
        {/* Brand */}
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          MediCore
        </h1>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-100/40 transition-all duration-300"
          >
            Home
          </Link>

          <Link
            to="/userGuide"
            className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-100/40 transition-all duration-300"
          >
            User Guide
          </Link>

          <Link
            to="/login"
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
