import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
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
        const jsonString = fixInvalidJson(response.data)
        const javascriptObject = JSON.parse(jsonString)
        if(javascriptObject.roles.includes("ROLE_DOCTOR"))
        {
                navigate('/doctor')
        }else if(javascriptObject.roles.includes("ROLE_ADMIN"))
        {
                navigate('/admin')
        }else if(javascriptObject.roles.includes("ROLE_PATIENT"))
        {
                navigate('/home')
        }
    }catch(err)
    {
        console.log(err)
    }
    }
  return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
                </div>
            </div>
        </div>
  )
}

export default Login
