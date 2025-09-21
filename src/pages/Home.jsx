import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate();
    const logout = async() =>{
        try{
        await axios.post('http://localhost:9090/api/auth/logout',{},{
            withCredentials:true
        });
        navigate('/');
    }catch(err)
    {
     console.log(err);   
    }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Welcome to Home</h2>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Home
