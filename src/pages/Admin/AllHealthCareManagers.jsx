import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaUserTie,
  FaHospitalAlt,
  FaMapMarkerAlt,
  FaSearch,
  FaEnvelope,
  FaTrash,
} from "react-icons/fa";
import { motion } from "framer-motion";

const AllHealthCareManagers = () => {
  const [managers, setManagers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [managersPerPage] = useState(6);

  useEffect(() => {
    const getAllHealthCareManagers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9090/api/admin/getAllHealthCareManagers",
          { withCredentials: true }
        );
        setManagers(res.data);
      } catch (err) {
        console.log("Error fetching managers:", err);
      }
    };
    getAllHealthCareManagers();
  }, []);

  const deleteManager = async (managerId) => {
    if (!window.confirm("Are you sure you want to delete this manager?")) return;
    try {
      await axios.delete(
        `http://localhost:9090/api/admin/deleteHealthCareManager/${managerId}`,
        { withCredentials: true }
      );
      setManagers((prev) => prev.filter((m) => m.id !== managerId));
    } catch (err) {
      console.error("Failed to delete manager:", err);
      alert("Failed to delete manager. Please try again.");
    }
  };

  const filteredManagers = managers.filter((m) =>
    m.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredManagers.length / managersPerPage);
  const indexOfLastManager = currentPage * managersPerPage;
  const indexOfFirstManager = indexOfLastManager - managersPerPage;
  const currentManagers = filteredManagers.slice(
    indexOfFirstManager,
    indexOfLastManager
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-cyan-50 via-white to-blue-50 px-4 py-6">
      <div className="max-w-7xl w-full flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg flex items-center justify-center mb-3">
            <FaUserTie className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Health Care Managers
          </h1>
          <p className="text-slate-600 mt-1 text-base">
            Manage hospital-level managers and their assignments.
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="w-full flex justify-center mb-6">
          <div className="relative bg-white/90 backdrop-blur-sm rounded-xl border border-slate-100 shadow-sm w-full sm:w-2/3 md:w-1/2 p-1 hover:shadow-lg transition-all">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <FaSearch className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by hospital name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-transparent text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="w-full flex justify-center">
          {currentManagers.length === 0 ? (
            <div className="bg-white/90 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 text-center shadow-sm">
              <div className="mx-auto w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-3">
                <FaHospitalAlt className="w-6 h-6" />
              </div>
              <p className="text-slate-700 font-medium text-base">
                No healthcare managers found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full justify-items-center">
              {currentManagers.map((manager, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-[300px]"
                >
                  <div className="flex gap-3 items-start">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {((manager["Full name"] || "")
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("") || "HM")}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-slate-900">
                        {manager["Full name"]}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
                        <FaHospitalAlt className="text-emerald-500" />{" "}
                        {manager.hospitalName}
                      </p>

                      <div className="mt-2 space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <FaMapMarkerAlt className="text-rose-600" />
                          {manager.hospitalLocation}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <FaEnvelope className="text-purple-600" />
                          {manager.Email}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => deleteManager(manager.id)}
                      className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-colors duration-200"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredManagers.length > managersPerPage && (
          <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 rounded-md text-sm font-semibold ${
                currentPage === 1
                  ? "text-slate-400 bg-slate-100 cursor-not-allowed"
                  : "text-slate-700 bg-white shadow-sm hover:shadow-md transition"
              }`}
            >
              Prev
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => paginate(num)}
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold ${
                    currentPage === num
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                      : "bg-white text-slate-700 hover:shadow-md"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 rounded-md text-sm font-semibold ${
                currentPage === totalPages
                  ? "text-slate-400 bg-slate-100 cursor-not-allowed"
                  : "text-slate-700 bg-white shadow-sm hover:shadow-md transition"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllHealthCareManagers;
