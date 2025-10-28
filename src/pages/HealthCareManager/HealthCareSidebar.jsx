import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserInjured,
  FaCalendarCheck,
  FaPrescription,
  FaMoneyCheckAlt,
  FaUserMd,
} from "react-icons/fa";

const HealthCareSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: FaTachometerAlt, path: "/healthCareManager/dashboard" }
  ];

  return (
    <aside className="flex flex-col h-full bg-white shadow-xl w-64 border-r border-gray-200">
      {/* Logo / Header */}
      <div className="flex flex-col items-center justify-center h-28 border-b border-gray-200 px-4">
        <h1 className="text-xl font-bold text-blue-600 text-center">
          Health Care Manager
        </h1>
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
              className={`flex items-center px-4 py-3 rounded-lg mb-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-700 shadow-inner"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
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
          onClick={() => alert("Profile settings clicked!")}
          className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-200"
        >
          <FaUserMd className="w-5 h-5 mr-2 text-gray-600" />
          Profile
        </button>
      </div>
    </aside>
  );
};

export default HealthCareSidebar;