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
        <div className='min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex flex-col items-center justify-center px-4 py-8'>
            <div className='bg-white rounded-2xl shadow-lg p-8 w-full max-w-md'>
                <h2 className='text-2xl font-bold mb-6 text-center'>Add Appointment</h2>
                {message && <p className='mb-4 text-center text-red-500'>{message}</p>}
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div>
                        <label className='block font-semibold mb-1'>Doctor Name:</label>
                        <input type="text" value={doctorDetails.firstName+' '+doctorDetails.lastName||''} disabled
                            className='w-full border rounded px-3 py-2 bg-gray-100' />
                    </div>
                    <div>
                        <label className='block font-semibold mb-1'>Start Time:</label>
                        <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)}
                            className='w-full border rounded px-3 py-2' required />
                    </div>
                    <div>
                        <label className='block font-semibold mb-1'>End Time:</label>
                        <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)}
                            className='w-full border rounded px-3 py-2' required />
                    </div>
                     <div>
                        <label className='block font-semibold mb-1'>Room Location:</label>
                        <input type="text" value={roomLocation} onChange={(e) => setRoomLocation(e.target.value)}
                            className='w-full border rounded px-3 py-2' required />
                    </div>
                    {payorNot && (
                        <div>
                            <label className='block font-semibold mb-1'>Price:</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
                                className='w-full border rounded px-3 py-2' placeholder="Enter price" />
                        </div>
                    )}
                    <button type='submit' className='bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition'>
                        Add Appointment
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddAppointments
