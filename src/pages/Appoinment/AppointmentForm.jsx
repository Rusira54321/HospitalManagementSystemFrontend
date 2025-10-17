import React, { useState } from "react";
import axios from "axios";

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    patientId: "",
    hospital: "",
    department: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:9090/api/appointment",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Appointment Registered:", res.data);
      alert("✅ Appointment registered successfully!");
      setFormData({
        patientId: "",
        hospital: "",
        department: "",
        appointmentDate: "",
        appointmentTime: "",
      });
    } catch (error) {
      console.error("❌ Appointment registration error:", error);
      alert("Error registering appointment. Please try again.");
    }
  };

  const hospitals = [
    "National Hospital Colombo",
    "Castle Street Hospital",
    "Lady Ridgeway Hospital",
    "Colombo South Teaching Hospital",
    "Kandy Teaching Hospital",
    "Galle Teaching Hospital",
    "Jaffna Teaching Hospital",
    "Kurunegala Teaching Hospital",
    "Anuradhapura Teaching Hospital",
    "Batticaloa Teaching Hospital",
    "Ragama Teaching Hospital",
    "Mullaitivu Hospital",
    "Trincomalee Hospital",
    "Matara Hospital",
    "Polonnaruwa Hospital",
  ];

  const departments = [
    "Cardiology",
    "Orthopedics",
    "Neurology",
    "Pediatrics",
    "Gynecology",
    "ENT",
    "Dermatology",
    "Oncology",
    "Radiology",
    "Urology",
    "Psychiatry",
    "General Surgery",
    "Internal Medicine",
    "Nephrology",
    "Ophthalmology",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Schedule Appointment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Patient ID */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Patient ID
            </label>
            <input
              type="text"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter patient ID"
            />
          </div>

          {/* Hospital */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Hospital
            </label>
            <select
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Select Hospital --</option>
              {hospitals.map((h, index) => (
                <option key={index} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Select Department --</option>
              {departments.map((d, index) => (
                <option key={index} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Appointment Date */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Appointment Date
            </label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Appointment Time */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Appointment Time
            </label>
            <input
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Schedule Appointment
          </button>
        </form>
      </div>
    </div>
  );
}
