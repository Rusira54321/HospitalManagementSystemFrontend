import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import DoctorHome from './pages/DoctorHome'
import AdminHome from './pages/AdminHome'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/doctor' element={<DoctorHome/>}/>
            <Route path='/admin' element={<AdminHome/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
