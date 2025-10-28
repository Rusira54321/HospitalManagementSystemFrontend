import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaUserAlt, FaLock } from 'react-icons/fa'

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
                        localStorage.setItem("username",javascriptObject.username)
                        if(javascriptObject.roles.includes("ROLE_DOCTOR")){
                                navigate('/Doctor/DoctorDashboard')
                        }else if(javascriptObject.roles.includes("ROLE_ADMIN")){
                                navigate('/admin/dashboard')
                        }else if(javascriptObject.roles.includes("ROLE_PATIENT")){
                                navigate('/patient/dashboard')
                        }else if(javascriptObject.roles.includes("ROLE_HEALTHCAREMANAGER")){
                                navigate('/healthCareManager/dashboard')
                        }else if(javascriptObject.roles.includes("ROLE_HOSPITALSTAFF")){
                                navigate('/HospitalStaffDashboard')
                        }
                }catch(err){
                        seterror(err?.response?.data?.error || 'Login failed')
                        setsuccess("")
                }
        }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-4">
            <div className="w-full max-w-md">
                <div className="relative rounded-3xl p-8 bg-white/60 backdrop-blur-md border border-white/30 shadow-2xl">
                    {/* Decorative top gradient */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                        <div className="bg-gradient-to-br from-emerald-400 to-sky-500 p-3 rounded-full shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0-3.866-3.134-7-7-7m14 0c-3.866 0-7 3.134-7 7" /></svg>
                        </div>
                    </div>

                    <div className="text-center mt-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-sky-700">Welcome back</h1>
                        <p className="text-sm text-gray-500">Sign in to access your MediCore account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                            <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-sky-300">
                                <div className="px-3 text-sky-500"><FaUserAlt /></div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="flex-1 px-2 py-2 rounded-r-lg text-sm sm:text-base focus:outline-none bg-transparent"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-sky-300">
                                <div className="px-3 text-sky-500"><FaLock /></div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="flex-1 px-2 py-2 rounded-r-lg text-sm sm:text-base focus:outline-none bg-transparent"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-sky-500 to-emerald-400 text-white font-semibold shadow hover:scale-[1.01] transition-transform"
                        >
                            Login
                        </button>

                        {success && (
                            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded text-sm">
                                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                <span>{success}</span>
                            </div>
                        )}

                        {error && (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
                                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                <span>{error}</span>
                            </div>
                        )}
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-500">Don't have an account? </span>
                        <Link to="/register" className="text-sky-600 font-medium hover:underline">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
