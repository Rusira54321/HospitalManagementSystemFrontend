import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserTie, FaHospitalAlt, FaMapMarkerAlt, FaSearch, FaEnvelope, FaTrash } from "react-icons/fa";

const AllHealthCareManagers = () => {
  const [managers, setManagers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [managersPerPage] = useState(6); // Show 6 managers per page

  useEffect(() => {
    const getAllHealthCareManagers = async () => {
      try {
        const res = await axios.get("http://localhost:9090/api/admin/getAllHealthCareManagers", {
          withCredentials: true,
        });
        
        setManagers(res.data);
      } catch (err) {
        console.log("Error fetching managers:", err);
      }
    };
    getAllHealthCareManagers();
  }, []);

  // Delete manager
  const deleteManager = async (managerId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this manager?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:9090/api/admin/deleteHealthCareManager/${managerId}`, {
        withCredentials: true,
      });
      setManagers(prev => prev.filter(m => m.id !== managerId));
    } catch (err) {
      console.error("Failed to delete manager:", err);
      alert("Failed to delete manager. Please try again.");
    }
  };

  // Filter by hospital name
  const filteredManagers = managers.filter((m) =>
    m.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredManagers.length / managersPerPage);
  const indexOfLastManager = currentPage * managersPerPage;
  const indexOfFirstManager = indexOfLastManager - managersPerPage;
  const currentManagers = filteredManagers.slice(indexOfFirstManager, indexOfLastManager);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-10 drop-shadow-md">
        🏥 All Health Care Managers
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

      {/* Cards Section */}
      {currentManagers.length === 0 ? (
        <p className="text-center text-gray-700 text-lg">No healthcare managers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentManagers.map((manager, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 transition transform hover:-translate-y-2 hover:shadow-2xl relative"
            >
              {/* Name */}
              <div className="flex items-center mb-4">
                <FaUserTie className="text-blue-600 text-3xl mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">{manager["Full name"]}</h2>
              </div>

              {/* Hospital */}
              <div className="flex items-center mb-2">
                <FaHospitalAlt className="text-green-600 mr-2" />
                <p className="text-gray-700 text-lg">
                  <span className="font-semibold">Hospital:</span> {manager.hospitalName}
                </p>
              </div>

              {/* Location */}
              <div className="flex items-center mb-2">
                <FaMapMarkerAlt className="text-red-600 mr-2" />
                <p className="text-gray-700 text-lg">
                  <span className="font-semibold">Location:</span> {manager.hospitalLocation}
                </p>
              </div>

              {/* Email */}
              <div className="flex items-center mb-2">
                <FaEnvelope className="text-purple-600 mr-2" />
                <p className="text-gray-700 text-lg">
                  <span className="font-semibold">Email:</span> {manager.Email}
                </p>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deleteManager(manager.id)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition"
                title="Delete Manager"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {filteredManagers.length > managersPerPage && (
        <div className="flex justify-center items-center mt-10 space-x-2">
          <button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => paginate(num)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                currentPage === num
                  ? "bg-blue-800 text-white"
                  : "bg-white text-blue-600 hover:bg-blue-100"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllHealthCareManagers;
