import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaHospital,
  FaMapMarkerAlt,
  FaUserMd,
  FaUsers,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaTrashAlt,
} from "react-icons/fa";

const AllHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const hospitalsPerPage = 6;

  // Fetch hospitals
  useEffect(() => {
    const getAllHospitals = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9090/api/admin/getAllHospitals",
          { withCredentials: true }
        );
        setHospitals(res.data);
      } catch (err) {
        console.log("Error fetching hospitals:", err);
      }
    };
    getAllHospitals();
  }, []);

  // Delete hospital
  const deleteHospital = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hospital?")) return;
    try {
      await axios.delete(`http://localhost:9090/api/admin/deleteHospital/${id}`, {
        withCredentials: true,
      });
      // Remove deleted hospital from state
      setHospitals(hospitals.filter((h) => h.id !== id));
    } catch (err) {
      console.log("Error deleting hospital:", err);
    }
  };

  // Filter by hospital name
  const filteredHospitals = hospitals.filter((h) =>
    h.hospitalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredHospitals.length / hospitalsPerPage);
  const startIndex = (currentPage - 1) * hospitalsPerPage;
  const currentHospitals = filteredHospitals.slice(
    startIndex,
    startIndex + hospitalsPerPage
  );

  // Change pages
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 px-6 py-10">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-10 drop-shadow-md">
        🏥 All Registered Hospitals
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center bg-white rounded-full shadow-lg px-5 py-3 w-full sm:w-2/3 md:w-1/2 transition-all duration-300 hover:shadow-xl">
          <FaSearch className="text-gray-400 text-lg mr-3" />
          <input
            type="text"
            placeholder="Search by hospital name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full text-gray-700 text-lg bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Hospital Cards */}
      {currentHospitals.length === 0 ? (
        <p className="text-center text-gray-700 text-lg font-medium">
          No hospitals found.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentHospitals.map((hospital, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl border border-blue-200 relative"
              >
                {/* Header */}
                <div className="flex items-center mb-4">
                  <FaHospital className="text-blue-600 text-3xl mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    {hospital.hospitalName}
                  </h2>
                </div>

                {/* Hospital Details */}
                <div className="space-y-2 text-gray-700 text-lg">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-red-600 mr-2" />
                    <p>
                      <span className="font-semibold">Location:</span>{" "}
                      {hospital.hospitalLocation}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <FaUsers className="text-purple-600 mr-2" />
                    <p>
                      <span className="font-semibold">Staffs:</span>{" "}
                      {hospital.hospitalStaffs.length}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <FaUserMd className="text-green-600 mr-2" />
                    <p>
                      <span className="font-semibold">Doctors:</span>{" "}
                      {hospital.doctors.length}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <p className="font-semibold text-gray-800">
                      Type:{" "}
                      <span className="text-blue-600">{hospital.hospitalType}</span>
                    </p>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => deleteHospital(hospital.hospitalId)}
                  className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition"
                  title="Delete Hospital"
                >
                  <FaTrashAlt size={20} />
                </button>
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
                  currentPage === 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
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

export default AllHospitals;
