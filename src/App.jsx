import React from 'react'
import {BrowserRouter,Routes,Route, UNSAFE_AwaitContextProvider} from "react-router-dom"
import Register from './pages/Register'
import Login from './pages/Login'

import AdminDashboard from './pages/Admin/AdminDashboard'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import HealthCareManager from './pages/HealthCareManager/HealthCareManager'
import HospitalStaff from './pages/HospitalStaff/HospitalStaff'
import Patient from './pages/Patient/Patient'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
            <Route path='/DoctorDashboard' element={<DoctorDashboard/>}/>
            <Route path='/HealthCareManagerDashboard' element={<HealthCareManager/>}/>
            <Route path='/HospitalStaffDashboard' element={<HospitalStaff/>}/>
            <Route path='/PatientDashboard' element={<Patient/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
