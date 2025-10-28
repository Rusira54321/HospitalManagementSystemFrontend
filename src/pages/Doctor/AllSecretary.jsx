import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEnvelope, FaSearch } from "react-icons/fa";

const AllSecretary = () => {
  const [secretaries, setSecretaries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSecretaries, setSelectedSecretaries] = useState('');
  const secretariesPerPage = 6;
  const getAllSecretariesUrl = "http://localhost:9090/api/doctor/getSecretaries";

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

    getAllSecretaries();
  }, []);

  // Filter by search term
  const filteredSecretaries = secretaries.filter((sec) =>
    `${sec.firstName} ${sec.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLast = currentPage * secretariesPerPage;
  const indexOfFirst = indexOfLast - secretariesPerPage;
  const currentSecretaries = filteredSecretaries.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredSecretaries.length / secretariesPerPage);

  const nextPage = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);

  const selectSecretary = async(id) =>{
        if(id)
        {
            try{
            const res = await axios.get('http://localhost:9090/api/doctor/addSecretary',{
                params:{
                    DoctorUserName:localStorage.getItem("username"),
                    secretaryId:id
                },
                withCredentials:true
            })
            setSelectedSecretaries(id)
            console.log(res)
        }catch(err)
        {
            console.error("Error selecting secretary:", err);
        }
        }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-200 p-6">
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-700 to-pink-600 bg-clip-text text-transparent drop-shadow-md">
        All Secretaries
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full px-5 py-3 pl-12 rounded-full shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white/80 backdrop-blur-md border border-gray-200 placeholder-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-3.5 text-gray-500 text-lg" />
        </div>
      </div>

      {/* Secretary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentSecretaries.map((sec) => {
            const isSelected = selectedSecretaries === sec.id;
          return (
            <div
              key={sec.id}
              className={`bg-white/80 backdrop-blur-lg border border-white/30 shadow-xl rounded-3xl p-6 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ${
                isSelected ? "ring-4 ring-indigo-400" : ""
              }`}
            >
              {/* Header */}
              <div className="flex items-center space-x-4 mb-4">
                <FaUserCircle className="text-indigo-500 w-14 h-14 drop-shadow-md" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {sec.firstName} {sec.lastName}
                  </h2>
                  <p className="text-sm text-gray-500">UserName: {sec.username}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-gray-700 text-sm">
                <p className="flex items-center">
                  <FaEnvelope className="mr-2 text-indigo-500" /> {sec.email}
                </p>
              </div>

              {/* Tag */}
              <div className="mt-4 flex justify-between items-center">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-600 rounded-full">
                  Active Secretary
                </span>

                {/* Select/Unselect Button */}
                <button
                  onClick={() => selectSecretary(sec.id)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${
                    isSelected
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {isSelected ? "Selected" : "Select"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Data Message */}
      {filteredSecretaries.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-lg">No secretaries found.</p>
      )}

      {/* Pagination Controls */}
      {filteredSecretaries.length > secretariesPerPage && (
        <div className="flex justify-center items-center mt-10 space-x-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
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
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
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
  );
};

export default AllSecretary;
