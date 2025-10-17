import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserMd, FaUserNurse, FaUserShield, FaUserInjured } from 'react-icons/fa'

const AllUsers = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 px-4 py-10">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">All Users</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* All Doctors */}
          <Link
            to="/admin/allDoctors"
            className="flex flex-col items-center justify-center bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer border border-blue-200"
          >
            <FaUserMd className="w-12 h-12 text-blue-600 mb-4" />
            <span className="font-semibold text-blue-700 text-lg">All Doctors</span>
          </Link>

          {/* All Hospital Staffs */}
          <Link
            to="/admin/allHospitalStaffs"
            className="flex flex-col items-center justify-center bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer border border-blue-200"
          >
            <FaUserNurse className="w-12 h-12 text-blue-600 mb-4" />
            <span className="font-semibold text-blue-700 text-lg">All Hospital Staffs</span>
          </Link>
          
          {/* All Healthcare Managers */}
          <Link
            to="/admin/allHealthCareManagers"
            className="flex flex-col items-center justify-center bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer border border-blue-200"
          >
            <FaUserShield className="w-12 h-12 text-blue-600 mb-4" />
            <span className="font-semibold text-blue-700 text-lg">All Healthcare Managers</span>
          </Link>

          {/* All Patients */}
          <Link
            to="/admin/allPatients"
            className="flex flex-col items-center justify-center bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer border border-blue-200"
          >
            <FaUserInjured className="w-12 h-12 text-blue-600 mb-4" />
            <span className="font-semibold text-blue-700 text-lg">All Patients</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AllUsers
