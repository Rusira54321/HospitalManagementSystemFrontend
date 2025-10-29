import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUserCircle, FaEnvelope, FaSearch, FaUserMd } from "react-icons/fa";

const AllSecretary = () => {
  const [secretaries, setSecretaries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [secretaryId, setSecretaryId] = useState("");
  const [secretaryName, setSecretaryName] = useState("");
  const [secretaryUserName, setSecretaryUserName] = useState("");
  const [selectedSecretaries, setSelectedSecretaries] = useState("");
  const secretariesPerPage = 6;
  const getAllSecretariesUrl = "http://localhost:9090/api/doctor/getSecretaries";
  const getSecretaryUrl = "http://localhost:9090/api/doctor/getSecretary";

  useEffect(() => {
    const userName = localStorage.getItem("username");

    const getAllSecretaries = async () => {
      try {
        const res = await axios.get(getAllSecretariesUrl, {
          params: { doctorUserName: userName },
          withCredentials: true,
        });
        setSecretaries(res.data);
      } catch (err) {
        console.log("Error fetching secretaries:", err);
      }
    };

    const getSecretary = async () => {
      try {
        const res = await axios.get(getSecretaryUrl, {
          params: { doctorUserName: userName },
          withCredentials: true,
        });
        setSecretaryUserName(res.data?.username);
        setSecretaryName(res.data?.firstName + " " + res.data?.lastName);
        setSecretaryId(res.data.id);
      } catch (err) {
        console.log(err);
      }
    };

    getSecretary();
    getAllSecretaries();
  }, []);

  const filteredSecretaries = secretaries.filter((sec) =>
    `${sec.firstName} ${sec.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * secretariesPerPage;
  const indexOfFirst = indexOfLast - secretariesPerPage;
  const currentSecretaries = filteredSecretaries.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredSecretaries.length / secretariesPerPage);

  const nextPage = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);

  const selectSecretary = async (id) => {
    const userName = localStorage.getItem("username");
    if (id) {
      try {
        await axios.get("http://localhost:9090/api/doctor/addSecretary", {
          params: {
            DoctorUserName: userName,
            secretaryId: id,
          },
          withCredentials: true,
        });
        setSelectedSecretaries(id);

        const res1 = await axios.get(getSecretaryUrl, {
          params: { doctorUserName: userName },
          withCredentials: true,
        });

        setSecretaryUserName(res1.data?.username);
        setSecretaryName(res1.data?.firstName + " " + res1.data?.lastName);
        setSecretaryId(res1.data.id);
      } catch (err) {
        console.error("Error selecting secretary:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-pink-100 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-indigo-700 to-pink-600 bg-clip-text text-transparent drop-shadow-md"
        >
          Manage Secretaries
        </motion.h1>

        {/* Current Secretary Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg rounded-3xl p-6 mb-10 text-center"
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-2 flex justify-center items-center gap-2">
            <FaUserMd /> Current Secretary
          </h2>
          <p className="text-lg font-medium text-gray-700">
            {secretaryName ? secretaryName : "No Secretary Assigned"}
          </p>
          <p className="text-gray-500">
            {secretaryUserName ? secretaryUserName : ""}
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search secretaries..."
              className="w-full px-5 py-3 pl-12 rounded-full shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white/70 backdrop-blur-md border border-gray-200 placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-3.5 text-gray-500 text-lg" />
          </div>
        </div>

        {/* Secretaries Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentSecretaries.map((sec, i) => {
            const isSelected = selectedSecretaries === sec.id || secretaryId === sec.id;
            return (
              <motion.div
                key={sec.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-3xl p-6 shadow-xl bg-white/70 backdrop-blur-lg border border-white/40 transition-all hover:scale-[1.03] hover:shadow-2xl ${
                  isSelected ? "ring-4 ring-indigo-400" : ""
                }`}
              >
                <div className="flex items-center space-x-4 mb-5">
                  <FaUserCircle className="text-indigo-500 w-16 h-16 drop-shadow-md" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {sec.firstName} {sec.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">@{sec.username}</p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm flex items-center">
                  <FaEnvelope className="mr-2 text-indigo-500" />
                  {sec.email}
                </p>

                <div className="mt-5 flex justify-between items-center">
                  <span className="text-xs px-3 py-1 bg-indigo-100 text-indigo-600 font-medium rounded-full">
                    Secretary
                  </span>

                  <button
                    onClick={() => selectSecretary(sec.id)}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                      isSelected
                        ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md"
                        : "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white shadow-md"
                    }`}
                  >
                    {isSelected ? "Selected" : "Select"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {filteredSecretaries.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 mt-12 text-lg"
          >
            No secretaries found.
          </motion.p>
        )}

        {/* Pagination */}
        {filteredSecretaries.length > secretariesPerPage && (
          <div className="flex justify-center items-center mt-12 space-x-6">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-6 py-2 rounded-full font-semibold ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-md"
              }`}
            >
              Previous
            </button>

            <span className="text-gray-700 font-semibold text-lg">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-6 py-2 rounded-full font-semibold ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-pink-500 hover:bg-pink-600 text-white shadow-md"
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

export default AllSecretary;
