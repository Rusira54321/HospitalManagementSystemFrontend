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
import Layout from './pages/Patient/Layout'
import DoctorsDetails from './pages/Patient/DoctorsDetails'
import DoctorLayout from './pages/Doctor/DoctorLayout'
import DoctorAppoinment from './pages/Doctor/DoctorAppoinment'
import AddAppoinments from './pages/Doctor/AddAppoinments'
import DoctorAppointments from './pages/Patient/DoctorAppointments'
import PatientAppointments from './pages/Patient/PatientAppointments'
import DoctorPatients from './pages/Doctor/DoctorPatients'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
            <Route path='/HealthCareManagerDashboard' element={<HealthCareManager/>}/>
            <Route path='/HospitalStaffDashboard' element={<HospitalStaff/>}/>
            <Route path='/patient' element={<Layout/>}>
                <Route path='dashboard' element={<Patient/>}></Route>
                <Route path='doctorDetails' element={<DoctorsDetails/>}/>
                <Route path='appointment/:doctorID' element={<DoctorAppointments/>}/>
                <Route path='patientAppointments' element={<PatientAppointments/>}/>
            </Route>
            <Route path='/Doctor' element={<DoctorLayout/>}>
                <Route path='DoctorDashboard' element={<DoctorDashboard/>}></Route>
                <Route path='Appoinments' element={<DoctorAppoinment/>}></Route>
                <Route path='addAppoinment' element={<AddAppoinments/>}></Route>
                <Route path='BookedAppointments' element={<DoctorPatients/>}/>
            </Route>
            <Route path='/addDoctor' element={<AddDoctor/>}/>
            <Route path='/addHospitalStaff' element={<AddHospitalStaff/>}/>
            <Route path='/addHospital' element={<AddHospital/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
