import React from 'react'
import { CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const SuccessfulPayment = () => {
    const navigate = useNavigate()
    const navigateToPatientAppointments = () =>{
        navigate('/patient/patientAppointments')
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-300 to-green-500 flex flex-col items-center justify-center p-6">
      {/* Success Card */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md text-center animate-fade-in">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500 w-20 h-20 animate-bounce" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Your appointment has been successfully booked and payment confirmed.
          You will receive a confirmation email with all the details shortly.
        </p>

        <div className="space-y-3">
          
          <div className="bg-blue-100 text-blue-800 py-2 px-4 rounded-lg font-medium">
            Payment Method: Stripe
          </div>
        </div>

        <button
          onClick={navigateToPatientAppointments}
          className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-transform transform hover:scale-105"
        >
          View Appointments
        </button>
      </div>

      {/* Footer */}
      <p className="mt-8 text-white/90 text-sm font-medium tracking-wide">
        Thank you for choosing <span className="font-semibold">MediCare</span> 💙
      </p>
    </div>
  )
}

export default SuccessfulPayment
