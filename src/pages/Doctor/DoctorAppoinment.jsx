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
  const [searchDate, setSearchDate] = useState(""); // ✅ New date search state
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(5);

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

  // ✅ Filter appointments by search term and date
  const filteredAppointments = appointments.filter((appt) => {
    const patientName = appt.patient
      ? `${appt.patient.firstName} ${appt.patient.lastName}`.toLowerCase()
      : "";
    const status = appt.status?.toLowerCase() || "";
    const room = appt.roomLocation?.toLowerCase() || "";
    const appointmentDate = new Date(appt.startTime).toISOString().split("T")[0];

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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Doctor Appointments
      </h1>

      {/* 🔍 Search Boxes */}
      <div className="mb-6 flex flex-col md:flex-row justify-center items-center gap-4">
        {/* Text Search */}
        <input
          type="text"
          placeholder="Search by patient, status, or room..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Date Search */}
        <input
          type="date"
          value={searchDate}
          onChange={(e) => {
            setSearchDate(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {searchDate && (
          <button
            onClick={() => setSearchDate("")}
            className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Clear Date
          </button>
        )}
      </div>

      {/* 📅 Appointments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentAppointments.length === 0 && (
          <p className="text-white text-center col-span-full">
            No appointments found.
          </p>
        )}

        {currentAppointments.map((appointment, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col space-y-2 hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-center">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[appointment.status]
                  }`}
              >
                {appointment.status}
              </span>
              <span className="text-gray-500 text-sm">
                Rs. {appointment.price || 0}
              </span>
            </div>

            <div>
              <p>
                <span className="font-semibold">Start:</span>{" "}
                {new Date(appointment.startTime).toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">End:</span>{" "}
                {new Date(appointment.endTime).toLocaleString()}
              </p>
            </div>

            <div>
              <p>
                <span className="font-semibold">Room:</span>{" "}
                {appointment.roomLocation || "Not Assigned"}
              </p>
            </div>

            <div>
              <p>
                <span className="font-semibold">Patient:</span>{" "}
                {appointment.patient
                  ? [appointment.patient.firstName, appointment.patient.lastName]
                      .filter(Boolean)
                      .join(" ")
                  : "No Patient"}
              </p>
            </div>

            <div>
              <p>
                <span className="font-semibold">Doctor:</span>{" "}
                {appointment.doctor
                  ? [appointment.doctor.firstName, appointment.doctor.lastName]
                      .filter(Boolean)
                      .join(" ")
                  : "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 📄 Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-lg ${currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 shadow"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointment;
