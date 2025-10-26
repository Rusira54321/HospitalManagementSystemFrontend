import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from './GlobalContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Patient = () => {
  const navigate = useNavigate()
  const getHospitalsUrl = 'http://localhost:9090/api/auth/getHospitals'
  const logoutUrl = 'http://localhost:9090/api/auth/logout'
  const getPatientDetailsUrl = 'http://localhost:9090/api/patient/GetCompletedAppointments'
  const patientURL = 'http://localhost:9090/api/patient/getPatient'
  const [NumberOfbookedAppointments,setNumberOfBookedAppointments] = useState(0)
  const [completedAppointments,setCompletedAppointments] = useState([])

  const [hospitals, setHospitals] = useState([])
  const { hospitalName, doctorSpecialization, setDoctorSpecialization, setHospitalName } = useContext(GlobalContext)

  const doctorSpecializations = [
    "General Doctor", "Heart Doctor", "Brain and Nerve Doctor", "Bone and Joint Doctor",
    "Child Doctor", "Women’s Health Doctor", "Skin Doctor", "Mental Health Doctor", "Ear, Nose, and Throat Doctor",
    "Eye Doctor", "Teeth Doctor", "Kidney Doctor", "Stomach and Digestive Doctor", "Lung Doctor", "Cancer Doctor",
    "Diabetes and Hormone Doctor", "Blood Doctor", "X-ray and Scan Doctor", "Surgery Doctor", "Pain and Anesthesia Doctor",
    "Emergency Doctor", "Elderly Care Doctor", "Allergy Doctor", "Rehabilitation Doctor"
  ]

  useEffect(() => {
    const username = localStorage.getItem("username")
    const getHospitals = async () => {
      try {
        const res = await axios.get(getHospitalsUrl, { withCredentials: true })
        setHospitals(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getHospitals()
    const getPatientDetails = async() =>{
      try{
        const res = await axios.get(patientURL,{
        params:{
          username:username
        },
        withCredentials:true
        })
        const patientId = res.data.id
        const patientRes= await axios.get(getPatientDetailsUrl,{
          params:{
            patientID:patientId
          },
          withCredentials:true
        })
        const latestFive = patientRes.data.completedAppointmentsByDesc.slice(0,5)
      setCompletedAppointments(latestFive)
      setNumberOfBookedAppointments(patientRes.data.bookedAppointments.length)
    }catch(err)
    {
      console.log(err)
    }   
    }
    getPatientDetails()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/patient/doctorDetails')
  }

  const handleLogout = async () => {
    try {
      await axios.post(logoutUrl, {}, { withCredentials: true })
      navigate('/') // redirect to login after logout
    } catch (err) {
      console.log("Logout failed:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-200 flex flex-col relative p-8">
      {/* Header Section */}
      <div className="absolute top-0 right-0 left-0 p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Patient Dashboard
        </h1>
        
        <button
          onClick={handleLogout}
          className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold 
          hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300
          flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-24 w-full max-w-7xl mx-auto">
        <form onSubmit={handleSearch} className='flex flex-col p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 w-1/2'>
          <h1 className='text-2xl font-bold text-gray-800 mb-6 flex items-center'>
            <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Schedule Appointment
          </h1>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Hospital</label>
              <select
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 
                focus:ring-indigo-500 focus:border-transparent transition duration-200"
              >
                <option value="">Select a Hospital</option>
                {Array.isArray(hospitals) &&
                  hospitals.map((hospital, index) => (
                    <option value={hospital.hospitalName} key={index}>
                      {hospital.hospitalName}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Specialization</label>
              <select
                value={doctorSpecialization}
                onChange={(e) => setDoctorSpecialization(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 
                focus:ring-indigo-500 focus:border-transparent transition duration-200"
              >
                <option value="">Select Specialization</option>
                {doctorSpecializations.map((specialization, index) => (
                  <option value={specialization} key={index}>{specialization}</option>
                ))}
              </select>
            </div>

            <button
              type='submit'
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl 
              font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] 
              transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search Doctors</span>
            </button>
          </div>
        </form>
        {/* Patient information */}
<div className='flex flex-col p-8 bg-white/80 backdrop-blur-lg w-1/2 rounded-2xl shadow-xl border border-white/20'>
  <div className='flex items-center justify-between mb-6'>
    <div className="flex items-center">
      <svg className="w-6 h-6 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <h2 className='text-2xl font-bold text-gray-800'>Upcoming Appointments</h2>
    </div>
    <div className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl px-4 py-2 flex items-center gap-2 shadow-lg'>
      <span className="text-sm font-medium">Total</span>
      <span className="text-xl font-bold">{NumberOfbookedAppointments}</span>
    </div>
  </div>
  <div className={`flex items-center ${NumberOfbookedAppointments === 0 ? 'text-gray-500' : 'text-gray-700'} text-lg`}>
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {NumberOfbookedAppointments === 0 ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      )}
    </svg>
    <p>
      {NumberOfbookedAppointments === 0
        ? 'No upcoming appointments scheduled'
        : `You have ${NumberOfbookedAppointments} appointment${NumberOfbookedAppointments > 1 ? 's' : ''} booked`}
    </p>
  </div>
</div>

      </div>

      {/* Display the latest 5 completed appointments in table format */}
<div className='mt-10 bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20'>
  <div className="flex items-center mb-6">
    <svg className="w-6 h-6 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
    <h2 className="text-2xl font-bold text-gray-800">Recent Visits</h2>
  </div>

  {completedAppointments.length === 0 ? (
    <div className="text-center py-8">
      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <p className="text-gray-500 text-lg">No completed appointments yet</p>
    </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Date</th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Doctor Name</th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Specialization</th>
          </tr>
        </thead>
        <tbody>
          {completedAppointments.map((appointment) => {
            const completeDate = new Date(appointment.completeTime);
            const formattedDate = completeDate.toLocaleDateString("en-GB");

            return (
              <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition duration-200">
                <td className="py-4 px-6 text-gray-800">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formattedDate}
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-800">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {appointment.doctor.firstName} {appointment.doctor.lastName}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {appointment.doctor.specialization}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )}
</div>


    </div>
  )
}

export default Patient
