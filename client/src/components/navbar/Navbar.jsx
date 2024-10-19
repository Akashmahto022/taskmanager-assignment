import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center shadow-md fixed top-0 left-0 right-0 z-10">
      {/* Logo */}
      <div className="text-white font-bold text-xl">
        <Link to={"/dashboard"}>Task App</Link>
      </div>

      {/* User Icon and Dropdown */}
      <div className="relative">
        <button
          className="flex items-center space-x-2 text-white focus:outline-none"
          onClick={handleDropdown}
        >
          <FaUserCircle className="text-2xl" />
          <span className="hidden sm:inline">Username</span>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
            <p className="px-4 py-2 text-gray-800">Username</p>
            <button
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
