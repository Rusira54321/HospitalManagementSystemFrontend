import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserMd, FaEnvelope, FaIdBadge, FaStethoscope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const url = "http://localhost:9090/api/HospitalStaff/getDoctors";

  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const getDoctorsRelatedToHospitalStaff = async () => {
      try {
        const res = await axios.get(url, {
          params: {
            hospitalStaffUserName: localStorage.getItem("username"),
          },
          withCredentials: true,
        });

        setDoctors(res.data);
      } catch (err) {
        setError(err.response?.data || "Failed to fetch doctors");
      }
    };

    getDoctorsRelatedToHospitalStaff();
  }, []);

  const navigateToAppointments = (doctorId) => {
    navigate(`/healthCareStaff/doctorAppointments/${doctorId}`)
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef2ff] via-white to-[#fde2e4] p-10">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-12 tracking-wide drop-shadow-sm">
        Your Doctors
      </h1>

      {error && (
        <p className="text-center text-red-600 font-semibold text-lg mb-10">
          {error}
        </p>
      )}

      <div className="grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl">
        {doctors.map((doc, index) => (
          <div
            key={index}
            className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-xl rounded-3xl p-7 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-white/70"
          >
            {/* Profile Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-indigo-200 to-pink-200 p-5 rounded-full shadow-md">
                <FaUserMd size={40} className="text-indigo-700" />
              </div>
            </div>

            {/* Doctor Info */}
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
              {doc.firstName} {doc.lastName}
            </h2>

            <p className="text-center text-indigo-600 font-semibold text-lg mb-5">
              {doc.specialization}
            </p>

            {/* Details */}
            <div className="space-y-4 mt-3">
              <div className="flex items-center text-gray-700 gap-3">
                <FaIdBadge className="text-indigo-500" />
                <span className="font-medium">{doc.username}</span>
              </div>

              <div className="flex items-center text-gray-700 gap-3">
                <FaEnvelope className="text-pink-500" />
                <span>{doc.email}</span>
              </div>

              <div className="flex items-center text-gray-700 gap-3">
                <FaStethoscope className="text-green-500" />
                <span>{doc.specialization}</span>
              </div>
            </div>

            {/* Button */}
            <div className="mt-8 flex justify-center">
              <button onClick={()=>navigateToAppointments(doc.id)} className="bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white px-6 py-2.5 rounded-xl shadow-lg transition-all duration-200 tracking-wide font-medium">
                View Appointments
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
