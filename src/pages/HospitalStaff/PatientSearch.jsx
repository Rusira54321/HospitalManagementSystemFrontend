import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientSearch() {
  const [patientId, setPatientId] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (patientId.trim() !== "") {
      navigate(`/HospitalStaffDashboard/PatientDetails/${patientId}`);
    } else {
      alert("Please enter a Patient ID");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Search Patient Details
        </h2>

        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Enter Patient ID</label>
            <input
              type="text"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your Patient ID"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
