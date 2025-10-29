import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AddAppointment = () => {
  const getDoctorsUrl = 'http://localhost:9090/api/HospitalStaff/getDoctors';
  const [payorNot, setPayorNot] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [price, setPrice] = useState('');
  const [roomLocation, setRoomLocation] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const userName = localStorage.getItem('username');
    const getDoctors = async () => {
      try {
        const res = await axios.get(getDoctorsUrl, {
          params: { SecretaryUserName: userName },
          withCredentials: true,
        });
        setDoctors(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getDoctors();
  }, []);

  useEffect(() => {
    if (doctorId !== '') {
      const getDoctorHospital = async () => {
        try {
          const res = await axios.get('http://localhost:9090/api/doctor/getHospital', {
            params: { doctorID: doctorId },
            withCredentials: true,
          });
          setPayorNot(res.data.hospitalType === 'PRIVATE');
        } catch (err) {
          console.log(err);
        }
      };
      getDoctorHospital();
    }
  }, [doctorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startTime || !endTime) {
      setMessage('Please fill all required fields');
      return;
    }

    const appointment = {
      startTime,
      endTime,
      roomLocation,
      status: 'AVAILABLE',
      price: payorNot ? parseFloat(price) || 0 : 0,
      doctor: { id: doctorId },
    };

    try {
      await axios.post('http://localhost:9090/api/doctor/addAppointment', appointment, {
        withCredentials: true,
      });
      setMessage('Appointment added successfully!');
      // Reset form
      setDoctorId('');
      setPayorNot(false);
      setRoomLocation('');
      setStartTime('');
      setEndTime('');
      setPrice('');
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data || 'Failed to add appointment');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-300 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg backdrop-blur-md bg-white/60 rounded-3xl shadow-2xl p-10 border border-white/30 transition-transform hover:scale-105 duration-300">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-8">
          Add Appointment
        </h2>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg text-center font-medium transition-all duration-300 ${
              message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Doctor Selection */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Choose Doctor</label>
            <select
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
              onChange={(e) => setDoctorId(e.target.value)}
              value={doctorId}
              required
            >
              <option value="">Select a doctor</option>
              {doctors.length > 0 &&
                doctors.map((doctor, idx) => (
                  <option key={idx} value={doctor.id}>
                    {doctor.firstName} {doctor.lastName} ({doctor.username})
                  </option>
                ))}
            </select>
          </div>

          {/* Start Time */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Start Time</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
              required
            />
          </div>

          {/* End Time */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">End Time</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
              required
            />
          </div>

          {/* Room Location */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Room Location</label>
            <input
              type="text"
              value={roomLocation}
              onChange={(e) => setRoomLocation(e.target.value)}
              placeholder="Enter room location"
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
              required
            />
          </div>

          {/* Price for Private Hospital */}
          {payorNot && (
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold mb-2">Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">Rs</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
          >
            Add Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAppointment;
