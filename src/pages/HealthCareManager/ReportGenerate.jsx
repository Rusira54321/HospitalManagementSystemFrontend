import React, { useState } from "react";

export default function ReportGenerate() {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    hospital: "",
    department: "",
  });
  const [reportData, setReportData] = useState(null);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    // For now, mock data until backend is ready
    setReportData({
      totalVisits: 120,
      visitsPerHospital: "City Hospital: 60, Green Valley: 40, Sunrise: 20",
      visitsPerDepartment: "Cardiology: 50, Pediatrics: 40, ENT: 30",
      averagePerDay: 15,
      peakDay: "Wednesday",
      peakTime: "10:00 AM - 12:00 PM",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">
        Generate Patient Visit Statistics Report
      </h1>

      {/* Filter form */}
      <form
        onSubmit={handleGenerate}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-3xl mb-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Hospital
            </label>
            <input
              type="text"
              name="hospital"
              value={filters.hospital}
              onChange={handleChange}
              placeholder="e.g. City Hospital"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={filters.department}
              onChange={handleChange}
              placeholder="e.g. Cardiology"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Generate Report
        </button>
      </form>

      {/* Report results */}
      {reportData && (
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Report Summary
          </h2>
          <div className="space-y-3 text-gray-700">
            <p><strong>Total Visits:</strong> {reportData.totalVisits}</p>
            <p><strong>Visits per Hospital:</strong> {reportData.visitsPerHospital}</p>
            <p><strong>Visits per Department:</strong> {reportData.visitsPerDepartment}</p>
            <p><strong>Average Visits per Day:</strong> {reportData.averagePerDay}</p>
            <p><strong>Peak Visit Day:</strong> {reportData.peakDay}</p>
            <p><strong>Peak Visit Time:</strong> {reportData.peakTime}</p>
          </div>
        </div>
      )}
    </div>
  );
}
