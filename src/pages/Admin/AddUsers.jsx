import React from "react";
import { Link } from "react-router-dom";
import { FaUserMd, FaUserTie } from "react-icons/fa";

const AddUsers = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex flex-col items-center justify-center px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">Add Users</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Add Doctor */}
          <Link
            to="/admin/addDoctor"
            className="flex flex-col items-center justify-center bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer border border-blue-200"
          >
            <FaUserMd className="w-12 h-12 text-blue-600 mb-4" />
            <span className="font-semibold text-blue-700 text-lg">Add Doctor</span>
          </Link>

          {/* Add Hospital Staff */}
          <Link
            to="/admin/addHospitalStaff"
            className="flex flex-col items-center justify-center bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer border border-blue-200"
          >
            <FaUserTie className="w-12 h-12 text-blue-600 mb-4" />
            <span className="font-semibold text-blue-700 text-lg">Add Hospital Staff</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
