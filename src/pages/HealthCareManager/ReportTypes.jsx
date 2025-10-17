import React from "react";
import { useNavigate } from "react-router-dom";

export default function ReportTypes() {
  const navigate = useNavigate();

  const reports = [
    {
      name: "Patient Visit Statistics",
      description: "View detailed statistics about patient visits.",
      path: "/ReportTypes/ReportGenerate",
    },
    {
      name: "Doctor Performance Report",
      description: "Analyze performance metrics for each doctor.",
      path: "/reports/doctor-performance",
    },
    {
      name: "Appointment Summary Report",
      description: "Summarize appointments across departments.",
      path: "/reports/appointment-summary",
    },
    {
      name: "Billing Summary Report",
      description: "Generate summaries of patient billing details.",
      path: "/reports/billing-summary",
    },
    {
      name: "Department Activity Report",
      description: "Monitor patient flow and staff activities.",
      path: "/reports/department-activity",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">
        Available Report Types
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-4xl">
        {reports.map((report, index) => (
          <div
            key={index}
            onClick={() => navigate(report.path)}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {report.name}
            </h2>
            <p className="text-gray-600 text-sm">{report.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
