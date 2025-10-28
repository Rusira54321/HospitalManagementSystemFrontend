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
import SuccessfulPayment from './pages/Patient/SuccessfullPayment'
import AdminLayout from './pages/Admin/AdminLayout'
import AddUsers from './pages/Admin/AddUsers'
import AllHospitals from './pages/Admin/AllHospitals'
import AllUsers from './pages/Admin/AllUsers'
import AllPatients from './pages/Admin/AllPatients'
import AllDoctors from './pages/Admin/AllDoctors'
import AllHospitalStafs from './pages/Admin/AllHospitalStafs'
import AllHealthCareManagers from './pages/Admin/AllHealthCareManagers'
import PatientInformation from './pages/Doctor/PatientInformation'
import HealthCareLayout from './pages/HealthCareManager/HealthCareLayout'
import AppointmentAdd from './pages/HealthCareManager/AppointmentAdd'
import AllSecretary from './pages/Doctor/AllSecretary'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
            <Route path='/HospitalStaffDashboard' element={<HospitalStaff/>}/>
            <Route path='/patient' element={<Layout/>}>
                <Route path='dashboard' element={<Patient/>}></Route>
                <Route path='doctorDetails' element={<DoctorsDetails/>}/>
                <Route path='appointment/:doctorID' element={<DoctorAppointments/>}/>
                <Route path='patientAppointments' element={<PatientAppointments/>}/>
                <Route path='successfulPayment' element={<SuccessfulPayment/>}/>
            </Route>
            <Route path='/Doctor' element={<DoctorLayout/>}>
                <Route path='DoctorDashboard' element={<DoctorDashboard/>}></Route>
                <Route path='Appoinments' element={<DoctorAppoinment/>}></Route>
                <Route path='addAppoinment' element={<AddAppoinments/>}></Route>
                <Route path='BookedAppointments' element={<DoctorPatients/>}/>
                <Route path='patientInformation/:id' element={<PatientInformation/>}/>
                <Route path='allSecretary' element={<AllSecretary/>}/>
            </Route>
            <Route path='/healthCareManager' element={<HealthCareLayout/>}>
                <Route path='dashboard' element={<HealthCareManager/>}/>
                <Route path='appointmentAdd' element={<AppointmentAdd/>}/>
            </Route>
            <Route path='/admin' element={<AdminLayout/>}>
                <Route path='dashboard' element={<AdminDashboard/>}/>
                <Route path='addUsers' element={<AddUsers/>}/>
                <Route path='addDoctor' element={<AddDoctor/>}/>
                <Route path='addHospitalStaff' element={<AddHospitalStaff/>}/>
                <Route path='addHospital' element={<AddHospital/>}/>
                <Route path='allHospitals' element={<AllHospitals/>}/>
                <Route path='allUsers' element={<AllUsers/>}/>
                <Route path='allPatients' element={<AllPatients/>}/>
                <Route path='allDoctors' element={<AllDoctors/>}/>
                <Route path='allHospitalStaffs' element={<AllHospitalStafs/>}/>
                <Route path='allHealthCareManagers' element={<AllHealthCareManagers/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
