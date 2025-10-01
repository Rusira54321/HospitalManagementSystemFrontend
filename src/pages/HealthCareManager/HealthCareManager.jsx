import React from 'react'

const HealthCareManager = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex flex-col items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-500 rounded-full p-4 mb-2 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7m-7-7a7 7 0 1114 0" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-blue-700 mb-1">HealthCare Manager Dashboard</h1>
          <p className="text-gray-500 text-sm text-center">Welcome to MediCore HealthCare Manager Panel</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col items-center bg-blue-100 rounded-xl p-6 shadow hover:bg-blue-200 transition cursor-pointer">
            <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v.01" />
            </svg>
            <span className="font-semibold text-blue-700">View Hospital Staff</span>
          </div>
          <div className="flex flex-col items-center bg-blue-100 rounded-xl p-6 shadow hover:bg-blue-200 transition cursor-pointer">
            <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m7-7v14" />
            </svg>
            <span className="font-semibold text-blue-700">Add Hospital Staff</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthCareManager
