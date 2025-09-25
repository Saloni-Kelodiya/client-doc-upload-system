import React from "react";
import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100 text-gray-800">
      {/* Sticky Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-700 mb-2 sm:mb-0 transform transition-transform hover:scale-105 duration-300">
            📂 Client Document System
          </h1>
          <nav className="flex space-x-6 text-gray-600 text-base font-medium">
            <Link to="/" className="hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition-colors duration-200">
              Home
            </Link>
            <Link to="/register" className="hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition-colors duration-200">
              Register
            </Link>
            <Link to="/login" className="hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition-colors duration-200">
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="">
        <div className="">
          {children}
        </div>
      </main>

    
    </div>
  );
}

export default Layout;
