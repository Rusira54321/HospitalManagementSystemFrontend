import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from './GlobalContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Patient = () => {
  const navigate = useNavigate()
  const getHospitalsUrl = 'http://localhost:9090/api/auth/getHospitals'
  const [hospitals,setHospitals] = useState([])
  const { hospitalName, doctorSpecialization, setDoctorSpecialization, setHospitalName } = useContext(GlobalContext)
  const doctorSpecializations = [
    "General Doctor", "Heart Doctor", "Brain and Nerve Doctor", "Bone and Joint Doctor", 
    "Child Doctor", "Women’s Health Doctor", "Skin Doctor", "Mental Health Doctor", "Ear, Nose, and Throat Doctor",
     "Eye Doctor", "Teeth Doctor", "Kidney Doctor", "Stomach and Digestive Doctor", "Lung Doctor", "Cancer Doctor",
      "Diabetes and Hormone Doctor", "Blood Doctor", "X-ray and Scan Doctor", "Surgery Doctor", "Pain and Anesthesia Doctor", 
      "Emergency Doctor", "Elderly Care Doctor", "Allergy Doctor", "Rehabilitation Doctor"
  ]

  useEffect(()=>{
    const getHospitals = async() =>{
        await axios.get(getHospitalsUrl,{
          withCredentials:true
        }).then((res)=>{
          setHospitals(res.data)
        }).catch((err)=>{
          console.log(err)
        })
    }
    getHospitals()
  },[])
  const handleSearch = (e) => { 
    e.preventDefault()
    navigate('/patient/doctorDetails')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex flex-col ">
      <div className='flex pt-30 px-10  gap-x-2 w-full h-[400px]'>
        
        <form onSubmit={handleSearch} className='flex flex-col p-5 bg-blue-50 w-1/2 rounded-2xl'>
        
          <select
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            required
            className="mb-4 p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2
             focus:ring-blue-400 bg-white text-gray-700 shadow-sm hover:shadow-md transition"
          >
            <option value="">Choose Hospital Name</option>
            
            {Array.isArray(hospitals) ? hospitals.map((hospital, index) => (
              <option value={hospital.hospitalName} key={index}>{hospital.hospitalName}</option>
            )):null}

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
        <div className='flex flex-col p-5 bg-blue-50 w-1/2 rounded-2xl'>
        </div>
      </div>
      <div className='m-10 bg-blue-50 rounded-2xl  h-[200px]'>

      </div>
    </div>
  )
}

export default Patient
