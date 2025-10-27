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
    },  {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-200 to-teal-200 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6 border border-white/20"
      >
        <div className="flex flex-col items-center mb-2">
          <div className="bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl p-4 mb-4 shadow-lg transform hover:scale-105 transition-all duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2 text-center">
            Add New Hospital
          </h1>
          <p className="text-gray-600 text-sm text-center">Complete the form below to register a new hospital</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Name</label>
          <input
            type="text"
            placeholder="Enter hospital name"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 
            focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400
            hover:bg-white/70"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Location</label>
          <input
            type="text"
            placeholder="Enter hospital location"
            value={hospitalLocation}
            onChange={(e) => setHospitalLocation(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 
            focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400
            hover:bg-white/70"
          />
        </div>

        {/* ✅ Styled new select element */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Type</label>
          <select
            value={hospitalType}
            onChange={(e)=>setHospitalType(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 
            focus:ring-blue-500 focus:border-transparent transition-all duration-200
            hover:bg-white/70 cursor-pointer appearance-none"
            style={{ 
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1em'
            }}
          >
            <option value=''>Select Hospital Type</option>
            <option value="GOVERNMENT">Government Hospital</option>
            <option value="PRIVATE">Private Hospital</option>
          </select>
        </div>

        {success && (
          <div className="flex items-center gap-2 bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm animate-fade-in">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm animate-fade-in">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-xl 
          font-semibold hover:from-blue-600 hover:to-teal-600 transform hover:scale-[1.02] 
          transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Register Hospital
        </button>
      </form>
    </div>
  );
};

export default AddHospital;
