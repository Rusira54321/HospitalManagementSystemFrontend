import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AddDoctor = () => {
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [specialization,setSpecialization] = useState("")
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const [validationError,setValidationError] = useState("")
  const [hospitals,setHospitals] = useState([])
  const [hospitalId,setHospitalId] = useState("")
  const [success,setSuccess] = useState("")
  const [error,setError] = useState("")

  const submiturl = "http://localhost:9090/api/auth/register/doctor"
  const url = "http://localhost:9090/api/auth/getHospitals"

  const validatePassword = (password) => {
    const minlength = 8
    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasNumber  = /[0-9]/.test(password)
    const hasSpecial = /[@$!%*?&#^]/.test(password)
    if(password.length<minlength) return "Password must be at least 8 characters long."
    else if(!hasUpper) return "Password must contain at least one uppercase letter."
    else if(!hasLower) return "Password must contain at least one lowercase letter."
    else if(!hasNumber) return "Password must contain at least one number."
    else if(!hasSpecial) return "Password must contain at least one special character (@$!%*?&#^)."
    else return ""
  }

  const validateUsername = (username) =>{
    if(username.length<5) return "Username must be at least 5 characters long."
    else return ""
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const passwordError = validatePassword(password)
    if(passwordError != ""){
      setSuccess("")
      setError("")
      setValidationError(passwordError)
      return
    }
    setValidationError("")
    const userNameError = validateUsername(username)
    if(userNameError!=""){
      setSuccess("")
      setError("")
      setValidationError(userNameError)
      return
    }
    setValidationError("")
    await axios.post(submiturl,{
      firstName,
      lastName,
      specialization,
      username,
      password,
      email
    },{
      params: {
      hospitalId
    },
      withCredentials:true
    }).then((res)=>{
      setError("")
      setSuccess("Registration successful") 
      setFirstName("")
      setLastName("")
      setSpecialization("")
      setUsername("")
      setPassword("")
      setEmail("")
      setHospitalId("")          
    }).catch((error)=>{
      setSuccess("")
      console.log(error)
      setError(error.response.data)
    })
  }

  useEffect(()=>{
    const getHospitals = async() =>{
      await axios.get(url,{
        withCredentials:true
      }).then((res)=>{
        setHospitals(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
    getHospitals()
  },[])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-200 px-4 py-10">
      <form 
        className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6 border border-white/20"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-2">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-4 mb-4 shadow-lg transform hover:scale-105 transition-all duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 text-center">
            Add New Doctor
          </h1>
          <p className="text-gray-600 text-sm text-center">Complete the form below to register a new doctor</p>
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input 
            type='text' 
            value={username} 
            onChange={(e)=>setUsername(e.target.value)} 
            required 
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 
            focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400
            hover:bg-white/70"
            placeholder="Enter username"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
          <input 
            type='password' 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)} 
            required 
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 
            focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400
            hover:bg-white/70"
            placeholder="Enter password"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input 
            type='email' 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
            required 
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 
            focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400
            hover:bg-white/70"
            placeholder="Enter email"
          />
        </div>

        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input 
            type='text' 
            value={firstName} 
            onChange={(e)=>setFirstName(e.target.value)} 
            required 
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 
            focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400
            hover:bg-white/70"
            placeholder="Enter first name"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input 
            type='text' 
            value={lastName} 
            onChange={(e)=>setLastName(e.target.value)} 
            required 
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 
            focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400
            hover:bg-white/70"
            placeholder="Enter last name"
          />
        </div>

        {/* Specialization */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
          <select 
            onChange={(e)=>setSpecialization(e.target.value)} 
            value={specialization} 
            required
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 
            focus:ring-indigo-500 focus:border-transparent transition-all duration-200
            hover:bg-white/70 cursor-pointer appearance-none"
            style={{ 
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1em'
            }}
          >
            <option value="">Select Doctor Specialization</option>
            <option value="General Physician">General Physician</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Obstetrician">Obstetrician</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Psychiatrist">Psychiatrist</option>
            <option value="Ophthalmologist">Ophthalmologist</option>
            <option value="ENT Specialist">ENT Specialist</option>
            <option value="Urologist">Urologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
            <option value="Pulmonologist">Pulmonologist</option>
            <option value="Endocrinologist">Endocrinologist</option>
            <option value="Oncologist">Oncologist</option>
            <option value="Radiologist">Radiologist</option>
            <option value="Pathologist">Pathologist</option>
            <option value="Nephrologist">Nephrologist</option>
            <option value="Anesthesiologist">Anesthesiologist</option>
            <option value="Emergency Medicine Specialist">Emergency Medicine Specialist</option>
            <option value="Rheumatologist">Rheumatologist</option>
            <option value="Dentist">Dentist</option>
            <option value="Plastic Surgeon">Plastic Surgeon</option>
            <option value="Infectious Disease Specialist">Infectious Disease Specialist</option>
          </select>
        </div>

        {/* Hospital */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hospital</label>
          <select 
            value={hospitalId} 
            onChange={(e)=>setHospitalId(e.target.value)} 
            required 
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 
            focus:ring-indigo-500 focus:border-transparent transition-all duration-200
            hover:bg-white/70 cursor-pointer appearance-none"
            style={{ 
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1em'
            }}
          >
            <option value="">Choose hospital</option>
            {hospitals && hospitals.map((hospital,index)=>(
              <option key={index} value={hospital.hospitalId}>{hospital.hospitalName}</option>
            ))}
          </select>
        </div>

        {/* Messages */}
        {validationError && (
          <div className="flex items-center gap-2 bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded mt-2 text-sm animate-fade-in">
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" 
                 viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>{validationError}</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded mt-2 text-sm animate-fade-in">
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" 
                 viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 bg-green-100 border border-green-300 text-green-700 px-3 py-2 rounded mt-2 text-sm animate-fade-in">
            <span>{success}</span>
          </div>
        )}

        {/* Submit Button */}
        <button 
          type='submit' 
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl 
          font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] 
          transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Register Doctor
        </button>
      </form>
    </div>
  )
}

export default AddDoctor
