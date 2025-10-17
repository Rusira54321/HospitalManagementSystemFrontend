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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 p-8">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        My Booked Appointments
      </h1>

      {/* 🔍 Search by Date & Status */}
      <div className="flex justify-center mb-8 space-x-4">
        {/* Date */}
        <div className="bg-white/90 backdrop-blur-md shadow-md rounded-xl px-4 py-3 flex items-center space-x-3 w-full max-w-md">
          <Search className="text-blue-600 w-5 h-5" />
          <input
            type="date"
            value={searchDate}
            onChange={(e) => {
              setSearchDate(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 bg-transparent outline-none text-gray-700 text-sm"
          />
          {searchDate && (
            <button
              onClick={() => setSearchDate("")}
              className="text-red-500 hover:text-red-700 text-sm font-semibold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Status */}
        <select
          value={searchStatus}
          onChange={(e) => {
            setSearchStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-white/90 backdrop-blur-md shadow-md rounded-xl px-4 py-3 text-gray-700 text-sm focus:outline-none"
        >
          <option value="">All Statuses</option>
          <option value="BOOKED">Booked</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {/* ❌ Error */}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {/* 📅 Appointments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentAppointments.length === 0 && (
          <p className="text-center text-white text-lg col-span-3">
            No appointments found.
          </p>
        )}

        {currentAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between hover:shadow-2xl transition-all"
          >
            <div>
              <p>
                <strong>Doctor:</strong> {appointment.doctorFullName || "N/A"}
              </p>
              <p>
                <strong>Hospital:</strong> {appointment.HospitalName || "N/A"}
              </p>
              <p>
                <strong>Start Time:</strong>{" "}
                {new Date(appointment.startTime).toLocaleString()}
              </p>
              <p>
                <strong>End Time:</strong>{" "}
                {new Date(appointment.endTime).toLocaleString()}
              </p>
              <p>
                <strong>Room Location:</strong>{" "}
                {appointment.roomLocation || "Not Assigned"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded-lg text-sm font-semibold ${
                    statusColors[appointment.status] || "bg-gray-200"
                  }`}
                >
                  {appointment.status}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 📄 Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg text-white ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Previous
          </button>
          <span className="text-white text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg text-white ${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;
