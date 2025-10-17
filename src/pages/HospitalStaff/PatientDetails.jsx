import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PatientDetails() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // In a real application, you'd fetch a single patient by ID.
    // For this example, I'll simulate fetching all patients and finding the one,
    // as your backend only has a getAllPatients endpoint.
    // If you have a specific endpoint for /api/patient/{id}, use that.
    axios
      .get(`http://localhost:9090/api/patient`) // Assuming this fetches all patients
      .then((res) => {
        // Find the patient with the matching patientId from the URL
        const foundPatient = res.data.find(p => p.patientId === patientId);
        if (foundPatient) {
          setPatient(foundPatient);
        } else {
          setError("No patient found with this ID.");
        }
      })
      .catch(() => {
        setError("Error fetching patient details.");
      });
  }, [patientId]);

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 text-xl font-semibold">
        {error}
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-xl">
        Loading patient details...
      </div>
    );
  }

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Helper function to render list items from a comma-separated string
  const renderListItems = (text) => {
    if (!text) return "N/A";
    return text.split(',').map((item, index) => (
      <li key={index} className="flex items-center text-gray-700 text-sm">
        <span className="h-2 w-2 bg-blue-400 rounded-full mr-2"></span>
        {item.trim()}
      </li>
    ));
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Smart Healthcare System</h1>
          </div>
          <p className="text-lg font-semibold text-gray-700">
            {formatDate(new Date().toISOString().split('T')[0])} {/* Current Date */}
          </p>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Patient Profile Card (Left Column) */}
          <div className="md:col-span-1 bg-blue-50 rounded-lg p-6 shadow-inner border border-blue-200 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{patient.name}</h3>
            <p className="text-sm text-gray-600">ID - {patient.patientId}</p>
            <p className="text-sm text-gray-600 mb-4">
              DOB - {formatDate(patient.dob)}
            </p>
            <p className="text-sm text-gray-500 italic">
              Last Visit: {patient.lastVisit || 'N/A'}
            </p>
            
            {/* Action Buttons */}
            <div className="mt-8 space-y-3 w-full">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow">
                Check In
              </button>
              <button className="w-full bg-blue-100 text-blue-700 py-2 px-4 rounded-lg font-medium hover:bg-blue-200 transition-colors border border-blue-300 shadow-sm">
                Request Assistance
              </button>
            </div>
          </div>

          {/* Right Two Columns for Details */}
          <div className="md:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Medication */}
            <div className="bg-white rounded-lg p-5 shadow border border-gray-200">
              <h4 className="text-md font-semibold text-gray-700 mb-3">Current Medication</h4>
              <ul className="space-y-2">
                {renderListItems(patient.medications)}
              </ul>
            </div>

            {/* Known Allergies */}
            <div className="bg-white rounded-lg p-5 shadow border border-gray-200">
              <h4 className="text-md font-semibold text-gray-700 mb-3">Known Allergies</h4>
              <ul className="space-y-2">
                {renderListItems(patient.allergies)}
              </ul>
            </div>

            {/* Current Appointments (Spans two columns if needed, or adjust grid) */}
            <div className="lg:col-span-2 bg-white rounded-lg p-5 shadow border border-gray-200">
              <h4 className="text-md font-semibold text-gray-700 mb-3">Current Appointments</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Assuming there's only one active appointment for now based on your data model */}
                    {patient.appointmentDate && patient.appointmentTime && patient.selectedDoctor && patient.appointmentReason ? (
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{formatDate(patient.appointmentDate)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{patient.selectedDoctor}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{patient.appointmentReason}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{patient.appointmentTime}</td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-4 py-3 text-sm text-gray-500 text-center">No upcoming appointments.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}