import axios from "axios";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

const statusColors = {
  AVAILABLE: "bg-green-100 text-green-800",
  BOOKED: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-gray-100 text-gray-800",
  CANCEL: "bg-red-100 text-red-800",
};

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [searchStatus, setSearchStatus] = useState(""); // ✅ New status filter
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  const getPatientDetailsUrl = "http://localhost:9090/api/patient/getPatient";
  const getPatientAppointmentsUrl =
    "http://localhost:9090/api/patient/getBookedAppointments";

  useEffect(() => {
    const username = localStorage.getItem("username");

    const getPatientAppointments = async () => {
      try {
        const patientDetails = await axios.get(getPatientDetailsUrl, {
          params: { username },
          withCredentials: true,
        });

        const patientId = patientDetails.data.id;

        const appointmentsRes = await axios.get(getPatientAppointmentsUrl, {
          params: { patientId },
          withCredentials: true,
        });

        const sortedAppointments = appointmentsRes.data.sort(
          (a, b) => new Date(b.BookedAt) - new Date(a.BookedAt)
        );

        setAppointments(sortedAppointments);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.error || "Failed to fetch Appointments");
      }
    };

    getPatientAppointments();
  }, []);

  // ✅ Filtering by date AND status
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesDate = searchDate
      ? new Date(appointment.startTime).toLocaleDateString("en-CA") === searchDate
      : true;

    const matchesStatus = searchStatus
      ? appointment.status === searchStatus
      : true;

    return matchesDate && matchesStatus;
  });

  // ✅ Pagination
  const indexOfLast = currentPage * appointmentsPerPage;
  const indexOfFirst = indexOfLast - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-200 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 text-center">
          My Appointments
        </h1>
        <p className="text-center text-gray-600 mb-8">View and manage your scheduled appointments</p>

        {/* 🔍 Search by Date & Status */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Date Filter */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="date"
                value={searchDate}
                onChange={(e) => {
                  setSearchDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl 
                focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200
                text-gray-700 text-sm font-medium"
              />
              {searchDate && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    onClick={() => setSearchDate("")}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <select
                value={searchStatus}
                onChange={(e) => {
                  setSearchStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl 
                focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200
                text-gray-700 text-sm font-medium appearance-none cursor-pointer"
                style={{ 
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1em'
                }}
              >
                <option value="">All Statuses</option>
                <option value="BOOKED">Booked</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ❌ Error */}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {/* Error Message */}
      {error && (
        <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* 📅 Appointments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentAppointments.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/20">
            <svg className="w-24 h-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xl text-gray-600 text-center">No appointments found</p>
            <p className="text-gray-500 mt-2 text-center">Try adjusting your search filters</p>
          </div>
        ) : (
          currentAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 
              hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {appointment.doctorFullName || "N/A"}
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[appointment.status] || "bg-gray-200"}`}>
                  {appointment.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-sm">{appointment.HospitalName || "N/A"}</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div className="text-xs text-gray-500">Start Time</div>
                    <div className="text-sm">{new Date(appointment.startTime).toLocaleString()}</div>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="text-xs text-gray-500">End Time</div>
                    <div className="text-sm">{new Date(appointment.endTime).toLocaleString()}</div>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">{appointment.roomLocation || "Not Assigned"}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 📄 Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 
            ${currentPage === 1 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
              : "bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg hover:shadow-xl"}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <div className="flex items-center gap-2">
            <span className="px-4 py-2 bg-white/80 backdrop-blur-lg rounded-xl font-medium text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300
            ${currentPage === totalPages 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
              : "bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg hover:shadow-xl"}`}
          >
            Next
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default PatientAppointments;
