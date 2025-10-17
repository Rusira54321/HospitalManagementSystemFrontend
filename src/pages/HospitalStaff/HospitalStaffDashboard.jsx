import React from "react";
import { useNavigate, Link } from "react-router-dom";


export default function HospitalStaffDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">
        Hospital Staff Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {/* Doctor Appointments Button */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all border-t-4 border-blue-600 text-center">
          <h2 className="text-xl font-semibold text-blue-700">Doctor </h2>
          <p className="text-gray-600 mt-2">
            View and manage upcoming appointments
          </p>
        </div>

        {/* Patient Search Button */}
        <Link to="/HospitalStaffDashboard/PatientSearch" className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all border-t-4 border-red-600 text-center block">
        <h2 className="text-xl font-semibold text-red-700">Check-in Patient</h2>
        <p className="text-gray-600 mt-2">Access patient records securely</p>
        </Link>

        
        {/* Staff Management */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all border-t-4 border-blue-600 text-center">
          <h2 className="text-xl font-semibold text-blue-700">Staff Management</h2>
          <p className="text-gray-600 mt-2">
            Return to login page
          </p>
        </div>

        {/* Billing & Payments */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all border-t-4 border-green-600 text-center">
          <h2 className="text-xl font-semibold text-green-700">Billing & Payments</h2>
          <p className="text-gray-600 mt-2">
            Manage billing information and process payments
          </p>
        </div>

        {/* Reports & Analytics */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all border-t-4 border-blue-600 text-center">
          <h2 className="text-xl font-semibold text-blue-700">Reports & Analytics</h2>
          <p className="text-gray-600 mt-2">
            View and analyze hospital performance metrics
          </p>
        </div>

        {/* Profile & Settings */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all border-t-4 border-green-600 text-center">
          <h2 className="text-xl font-semibold text-green-700">Profile & Settings</h2>
          <p className="text-gray-600 mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Patient Form */}
        <Link to="/HospitalStaffDashboard/PatientForm" className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all border-t-4 border-red-600 text-center">
          <h2 className="text-xl font-semibold text-red-700">Patient Form</h2>
          <p className="text-gray-600 mt-2">
            Fill out and submit patient information
          </p>
        </Link>

        {/* Medicine / Pharmacy Section */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all border-t-4 border-green-600 text-center">
          <h2 className="text-xl font-semibold text-green-700">Medicine / Pharmacy Section</h2>
          <p className="text-gray-600 mt-2">
            Manage medications and prescriptions
          </p>
        </div>

      </div>
    </div>
  );
}
