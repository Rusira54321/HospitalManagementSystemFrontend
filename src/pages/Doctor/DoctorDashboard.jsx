import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const DoctorDashboard = () => {
  const navigate = useNavigate()
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-200 flex flex-col items-center justify-center px-4 py-8 relative">
      
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-5 right-5 px-6 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold 
        hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>Logout</span>
      </button>

      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 w-full max-w-3xl border border-white/20">
        <div className="flex flex-col items-center mb-12">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-5 mb-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Doctor Dashboard
          </h1>
          <p className="text-gray-600 text-lg font-medium">Welcome to MediCore Doctor Panel</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Link 
            to="/Doctor/BookedAppointments" 
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-white/90 backdrop-blur-md p-8 flex flex-col items-center transform group-hover:translate-y-[-4px] transition-transform duration-300">
              <div className="bg-blue-100 rounded-xl p-4 mb-4 group-hover:bg-white/10 transition-colors duration-300">
                <svg className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6M9 17h6M12 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">View Patients</span>
              <p className="mt-2 text-gray-600 text-sm text-center group-hover:text-white/90 transition-colors duration-300">
                Check your patient appointments and records
              </p>
            </div>
          </Link>

          <Link 
            to="/Doctor/addAppoinment"
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-white/90 backdrop-blur-md p-8 flex flex-col items-center transform group-hover:translate-y-[-4px] transition-transform duration-300">
              <div className="bg-purple-100 rounded-xl p-4 mb-4 group-hover:bg-white/10 transition-colors duration-300">
                <svg className="w-10 h-10 text-purple-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">Add Appointment</span>
              <p className="mt-2 text-gray-600 text-sm text-center group-hover:text-white/90 transition-colors duration-300">
                Create new appointments and schedules
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
