import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import {
  FaUsers,
  FaUserMd,
  FaCalendarCheck,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import axios from "axios";

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AdminDashboard = () => {
  const [dashboardDetails, setDashboardDetails] = useState({});
  const [clicked, setClicked] = useState(null);
  const [departmentData, setDepartmentData] = useState([]);
  const [appointmentsByMonth, setAppointmentsByMonth] = useState([]);

  const getDepartmentVisePatientsUrl =
    "http://localhost:9090/api/admin/getDepartmentVisePatients";
  const getDashboardDetailsUrl =
    "http://localhost:9090/api/admin/getDashboardDetails";
  const numberOfAppointmentsWithMonthURL =
    "http://localhost:9090/api/admin/getAppointmentsWithMonth";
  const navigate = useNavigate();

  const allDepartments = [
    "General Physician", "Cardiologist", "Neurologist", "Pediatrician",
    "Orthopedic Surgeon", "Gynecologist", "Obstetrician", "Dermatologist",
    "Psychiatrist", "Ophthalmologist", "ENT Specialist", "Urologist",
    "Gastroenterologist", "Pulmonologist", "Endocrinologist", "Oncologist",
    "Radiologist", "Pathologist", "Nephrologist", "Anesthesiologist",
    "Emergency Medicine Specialist", "Rheumatologist", "Dentist",
    "Plastic Surgeon", "Infectious Disease Specialist"
  ];

  // Load dashboard details
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(getDashboardDetailsUrl, {
          withCredentials: true,
        });
        setDashboardDetails(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    loadData();
  }, []);

  // Load department-wise patients
  useEffect(() => {
    const getDepartmentVisePatients = async () => {
      try {
        const res = await axios.get(getDepartmentVisePatientsUrl, {
          withCredentials: true,
        });

        const apiData = res.data;
        const mappedData = allDepartments.map((dept) => {
          const found = apiData.find((d) => d.specialization === dept);
          return {
            specialization: dept,
            total: found ? found.total : 0,
          };
        });

        setDepartmentData(mappedData);
      } catch (err) {
        console.log(err);
      }
    };

    getDepartmentVisePatients();
  }, []);

  // Load monthly appointments
  useEffect(() => {
    const getNumberAppointmentWithMonth = async () => {
      try {
        const res = await axios.get(numberOfAppointmentsWithMonthURL, {
          withCredentials: true,
        });
        // API returns data as [{month: "November", noOfAppointments: 3}]
        setAppointmentsByMonth(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNumberAppointmentWithMonth();
  }, []);

  const stats = [
    { name: "Total Patients", value: dashboardDetails?.NoOfPatient, icon: FaUsers, color: "blue", clickable: false, id: 1 },
    { name: "Total Doctors", value: dashboardDetails?.NoOfDoctors, icon: FaUserMd, color: "green", clickable: false, id: 2 },
    { name: "Total Hospital Staff", value: dashboardDetails?.TotalHospitalStaffCount, icon: FaCalendarCheck, color: "red", clickable: true, id: 3 },
    { name: "Total Appointments", value: dashboardDetails?.TotalAppointmentsCount, icon: FaMoneyCheckAlt, color: "purple", clickable: true, id: 4 },
  ];

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:9090/api/auth/logout", {}, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  // ---------- PIE CHART DATA ----------
  const pieChartData = {
    labels: departmentData.map((d) => d.specialization),
    datasets: [
      {
        label: "Patients",
        data: departmentData.map((d) => d.total),
        backgroundColor: [
          "#60A5FA","#34D399","#FBBF24","#F87171","#A78BFA","#F472B6","#38BDF8","#4ADE80",
          "#FB923C","#F43F5E","#818CF8","#2DD4BF","#FACC15","#EC4899","#E879F9","#22D3EE",
          "#FCD34D","#FB7185","#93C5FD","#34D399","#FCA5A5","#C084FC","#FDE68A","#60A5FA",
          "#F472B6","#22C55E"
        ],
        borderWidth: 1,
      },
    ],
  };

  // ---------- BAR CHART DATA ----------
  const barChartData = {
    labels: appointmentsByMonth.map((item) => item.month),
    datasets: [
      {
        label: "Appointments",
        data: appointmentsByMonth.map((item) => item.noOfAppointments),
        backgroundColor: "#6366F1",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-[#F8F7FF] to-[#FFEAF6] p-10">

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="absolute top-5 right-6 px-6 py-2.5 bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-xl shadow-lg hover:scale-105 transition-all"
      >
        Logout
      </button>

      {/* HEADER */}
      <div className="text-center mb-14">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 text-lg mt-3">
          Analytics & insights to manage your entire healthcare system
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              onClick={() => stat.clickable && setClicked(clicked === stat.id ? null : stat.id)}
              className="relative bg-white/60 shadow-lg rounded-2xl backdrop-blur-xl border border-white/30 p-6 cursor-pointer group hover:-translate-y-1 transition-all"
            >
              <div className="p-4 rounded-xl bg-blue-500 text-white shadow-lg mb-4">
                <Icon className="w-9 h-9" />
              </div>
              <h2 className="text-4xl font-extrabold text-gray-800">{stat.value}</h2>
              <p className="text-gray-600 font-medium mt-1">{stat.name}</p>
              {clicked === stat.id && stat.clickable && (
                <div className="mt-6 bg-white/80 p-5 rounded-xl border shadow-inner">
                  {stat.id === 3 ? (
                    <>
                      <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-md mb-3">
                        <b>Total Secretaries:</b> {dashboardDetails?.TotalSecretaryCount}
                      </div>
                      <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-md">
                        <b>Healthcare Managers:</b> {dashboardDetails?.TotalHealthCareManagerCount}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded-md mb-3">
                        <b>Available:</b> {dashboardDetails?.TotalAvailableAppointments}
                      </div>
                      <div className="p-3 bg-purple-50 border-l-4 border-purple-500 rounded-md mb-3">
                        <b>Booked:</b> {dashboardDetails?.TotalBookedAppointments}
                      </div>
                      <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-md">
                        <b>Completed:</b> {dashboardDetails?.TotalCompletedAppointments}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ----------- PIE CHART SECTION ------------ */}
      <div className="mt-20 bg-white shadow-xl p-10 rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Patients by Department
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* PIE CHART */}
          <div className="flex justify-center items-center h-[400px]">
            <Pie
              data={pieChartData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>

          {/* TABLE */}
          <div className="overflow-y-auto max-h-[400px] border rounded-xl">
            <table className="w-full text-left">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-3 font-semibold">Department</th>
                  <th className="p-3 font-semibold">Patients</th>
                </tr>
              </thead>
              <tbody>
                {departmentData.map((d, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-3">{d.specialization}</td>
                    <td className="p-3 font-bold">{d.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* ----------- BAR CHART SECTION ------------ */}
      <div className="mt-20 bg-white shadow-xl p-10 rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Total Appointments by Month
        </h2>
        <div className="h-[400px]">
          <Bar
            data={barChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: { stepSize: 1 },
                },
              },
            }}
          />
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
