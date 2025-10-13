import React, { createContext, useState } from 'react'

export const GlobalContext = createContext()
export const GlobalProvider= ({children}) => {
  const [hospitalName,setHospitalName] = useState("")
  const [doctorSpecialization,setDoctorSpecialization] = useState("")
  return (
    <GlobalContext.Provider value={{hospitalName,doctorSpecialization,setDoctorSpecialization,setHospitalName}}>
        {children}
    </GlobalContext.Provider>
  )
}


