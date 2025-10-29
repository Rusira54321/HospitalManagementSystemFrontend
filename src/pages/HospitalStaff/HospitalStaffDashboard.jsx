import React from "react";
import { motion } from "framer-motion";
import { FaCalendarPlus, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const HospitalStaffDashboard = () => {
  const navigate = useNavigate();
  const logoutUrl = 'http://localhost:9090/api/auth/logout'
  const handleAddAppointment = () => {
    navigate("/healthCareStaff/addappointment");
  };

  const handleLogout = async() => {
    await axios.post(logoutUrl, {}, { withCredentials: true }) 
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex flex-col items-center justify-center relative p-6">

      {/* 🔹 Logout Button (Top Right Corner) */}
      <motion.button
        whileHover={{ scale: 1.05, opacity: 0.9 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
        className="absolute top-6 right-6 flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
      >
        <FaSignOutAlt className="text-lg" />
        Logout
      </motion.button>

      {/* 🔹 Dashboard Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-10 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      >
        <div className="bg-gradient-to-r from-indigo-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center shadow-md mb-6">
          <FaCalendarPlus className="text-white text-4xl" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Add Appointment
        </h1>
        <p className="text-gray-600 mb-8">
          Quickly schedule a new patient appointment with just one click.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAddAppointment}
          className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-pink-600 rounded-full shadow-lg hover:from-indigo-700 hover:to-pink-700 transition-all"
        >
          + Add Appointment
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HospitalStaffDashboard;
