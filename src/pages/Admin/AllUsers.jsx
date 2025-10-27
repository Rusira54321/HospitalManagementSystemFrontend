import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaUserNurse, FaUserShield, FaUserInjured, FaUsers } from 'react-icons/fa';

const AllUsers = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg flex items-center justify-center">
              <FaUsers className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                User Management
              </h1>
              <p className="text-slate-600 mt-1">
                Access and manage all user categories
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* All Doctors */}
          <Link
            to="/admin/allDoctors"
            className="group flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-100 hover:border-emerald-100 hover:-translate-y-1"
          >
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
              <FaUserMd className="w-8 h-8 text-white" />
            </div>
            <span className="font-semibold text-slate-800 text-lg mt-6">All Doctors</span>
            <p className="text-slate-500 text-sm mt-2 text-center">Manage hospital physicians</p>
          </Link>

          {/* All Hospital Staffs */}
          <Link
            to="/admin/allHospitalStaffs"
            className="group flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-100 hover:border-emerald-100 hover:-translate-y-1"
          >
            <div className="p-4 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
              <FaUserNurse className="w-8 h-8 text-white" />
            </div>
            <span className="font-semibold text-slate-800 text-lg mt-6">All Hospital Staff</span>
            <p className="text-slate-500 text-sm mt-2 text-center">Manage support personnel</p>
          </Link>
          
          {/* All Healthcare Managers */}
          <Link
            to="/admin/allHealthCareManagers"
            className="group flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-100 hover:border-emerald-100 hover:-translate-y-1"
          >
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
              <FaUserShield className="w-8 h-8 text-white" />
            </div>
            <span className="font-semibold text-slate-800 text-lg mt-6">Healthcare Managers</span>
            <p className="text-slate-500 text-sm mt-2 text-center">Oversee healthcare operations</p>
          </Link>

          {/* All Patients */}
          <Link
            to="/admin/allPatients"
            className="group flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-100 hover:border-emerald-100 hover:-translate-y-1"
          >
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
              <FaUserInjured className="w-8 h-8 text-white" />
            </div>
            <span className="font-semibold text-slate-800 text-lg mt-6">All Patients</span>
            <p className="text-slate-500 text-sm mt-2 text-center">Access patient records</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AllUsers
