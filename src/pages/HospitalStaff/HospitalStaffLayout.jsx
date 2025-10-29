import React from 'react'
import {Outlet} from "react-router-dom"
import HospitalStaffSideBar from './HospitalStaffSideBar'
const HospitalStaffLayout = () => {
  return (
     <div className="flex bg-gray-100 min-h-screen"> {/* min-h-full instead of min-h-screen */}
      
      {/* Sidebar */}
      <div className="flex flex-col">  {/* flex-col ensures sidebar items stack */}
        <HospitalStaffSideBar className="h-full" /> {/* Sidebar takes full height of parent */}
      </div>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default HospitalStaffLayout
