import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Register = () => {
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [FirstName,setFirstName] = useState("")
  const [LastName,setLastName] = useState("")
  const [dateOfBirth,setdateOfBirth] = useState("")
  const [gender,setgender] = useState("")
  const [PhoneNumber,setPhoneNumber] = useState("")
  const [error,setError] = useState("")
  const [errorMessage,setErrorMessage] = useState("")
  const [successMessage,setSuccessMessage] = useState("")
  const [email,setEmail] = useState("")

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

  const validatePhoneNumber = (phoneNumber) =>{
    const phoneRegex = /^\d{10}$/;
    if(!phoneRegex.test(phoneNumber)) return "Phone number must be 10 digits long."
    else return ""
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const passwordError = validatePassword(password)
    if(passwordError!=="") { setError(passwordError); return }
    setError("")
    const usernameerror = validateUsername(username)
    if(usernameerror!=="") { setError(usernameerror); return }
    setError("")
    const phoneNumberError = validatePhoneNumber(PhoneNumber)
    if(phoneNumberError!=="") { setError(phoneNumberError); return }
    setError("")

    await axios.post("http://localhost:9090/api/auth/register/patient",{
        FirstName,
        LastName,
        dateOfBirth,
        gender,
        PhoneNumber,
        username,
        password,
        email
    },{
        withCredentials:true
    }).then(res=>{
        setSuccessMessage("Registration successful! You can now log in.");
        setErrorMessage("")
    }).catch(err=>{
        setErrorMessage(err.response?.data?.error || "Registration failed")
        setSuccessMessage("")
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-3">
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl w-full max-w-lg border border-blue-100">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 rounded-full p-3 mb-3 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 text-white" 
              fill="none" viewBox="0 0 24 24" 
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 11c0-3.866-3.134-7-7-7m14 0c-3.866 0-7 3.134-7 7m0 0c0 3.866 3.134 7 7 7m-14 0c3.866 0 7-3.134 7-7" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-blue-700 mb-1">Create Account</h2>
          <p className="text-gray-500 text-sm text-center">MediCore Hospital Management System Registration</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 
                         bg-blue-50 placeholder-gray-400"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input 
              type='email' 
              placeholder='Enter your email' 
              value={email} 
              onChange={(e)=>setEmail(e.target.value)} 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 
                         bg-blue-50 placeholder-gray-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 
                         bg-blue-50 placeholder-gray-400"
              placeholder="Create a strong password"
              required
            />
            
          </div>

          {/* First Name */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">First Name</label>
            <input 
              type='text' 
              placeholder='Enter first name' 
              value={FirstName} 
              onChange={(e)=>setFirstName(e.target.value)} 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 
                         bg-blue-50 placeholder-gray-400"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Last Name</label>
            <input 
              type='text' 
              placeholder='Enter last name' 
              value={LastName} 
              onChange={(e)=>setLastName(e.target.value)} 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 
                         bg-blue-50 placeholder-gray-400"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Date of Birth</label>
            <input 
              type='date' 
              value={dateOfBirth} 
              onChange={(e)=>setdateOfBirth(e.target.value)} 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 
                         bg-blue-50 placeholder-gray-400"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Gender</label>
            <select 
              value={gender} 
              onChange={(e)=>setgender(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 
                         bg-blue-50"
            >
              <option value="">-- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Phone Number</label>
            <input 
              type='text' 
              placeholder='Enter phone number' 
              value={PhoneNumber} 
              onChange={(e)=>setPhoneNumber(e.target.value)} 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 
                         bg-blue-50 placeholder-gray-400"
            />
          </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg 
                       font-semibold shadow-md hover:bg-blue-700 
                       transition-colors duration-300"
          >
            Register
          </button>

          {/* Messages */}
          {successMessage && (
            <div className="flex items-center gap-2 bg-green-100 border border-green-300 
                            text-green-700 px-3 py-2 rounded mt-2 text-sm animate-fade-in">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" 
                   viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}
          {errorMessage && (
            <div className="flex items-center gap-2 bg-red-100 border border-red-300 
                            text-red-700 px-3 py-2 rounded mt-2 text-sm animate-fade-in">
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" 
                   viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <span className="text-gray-500 text-sm">Already have an account? </span>
          <Link to="/" className="text-blue-600 font-semibold hover:underline text-sm">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
