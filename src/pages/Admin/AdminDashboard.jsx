import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUsers, FaUserMd, FaCalendarCheck, FaMoneyCheckAlt } from "react-icons/fa";
import axios from "axios";
const AdminDashboard = () => {
  const navigate = useNavigate()
  const stats = [
    { name: "Total Users", value: 120, icon: FaUsers, bg: "bg-blue-50", text: "text-blue-700" },
    { name: "Doctors", value: 35, icon: FaUserMd, bg: "bg-green-50", text: "text-green-700" },
    { name: "Appointments", value: 78, icon: FaCalendarCheck, bg: "bg-yellow-50", text: "text-yellow-700" },
    { name: "Payments", value: 150, icon: FaMoneyCheckAlt, bg: "bg-purple-50", text: "text-purple-700" },
  ];
  const logoutUrl = 'http://localhost:9090/api/auth/logout'

  const handleLogout = async () => {
    try {
      await axios.post(logoutUrl, {}, { withCredentials: true })
      navigate('/') // redirect to login page after logout
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-8 relative">
      {/* Logout Button */}
      <button
      onClick={handleLogout}
        className="absolute top-5 right-5 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold 
        hover:bg-red-600 active:bg-red-700 shadow-md transition"
      >
        Logout
      </button>

      {/* Welcome Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome, Admin!</h1>
        <p className="text-gray-600 text-lg">Manage your hospital system efficiently</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`flex items-center p-6 rounded-xl shadow-lg ${stat.bg} hover:shadow-2xl transition`}
            >
              <div className={`p-4 rounded-full ${stat.text} bg-white/40 mr-4`}>
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-gray-600">{stat.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/admin/addUsers"
          className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition transform hover:scale-105"
        >
          <p className="font-semibold text-gray-800 text-lg mb-2">Add Users</p>
        </Link>
        <Link
          to="/admin/addHospital"
          className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition transform hover:scale-105"
        >
          <p className="font-semibold text-gray-800 text-lg mb-2">Add Hospital</p>
        </Link>
        <Link
          to="/admin/appointments"
          className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition transform hover:scale-105"
        >
          <p className="font-semibold text-gray-800 text-lg mb-2">Appointments</p>
        </Link>
        <Link
          to="/admin/payments"
          className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition transform hover:scale-105"
        >
          <p className="font-semibold text-gray-800 text-lg mb-2">Payments</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
