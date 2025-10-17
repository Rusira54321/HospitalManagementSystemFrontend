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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex flex-col relative">

      {/* 🔹 Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-5 right-5 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold 
        hover:bg-red-600 active:bg-red-700 shadow-md transition"
      >
        Logout
      </button>

      <div className='flex pt-30 px-10 gap-x-2 w-full h-[400px]'>
        <form onSubmit={handleSearch} className='flex flex-col p-5 bg-blue-50 w-1/2 rounded-2xl'>
          <h1 className='text-xl font-semibold text-blue-700 py-2'>Schedule Appointment</h1>
          <select
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            required
            className="mb-4 p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2
             focus:ring-blue-400 bg-white text-gray-700 shadow-sm hover:shadow-md transition"
          >
            <option value="">Choose Hospital Name</option>
            {Array.isArray(hospitals) &&
              hospitals.map((hospital, index) => (
                <option value={hospital.hospitalName} key={index}>
                  {hospital.hospitalName}
                </option>
              ))}
          </select>

          <select
            value={doctorSpecialization}
            onChange={(e) => setDoctorSpecialization(e.target.value)}
            required
            className="mb-4 p-3 rounded-lg border border-blue-300 focus:outline-none 
            focus:ring-2 focus:ring-blue-400 bg-white text-gray-700 shadow-sm hover:shadow-md transition"
          >
            <option value="">Choose Doctor Specialization</option>
            {doctorSpecializations.map((specialization, index) => (
              <option value={specialization} key={index}>{specialization}</option>
            ))}
          </select>

          <button
            type='submit'
            className="mt-2 p-3 bg-blue-500 text-white rounded-lg font-semibold
             hover:bg-blue-600 active:bg-blue-700 shadow-md transition"
          >
            Search
          </button>
        </form>
        {/* Patient information */}
<div className='flex flex-col p-6 bg-blue-100 w-1/2 rounded-2xl shadow-md hover:shadow-lg transition'>
  <div className='flex items-center justify-between mb-4'>
    <h2 className='text-xl font-semibold text-blue-700'>Upcoming Appointments</h2>
    <div className='bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shadow'>
      {NumberOfbookedAppointments}
    </div>
  </div>
  <p className='text-gray-600'>
    {NumberOfbookedAppointments === 0
      ? 'No upcoming appointments'
      : `You have ${NumberOfbookedAppointments} appointment${NumberOfbookedAppointments > 1 ? 's' : ''} booked`}
  </p>
</div>

      </div>

      {/* Display the latest 5 completed appointments in table format */}
<div className='m-10 bg-blue-50 rounded-2xl px-10 py-5'>
  <p className="font-semibold mb-3 text-lg">Recent Visits</p>

  {completedAppointments.length === 0 ? (
    <p>No completed appointments yet</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-sm">
        <thead>
          <tr className="bg-blue-100 text-left">
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Doctor Name</th>
            <th className="py-2 px-4">Specialization</th>
          </tr>
        </thead>
        <tbody>
          {completedAppointments.map((appointment) => {
            const completeDate = new Date(appointment.completeTime);
            const formattedDate = completeDate.toLocaleDateString("en-GB"); // DD/MM/YYYY format

            return (
              <tr key={appointment.id} className="border-t">
                <td className="py-2 px-4">{formattedDate}</td>
                <td className="py-2 px-4">{appointment.doctor.firstName} {appointment.doctor.lastName}</td>
                <td className="py-2 px-4">{appointment.doctor.specialization}</td>
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
