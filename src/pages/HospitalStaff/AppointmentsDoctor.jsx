import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaDoorOpen,
  FaMoneyBillWave,
  FaHeartbeat,
  FaSearch,
  FaFilter,
} from "react-icons/fa";

const AppointmentsDoctor = () => {
  const url = "http://localhost:9090/api/doctor/getAppointments";
  const deleteAppointmentUrl = 'http://localhost:9090/api/HospitalStaff/deleteAppointment'
  const { id } = useParams();

  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const res = await axios.get(url, {
          params: { doctorId: id },
          withCredentials: true,
        });
        // Sort by createTime descending
        const sorted = res.data.sort(
          (a, b) => new Date(b.createTime) - new Date(a.createTime)
        );
        setAppointments(sorted);
        setFilteredAppointments(sorted);
      } catch (err) {
        console.log(err);
      }
    };

    getAppointments();
  }, [id]);

  const deleteAppointments = async(appointmentID) =>{
    try{
        const res = await axios.delete(deleteAppointmentUrl,{
            params:{
                appointmentId:appointmentID
            },
            withCredentials:true
        })
        alert("Appointment deleted successfully")
    }catch(err)
    {
        console.log(err)
    }
  }
  const formatOnlyTime = (time) => {
    if (!time) return "N/A";
    return new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDateTime = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString();
  };

  // Apply Filters
  useEffect(() => {
    let result = [...appointments];

    if (statusFilter) {
      result = result.filter((app) => app.status === statusFilter);
    }

    if (dateFilter) {
      result = result.filter(
        (app) => app.startTime && app.startTime.startsWith(dateFilter)
      );
    }

    setFilteredAppointments(result);
    setCurrentPage(1);
  }, [statusFilter, dateFilter, appointments]);

  // Pagination
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredAppointments.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(filteredAppointments.length / cardsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const statusColors = {
    COMPLETED: "bg-green-100 text-green-700",
    AVAILABLE: "bg-yellow-100 text-yellow-700",
    BOOKED: "bg-blue-100 text-blue-700",
    CANCEL: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Doctor Appointments
      </h1>

      {/* Filters */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex items-center gap-2 bg-white shadow-sm p-3 rounded-md border">
          <FaFilter className="text-gray-600 text-lg" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="outline-none bg-transparent text-gray-700"
          >
            <option value="">All Status</option>
            <option value="AVAILABLE">Available</option>
            <option value="BOOKED">Booked</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCEL">Cancel</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-white shadow-sm p-3 rounded-md border">
          <FaSearch className="text-gray-600 text-lg" />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="outline-none bg-transparent text-gray-700"
          />
        </div>
      </div>

      {/* Appointments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {currentCards.map((app) => (
          <div
            key={app.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div
              className={`px-2 py-1 rounded-full text-sm font-semibold inline-block mb-3 ${statusColors[app.status]}`}
            >
              {app.status}
            </div>

            <div className="flex items-center gap-2 mb-3">
              <FaUser className="text-indigo-500" />
              <div>
                <p className="font-medium text-gray-800">
                  {app.patient
                    ? app.patient.firstName + " " + app.patient.lastName
                    : "Available Slot"}
                </p>
                <p className="text-sm text-gray-500">{app.patient ? app.patient.email : "-"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <FaDoorOpen className="text-gray-600" />
              <p>Room: {app.roomLocation}</p>
            </div>

            <div className="flex flex-col gap-1 text-gray-700 mb-3">
              
              <div className="flex items-center gap-2">
                <FaClock className="text-gray-600" />
                <span>
                  Start: {formatOnlyTime(app.startTime)} — End: {formatOnlyTime(app.endTime)}
                </span>
              </div>
              
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="flex items-center gap-2 font-semibold text-gray-800">
                
              </p>

              {app.status === "AVAILABLE" && (
                <button onClick={()=>deleteAppointments(app.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">
                  Delete Slot
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* No Data */}
      {filteredAppointments.length === 0 && (
        <p className="text-center text-gray-500 text-lg mt-8">No appointments found.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className={`px-3 py-1 rounded-md border shadow-sm ${
              currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-gray-100"
            }`}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => paginate(idx + 1)}
              className={`px-3 py-1 rounded-md border shadow-sm ${
                currentPage === idx + 1 ? "bg-indigo-600 text-white" : "bg-white hover:bg-gray-100"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            className={`px-3 py-1 rounded-md border shadow-sm ${
              currentPage === totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentsDoctor;
