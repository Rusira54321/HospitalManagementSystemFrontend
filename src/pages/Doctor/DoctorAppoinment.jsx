import axios from "axios";
import React, { useEffect, useState } from "react";

const statusColors = {
  AVAILABLE: "bg-green-100 text-green-800",
  BOOKED: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-gray-100 text-gray-800",
  CANCEL: "bg-red-100 text-red-800",
};

const DoctorAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [searchDate, setSearchDate] = useState(""); // ✅ Date search
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(6);

  useEffect(() => {
    const username = localStorage.getItem("username");

    const getAllAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:9090/api/doctor/getDoctor", {
          params: { username },
          withCredentials: true,
        });

        const doctorId = res.data.id;

        const appointmentsRes = await axios.get(
          "http://localhost:9090/api/doctor/getAppointments",
          {
            params: { doctorId },
            withCredentials: true,
          }
        );

        // ✅ Sort by createTime (latest first)
        const sortedAppointments = appointmentsRes.data.sort(
          (a, b) => new Date(b.createTime) - new Date(a.createTime)
        );

        setAppointments(sortedAppointments);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    getAllAppointments();
  }, []);

  // ✅ Filter appointments by search term and local start date
  const filteredAppointments = appointments.filter((appt) => {
    const patientName = appt.patient
      ? `${appt.patient.firstName} ${appt.patient.lastName}`.toLowerCase()
      : "";
    const status = appt.status?.toLowerCase() || "";
    const room = appt.roomLocation?.toLowerCase() || "";

    // ✅ Use local date (avoids timezone issues)
    const appointmentDate = new Date(appt.startTime).toLocaleDateString("en-CA");

    const matchesText =
      patientName.includes(search.toLowerCase()) ||
      status.includes(search.toLowerCase()) ||
      room.includes(search.toLowerCase());

    const matchesDate = !searchDate || appointmentDate === searchDate;

    return matchesText && matchesDate;
  });

  // ✅ Pagination logic
  const indexOfLast = currentPage * appointmentsPerPage;
  const indexOfFirst = indexOfLast - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-200 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
        Doctor Appointments
      </h1>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4 border border-white/20">
          {/* Text Search */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by patient, status, or room..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                transition-all duration-300 outline-none bg-white/90"
            />
          </div>

          {/* Date Search */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type="date"
              value={searchDate}
              onChange={(e) => {
                setSearchDate(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                transition-all duration-300 outline-none bg-white/90"
            />
          </div>

          {searchDate && (
            <button
              onClick={() => setSearchDate("")}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold
                hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg
                flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Clear Date</span>
            </button>
          )}
        </div>
      </div>

      {/* Appointments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {currentAppointments.length === 0 && (
          <div className="col-span-full flex justify-center items-center">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 text-center border border-white/20">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-600 text-lg font-medium">No appointments found.</p>
            </div>
          </div>
        )}

        {currentAppointments.map((appointment, index) => (
          <div
            key={index}
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 
              border border-white/20 transform hover:scale-[1.02]"
          >
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                  statusColors[appointment.status]
                }`}
              >
                {appointment.status}
              </span>
              <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1.5 rounded-full">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700 font-medium">
                  Rs. {appointment.price || 0}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm">
                    <span className="font-medium">Start:</span>{" "}
                    {new Date(appointment.startTime).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm">
                    <span className="font-medium">End:</span>{" "}
                    {new Date(appointment.endTime).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="text-sm">
                  <span className="font-medium">Room:</span>{" "}
                  {appointment.roomLocation || "Not Assigned"}
                </p>
              </div>

              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-sm">
                  <span className="font-medium">Patient:</span>{" "}
                  {appointment.patient
                    ? [appointment.patient.firstName, appointment.patient.lastName]
                        .filter(Boolean)
                        .join(" ")
                    : "No Patient"}
                </p>
              </div>

              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">
                  <span className="font-medium">Doctor:</span>{" "}
                  {appointment.doctor
                    ? [appointment.doctor.firstName, appointment.doctor.lastName]
                        .filter(Boolean)
                        .join(" ")
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 space-x-4">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
              ${currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 shadow-md hover:shadow-lg transform hover:scale-[1.02]'
              }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 
                  ${currentPage === i + 1
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform scale-110'
                    : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 shadow-md hover:shadow-lg'
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
              ${currentPage === totalPages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 shadow-md hover:shadow-lg transform hover:scale-[1.02]'
              }`}
          >
            <span>Next</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointment;
