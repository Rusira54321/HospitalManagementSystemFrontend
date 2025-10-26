import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AddAppointments = () => {
    const [doctorDetails, setDoctorDetails] = useState({})
    const [payorNot, setPayorNot] = useState(false)
    const [patientName, setPatientName] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [status, setStatus] = useState('SCHEDULED')
    const [price, setPrice] = useState('')
    const [message, setMessage] = useState('')
    const [roomLocation,setRoomLocation] = useState('')

    useEffect(() => {
        const username = localStorage.getItem("username")
        const getDoctorDetails = async () => {
            try {
                const res = await axios.get("http://localhost:9090/api/doctor/getDoctor", {
                    params: { username },
                    withCredentials: true
                })
                console.log(res.data)
                setDoctorDetails(res.data)

                const doctorId = res.data.id
                const hospitalRes = await axios.get("http://localhost:9090/api/doctor/getHospital", {
                    params: { doctorID: doctorId },
                    withCredentials: true
                })

                if (hospitalRes.data.hospitalType === "GOVERNMENT") setPayorNot(false)
                else if (hospitalRes.data.hospitalType === "PRIVATE") setPayorNot(true)

            } catch (err) {
                console.log(err)
                setMessage("Failed to fetch doctor or hospital details")
            }
        }
        getDoctorDetails()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!startTime || !endTime) {
            setMessage("Please fill all required fields")
            return
        }

        const appointment = {
            startTime,
            endTime,
            roomLocation,
            status:"AVAILABLE",
            price: payorNot ? parseFloat(price) || 0 : 0,
            doctor: { id: doctorDetails.id }
        }
        try {
            const res = await axios.post("http://localhost:9090/api/doctor/addAppointment", appointment, {
                withCredentials: true
            })
            setMessage("Appointment added successfully!")
            // Reset form
            setPatientName('')
            setStartTime('')
            setEndTime('')
            setPrice('')
        } catch (err) {
            console.error(err)
            setMessage(err.response?.data || "Failed to add appointment")
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-300 flex flex-col items-center justify-center px-4 py-8'>
            <div className='backdrop-blur-md bg-white/80 rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20 transition-all duration-300 hover:shadow-xl'>
                <h2 className='text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text'>Add Appointment</h2>
                {message && (
                    <div className={`mb-6 p-4 rounded-lg ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} transform transition-all duration-300 animate-fade-in`}>
                        <p className='text-center font-medium'>{message}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                    <div className='space-y-2'>
                        <label className='block font-semibold text-gray-700'>Doctor Name</label>
                        <input 
                            type="text" 
                            value={doctorDetails.firstName+' '+doctorDetails.lastName||''} 
                            disabled
                            className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-75' 
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className='block font-semibold text-gray-700'>Start Time</label>
                        <input 
                            type="datetime-local" 
                            value={startTime} 
                            onChange={(e) => setStartTime(e.target.value)}
                            className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all' 
                            required 
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className='block font-semibold text-gray-700'>End Time</label>
                        <input 
                            type="datetime-local" 
                            value={endTime} 
                            onChange={(e) => setEndTime(e.target.value)}
                            className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all' 
                            required 
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className='block font-semibold text-gray-700'>Room Location</label>
                        <input 
                            type="text" 
                            value={roomLocation} 
                            onChange={(e) => setRoomLocation(e.target.value)}
                            className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all' 
                            required 
                            placeholder="Enter room location"
                        />
                    </div>
                    {payorNot && (
                        <div className='space-y-2'>
                            <label className='block font-semibold text-gray-700'>Price</label>
                            <div className='relative'>
                                <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500'>$</span>
                                <input 
                                    type="number" 
                                    value={price} 
                                    onChange={(e) => setPrice(e.target.value)}
                                    className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 pl-8 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all' 
                                    placeholder="Enter price" 
                                />
                            </div>
                        </div>
                    )}
                    <button 
                        type='submit' 
                        className='mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'
                    >
                        Add Appointment
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddAppointments
