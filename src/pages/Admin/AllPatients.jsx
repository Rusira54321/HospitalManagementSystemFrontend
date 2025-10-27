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
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 6;

  useEffect(() => {
    const getAllPatients = async () => {
      try {
        const res = await axios.get("http://localhost:9090/api/admin/getAllPatients", {
          withCredentials: true,
        });
        const data = res.data;
        if (Array.isArray(data)) {
          setPatients(data);
        } else if (Array.isArray(data?.patients)) {
          setPatients(data.patients);
        } else if (Array.isArray(data?.data)) {
          setPatients(data.data);
        } else {
          setPatients([]);
        }
      } catch (err) {
        console.error("Error fetching patients:", err);
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };
    getAllPatients();
  }, []);

  const deletePatient = async (patientId) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;
    try {
      await axios.delete(`http://localhost:9090/api/admin/deletePatient/${patientId}`, {
        withCredentials: true,
      });
      setPatients((prev) => prev.filter((p) => p.id !== patientId && p._id !== patientId));
    } catch (err) {
      console.error("Failed to delete patient:", err);
      alert("Failed to delete patient. Please try again.");
    }
  };

  const filteredPatients = patients.filter((p) => {
    const fullName = `${p?.firstName || ""} ${p?.lastName || ""}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatDate = (d) => {
    if (!d) return "-";
    try {
      const dt = new Date(d);
      return isNaN(dt) ? d : dt.toLocaleDateString();
    } catch {
      return d;
    }
  };

  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);
  const startIndex = (currentPage - 1) * patientsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, startIndex + patientsPerPage);

  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex flex-col items-center justify-start py-10 px-6">
      <div className="w-full max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl shadow-lg mb-4">
            <FaUser className="text-white w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
            Patient Registry
          </h1>
          <p className="text-slate-600 mt-2 text-lg">Manage and monitor your registered patients</p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full sm:w-1/2">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search patients by name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200"
            />
          </div>
        </div>

        {/* Patient Cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md animate-pulse h-56" />
            ))}
          </div>
        ) : currentPatients.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-12 text-center shadow-md">
            <div className="mx-auto w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
              <FaUser className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">No patients found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search or add new patients.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPatients.map((patient, index) => (
                <div
                  key={patient.id ?? patient._id ?? index}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-semibold text-lg shadow">
                      {patient.firstName || patient.lastName ? (
                        <>
                          {(patient.firstName?.[0] || "").toUpperCase()}
                          {(patient.lastName?.[0] || "").toUpperCase()}
                        </>
                      ) : (
                        <FaUser className="w-6 h-6" />
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-slate-800 mt-4">
                      {patient.firstName} {patient.lastName}
                    </h3>
                    <p className="text-slate-500 text-sm flex items-center justify-center gap-2 mt-1">
                      <FaEnvelope className="text-emerald-500" /> {patient.email}
                    </p>

                    <div className="mt-4 space-y-3 text-sm w-full">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sky-600">
                          <FaPhoneAlt /> <span className="text-slate-600">Phone</span>
                        </div>
                        <span className="font-medium text-slate-800">{patient.phoneNumber}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-purple-600">
                          <FaVenusMars /> <span className="text-slate-600">Gender</span>
                        </div>
                        <span className="font-medium text-slate-800">{patient.gender}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-pink-600">
                          <FaBirthdayCake /> <span className="text-slate-600">Date of Birth</span>
                        </div>
                        <span className="font-medium text-slate-800">{formatDate(patient.dateOfBirth)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => deletePatient(patient.id)}
                      className="mt-6 w-full py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 font-medium"
                    >
                      <FaTrash className="w-4 h-4" />
                      Remove Patient
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
                className={`p-3 rounded-md ${
                  currentPage === 1
                    ? "text-slate-400 bg-slate-100 cursor-not-allowed"
                    : "text-slate-700 bg-white shadow-sm hover:shadow"
                }`}
              >
                <FaChevronLeft />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg font-medium ${
                        pageNum === currentPage
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                          : "bg-white text-slate-700 shadow-sm hover:shadow"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`p-3 rounded-md ${
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

export default AllPatients;
