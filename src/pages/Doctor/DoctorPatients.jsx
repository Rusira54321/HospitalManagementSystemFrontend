import axios from "axios";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

const statusColors = {
  AVAILABLE: "bg-green-100 text-green-800",
  BOOKED: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-gray-100 text-gray-800",
  CANCEL: "bg-red-100 text-red-800",
};

const DoctorPatients = () => {
  const [error, setError] = useState("");
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  useEffect(() => {
    fetchBookedAppointments();
  }, []);

  const fetchBookedAppointments = async () => {
  try {
    const username = localStorage.getItem("username");
    const doctorDetails = await axios.get(
      "http://localhost:9090/api/doctor/getDoctor",
      {
        params: { username },
        withCredentials: true,
      }
    );

    const doctorId = doctorDetails.data.id;

    const response = await axios.get(
      "http://localhost:9090/api/doctor/getBookedAppointments",
      {
        params: { doctorId },
        withCredentials: true,
      }
    );

    // ✅ Sort by bookedTime (latest first)
    const sortedAppointments = response.data.sort(
      (a, b) => new Date(b.bookedTime) - new Date(a.bookedTime)
    );
    setBookedAppointments(sortedAppointments);
  } catch (err) {
    setError(err.response?.data || "Failed to fetch booked appointments");
  }
};


  // ✅ Mark Appointment as Completed
  const handleMarkCompleted = async (appointmentId) => {
    try {
      const res = await axios.get('http://localhost:9090/api/doctor/markAsCompleted',{
        params:{
            appointmentId:appointmentId
        },
        withCredentials:true
      })
      
      // Update UI immediately after success
      setBookedAppointments((prev) =>
        prev.map((appt) =>
          appt.id === appointmentId ? { ...appt, status: "COMPLETED" } : appt
        )
      );
    } catch (err) {
      setError(err.response?.data || "Failed to mark as completed");
    }
  };

  // ✅ Filter by date
  const filteredAppointments = bookedAppointments.filter((appointment) => {
    if (!searchDate) return true;
    const appointmentDate = new Date(appointment.startTime)
      .toISOString()
      .split("T")[0];
    return appointmentDate === searchDate;
  });

  // ✅ Pagination
  const indexOfLast = currentPage * appointmentsPerPage;
  const indexOfFirst = indexOfLast - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirst,
    indexOfLast
  );
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
        My Patients’ Appointments
      </h1>

      {/* 🔍 Search by Date */}
      <div className="flex justify-center mb-8">
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
      </div>

      {/* ❌ Error */}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {/* 📅 Appointment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentAppointments.length === 0 && (
          <p className="text-center text-white text-lg col-span-3">
            No Booked appointments found.
          </p>
        )}

        {currentAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-all"
          >
            <div>
              <p className="text-lg font-semibold text-gray-800">
                🧑‍⚕️ Patient:{" "}
                {appointment.patient
                  ? [appointment.patient.firstName, appointment.patient.lastName]
                      .filter(Boolean)
                      .join(" ")
                  : "N/A"}
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
                <strong>Price:</strong> Rs. {appointment.price || "0.00"}
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

              {/* ✅ Mark as Completed Button */}
              {appointment.status === "BOOKED" && (
                <button
                  onClick={() => handleMarkCompleted(appointment.id)}
                  className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-all"
                >
                  Mark as Completed
                </button>
              )}
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

export default DoctorPatients;
