import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaHospital, FaUserMd, FaMapMarkerAlt, FaStethoscope, FaTrash, FaEnvelope } from 'react-icons/fa'

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([])
  const [searchHospital, setSearchHospital] = useState("")
  const [searchSpecialization, setSearchSpecialization] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6 // show 6 doctors per page

  useEffect(() => {
    const getAllDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/api/admin/getAllDoctors",
          { withCredentials: true }
        )
        
        setDoctors(response.data)
      } catch (err) {
        console.error("Failed to fetch doctors:", err)
      }
    }
    getAllDoctors()
  }, [])

  // Delete doctor
  const deleteDoctor = async (doctorId) => {
    console.log(doctorId)
    const confirmDelete = window.confirm("Are you sure you want to delete this doctor?")
    if (!confirmDelete) return

    try {
      await axios.delete(`http://localhost:9090/api/admin/deleteDoctor/${doctorId}`, {
        withCredentials: true
      })
      // Remove from state
      setDoctors(prev => prev.filter(doc => doc.id !== doctorId))
    } catch (err) {
      console.error("Failed to delete doctor:", err)
      alert("Failed to delete doctor. Please try again.")
    }
  }

  // Filter doctors based on search
  const filteredDoctors = doctors.filter(doc =>
    doc.HospitalName.toLowerCase().includes(searchHospital.toLowerCase()) &&
    doc.Specialization.toLowerCase().includes(searchSpecialization.toLowerCase())
  )

  // Pagination logic
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentDoctors = filteredDoctors.slice(startIndex, startIndex + itemsPerPage)

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">All Doctors</h1>

      {/* Search Section */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <div className="flex items-center bg-white rounded-lg shadow px-4 py-2 w-full sm:w-1/3">
          <FaHospital className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by Hospital Name"
            value={searchHospital}
            onChange={(e) => { setSearchHospital(e.target.value); setCurrentPage(1) }}
            className="w-full focus:outline-none"
          />
        </div>
        <div className="flex items-center bg-white rounded-lg shadow px-4 py-2 w-full sm:w-1/3">
          <FaStethoscope className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by Specialization"
            value={searchSpecialization}
            onChange={(e) => { setSearchSpecialization(e.target.value); setCurrentPage(1) }}
            className="w-full focus:outline-none"
          />
        </div>
      </div>

      {/* Doctors Grid */}
      {currentDoctors.length === 0 ? (
        <p className="text-center text-gray-700 mt-10">No doctors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {currentDoctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition relative"
            >
              <div className="flex items-center mb-4">
                <FaUserMd className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-xl font-bold text-blue-700">{doctor["Full name"]}</h2>
              </div>

              <p className="text-gray-600 mb-2 flex items-center">
                <FaHospital className="mr-2 text-gray-500" />
                <span className="font-semibold">Hospital:</span> {doctor.HospitalName}
              </p>

              <p className="text-gray-600 mb-2 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-500" />
                <span className="font-semibold">Location:</span> {doctor.HospitalLocation}
              </p>

              <p className="text-gray-600 mb-2 flex items-center">
                <FaStethoscope className="mr-2 text-gray-500" />
                <span className="font-semibold">Specialization:</span> {doctor.Specialization}
              </p>

              <p className="text-gray-600 mb-2 flex items-center">
                <FaEnvelope className="mr-2 text-gray-500" />
                <span className="font-semibold">Email:</span> {doctor.Email}
              </p>

              {/* Delete Button */}
              <button
                onClick={() => deleteDoctor(doctor.id)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition"
                title="Delete Doctor"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            className="px-3 py-1 bg-white rounded shadow hover:bg-blue-100 transition"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded shadow transition ${
                page === currentPage ? "bg-blue-600 text-white" : "bg-white hover:bg-blue-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            className="px-3 py-1 bg-white rounded shadow hover:bg-blue-100 transition"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default AllDoctors
