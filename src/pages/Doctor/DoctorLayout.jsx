import React from 'react'
import { Outlet } from "react-router-dom"
import DoctorSidebar from './DoctorSidebar'

const DoctorLayout = () => {
  return (
     <div className="flex bg-gray-100 min-h-full"> {/* min-h-full instead of min-h-screen */}
      
      {/* Sidebar */}
      <div className="flex flex-col">  {/* flex-col ensures sidebar items stack */}
        <DoctorSidebar className="h-full" /> {/* Sidebar takes full height of parent */}
      </div>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default DoctorLayout
