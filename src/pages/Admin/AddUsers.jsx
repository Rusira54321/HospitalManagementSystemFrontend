import React from "react";
import { Link } from "react-router-dom";
import { FaUserMd, FaUserTie, FaUsers } from "react-icons/fa";

const AddUsers = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-6 sm:p-10 flex items-center">
      <div className="max-w-5xl mx-auto w-full">
        <header className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg flex items-center justify-center mb-3">
            <FaUsers className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Add Users</h1>
          <p className="text-slate-600 mt-2 max-w-2xl mx-auto">Quickly add new doctors or hospital staff. Each action opens a dedicated form.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            to="/admin/addDoctor"
            className="group relative overflow-hidden rounded-3xl p-6 bg-white/80 backdrop-blur-sm border border-slate-100 shadow-md hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md group-hover:scale-105 transition-transform">
                <FaUserMd className="w-6 h-6" />
              </div>
              <div>
                <div className="text-lg font-semibold text-slate-900">Add Doctor</div>
                <div className="text-sm text-slate-500 mt-1">Create a new doctor profile and assign to a hospital.</div>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/addHospitalStaff"
            className="group relative overflow-hidden rounded-3xl p-6 bg-white/80 backdrop-blur-sm border border-slate-100 shadow-md hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md group-hover:scale-105 transition-transform">
                <FaUserTie className="w-6 h-6" />
              </div>
              <div>
                <div className="text-lg font-semibold text-slate-900">Add Hospital Staff</div>
                <div className="text-sm text-slate-500 mt-1">Add nurses, assistants, and other hospital staff members.</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
