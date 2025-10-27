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
} from "react-icons/fa";

const AllHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const hospitalsPerPage = 6;

  useEffect(() => {
    const getAllHospitals = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9090/api/admin/getAllHospitals",
          { withCredentials: true }
        );
        const data = res.data;

        if (Array.isArray(data)) setHospitals(data);
        else if (Array.isArray(data?.hospitals)) setHospitals(data.hospitals);
        else if (Array.isArray(data?.data)) setHospitals(data.data);
        else {
          console.warn("Unexpected hospitals response shape:", data);
          setHospitals([]);
        }
      } catch (err) {
        console.error("Error fetching hospitals:", err);
        setHospitals([]);
      }
    };

    getAllHospitals();
  }, []);

  const deleteHospital = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hospital?")) return;
    try {
      await axios.delete(`http://localhost:9090/api/admin/deleteHospital/${id}`, {
        withCredentials: true,
      });
      setHospitals((prev) => prev.filter((h) => (h.hospitalId ?? h.id) !== id));
    } catch (err) {
      console.error("Error deleting hospital:", err);
    }
  };

  const filteredHospitals = hospitals.filter((h) =>
    String(h?.hospitalName ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredHospitals.length / hospitalsPerPage));
  const startIndex = (currentPage - 1) * hospitalsPerPage;
  const currentHospitals = filteredHospitals.slice(
    startIndex,
    startIndex + hospitalsPerPage
  );

  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-6 sm:p-10 flex flex-col items-center">
      <div className="max-w-7xl w-full flex flex-col items-center text-center">
        
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
            <FaHospital className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
            Hospital Network
          </h1>
          <p className="text-slate-600">
            Explore and manage registered healthcare facilities
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full sm:w-3/4 md:w-1/2 mb-10">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <FaSearch className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search hospitals by name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-700 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Hospital Cards */}
        {currentHospitals.length === 0 ? (
          <p className="text-center text-slate-700 text-lg font-medium mt-8">
            No hospitals found.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {currentHospitals.map((hospital, idx) => (
                <div
                  key={hospital.hospitalId ?? hospital.id ?? idx}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition transform hover:-translate-y-1 border border-slate-100 w-80 text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow">
                      <FaHospital className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800">
                        {hospital.hospitalName}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {hospital.hospitalLocation}
                      </p>

                      <div className="mt-4 grid grid-cols-2 gap-3 text-slate-700">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-50 rounded-md text-emerald-600">
                            <FaUserMd />
                          </div>
                          <div>
                            <div className="text-sm text-slate-500">Doctors</div>
                            <div className="font-medium">
                              {hospital.doctors?.length ?? 0}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-50 rounded-md text-purple-600">
                            <FaUsers />
                          </div>
                          <div>
                            <div className="text-sm text-slate-500">Staff</div>
                            <div className="font-medium">
                              {hospital.hospitalStaffs?.length ?? 0}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-sm text-slate-500 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-500" />
                      <span>
                        {hospital.address ??
                          hospital.hospitalLocation ??
                          "Location not provided"}
                      </span>
                    </div>

                    <button
                      onClick={() => deleteHospital(hospital.hospitalId ?? hospital.id)}
                      className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${
                  currentPage === 1
                    ? "text-slate-400 bg-slate-100 cursor-not-allowed"
                    : "text-slate-700 bg-white shadow-sm hover:shadow"
                }`}
              >
                <FaChevronLeft />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`w-10 h-10 rounded-md ${
                      num === currentPage
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md"
                        : "bg-white text-slate-700 shadow-sm hover:shadow"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${
                  currentPage === totalPages
                    ? "text-slate-400 bg-slate-100 cursor-not-allowed"
                    : "text-slate-700 bg-white shadow-sm hover:shadow"
                }`}
              >
                <FaChevronRight />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllHospitals;
