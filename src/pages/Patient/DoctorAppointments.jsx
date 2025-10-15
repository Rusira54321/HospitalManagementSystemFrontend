import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Search } from "lucide-react"; // ✅ Search icon

const statusColors = {
  AVAILABLE: "bg-green-100 text-green-800",
  BOOKED: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-gray-100 text-gray-800",
  CANCEL: "bg-red-100 text-red-800",
};

const DoctorAppointments = () => {
  const { doctorID } = useParams();
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [patientId, setPatientId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 6;

 useEffect(() => {
  const username = localStorage.getItem("username");

  const getDoctorAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9090/api/doctor/getAppointments",
        {
          params: { doctorId: doctorID },
          withCredentials: true,
        }
      );

      // ✅ Sort by createTime (latest first)
      const sortedAppointments = res.data.sort(
        (a, b) => new Date(b.createTime) - new Date(a.createTime)
      );

      
      setDoctorAppointments(sortedAppointments);

      const patient = await axios.get(
        "http://localhost:9090/api/patient/getPatient",
        {
          params: { username },
          withCredentials: true,
        }
      );
      setPatientId(patient.data.id);
    } catch (err) {
      console.log(err);
    }
  };
  getDoctorAppointments();
}, [doctorID]);


  // ✅ Book appointment handler
  const handleBook = async (appointmentId) => {
    try {
      const appointments = [...doctorAppointments];

      for (const appointment of appointments) {
        if (appointment.id === appointmentId) {
          if (appointment.price === 0) {
            const res = await axios.get(
              "http://localhost:9090/api/patient/bookAppointment",
              {
                params: {
                  appointmentID: appointmentId,
                  patientID: patientId,
                },
                withCredentials: true,
              }
            );

            console.log("Booking successful:", res.data);
            appointment.status = "BOOKED"; // Update locally
            setDoctorAppointments(appointments); // Refresh UI instantly
          } else {
            // 💳 Stripe integration (future)
          }
        }
      }
    } catch (err) {
      console.log("Booking error:", err);
    }
  };

  // ✅ Filter appointments by date
  const filteredAppointments = doctorAppointments.filter((appointment) => {
    if (!searchDate) return true;
    const appointmentDate = new Date(appointment.startTime)
      .toISOString()
      .split("T")[0];
    return appointmentDate === searchDate;
  });

  // ✅ Pagination logic
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );
  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 p-8">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Book Appointments
      </h1>

      {/* 🔍 Search Bar */}
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
            className="flex-1 bg-transparent outline-none text-gray-700 text-sm placeholder-gray-400"
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

      {/* 📅 Appointment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentAppointments.length > 0 ? (
          currentAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between hover:shadow-2xl transition-shadow"
            >
              <div>
                <p>
                  <strong>Start Time:</strong>{" "}
                  {new Date(appointment.startTime).toLocaleString()}
                </p>
                <p>
                  <strong>End Time:</strong>{" "}
                  {new Date(appointment.endTime).toLocaleString()}
                </p>
                <p>
                  <strong>Price:</strong> Rs. {appointment.price}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded-lg text-sm font-semibold ${statusColors[appointment.status]
                      }`}
                  >
                    {appointment.status}
                  </span>
                </p>
                {/* 🏥 Room Location */}
                <p>
                  <strong>Room:</strong>{" "}
                  {appointment.roomLocation ? appointment.roomLocation : "Not Assigned"}
                </p>
              </div>

              {appointment.status === "AVAILABLE" && (
                <button
                  onClick={() => handleBook(appointment.id)}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition-all"
                >
                  Book Appointment
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-white text-lg col-span-3">
            No appointments found.
          </p>
        )}
      </div>

      {/* 📄 Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg text-white ${currentPage === 1
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
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg text-white ${currentPage === totalPages
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

export default DoctorAppointments;
