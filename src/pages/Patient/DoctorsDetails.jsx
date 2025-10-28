import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { Link } from "react-router-dom";

const DoctorsDetails = () => {
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [filterByHospitalName, setFilterByHospitalName] = useState("");
  const [searchDoctorName, setSearchDoctorName] = useState("");
  const [filterByDoctorSpecialization, setFilterByDoctorSpecialization] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6;

  const { hospitalName, doctorSpecialization, setHospitalName, setDoctorSpecialization } = useContext(GlobalContext);

  const DoctorsDetailsUrl = "http://localhost:9090/api/patient/getDoctors";
  const getHospitalsUrl = "http://localhost:9090/api/auth/getHospitals";

  const doctorSpecializations = [
    "General Physician",
    "Cardiologist",
    "Neurologist",
    "Pediatrician",
    "Orthopedic Surgeon",
    "Gynecologist",
    "Obstetrician",
    "Dermatologist",
    "Psychiatrist",
    "Ophthalmologist",
    "ENT Specialist",
    "Urologist",
    "Gastroenterologist",
    "Pulmonologist",
    "Endocrinologist",
    "Oncologist",
    "Radiologist",
    "Pathologist",
    "Nephrologist",
    "Anesthesiologist",
    "Emergency Medicine Specialist",
    "Rheumatologist",
    "Dentist",
    "Plastic Surgeon",
    "Infectious Disease Specialist"
  ];

  // Fetch doctors and hospitals
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [doctorsRes, hospitalsRes] = await Promise.all([
          axios.get(DoctorsDetailsUrl, { withCredentials: true }),
          axios.get(getHospitalsUrl, { withCredentials: true })
        ]);
        console.log(doctorsRes.data)
        setDoctors(doctorsRes.data);
        setHospitals(hospitalsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter doctors
  useEffect(() => {
    let filtered = [...doctors];

    if (hospitalName) filtered = filtered.filter(d => d.hospital?.hospitalName === hospitalName);
    if (doctorSpecialization) filtered = filtered.filter(d => d.specialization === doctorSpecialization);
    if (filterByHospitalName) filtered = filtered.filter(d => d.hospital?.hospitalName === filterByHospitalName);
    if (filterByDoctorSpecialization) filtered = filtered.filter(d => d.specialization === filterByDoctorSpecialization);
    if (searchDoctorName) {
      filtered = filtered.filter(d =>
        (d.firstName + " " + d.lastName).toLowerCase().includes(searchDoctorName.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
    setCurrentPage(1); // Reset page when filters change
  }, [doctors, hospitalName, doctorSpecialization, filterByHospitalName, filterByDoctorSpecialization, searchDoctorName]);

  const resetFilters = () => {
    setFilterByHospitalName("");
    setFilterByDoctorSpecialization("");
    setSearchDoctorName("");
    setHospitalName("");
    setDoctorSpecialization("");
    setFilteredDoctors([...doctors]);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-200 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 text-center">
          Find Your Doctor
        </h1>
        <p className="text-center text-gray-600 mb-8">Choose from our network of specialized healthcare professionals</p>

        {/* Search & Filters */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by doctor name"
              value={searchDoctorName}
              onChange={(e) => setSearchDoctorName(e.target.value)}
              className="pl-10 w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 
              focus:ring-indigo-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <select
              value={filterByHospitalName}
              onChange={(e) => setFilterByHospitalName(e.target.value)}
              className="pl-10 w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl 
              focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200
              cursor-pointer appearance-none hover:bg-white/70 text-gray-700 font-medium"
              style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      backgroundSize: '1em' }}
            >
              <option value="" className="text-gray-500">Choose Hospital</option>
              {hospitals.map((h, idx) => (
                <option key={idx} value={h.hospitalName} className="text-gray-700 py-2">
                  {h.hospitalName}
                </option>
              ))}
            </select>
          </div>
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <select
              value={filterByDoctorSpecialization}
              onChange={(e) => setFilterByDoctorSpecialization(e.target.value)}
              className="pl-10 w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl 
              focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200
              cursor-pointer appearance-none hover:bg-white/70 text-gray-700 font-medium"
              style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      backgroundSize: '1em' }}
            >
              <option value="" className="text-gray-500">Choose Specialization</option>
              {doctorSpecializations.map((s, idx) => (
                <option key={idx} value={s} className="text-gray-700 py-2">
                  {s}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={resetFilters}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl 
            font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] 
            transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Doctors Grid */}
      {loading ? (
        <div className="text-center text-white text-xl">Loading doctors...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentDoctors.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/20">
                <svg className="w-24 h-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xl text-gray-600">No doctors found matching your criteria</p>
                <button onClick={resetFilters} className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium">
                  Clear all filters
                </button>
              </div>
            ) : (
              currentDoctors.map((doctor) => (
                <Link to={`/patient/appointment/${doctor.doctorId}`} key={doctor.doctorId} 
                  className="group bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 
                  hover:shadow-xl transition duration-300 transform hover:scale-[1.02] flex flex-col items-center"
                >
                  <div className="relative mb-6">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-60 transition"></div>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                      alt="Doctor Icon"
                      className="relative w-24 h-24 rounded-full border-4 border-white shadow-lg"
                    />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 text-center">
                    Dr. {doctor.firstName} {doctor.lastName}
                  </h2>
                  <div className="space-y-3 w-full">
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                        {doctor.specialization}
                      </span>
                    </div>
                    <div className="text-gray-600 text-center flex items-center justify-center">
                      <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {doctor.hospital?.hospitalName}
                    </div>
                    <div className="text-gray-600 text-center flex items-center justify-center">
                      <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      {doctor.hospital?.hospitalType}
                    </div>
                    <div className="text-gray-600 text-center flex items-center justify-center">
                      <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {doctor.hospital?.hospitalLocation}
                    </div>
                  </div>
                  <div className="mt-6 w-full">
                    <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 text-center text-sm text-indigo-600 font-medium">
                      Click to book appointment →
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Pagination */}
          {filteredDoctors.length > doctorsPerPage && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 
                ${currentPage === 1 
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                  : "bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg hover:shadow-xl"}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              <div className="flex items-center gap-2">
                <span className="px-4 py-2 bg-white/80 backdrop-blur-lg rounded-xl font-medium text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300
                ${currentPage === totalPages 
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                  : "bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg hover:shadow-xl"}`}
              >
                Next
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
      </div>
    </div>
  );
};

export default DoctorsDetails;
