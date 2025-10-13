import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";

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
    "General Doctor", "Heart Doctor", "Brain and Nerve Doctor", "Bone and Joint Doctor",
    "Child Doctor", "Women’s Health Doctor", "Skin Doctor", "Mental Health Doctor",
    "Ear, Nose, and Throat Doctor", "Eye Doctor", "Teeth Doctor", "Kidney Doctor",
    "Stomach and Digestive Doctor", "Lung Doctor", "Cancer Doctor",
    "Diabetes and Hormone Doctor", "Blood Doctor", "X-ray and Scan Doctor",
    "Surgery Doctor", "Pain and Anesthesia Doctor", "Emergency Doctor",
    "Elderly Care Doctor", "Allergy Doctor", "Rehabilitation Doctor"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 p-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-md">Doctors List</h1>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <input
          type="text"
          placeholder="Search by doctor name"
          value={searchDoctorName}
          onChange={(e) => setSearchDoctorName(e.target.value)}
          className="px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
        />
        <select
          value={filterByHospitalName}
          onChange={(e) => setFilterByHospitalName(e.target.value)}
          className="px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
        >
          <option value="">Choose Hospital</option>
          {hospitals.map((h, idx) => (
            <option key={idx} value={h.hospitalName}>{h.hospitalName}</option>
          ))}
        </select>
        <select
          value={filterByDoctorSpecialization}
          onChange={(e) => setFilterByDoctorSpecialization(e.target.value)}
          className="px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
        >
          <option value="">Choose Specialization</option>
          {doctorSpecializations.map((s, idx) => (
            <option key={idx} value={s}>{s}</option>
          ))}
        </select>
        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          All Doctors
        </button>
      </div>

      {/* Doctors Grid */}
      {loading ? (
        <div className="text-center text-white text-xl">Loading doctors...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentDoctors.length === 0 ? (
              <div className="col-span-full text-center text-white text-xl">No doctors found</div>
            ) : (
              currentDoctors.map((doctor) => (
                <div key={doctor.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition flex flex-col items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                    alt="Doctor Icon"
                    className="w-24 h-24 mb-4 rounded-full border-4 border-blue-300 shadow-md"
                  />
                  <h2 className="text-xl font-semibold text-blue-700 mb-2 text-center">
                    Dr. {doctor.firstName} {doctor.lastName}
                  </h2>
                  <p className="text-gray-700 text-center"><span className="font-medium text-black">Specialization:</span> {doctor.specialization}</p>
                  <p className="text-gray-700 text-center"><span className="font-medium text-black">Hospital:</span> {doctor.hospital?.hospitalName}</p>
                  <p className="text-gray-700 text-center"><span className="font-medium text-black">Type:</span> {doctor.hospital?.hospitalType}</p>
                  <p className="text-gray-700 text-center"><span className="font-medium text-black">Location:</span> {doctor.hospital?.hospitalLocation}</p>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {filteredDoctors.length > doctorsPerPage && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
              >
                Previous
              </button>
              <span className="text-white font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DoctorsDetails;
