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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-block bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-4 mb-6 
        shadow-lg transform hover:scale-105 transition-all duration-300">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          All Doctors
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          View and manage all registered medical practitioners
        </p>
      </div>

      {/* Search Section */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12 max-w-4xl mx-auto">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FaHospital className="text-blue-500 w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search by Hospital Name"
            value={searchHospital}
            onChange={(e) => { setSearchHospital(e.target.value); setCurrentPage(1) }}
            className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 
            rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all 
            duration-200 placeholder-gray-400 hover:bg-white/90"
          />
        </div>
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FaStethoscope className="text-blue-500 w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search by Specialization"
            value={searchSpecialization}
            onChange={(e) => { setSearchSpecialization(e.target.value); setCurrentPage(1) }}
            className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 
            rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all 
            duration-200 placeholder-gray-400 hover:bg-white/90"
          />
        </div>
      </div>

      {/* Doctors Grid */}
      {currentDoctors.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-600 text-lg">No doctors found matching your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentDoctors.map((doctor, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl 
              transition-all duration-300 p-6 relative overflow-hidden border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl p-3 mr-4
                  group-hover:scale-110 transition-transform duration-300">
                    <FaUserMd className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                  bg-clip-text text-transparent">{doctor["Full name"]}</h2>
                </div>

                <div className="space-y-4">
                  <p className="flex items-center text-gray-700 group-hover:text-gray-900 transition-colors">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors">
                      <FaHospital className="w-4 h-4 text-blue-600" />
                    </div>
                    <span><span className="font-medium">Hospital:</span> {doctor.HospitalName}</span>
                  </p>

                  <p className="flex items-center text-gray-700 group-hover:text-gray-900 transition-colors">
                    <div className="bg-green-100 p-2 rounded-lg mr-3 group-hover:bg-green-200 transition-colors">
                      <FaMapMarkerAlt className="w-4 h-4 text-green-600" />
                    </div>
                    <span><span className="font-medium">Location:</span> {doctor.HospitalLocation}</span>
                  </p>

                  <p className="flex items-center text-gray-700 group-hover:text-gray-900 transition-colors">
                    <div className="bg-purple-100 p-2 rounded-lg mr-3 group-hover:bg-purple-200 transition-colors">
                      <FaStethoscope className="w-4 h-4 text-purple-600" />
                    </div>
                    <span><span className="font-medium">Specialization:</span> {doctor.Specialization}</span>
                  </p>

                  <p className="flex items-center text-gray-700 group-hover:text-gray-900 transition-colors">
                    <div className="bg-orange-100 p-2 rounded-lg mr-3 group-hover:bg-orange-200 transition-colors">
                      <FaEnvelope className="w-4 h-4 text-orange-600" />
                    </div>
                    <span><span className="font-medium">Email:</span> {doctor.Email}</span>
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => deleteDoctor(doctor.id)}
                  className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-600 
                  hover:bg-red-50 rounded-lg transition-all duration-300"
                  title="Delete Doctor"
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300
            ${currentPage === 1 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700 shadow-sm hover:shadow'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-xl font-medium transition-all duration-300
                ${page === currentPage 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' 
                  : 'bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-600 shadow-sm hover:shadow'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300
            ${currentPage === totalPages 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700 shadow-sm hover:shadow'
            }`}
          >
            Next
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

export default AllDoctors
