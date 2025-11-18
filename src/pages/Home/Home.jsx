import React from "react";
import Homes from "../../assets/Home.jpg";
import { FaUserInjured, FaChartBar, FaLock, FaQuoteLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full font-sans">

      {/* Hero Section */}
      <div className="relative w-full">
        <img
          src={Homes}
          alt="Home"
          className="w-full h-[80vh] object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Welcome to <span className="text-blue-400">MediCore</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200 leading-relaxed">
            Streamlining hospital operations with modern technology.  
            MediCore helps hospitals deliver efficient, reliable, and patient-focused healthcare management.
          </p>
          <button onClick={
                        () => {
                const featureSection = document.getElementById("features");
                featureSection.scrollIntoView({ behavior: "smooth" });
              }
          }  className="mt-6 px-10 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-semibold shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
            Explore More
          </button>
        </div>
      </div>

      {/* Feature Cards */}
      <div id="features" className="py-20 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
          Key Features
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
          {/* Card 1 */}
          <div className="bg-gradient-to-tr from-blue-100 to-blue-200 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition flex flex-col items-center text-center">
            <div className="bg-white text-blue-600 p-6 rounded-full mb-5 text-5xl shadow-md">
              <FaUserInjured />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Patient Management</h3>
            <p className="text-gray-700">
              Manage patient records, appointments, and medical history effortlessly.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-tr from-green-100 to-green-200 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition flex flex-col items-center text-center">
            <div className="bg-white text-green-600 p-6 rounded-full mb-5 text-5xl shadow-md">
              <FaChartBar />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Department Reports</h3>
            <p className="text-gray-700">
              Generate detailed reports for visits, peak hours, and average statistics.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-tr from-red-100 to-red-200 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition flex flex-col items-center text-center">
            <div className="bg-white text-red-600 p-6 rounded-full mb-5 text-5xl shadow-md">
              <FaLock />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Secure Access</h3>
            <p className="text-gray-700">
              Role-based login ensures that only authorized staff can access sensitive data.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action for Patients */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center relative">
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Manage Your Healthcare Effortlessly?
          </h2>

          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Register as a patient on MediCore and book appointments, receive confirmations, 
            and stay updated with your healthcare journey — all in one place.
          </p>

          <button onClick={()=>{
            navigate('/register')
          }} className="px-10 py-4 rounded-full bg-white text-blue-600 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            Register as Patient
          </button>
        </div>
      </div>


      {/* Testimonials */}
      <div className="py-20 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
          What Our Users Say
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition relative">
            <FaQuoteLeft className="absolute -top-5 left-5 text-blue-200 text-3xl" />
            <p className="text-gray-600 mb-4">
              "MediCore has completely transformed our hospital workflow. Scheduling and reports are now so easy!"
            </p>
            <h4 className="font-semibold text-gray-800">Dr. Samantha Lee</h4>
            <p className="text-gray-500 text-sm">Chief Medical Officer</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition relative">
            <FaQuoteLeft className="absolute -top-5 left-5 text-green-200 text-3xl" />
            <p className="text-gray-600 mb-4">
              "The system is user-friendly and helps our staff focus on patient care rather than paperwork."
            </p>
            <h4 className="font-semibold text-gray-800">John Doe</h4>
            <p className="text-gray-500 text-sm">Hospital Admin</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition relative">
            <FaQuoteLeft className="absolute -top-5 left-5 text-red-200 text-3xl" />
            <p className="text-gray-600 mb-4">
              "Generating reports and analyzing data has never been easier. Highly recommended!"
            </p>
            <h4 className="font-semibold text-gray-800">Mary Johnson</h4>
            <p className="text-gray-500 text-sm">Health Care Manager</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
