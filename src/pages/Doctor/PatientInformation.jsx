import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PatientInformation = () => {
  const { id } = useParams()
  const [patient, setPatient] = useState({})
  const [medicalRecord, setMedicalRecord] = useState(null)
  const [bookedAppointments, setBookedAppointments] = useState([])
  const [latestCompletedAppointment, setLatestCompletedAppointment] = useState(null)

  const getPatientDetailsUrl = 'http://localhost:9090/api/doctor/getPatients'

  useEffect(() => {
    const getPatientDetails = async () => {
      try {
        const res = await axios.get(getPatientDetailsUrl, {
          params: { patientId: id },
          withCredentials: true
        })
        setPatient(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    const getMedicalRecords = async () => {
      try {
        const res = await axios.get('http://localhost:9090/api/doctor/getMedicalRecords', {
          params: { patientId: id },
          withCredentials: true
        })
        setMedicalRecord(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    const getAppointments = async () => {
      try {
        const res = await axios.get('http://localhost:9090/api/doctor/getBookedCompletedAppointments', {
          params: { patientID: id },
          withCredentials: true
        })
        setBookedAppointments(res.data.bookedAppointments || [])
        setLatestCompletedAppointment(res.data.completedAppointments?.[0] || null)
      } catch (err) {
        console.log(err)
      }
    }

    getPatientDetails()
    getMedicalRecords()
    getAppointments()
  }, [id])

  const formatDate = (dateStr) => new Date(dateStr).toLocaleString()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left Side – Patient Basic Info */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              {/* Profile Icon */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center rounded-full text-4xl font-bold mb-4 shadow-lg transition-transform hover:scale-105">
                  {patient?.firstName?.charAt(0)?.toUpperCase() || "👤"}
                </div>

                {/* Patient Full Name */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {patient?.firstName && patient?.lastName
                    ? `${patient.firstName} ${patient.lastName}`
                    : "Unknown Patient"}
                </h2>

                <div className="w-full h-[2px] bg-gradient-to-r from-blue-200 to-blue-100 mb-6"></div>

                {/* Patient Info */}
                <div className="space-y-4 w-full">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-blue-500">📞</span>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-700">{patient?.phoneNumber || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-blue-500">🎂</span>
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="text-gray-700">{patient?.dateOfBirth || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-blue-500">📧</span>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-700">{patient?.email || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-blue-500">⚧</span>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="text-gray-700">{patient?.gender || "Not specified"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest Appointment Card */}
            <div className="mt-6 bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Latest Completed Appointment</h3>
              {latestCompletedAppointment ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    <span className="font-medium">Completed on:</span><br/>
                    {formatDate(latestCompletedAppointment.completeTime)}
                  </p>
                  <p className="text-sm text-green-800 mt-2">
                    <span className="font-medium">Doctor:</span><br/>
                    Dr. {latestCompletedAppointment.doctor.firstName} {latestCompletedAppointment.doctor.lastName}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 italic">No completed appointments yet</p>
              )}
            </div>
          </div>

          {/* Right Side – Medical Info */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-blue-500 mr-2">📋</span> Medical Records
              </h2>

              {medicalRecord ? (
                <>
                  {/* Allergies & Medications */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                      <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                        <span className="mr-2">⚠️</span> Medical Conditions
                      </h3>
                      {medicalRecord.allergies?.length > 0 ? (
                        <ul className="space-y-2">
                          {medicalRecord.allergies.map((a, index) => (
                            <li key={index} className="flex items-center text-red-700">
                              <span className="h-2 w-2 bg-red-400 rounded-full mr-2"></span>
                              {a}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic">No allergies recorded</p>
                      )}
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                      <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                        <span className="mr-2">💊</span> Medications
                      </h3>
                      {medicalRecord.medications?.length > 0 ? (
                        <ul className="space-y-2">
                          {medicalRecord.medications.map((m, index) => (
                            <li key={index} className="flex items-center text-blue-700">
                              <span className="h-2 w-2 bg-blue-400 rounded-full mr-2"></span>
                              {m}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic">No medications recorded</p>
                      )}
                    </div>
                  </div>

                  {/* Booked Appointments */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="mr-2">📅</span> Upcoming Appointments
                    </h3>
                    {bookedAppointments.length > 0 ? (
                      <div className="space-y-3">
                        {bookedAppointments.map((appt) => (
                          <div key={appt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-blue-600 text-lg">👨‍⚕️</span>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  Dr. {appt.doctor.firstName} {appt.doctor.lastName}
                                </p>
                                <p className="text-sm text-gray-500">{formatDate(appt.startTime)}</p>
                              </div>
                            </div>
                            <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                              {appt.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No booked appointments</p>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientInformation
