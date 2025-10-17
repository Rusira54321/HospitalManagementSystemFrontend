import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaBirthdayCake,
  FaVenusMars,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaTrash,
} from "react-icons/fa";

const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 6;

  useEffect(() => {
    const getAllPatients = async () => {
      try {
        const res = await axios.get("http://localhost:9090/api/admin/getAllPatients", {
          withCredentials: true,
        });
        setPatients(res.data);
      } catch (err) {
        console.log("Error fetching patients:", err);
      }
    };
    getAllPatients();
  }, []);

  // Delete patient
  const deletePatient = async (patientId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this patient?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:9090/api/admin/deletePatient/${patientId}`, {
        withCredentials: true,
      });
      setPatients(prev => prev.filter(p => p.id !== patientId));
    } catch (err) {
      console.error("Failed to delete patient:", err);
      alert("Failed to delete patient. Please try again.");
    }
  };

  const filteredPatients = patients.filter((p) =>
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);
  const startIndex = (currentPage - 1) * patientsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, startIndex + patientsPerPage);

  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-10 drop-shadow-md">
        🧍‍♂️ All Registered Patients
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center bg-white rounded-full shadow-lg px-5 py-3 w-full sm:w-2/3 md:w-1/2 transition-all duration-300 hover:shadow-xl">
          <FaSearch className="text-gray-400 text-lg mr-3" />
          <input
            type="text"
            placeholder="Search by patient name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full text-gray-700 text-lg bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Patient Cards */}
      {currentPatients.length === 0 ? (
        <p className="text-center text-gray-700 text-lg font-medium">No patients found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPatients.map((patient, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl border border-blue-200 relative"
              >
                {/* Delete Button */}
                <button
                  onClick={() => deletePatient(patient.id)}
                  className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition"
                  title="Delete Patient"
                >
                  <FaTrash />
                </button>

                {/* Header */}
                <div className="flex items-center mb-4">
                  <FaUser className="text-blue-600 text-3xl mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    {patient.firstName} {patient.lastName}
                  </h2>
                </div>

                {/* Patient Details */}
                <div className="space-y-2 text-gray-700 text-lg">
                  <div className="flex items-center">
                    <FaPhoneAlt className="text-green-600 mr-2" />
                    <p>
                      <span className="font-semibold">Phone:</span> {patient.phoneNumber}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <FaEnvelope className="text-blue-600 mr-2" />
                    <p>
                      <span className="font-semibold">Email:</span> {patient.email}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <FaBirthdayCake className="text-pink-600 mr-2" />
                    <p>
                      <span className="font-semibold">Date of Birth:</span> {patient.dateOfBirth}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <FaVenusMars className="text-purple-600 mr-2" />
                    <p>
                      <span className="font-semibold">Gender:</span> {patient.gender}
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
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`flex items-center px-4 py-2 rounded-full font-semibold text-white transition ${
                  currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                <FaChevronLeft className="mr-2" /> Prev
              </button>

              <span className="text-lg font-semibold text-blue-900">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center px-4 py-2 rounded-full font-semibold text-white transition ${
                  currentPage === totalPages || totalPages === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Next <FaChevronRight className="ml-2" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllPatients;
