import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Search } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

const statusColors = {
  AVAILABLE: "bg-green-100 text-green-800",
  BOOKED: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-gray-100 text-gray-800",
  CANCEL: "bg-red-100 text-red-800",
};

const DoctorAppointments = () => {
  const { doctorID } = useParams();
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [patientId, setPatientId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 6;

  const StripeKey = import.meta.env.VITE_STRIPE_KEY;
  const key = import.meta.env.VITE_CURRENCY_CONVERTER;
  const BASE_URL = `https://v6.exchangerate-api.com/v6/${key}/latest/`;

  const convertCurrency = async (from, to, amount) => {
    try {
      const response = await axios.get(`${BASE_URL}${from}`);
      const rate = response.data.conversion_rates[to];
      if (!rate) {
        console.log(`Exchange rate for ${to} not found.`);
        return 0;
      }
      const convertedAmount = parseFloat((amount * rate).toFixed(2));
      return convertedAmount;
    } catch (error) {
      console.error("Error fetching exchange rate:", error.message);
      return 0;
    }
  };

  useEffect(() => {
    const username = localStorage.getItem("username");

    const getDoctorAppointments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9090/api/patient/getAvailableAppointments",
          {
            params: { doctorId: doctorID },
            withCredentials: true,
          }
        );

        // ✅ Sort by createTime (latest first)
        const sortedAppointments = res.data.sort(
          (a, b) => new Date(b.createTime) - new Date(a.createTime)
        );

        setDoctorAppointments(sortedAppointments);

        const patient = await axios.get(
          "http://localhost:9090/api/patient/getPatient",
          {
            params: { username },
            withCredentials: true,
          }
        );
        setPatientId(patient.data.id);
      } catch (err) {
        console.log(err);
      }
    };

    getDoctorAppointments();
  }, [doctorID]);

  // ✅ Book appointment handler
  const handleBook = async (appointmentId) => {
    try {
      const appointments = [...doctorAppointments];

      for (const appointment of appointments) {
        if (appointment.id === appointmentId) {
          if (appointment.price === 0) {
            const res = await axios.get(
              "http://localhost:9090/api/patient/bookAppointment",
              {
                params: {
                  appointmentID: appointmentId,
                  patientID: patientId,
                },
                withCredentials: true,
              }
            );

            console.log("Booking successful:", res.data);
            appointment.status = "BOOKED"; // Update locally
            setDoctorAppointments(appointments);
          } else {
            const stripePromise = loadStripe(StripeKey);
            const stripe = await stripePromise;
            const priceByDollars = await convertCurrency(
              "LKR",
              "USD",
              appointment.price
            );
            const res = await axios.post(
              "http://localhost:9090/api/patient/payment/create-checkout-session",
              {
                appointmentId: appointmentId,
                patientID: patientId,
                amount: priceByDollars,
                amountInRs: appointment.price,
              },
              {
                withCredentials: true,
              }
            );
            window.location.href = res.data.url;
          }
        }
      }
    } catch (err) {
      console.log("Booking error:", err);
    }
  };

  // ✅ FIXED date filtering (works with local timezone)
  const filteredAppointments = doctorAppointments.filter((appointment) => {
    if (!searchDate) return true;
    const appointmentDate = new Date(appointment.startTime).toLocaleDateString(
      "en-CA"
    ); // keeps format YYYY-MM-DD but in local time
    return appointmentDate === searchDate;
  });

  // ✅ Pagination logic
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );
  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-200 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 text-center">
          Available Appointments
        </h1>
        <p className="text-center text-gray-600 mb-8">Select your preferred time slot to schedule an appointment</p>

        {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 px-6 py-4 flex items-center space-x-4 w-full max-w-md">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-indigo-600 w-5 h-5" />
            </div>
            <input
              type="date"
              value={searchDate}
              onChange={(e) => {
                setSearchDate(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 w-full px-4 py-2.5 bg-white/50 border border-gray-200 rounded-xl 
              focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200
              text-gray-700 text-sm font-medium"
            />
          </div>
          {searchDate && (
            <button
              onClick={() => setSearchDate("")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
              text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* 📅 Appointment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentAppointments.length > 0 ? (
          currentAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 
              hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    statusColors[appointment.status] || "bg-gray-200"}`}
                  >
                    {appointment.status}
                  </span>
                  <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Rs. {appointment.price}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="text-sm text-gray-500">Start Time</div>
                      <div className="font-medium">{new Date(appointment.startTime).toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="text-sm text-gray-500">End Time</div>
                      <div className="font-medium">{new Date(appointment.endTime).toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <div>
                      <div className="text-sm text-gray-500">Room</div>
                      <div className="font-medium">
                        {appointment.roomLocation ? appointment.roomLocation : "Not Assigned"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {appointment.status === "AVAILABLE" && (
                <button
                  onClick={() => handleBook(appointment.id)}
                  className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl 
                  font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] 
                  transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Appointment
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-3 flex flex-col items-center justify-center p-12 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/20">
            <svg className="w-24 h-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xl text-gray-600 text-center">No appointments available for the selected date</p>
          </div>
        )}
      </div>

      {/* 📄 Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 
            ${currentPage === 1 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
              : "bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg hover:shadow-xl"}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <div className="flex items-center gap-2">
            <span className="px-4 py-2 bg-white/80 backdrop-blur-lg rounded-xl font-medium text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300
            ${currentPage === totalPages 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
              : "bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg hover:shadow-xl"}`}
          >
            Next
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
