import React from 'react'
import {BrowserRouter,Routes,Route, UNSAFE_AwaitContextProvider} from "react-router-dom"
import Register from './pages/Register'
import Login from './pages/Login'

import AdminDashboard from './pages/Admin/AdminDashboard'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import HealthCareManager from './pages/HealthCareManager/HealthCareManager'
import HospitalStaff from './pages/HospitalStaff/HospitalStaff'
import Patient from './pages/Patient/Patient'
import AddDoctor from './pages/Admin/AddDoctor'
import AddHospitalStaff from './pages/Admin/AddHospitalStaff'
import AddHospital from './pages/Admin/AddHospital'
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
            <Route path='/addDoctor' element={<AddDoctor/>}/>
            <Route path='/addHospitalStaff' element={<AddHospitalStaff/>}/>
            <Route path='/addHospital' element={<AddHospital/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
