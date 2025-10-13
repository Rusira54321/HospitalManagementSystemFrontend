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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 px-4 py-10">
      <form 
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-200"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-2">
          <div className="bg-blue-100 rounded-full p-3 mb-3 shadow-sm">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20m10-10H2" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-blue-700 mb-1 text-center">Add Doctor</h1>
          <p className="text-gray-500 text-sm text-center">Enter doctor details below</p>
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input 
            type='text' 
            value={username} 
            onChange={(e)=>setUsername(e.target.value)} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400"
            placeholder="Enter username"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type='password' 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400"
            placeholder="Enter password"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type='email' 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400"
            placeholder="Enter email"
          />
        </div>

        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input 
            type='text' 
            value={firstName} 
            onChange={(e)=>setFirstName(e.target.value)} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400"
            placeholder="Enter first name"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input 
            type='text' 
            value={lastName} 
            onChange={(e)=>setLastName(e.target.value)} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 bg-white transition"
          >
            <option value="">Select Doctor Specialization</option>
            <option value="General Doctor">General Doctor</option>
            <option value="Heart Doctor">Heart Doctor</option>
            <option value="Brain and Nerve Doctor">Brain and Nerve Doctor</option>
            <option value="Bone and Joint Doctor">Bone and Joint Doctor</option>
            <option value="Child Doctor">Child Doctor</option>
            <option value="Women’s Health Doctor">Women’s Health Doctor</option>
            <option value="Skin Doctor">Skin Doctor</option>
            <option value="Mental Health Doctor">Mental Health Doctor</option>
            <option value="Ear, Nose, and Throat Doctor">Ear, Nose, and Throat Doctor</option>
            <option value="Eye Doctor">Eye Doctor</option>
            <option value="Teeth Doctor">Teeth Doctor</option>
            <option value="Kidney Doctor">Kidney Doctor</option>
            <option value="Stomach and Digestive Doctor">Stomach and Digestive Doctor</option>
            <option value="Lung Doctor">Lung Doctor</option>
            <option value="Cancer Doctor">Cancer Doctor</option>
            <option value="Diabetes and Hormone Doctor">Diabetes and Hormone Doctor</option>
            <option value="Blood Doctor">Blood Doctor</option>
            <option value="X-ray and Scan Doctor">X-ray and Scan Doctor</option>
            <option value="Surgery Doctor">Surgery Doctor</option>
            <option value="Pain and Anesthesia Doctor">Pain and Anesthesia Doctor</option>
            <option value="Emergency Doctor">Emergency Doctor</option>
            <option value="Elderly Care Doctor">Elderly Care Doctor</option>
            <option value="Allergy Doctor">Allergy Doctor</option>
            <option value="Rehabilitation Doctor">Rehabilitation Doctor</option>
          </select>
        </div>

        {/* Hospital */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hospital</label>
          <select 
            value={hospitalId} 
            onChange={(e)=>setHospitalId(e.target.value)} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 bg-white transition"
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
          className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg shadow hover:bg-blue-700 transition-all duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddDoctor
