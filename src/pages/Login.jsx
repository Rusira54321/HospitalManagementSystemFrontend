import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
    const [error,seterror] = useState("")
    const [success,setsuccess] = useState("")
    function fixInvalidJson(jsonString) {
  // Add quotes around unquoted identifiers in arrays (e.g., ROLE_DOCTOR -> "ROLE_DOCTOR")
  return jsonString.replace(/([A-Z_]+)(?=\s*,|\s*\])/g, '"$1"');
    }
    const navigate = useNavigate()
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
        const response = await axios.post("http://localhost:9090/api/auth/login",
            new URLSearchParams({username,password}),
        {
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            withCredentials:true
        })
        seterror("")
        setsuccess("Login successful!")
        const jsonString = fixInvalidJson(response.data)
        const javascriptObject = JSON.parse(jsonString)
        if(javascriptObject.roles.includes("ROLE_DOCTOR"))
        {
                navigate('/DoctorDashboard')
        }else if(javascriptObject.roles.includes("ROLE_ADMIN"))
        {
                navigate('/AdminDashboard')
        }else if(javascriptObject.roles.includes("ROLE_PATIENT"))
        {
                navigate('/PatientDashboard')
        }
        else if(javascriptObject.roles.includes("ROLE_HEALTHCAREMANAGER"))
        {
            navigate('/HealthCareManagerDashboard')
        }else if(javascriptObject.roles.includes("ROLE_HOSPITALSTAFF"))
        {
            navigate('/HospitalStaffDashboard')
        }
    }catch(err)
    {
        seterror(err.response.data.error)
        setsuccess("")
    }
    }
  return (
                                <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-2 sm:px-0">
                                    <div className="bg-white p-4 xs:p-6 sm:p-10 rounded-2xl shadow-xl w-full max-w-xs xs:max-w-sm sm:max-w-lg border border-blue-100">
                                <div className="flex flex-col items-center mb-4 sm:mb-6">
                            <div className="bg-blue-500 rounded-full p-3 mb-2 shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-3.866-3.134-7-7-7m14 0c-3.866 0-7 3.134-7 7m0 0c0 3.866 3.134 7 7 7m-14 0c3.866 0 7-3.134 7-7" /></svg>
                            </div>
                            <h2 className="text-3xl font-extrabold text-blue-700 mb-1">Login to MediCore</h2>
                            <p className="text-gray-500 text-sm">MediCore Hospital Management System</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                            <div>
                                                <label className="block text-gray-700 mb-1 font-medium text-sm sm:text-base">Username</label>
                                                <input
                                                    type="text"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-gray-400 text-sm sm:text-base"
                                                    placeholder="Enter your username"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 mb-1 font-medium text-sm sm:text-base">Password</label>
                                                <input
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-gray-400 text-sm sm:text-base"
                                                    placeholder="Enter your password"
                                                    required
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full bg-blue-600 text-white py-2 sm:py-2.5 rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
                                            >
                                                Login
                                            </button>
                                                                                        {success && (
                                                                                            <div className="flex items-center gap-2 bg-green-100 border border-green-300 text-green-700 px-3 py-2 rounded mb-2 text-xs sm:text-sm animate-fade-in">
                                                                                                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                                                                <span>{success}</span>
                                                                                            </div>
                                                                                        )}
                                                                                        {error && (
                                                                                            <div className="flex items-center gap-2 bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded mb-2 text-xs sm:text-sm animate-fade-in">
                                                                                                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                                                                                <span>{error}</span>
                                                                                            </div>
                                                                                        )}
                        </form>
                                    <div className="mt-4 sm:mt-6 text-center">
                                        <span className="text-gray-500 text-xs sm:text-sm">Don't have an account? </span>
                                        <Link to="/register" className="text-blue-600 font-semibold hover:underline text-xs sm:text-sm">Register</Link>
                                    </div>
                    </div>
                </div>
  )
}

export default Login
