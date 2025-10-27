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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 relative">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-5 right-5 px-6 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white 
        rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 active:from-red-700 active:to-pink-700 
        shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 transform hover:scale-[1.02]"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>

      {/* Welcome Section */}
      <div className="text-center mb-12">
        <div className="inline-block bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-4 mb-6 
        shadow-lg transform hover:scale-105 transition-all duration-300">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text 
        text-transparent mb-3">Welcome, Admin!</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Manage your hospital system efficiently with comprehensive tools and insights
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl 
              transition-all duration-300 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-6 flex items-start space-x-4 relative z-10">
                <div className={`p-4 rounded-xl bg-gradient-to-br from-${stat.text.split('-')[1]}-500 
                to-${stat.text.split('-')[1]}-400 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-3xl font-bold bg-gradient-to-br from-gray-800 to-gray-600 
                  bg-clip-text text-transparent mb-1">{stat.value}</p>
                  <p className="text-gray-600 font-medium">{stat.name}</p>
                </div>
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-transparent 
              via-${stat.text.split('-')[1]}-500/50 to-transparent transform scale-x-0 
              group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/admin/addUsers"
          className="group bg-white/80 backdrop-blur-lg rounded-2xl p-8 text-center shadow-lg hover:shadow-xl 
          transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden border border-blue-100/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl p-4 mb-4 mx-auto w-16 
          group-hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <p className="font-semibold text-xl bg-gradient-to-r from-blue-600 to-purple-600 
          bg-clip-text text-transparent mb-2">Add Users</p>
          <p className="text-gray-600 text-sm">Register new doctors and staff members</p>
        </Link>

        <Link
          to="/admin/addHospital"
          className="group bg-white/80 backdrop-blur-lg rounded-2xl p-8 text-center shadow-lg hover:shadow-xl 
          transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden border border-blue-100/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl p-4 mb-4 mx-auto w-16 
          group-hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <p className="font-semibold text-xl bg-gradient-to-r from-blue-600 to-purple-600 
          bg-clip-text text-transparent mb-2">Add Hospital</p>
          <p className="text-gray-600 text-sm">Register new healthcare facilities</p>
        </Link>

        <Link
          to="/admin/appointments"
          className="group bg-white/80 backdrop-blur-lg rounded-2xl p-8 text-center shadow-lg hover:shadow-xl 
          transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden border border-blue-100/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl p-4 mb-4 mx-auto w-16 
          group-hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="font-semibold text-xl bg-gradient-to-r from-blue-600 to-purple-600 
          bg-clip-text text-transparent mb-2">Appointments</p>
          <p className="text-gray-600 text-sm">Manage patient appointments</p>
        </Link>

        <Link
          to="/admin/payments"
          className="group bg-white/80 backdrop-blur-lg rounded-2xl p-8 text-center shadow-lg hover:shadow-xl 
          transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden border border-blue-100/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl p-4 mb-4 mx-auto w-16 
          group-hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="font-semibold text-xl bg-gradient-to-r from-blue-600 to-purple-600 
          bg-clip-text text-transparent mb-2">Payments</p>
          <p className="text-gray-600 text-sm">Track and manage transactions</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
