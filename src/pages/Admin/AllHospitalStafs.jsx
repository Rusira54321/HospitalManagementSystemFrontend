import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHospitalAlt, FaUserMd, FaMapMarkerAlt, FaSearch, FaTrash, FaEnvelope } from "react-icons/fa";

const AllHospitalStafs = () => {
  const [hospitalStaff, setHospitalStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Show 6 staff per page

  useEffect(() => {
    const getAllHospitalStafs = async () => {
      try {
        const res = await axios.get("http://localhost:9090/api/admin/GetAllHospitalStaff", {
          withCredentials: true,
        });
        
        setHospitalStaff(res.data);
      } catch (err) {
        console.log("Error fetching hospital staff:", err);
      }
    };
    getAllHospitalStafs();
  }, []);

  // Delete hospital staff
  const deleteStaff = async (staffId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this staff member?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:9090/api/admin/deleteHospitalStaff/${staffId}`, {
        withCredentials: true,
      });
      setHospitalStaff(prev => prev.filter(staff => staff.id !== staffId));
    } catch (err) {
      console.error("Failed to delete staff:", err);
      alert("Failed to delete staff. Please try again.");
    }
  };

  // Filter staff by hospital name
  const filteredStaff = hospitalStaff.filter((staff) =>
    staff.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStaff = filteredStaff.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-10 drop-shadow-md">
        All Hospital Staff
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

      {/* Hospital Staff Cards */}
      {currentStaff.length === 0 ? (
        <p className="text-center text-gray-700 text-lg">No hospital staff found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentStaff.map((staff, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 transition transform hover:-translate-y-2 hover:shadow-2xl relative"
            >
              <div className="flex items-center mb-4">
                <FaUserMd className="text-blue-600 text-3xl mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">{staff["Full name"]}</h2>
              </div>

              <div className="flex items-center mb-2">
                <FaHospitalAlt className="text-green-600 mr-2" />
                <p className="text-gray-700 text-lg">
                  <span className="font-semibold">Hospital:</span> {staff.hospitalName}
                </p>
              </div>

              <div className="flex items-center mb-2">
                <FaMapMarkerAlt className="text-red-600 mr-2" />
                <p className="text-gray-700 text-lg">
                  <span className="font-semibold">Location:</span> {staff.hospitalLocation}
                </p>
              </div>

              <div className="flex items-center">
                <FaEnvelope className="text-purple-600 mr-2" />
                <p className="text-gray-700 text-lg">
                  <span className="font-semibold">Email:</span> {staff.Email}
                </p>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deleteStaff(staff.id)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition"
                title="Delete Staff"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-full shadow-md font-semibold transition ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-blue-700 hover:bg-blue-100"
            }`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded-full shadow-md font-semibold transition ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-700 hover:bg-blue-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-full shadow-md font-semibold transition ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-blue-700 hover:bg-blue-100"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllHospitalStafs;
