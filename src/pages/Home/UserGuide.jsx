import React from 'react'
import { FaUserShield, FaUserMd, FaUserNurse, FaHospitalUser, FaUser, FaEnvelope } from "react-icons/fa";

const UserGuide = () => {
  return (
    <div className="w-full font-sans bg-gray-50">

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 text-center shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">System User Guide</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Learn how each user role works inside the MediCore Hospital Management System.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* ADMIN */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition">
          <div className="text-blue-600 text-5xl mb-4">
            <FaUserShield />
          </div>
          <h2 className="text-2xl font-bold mb-3">Admin</h2>
          <p className="text-gray-700 mb-4">
            The admin is the master controller of the entire system. Only one admin exists and 
            the admin account is stored securely in the backend.
          </p>
          <ul className="text-gray-600 space-y-2 list-disc pl-5">
            <li>Add Doctors</li>
            <li>Add Hospital Staff (Doctor’s Secretaries)</li>
            <li>Add Healthcare Managers</li>
            <li>Manage all users</li>
            <li>View analytics dashboards</li>
          </ul>
        </div>

        {/* DOCTOR */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition">
          <div className="text-green-600 text-5xl mb-4">
            <FaUserMd />
          </div>
          <h2 className="text-2xl font-bold mb-3">Doctor</h2>
          <p className="text-gray-700 mb-4">
            Doctors manage appointments and patient medical data.
          </p>
          <ul className="text-gray-600 space-y-2 list-disc pl-5">
            <li>View booked appointments</li>
            <li>View appointment history</li>
            <li>Add patient medical reports</li>
            <li>View patient medical history</li>
            <li>Choose or assign a secretary</li>
          </ul>
        </div>

        {/* HOSPITAL STAFF / SECRETARY */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition">
          <div className="text-purple-600 text-5xl mb-4">
            <FaUserNurse />
          </div>
          <h2 className="text-2xl font-bold mb-3">Hospital Staff (Doctor’s Secretary)</h2>
          <p className="text-gray-700 mb-4">
            The secretary assists doctors by managing their schedules and patient bookings.
          </p>
          <ul className="text-gray-600 space-y-2 list-disc pl-5">
            <li>Add appointments for the assigned doctor</li>
            <li>View doctor schedules</li>
            <li>Manage patient bookings</li>
          </ul>
        </div>

        {/* HEALTHCARE MANAGER */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition">
          <div className="text-red-600 text-5xl mb-4">
            <FaHospitalUser />
          </div>
          <h2 className="text-2xl font-bold mb-3">Healthcare Manager</h2>
          <p className="text-gray-700 mb-4">
            The hospital healthcare manager analyzes patient visit data and generates reports.
          </p>
          <ul className="text-gray-600 space-y-2 list-disc pl-5">
            <li>Total patient visits</li>
            <li>Visits per department</li>
            <li>Peak day & peak time analysis</li>
            <li>Average visits per day</li>
            <li>Charts and graphical reports</li>
           
          </ul>
        </div>

        {/* PATIENT */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition">
        <div className="text-yellow-600 text-5xl mb-4">
            <FaUser />
        </div>
        <h2 className="text-2xl font-bold mb-3">Patient</h2>
        <p className="text-gray-700 mb-4">
            As a patient, you can easily <strong>register</strong> and <strong>log in</strong> to the system to manage your healthcare activities.
            You have full access to appointment booking and viewing your medical history.
        </p>
        <ul className="text-gray-600 space-y-2 list-disc pl-5">
            <li>Register & Login to the system</li>
            <li>Book appointments</li>
            <li>View appointment history</li>
            <li>Access medical reports</li>
            <li>Dashboard shows total visits & active appointments</li>
        </ul>
        </div>


        {/* EMAIL NOTIFICATION */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition">
          <div className="text-indigo-600 text-5xl mb-4">
            <FaEnvelope />
          </div>
          <h2 className="text-2xl font-bold mb-3">Appointment Email Confirmation</h2>
          <p className="text-gray-700 mb-4">
            After a successful appointment booking, an email is automatically sent to the patient containing:
          </p>
          <ul className="text-gray-600 space-y-2 list-disc pl-5">
            <li>Hospital Name</li>
            <li>Appointment Date & Time</li>
            <li>Assigned Doctor</li>
            <li>Patient Details</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default UserGuide
