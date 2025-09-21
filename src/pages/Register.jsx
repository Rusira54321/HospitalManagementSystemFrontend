import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Register = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [role,setRole] = useState("")
    const handleSubmit = async(e) =>{
        e.preventDefault();
        await axios.post("http://localhost:9090/api/auth/register",{
            username,
            password
        },{
            params:{role},
            withCredentials:true //Send JSESSIONID cookie
        }).then(res=>{
            console.log(res);
            console.log("pakaya");
        }).catch(err=>{
            console.log(err);
            console.log("Error ekak atha");
        });
        
    }
  return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">UserName:</label>
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
                    <div>
                        <label className="block text-gray-700 mb-1">Role:</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        >
                            <option value="">Choose Role</option>
                            <option value="admin">admin</option>
                            <option value="doctor">doctor</option>
                            <option value="patient">patient</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Register
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/" className="text-blue-500 hover:underline">Login</Link>
                </div>
            </div>
        </div>
  )
}

export default Register
