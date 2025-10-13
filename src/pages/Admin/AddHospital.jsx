import React, { useState } from 'react'
import axios from 'axios';

const AddHospital = () => {
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalType,setHospitalType] = useState("")
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [hospitalLocation, setHospitalLocation] = useState("");
  const url = "http://localhost:9090/api/auth/createHospital";

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(url, {
      hospitalName,
      hospitalLocation,
      hospitalType
    }, {
      withCredentials: true
    }).then((res) => {
      setSuccess("Hospital added successfully");
      setError("");
      setHospitalLocation("")
      setHospitalName("")
      setHospitalType("")
    }).catch((err) => {
      setError("Error adding hospital");
      setSuccess("");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6"
      >
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 rounded-full p-3 mb-2">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20m10-10H2" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-blue-700 mb-2 text-center">Add Hospital</h1>
          <p className="text-gray-500 text-sm text-center">Enter hospital details below</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
          <input
            type="text"
            placeholder="Hospital Name"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Location</label>
          <input
            type="text"
            placeholder="Hospital Location"
            value={hospitalLocation}
            onChange={(e) => setHospitalLocation(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* ✅ Styled new select element */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Type</label>
          <select
            value={hospitalType}
            onChange={(e)=>setHospitalType(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
              <option value=''>Choose Hospital Type</option>
              <option value="GOVERNMENT">GOVERNMENT</option>
              <option value="PRIVATE">PRIVATE</option>
          </select>
        </div>

        {success && (
          <div className="flex items-center bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded-lg text-sm">
            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {success}
          </div>
        )}

        {error && (
          <div className="flex items-center bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg text-sm">
            <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddHospital;
