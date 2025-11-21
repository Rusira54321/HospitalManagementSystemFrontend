import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,   // Dashboard
  FaUserPlus,        // Add Users
  FaHospital,        // Add Hospitals
  FaUsers,           // All Users
  FaBuilding,        // All Hospitals
  FaFileAlt,         // Reports
  FaCog              // Settings/Profile
} from "react-icons/fa";

const AdminSideBar = () => {
  const location = useLocation();
  const [isOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: FaTachometerAlt, path: "/admin/dashboard" },
    { name: "Add Users", icon: FaUserPlus, path: "/admin/addUsers" },
    { name: "Add Hospitals", icon: FaHospital, path: "/admin/addHospital" },
    { name: "All Users", icon: FaUsers, path: "/admin/allUsers" },
    { name: "All Hospitals", icon: FaBuilding, path: "/admin/allHospitals" },

  ];

  return (
    <div className="flex flex-col bg-white shadow-lg w-64 h-full">
      {/* Logo / Header */}
      <div className="flex flex-col items-center justify-center h-28 border-b border-gray-200 px-4">
        <h1 className="text-xl font-bold text-blue-600 mb-1">Admin Portal</h1>
        <p className="text-gray-600 text-sm">Welcome, Admin!</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg mb-2 transition-all hover:bg-blue-100 ${
                isActive
                  ? "bg-blue-100 font-semibold text-blue-600"
                  : "text-gray-700"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-6 border-t border-gray-200">
        <button
          onClick={() => alert("Settings clicked!")}
          className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition"
        >
          <FaCog className="w-5 h-5 mr-2" />
          Settings
        </button>
      </div>
    </div>
  );
};

export default AdminSideBar;
