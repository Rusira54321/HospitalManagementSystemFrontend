import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserInjured,
  FaCalendarCheck,
  FaUserPlus,
  FaMoneyCheckAlt,
  FaUserMd,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const DoctorSidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: FaTachometerAlt, path: "/Doctor/DoctorDashboard" },
    { name: "My Patients", icon: FaUserInjured, path: "/Doctor/BookedAppointments" },
    { name: "Appointments", icon: FaCalendarCheck, path: "/Doctor/Appoinments" },
    { name: "Add Secretary", icon: FaUserPlus, path: "/Doctor/allSecretary" },
    { name: "Payments", icon: FaMoneyCheckAlt, path: "/Doctor/payments" },
  ];

  return (
    <div
      className={`flex flex-col h-screen bg-gradient-to-b from-blue-50 to-white shadow-xl transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-20 px-5 border-b border-gray-200">
        {isOpen && (
          <h1 className="text-xl font-bold text-blue-600 tracking-wide">
            Doctor Portal
          </h1>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 hover:text-blue-600 transition"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Welcome Message */}
      {isOpen && (
        <div className="px-5 py-3 text-gray-600 border-b border-gray-100">
          <p className="text-sm">
            👋 Welcome, <span className="font-semibold text-blue-700">Dr. John</span>
          </p>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-semibold shadow-sm"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <Icon className="text-lg" />
              {isOpen && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t border-gray-200 p-4">
        <button
          onClick={() => alert("Profile settings clicked!")}
          className="flex items-center justify-center w-full gap-3 text-gray-700 hover:bg-gray-100 p-3 rounded-lg transition-all duration-200"
        >
          <FaUserMd className="text-lg" />
          {isOpen && <span className="font-medium">Profile</span>}
        </button>
      </div>
    </div>
  );
};

export default DoctorSidebar;
