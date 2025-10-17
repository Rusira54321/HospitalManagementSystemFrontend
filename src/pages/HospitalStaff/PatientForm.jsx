import React, { useState } from "react";
import axios   from "axios";

export default function PatientForm() {
  const [formData, setFormData] = useState({
    name: "",
    patientId: "",
    dob: "",
    lastVisit: "",
    medications: "",
    allergies: "",
    appointmentDate: "",
    appointmentTime: "",
    selectedDoctor: "",
    appointmentReason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9090/api/patient", formData,{
        headers: { "Content-Type": "application/json" }
      });
      console.log("Patient Registered:", res.data);
      alert("✅ Patient registered successfully!");
      setFormData({
        name: "",
        patientId: "",
        dob: "",
        lastVisit: "",
        medications: "",
        allergies: "",
        appointmentDate: "",
        appointmentTime: "",
        selectedDoctor: "",
        appointmentReason: "",
      });
    } catch (error) {
      console.error("❌ Registration error:", error);
      alert("Error registering patient. Please try again.");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Register Patient
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Patient Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter patient's full name"
            />
          </div>

          {/* Patient ID */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">patientId</label>
            <input
              type="text"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Your NIC number"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Last Visit */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Last Visit</label>
            <input
              type="date"
              name="lastVisit"
              value={formData.lastVisit}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. 14 Jan 2024 - Checkup"
            />
          </div>

          {/* Current Medication */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Current Medication</label>
            <textarea
              name="medications"
              value={formData.medications}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              placeholder="List medications with dosage and frequency"
              rows="3"
            ></textarea>
          </div>

          {/* Known Allergies */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Known Allergies</label>
            <textarea
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              placeholder="List known allergies (e.g. Penicillin, Peanuts)"
              rows="3"
            ></textarea>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">Appoinments</label>
            

            {/* select Date */}
<div className="mb-3">
    <label className="block font-medium text-gray-700 mb-1">Select Date</label>
    <input
      type="date"
      name="appointmentDate"
      value={formData.appointmentDate}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
    />
  </div>

  {/* Appointment Time */}
  <div className="mb-3">
    <label className="block font-medium text-gray-700 mb-1">Select Time</label>
    <input
      type="time"
      name="appointmentTime"
      value={formData.appointmentTime}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
    />
  </div>

  {/* Select Doctor */}
  <div className="mb-3">
    <label className="block font-medium text-gray-700 mb-1">Select Doctor</label>
    <select
      name="selectedDoctor"
      value={formData.selectedDoctor}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
    >
      <option value="">-- Select Doctor --</option>
      <option value="Dr. Smith">Dr. Smith</option>
      <option value="Dr. Johnson">Dr. Johnson</option>
      <option value="Dr. Patel">Dr. Patel</option>
      <option value="Dr. Fernando">Dr. Fernando</option>
    </select>
  </div>

{/* Reason for Appointment */}
  <div className="mb-3">
    <label className="block font-medium text-gray-700 mb-1">Reason for Appointment</label>
    <textarea
      name="appointmentReason"
      value={formData.appointmentReason}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
      placeholder="Describe your reason (e.g. checkup, follow-up, test results)"
      rows="2"
    ></textarea>
  </div>
</div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Register Patient
          </button>
        </form>
      </div>
    </div>
  );
}
