import React from 'react'
import {BrowserRouter,Routes,Route, UNSAFE_AwaitContextProvider} from "react-router-dom"
//import Register from './pages/Register'
//import Login from './pages/Login'

import AdminDashboard from './pages/Admin/AdminDashboard'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import HealthCareManager from './pages/HealthCareManager/HealthCareManager'
import Patient from './pages/Patient/Patient'
//import AddDoctor from './pages/Admin/AddDoctor'
import AddHospitalStaff from './pages/Admin/AddHospitalStaff'
import AddHospital from './pages/Admin/AddHospital'
//import Layout from './pages/Patient/Layout'
import DoctorsDetails from './pages/Patient/DoctorsDetails'
import HospitalStaffDashboard from './pages/HospitalStaff/HospitalStaffDashboard'
import PatientForm from './pages/HospitalStaff/PatientForm'
import PatientSearch from './pages/HospitalStaff/PatientSearch'
import PatientDetails from './pages/HospitalStaff/PatientDetails'

import ReportTypes from './pages/HealthCareManager/ReportTypes'
import ReportGenerate from './pages/HealthCareManager/ReportGenerate'
import AppointmentForm from './pages/Appoinment/AppointmentForm'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<HospitalStaffDashboard/>}/> // Initial Login
           
            <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
            <Route path='/DoctorDashboard' element={<DoctorDashboard/>}/>
            <Route path='/HealthCareManagerDashboard' element={<HealthCareManager/>}/>
            
            <Route path='/HospitalStaffDashboard' element={<HospitalStaffDashboard />} /> // STAFF DASHBOARD
            <Route path='/HospitalStaffDashboard/PatientSearch' element={<PatientSearch />} /> // PATIENT SEARCH   
            <Route path='/HospitalStaffDashboard/PatientDetails/:patientId' element={<PatientDetails />} /> // PATIENT DETAILS         
            <Route path='/HospitalStaffDashboard/PatientForm' element={<PatientForm />} /> // PATIENT REGISTRATION FORM
            
            <Route path='/HospitalStaffDashboard/ReportTypes' element={<ReportTypes />} /> // REPORT TYPES DASHBOARD
            <Route path='/ReportTypes/ReportGenerate' element={<ReportGenerate />} /> // REPORT GENERATE
            <Route path='/HospitalStaffDashboard/ReportGenerate/:hospitalId' element={<ReportGenerate />} /> // REPORT GENERATE
            <Route path='/HospitalStaffDashboard/AppointmentForm' element={<AppointmentForm />} /> // APPOINTMENT FORM

           
            <Route path='/addHospitalStaff' element={<AddHospitalStaff/>}/>
            <Route path='/addHospital' element={<AddHospital/>}/>


            {/* You can add a 404/Catch-all route here if you want */}
            {/* <Route path='*' element={<div>404 Not Found</div>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
