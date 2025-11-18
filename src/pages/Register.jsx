import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaUserAlt, FaEnvelope, FaLock, FaPhone, FaCalendarAlt, FaVenusMars, FaChevronDown } from 'react-icons/fa'

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
    setErrorMessage("")
    setSuccessMessage("")
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
        setErrorMessage(err.response?.data|| "Registration failed")
        setSuccessMessage("")
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-4">
      <div className="w-full max-w-2xl">
        <div className="relative rounded-3xl p-8 bg-white/60 backdrop-blur-md border border-white/30 shadow-2xl">
          <div className="absolute -top-6 left-10">
            <div className="bg-gradient-to-br from-emerald-400 to-sky-500 p-3 rounded-full shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0-3.866-3.134-7-7-7m14 0c-3.866 0-7 3.134-7 7" /></svg>
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-sky-700">Create your MediCore account</h2>
            <p className="text-sm text-gray-500">Register as a patient to access personalized care</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
              <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-sky-300">
                <div className="px-3 text-sky-500"><FaUserAlt /></div>
                <input type='text' placeholder='First name' value={FirstName} onChange={(e)=>setFirstName(e.target.value)} required className="flex-1 px-2 py-2 bg-transparent focus:outline-none" />
              </div>
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
              <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-sky-300">
                <div className="px-3 text-sky-500"><FaUserAlt /></div>
                <input type='text' placeholder='Last name' value={LastName} onChange={(e)=>setLastName(e.target.value)} required className="flex-1 px-2 py-2 bg-transparent focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-sky-300">
                <div className="px-3 text-sky-500"><FaUserAlt /></div>
                <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Choose a username' required className="flex-1 px-2 py-2 bg-transparent focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-sky-300">
                <div className="px-3 text-sky-500"><FaEnvelope /></div>
                <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='you@example.com' required className="flex-1 px-2 py-2 bg-transparent focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-sky-300">
                <div className="px-3 text-sky-500"><FaLock /></div>
                <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Create a strong password' required className="flex-1 px-2 py-2 bg-transparent focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of birth</label>
              <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-sky-300">
                <div className="px-3 text-sky-500"><FaCalendarAlt /></div>
                <input type='date' value={dateOfBirth} onChange={(e)=>setdateOfBirth(e.target.value)} required className="flex-1 px-2 py-2 bg-transparent focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <div className="relative flex items-center bg-white border border-gray-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-sky-300">
                <div className="px-3 text-sky-500"><FaVenusMars /></div>
                <select value={gender} onChange={(e)=>setgender(e.target.value)} required className="flex-1 appearance-none w-full px-2 py-2 pr-8 bg-transparent focus:outline-none">
                  <option value="">-- Select Gender --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <div className="pointer-events-none absolute right-3 text-gray-400">
                  <FaChevronDown />
                </div>
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
              <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-sky-300">
                <div className="px-3 text-sky-500"><FaPhone /></div>
                <input type='text' value={PhoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} placeholder='0123456789' required className="flex-1 px-2 py-2 bg-transparent focus:outline-none" />
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2 mt-2">
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button type="submit" className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-sky-500 to-emerald-400 text-white font-semibold shadow hover:scale-[1.01] transition-transform">Register</button>
            </div>

            <div className="col-span-1 sm:col-span-2">
              {successMessage && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded mt-2 text-sm">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span>{successMessage}</span>
                </div>
              )}
              {errorMessage && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded mt-2 text-sm">
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-500 text-sm">Already have an account? </span>
            <Link to="/login" className="text-sky-600 font-medium hover:underline">Login</Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Register
