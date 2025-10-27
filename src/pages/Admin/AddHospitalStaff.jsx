import React, { useEffect, useState } from 'react'
import axios from 'axios'
const AddHospitalStaff = () => {
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [hospitals,setHospitals] = useState([])
  const [hospitalID,setHospitalId] = useState("")
  const [validationError,setValidationError] = useState("")
  const [role,setRole] = useState("")
  const [error,setError] = useState("")
  const [success,setSuccess] = useState("")
  const [email,setEmail] = useState("")
  const url = "http://localhost:9090/api/auth/getHospitals"
  const registerURL = "http://localhost:9090/api/auth/register/hospitalStaff"
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
    e.preventDefault()
    const passwordError = validatePassword(password)
      if(passwordError != "")
      {
        setSuccess("")
        setError("")
        setValidationError(passwordError)
        return
      }
      setValidationError("")
      const userNameError = validateUsername(username)
      if(userNameError!="")
      {
        setSuccess("")
        setError("")
        setValidationError(userNameError)
        return
      }
      setValidationError("")
    axios.post(registerURL,{
      firstName,
      lastName,
      username,
      password,
      email
    },{
      params:{
        hospitalID,
        role
      },
      withCredentials:true
    }).then((res)=>{
        setError("")
        setSuccess("Registration successful")
        setFirstName("")
        setLastName("")
        setUsername("")
        setPassword("")
        setHospitalId("")
        setRole("")
        setEmail("")
    }).catch((error)=>{
        setSuccess("")
        setError("Registration unsuccessful")
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4 py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6 border border-white/20">
        <div className="flex flex-col items-center mb-2">
          <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-4 mb-4 shadow-lg transform hover:scale-105 transition-all duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 text-center">
            Add Hospital Staff
          </h1>
          <p className="text-gray-600 text-sm text-center">Complete the form below to register new hospital staff</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <input 
            type='text' 
            value={username} 
            onChange={(e)=>setUsername(e.target.value)} 
            required 
            placeholder="Enter username"
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 
            focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400
            hover:bg-white/70"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input 
            type='password' 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)} 
            required 
            placeholder="Enter password"
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 
            focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400
            hover:bg-white/70"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input 
            type='text' 
            value={firstName} 
            onChange={(e)=>setFirstName(e.target.value)} 
            required 
            placeholder="Enter first name"
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 
            focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400
            hover:bg-white/70"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input 
            type='text' 
            value={lastName} 
            onChange={(e)=>setLastName(e.target.value)} 
            required 
            placeholder="Enter last name"
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 
            focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400
            hover:bg-white/70"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input 
            type='email' 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
            required 
            placeholder="Enter email address"
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 
            focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400
            hover:bg-white/70"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <select 
            value={role} 
            onChange={(e)=>setRole(e.target.value)} 
            required 
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 
            focus:ring-blue-500 focus:border-transparent transition-all duration-200
            hover:bg-white/70 cursor-pointer appearance-none"
            style={{ 
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1em'
            }}
          >
            <option value="">Select Staff Role</option>
            <option value="HEALTHCAREMANAGER">Healthcare Manager</option>
            <option value="HOSPITALSTAFF">Hospital Staff</option>
          </select>
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Hospital</label>
          <select 
            value={hospitalID} 
            onChange={(e)=>setHospitalId(e.target.value)} 
            required 
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 
            focus:ring-blue-500 focus:border-transparent transition-all duration-200
            hover:bg-white/70 cursor-pointer appearance-none"
            style={{ 
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1em'
            }}
          >
            <option value="">Select Hospital</option>
            {hospitals && hospitals.map((hospital,index)=>(
              <option key={index} value={hospital.hospitalId}>{hospital.hospitalName}</option>
            ))}
          </select>
        </div>
        {validationError && (
          <div className="flex items-center gap-2 bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm animate-fade-in">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{validationError}</span>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm animate-fade-in">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm animate-fade-in">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{success}</span>
          </div>
        )}
        <button 
          type='submit' 
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl 
          font-semibold hover:from-blue-600 hover:to-purple-600 transform hover:scale-[1.02] 
          transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Register Staff Member
        </button>
      </form>
    </div>
  )
}

export default AddHospitalStaff