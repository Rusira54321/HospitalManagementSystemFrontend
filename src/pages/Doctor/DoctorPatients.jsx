import axios from "axios";
import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import {Link} from "react-router-dom"
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
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [allergies, setAllergies] = useState([""]);
  const [medications, setMedications] = useState([""]);
  const appointmentsPerPage = 5;

  useEffect(() => {
    fetchBookedAppointments();
  }, []);

  const fetchBookedAppointments = async () => {
    try {
      const username = localStorage.getItem("username");
      const doctorDetails = await axios.get(
        "http://localhost:9090/api/doctor/getDoctor",
        { params: { username }, withCredentials: true }
      );

      const doctorId = doctorDetails.data.id;

      const response = await axios.get(
        "http://localhost:9090/api/doctor/getBookedAppointments",
        { params: { doctorId }, withCredentials: true }
      );

      const sortedAppointments = response.data.sort(
        (a, b) => new Date(b.bookedTime) - new Date(a.bookedTime)
      );
      setBookedAppointments(sortedAppointments);
    } catch (err) {
      setError(err.response?.data || "Failed to fetch booked appointments");
    }
  };

  const handleMarkCompleted = async (appointmentId) => {
    try {
      await axios.get(
        "http://localhost:9090/api/doctor/markAsCompleted",
        { params: { appointmentId }, withCredentials: true }
      );
      setBookedAppointments((prev) =>
        prev.map((appt) =>
          appt.id === appointmentId ? { ...appt, status: "COMPLETED" } : appt
        )
      );
    } catch (err) {
      setError(err.response?.data || "Failed to mark as completed");
    }
  };

  const handleAddMedicalRecord = (patient) => {
    setSelectedPatient(patient);
    setAllergies([""]);
    setMedications([""]);
    setShowModal(true);
  };

  const handleSubmitMedicalRecord = async () => {
    if (!selectedPatient) return;
    try {
      const recordData = {
        allergies: allergies.map((a) => a.trim()).filter(Boolean),
        medications: medications.map((m) => m.trim()).filter(Boolean),
      };

      await axios.post(
        "http://localhost:9090/api/doctor/AddMedicalRecords",
        recordData,
        {
          params: { patientID: selectedPatient.id },
          withCredentials: true,
        }
      );

      setShowModal(false);
      alert("Medical record added successfully!");
    } catch (err) {
      setError(err.response?.data || "Failed to add medical record");
    }
  };

  const filteredAppointments = bookedAppointments.filter((appointment) => {
    if (!searchDate) return true;
    const appointmentDate = new Date(appointment.startTime).toLocaleDateString("en-CA");
    return appointmentDate === searchDate;
  });

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
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8 drop-shadow-sm">
        My Patients' Appointments
      </h1>

      {/* Search by Date */}
      <div className="flex justify-center mb-8">
        <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl px-6 py-4 flex items-center space-x-4 w-full max-w-md border border-white/20 hover:shadow-xl transition-all duration-300">
          <Search className="text-indigo-600 w-6 h-6" />
          <input
            type="date"
            value={searchDate}
            onChange={(e) => {
              setSearchDate(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 bg-transparent outline-none text-gray-700 text-sm focus:ring-2 focus:ring-indigo-200 rounded-lg p-2 transition-all"
          />
          {searchDate && (
            <button
              onClick={() => setSearchDate("")}
              className="text-red-500 hover:text-red-700 text-sm font-semibold hover:bg-red-50 px-3 py-1 rounded-lg transition-all"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="max-w-md mx-auto mb-6 bg-red-100 border-l-4 border-red-500 p-4 rounded-lg">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}

      {/* Appointment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentAppointments.length === 0 && (
          <div className="col-span-3 flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg">
              <p className="text-gray-600 text-lg">No booked appointments found.</p>
            </div>
          </div>
        )}

        {currentAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-white/20"
          >
            <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-100">
              <div className="bg-indigo-100 p-2 rounded-full">
                <span role="img" aria-label="patient" className="text-2xl">👤</span>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800">
                  {appointment.patient
                    ? [appointment.patient.firstName, appointment.patient.lastName].filter(Boolean).join(" ")
                    : "N/A"}
                </p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium inline-block mt-1 ${statusColors[appointment.status] || "bg-gray-200"}`}>
                  {appointment.status}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">Start: {new Date(appointment.startTime).toLocaleString()}</p>
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">End: {new Date(appointment.endTime).toLocaleString()}</p>
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="text-sm">Room: {appointment.roomLocation || "Not Assigned"}</p>
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">Fee: Rs. {appointment.price || "0.00"}</p>
              </div>
            </div>

            <div className="space-y-2">
              {appointment.status === "BOOKED" && (
                <button
                  onClick={() => handleMarkCompleted(appointment.id)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2.5 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                >
                  Mark as Completed
                </button>
              )}

              {appointment.patient && (
                <button
                  onClick={() => handleAddMedicalRecord(appointment.patient)}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2.5 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                >
                  Add Medical Record
                </button>
              )}
              
              <Link 
                to={`/Doctor/patientInformation/${appointment.patient.id}`}
                className="inline-block w-full text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 rounded-xl font-semibold
                hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
              >
                See Patient Details
              </Link>
            </div>
          </div>
          
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 space-x-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-6 py-2.5 rounded-xl text-white font-semibold flex items-center space-x-2 shadow-md
              ${currentPage === 1 
                ? "bg-gray-400 cursor-not-allowed opacity-50" 
                : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]"}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous</span>
          </button>
          
          <span className="text-gray-700 text-lg font-medium px-4 py-2 bg-white/80 rounded-lg shadow">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-6 py-2.5 rounded-xl text-white font-semibold flex items-center space-x-2 shadow-md
              ${currentPage === totalPages 
                ? "bg-gray-400 cursor-not-allowed opacity-50" 
                : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]"}`}
          >
            <span>Next</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Add Medical Record Modal */}
      {showModal && (
        <form onSubmit={handleSubmitMedicalRecord}>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
              
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Medical Record</h2>
              
              <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-800 font-medium">Patient:</p>
                <p className="text-lg font-semibold text-gray-800">
                  {selectedPatient?.firstName} {selectedPatient?.lastName}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-3">Medical Conditions</label>
                  <div className="space-y-3">
                    {allergies.map((allergy, index) => (
                      <input
                        required
                        key={index}
                        type="text"
                        placeholder="Enter Medical Condition"
                        value={allergy}
                        onChange={(e) => {
                          const newAllergies = [...allergies];
                          newAllergies[index] = e.target.value;
                          setAllergies(newAllergies);
                        }}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setAllergies([...allergies, ""])}
                    className="mt-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    + Add Another Medical Condition
                  </button>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-3">Medications</label>
                  <div className="space-y-3">
                    {medications.map((med, index) => (
                      <input
                        required
                        key={index}
                        type="text"
                        placeholder="Enter medication"
                        value={med}
                        onChange={(e) => {
                          const newMeds = [...medications];
                          newMeds[index] = e.target.value;
                          setMedications(newMeds);
                        }}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setMedications([...medications, ""])}
                    className="mt-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    + Add Another Medication
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-semibold 
                    hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                >
                  Save Medical Record
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

    </div>
  );
};

export default DoctorPatients;
