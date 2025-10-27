import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHospitalAlt,
  FaUserMd,
  FaMapMarkerAlt,
  FaSearch,
  FaTrash,
  FaEnvelope,
  FaChevronLeft,
  FaChevronRight,
  FaUsers,
} from "react-icons/fa";

const AllHospitalStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;
  const API_URL = "http://localhost:9090/api/admin";

  /** Fetch all hospital staff */
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(`${API_URL}/GetAllHospitalStaff`, {
          withCredentials: true,
        });

        const data = response.data;
        const staffData =
          Array.isArray(data)
            ? data
            : Array.isArray(data?.staff)
            ? data.staff
            : Array.isArray(data?.data)
            ? data.data
            : [];

        setStaffList(staffData);
      } catch (error) {
        console.error("Error fetching hospital staff:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  /** Delete a staff member */
  const deleteStaff = async (staffId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this staff member?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/deleteHospitalStaff/${staffId}`, {
        withCredentials: true,
      });

      setStaffList((prev) =>
        prev.filter((staff) => staff.id !== staffId && staff._id !== staffId)
      );
    } catch (error) {
      console.error("Failed to delete staff:", error);
      alert("Failed to delete staff. Please try again.");
    }
  };

  /** Filter staff by hospital or full name */
  const filteredStaff = staffList.filter((staff) => {
    const query = searchTerm.toLowerCase();
    const hospital = (staff.hospitalName || "").toLowerCase();
    const name = (staff.fullName || staff["Full name"] || "").toLowerCase();
    return hospital.includes(query) || name.includes(query);
  });

  /** Pagination logic */
  const totalPages = Math.ceil(filteredStaff.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedStaff = filteredStaff.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  /** Helper: format staff name */
  const getStaffName = (staff) => staff.fullName || staff["Full name"] || "—";

  /** Helper: get initials from name */
  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  /** Loading skeletons */
  const renderSkeletons = () =>
    Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-2xl p-6 shadow-md animate-pulse border border-slate-100 h-56 w-80"
      />
    ));

  /** Empty state */
  const renderEmptyState = () => (
    <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-10 text-center max-w-md">
      <div className="mx-auto w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
        <FaHospitalAlt className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800">No staff found</h3>
      <p className="text-slate-500 mt-2">
        Try a different search or add new staff members.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-6 sm:p-10 flex flex-col items-center">
      <div className="max-w-7xl w-full flex flex-col items-center">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 text-center justify-center">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg flex items-center justify-center">
            <FaUsers className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
              Hospital Staff
            </h1>
            <p className="text-slate-600">Browse and manage hospital staff members</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full sm:w-3/4 md:w-1/2 mb-10">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by hospital or staff name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/90 border border-slate-200 text-slate-700 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200"
            />
          </div>
        </div>

        {/* Staff Cards */}
        <div className="space-y-8 flex flex-col items-center w-full">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {renderSkeletons()}
            </div>
          ) : paginatedStaff.length === 0 ? (
            renderEmptyState()
          ) : (
            <>
              {/* Staff Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {paginatedStaff.map((staff, idx) => (
                  <div
                    key={staff.id ?? staff._id ?? idx}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition transform hover:-translate-y-1 border border-slate-100 flex flex-col relative w-80"
                  >
                    <div className="flex gap-4 items-start">
                      {/* Avatar */}
                      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-semibold">
                        {getInitials(getStaffName(staff)) || (
                          <FaUserMd className="w-6 h-6" />
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-800">
                          {getStaffName(staff)}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                          <FaEnvelope className="text-emerald-500" /> {staff.Email}
                        </p>

                        <div className="mt-4 grid gap-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-sky-50 rounded-md text-sky-600">
                              <FaHospitalAlt />
                            </div>
                            <div>
                              <div className="text-sm text-slate-500">Hospital</div>
                              <div className="font-medium text-slate-800">
                                {staff.hospitalName}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-rose-50 rounded-md text-rose-600">
                              <FaMapMarkerAlt />
                            </div>
                            <div>
                              <div className="text-sm text-slate-500">Location</div>
                              <div className="font-medium text-slate-800">
                                {staff.hospitalLocation}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-center">
                      <button
                        onClick={() => deleteStaff(staff.id ?? staff._id)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200 flex items-center gap-2"
                      >
                        <FaTrash className="w-4 h-4" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-4">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
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
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum =
                        totalPages <= 5
                          ? i + 1
                          : currentPage <= 3
                          ? i + 1
                          : currentPage >= totalPages - 2
                          ? totalPages - 4 + i
                          : currentPage - 2 + i;

                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`w-10 h-10 rounded-md ${
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
                    onClick={() => goToPage(currentPage + 1)}
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
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllHospitalStaff;
