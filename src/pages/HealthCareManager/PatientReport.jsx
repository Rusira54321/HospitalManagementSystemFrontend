import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useNavigate } from "react-router-dom";

const PatientReport = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState("");
  const [hospital,setHospital] = useState("");
  const navigate = useNavigate();

  const URL = "http://localhost:9090/api/admin/getAllHospitals";
  const getPatientReportURL =
    "http://localhost:9090/api/HealthCareManager/getPatientVisitReport";
  const logoutUrl = "http://localhost:9090/api/auth/logout";
  const getHospitalIdUrl = 'http://localhost:9090/api/HealthCareManager/getHospital'

  useEffect(() => {
    const fetchhospitalId = async() =>{
      try{
      const res  = await axios.get(getHospitalIdUrl,{
        params:{
          healthCareManagerUserName:localStorage.getItem("username")
        },
        withCredentials:true
      })
      setHospital(res.data)
    }catch(err)
    {
      console.log(err)
    }
    }
    fetchhospitalId()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fromDate || !toDate || !hospital) {
      setError("All fields are required");
      return;
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);
    const currentDate = new Date();

    if (from > to) {
      setError("From date cannot be after To date");
      return;
    }
    if (to > currentDate) {
      setError("To date cannot be in the future");
      return;
    }

    setError("");
    try {
      const res = await axios.get(getPatientReportURL, {
        params: { fromDate, toDate, hospital },
        withCredentials: true,
      });

      // Format averagePerDay to 2 decimal places
      if (res.data.averagePerDay !== undefined) {
        res.data.averagePerDay = Number(res.data.averagePerDay).toFixed(2);
      }

      setReportData(res.data);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch report");
    }
  };

  const barChartData = reportData
    ? Object.entries(reportData.totalVisitPerDepartment).map(([dept, count]) => ({
        department: dept,
        visits: count,
      }))
    : [];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

  const handleLogout = async () => {
    try {
      await axios.post(logoutUrl, {}, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // Helper to format peak day and hour
  const formatPeakDayAndTime = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8 flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-3xl p-10 border border-gray-100 relative">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 px-4 py-2 bg-red-600 text-white font-semibold rounded-xl shadow hover:bg-red-700 transition"
        >
          Logout
        </button>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">Patient Visit Statistics</h1>
        <p className="text-gray-600 mb-8">Select filters to generate a detailed report.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="font-semibold text-gray-700">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border border-gray-300 rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-gray-700">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border border-gray-300 rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {error && <div className="text-red-600 font-semibold">{error}</div>}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-all duration-200"
            >
              Generate Report
            </button>
          </div>
        </form>

        {reportData && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Report Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-2xl p-6 shadow-inner border border-gray-200">
                <p className="text-gray-700 font-semibold">Total Visits</p>
                <p className="text-3xl font-bold text-gray-900">{reportData.totalVisits}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 shadow-inner border border-gray-200">
                <p className="text-gray-700 font-semibold">Average Per Day</p>
                <p className="text-3xl font-bold text-gray-900">{reportData.averagePerDay}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 shadow-inner border border-gray-200">
                <p className="text-gray-700 font-semibold">Peak Day and Hour</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatPeakDayAndTime(reportData.peakDayAndTime)}
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Visits by Department</h2>
            <div className="flex flex-col md:flex-row gap-10">
              <BarChart width={600} height={400} data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="visits" fill="#8884d8" />
              </BarChart>

              <PieChart width={400} height={400}>
                <Pie
                  data={barChartData}
                  dataKey="visits"
                  nameKey="department"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#82ca9d"
                  label
                >
                  {barChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientReport;
