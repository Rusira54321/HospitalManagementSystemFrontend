import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex flex-col items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-500 rounded-full p-4 mb-2 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v4a1 1 0 001 1h3m10-5h3a1 1 0 011 1v4a1 1 0 01-1 1h-3m-10 0v4a1 1 0 001 1h3m10-5h3a1 1 0 011 1v4a1 1 0 01-1 1h-3" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-blue-700 mb-1">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm text-center">Welcome to MediCore Admin Panel</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link to="/addDoctor" className="flex flex-col items-center bg-blue-100 rounded-xl p-6 shadow hover:bg-blue-200 transition cursor-pointer">
            <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7m-7-7a7 7 0 1114 0" />
            </svg>
            <span className="font-semibold text-blue-700">Add Doctor</span>
          </Link>
          <Link to="/addHospitalStaff" className="flex flex-col items-center bg-blue-100 rounded-xl p-6 shadow hover:bg-blue-200 transition cursor-pointer">
            <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01-8 0m8 0a4 4 0 01-8 0m8 0v4a4 4 0 01-8 0V7" />
            </svg>
            <span className="font-semibold text-blue-700">Add Hospital Staff</span>
          </Link>
          <Link to="/addHospital" className="flex flex-col items-center bg-blue-100 rounded-xl p-6 shadow hover:bg-blue-200 transition cursor-pointer">
            <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20m10-10H2" />
            </svg>
            <span className="font-semibold text-blue-700">Add Hospital</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
