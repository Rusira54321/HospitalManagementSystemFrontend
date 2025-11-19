import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSyringe, FaAllergies } from "react-icons/fa";

const MyHealthRecords = () => {
  const getMedicalRecordUrl = "http://localhost:9090/api/patient/getMedicalRecords";
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMedicalRecord = async () => {
      try {
        const res = await axios.get(getMedicalRecordUrl, {
          params: { patientUserName: localStorage.getItem("username") },
          withCredentials: true,
        });
        setMedicalRecord(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch medical records");
      } finally {
        setLoading(false);
      }
    };
    getMedicalRecord();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-xl font-medium">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 text-xl font-medium">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          My Health Records
        </h1>

        {/* Allergies Card */}
        <div className="mb-6 bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <FaAllergies className="text-red-500 text-2xl mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Allergies</h2>
          </div>
          {medicalRecord.allergies.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {medicalRecord.allergies.map((allergy, index) => (
                <li key={index}>{allergy}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No allergies recorded.</p>
          )}
        </div>

        {/* Medications Card */}
        <div className="mb-6 bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <FaSyringe className="text-blue-500 text-2xl mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Medications</h2>
          </div>
          {medicalRecord.medications.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {medicalRecord.medications.map((med, index) => (
                <li key={index}>{med}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No medications recorded.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyHealthRecords;
