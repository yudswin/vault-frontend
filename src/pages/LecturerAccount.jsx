import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import * as LecturerService from '../services/LecturerService'
import { jwtDecode } from 'jwt-decode'
import { message } from 'antd'

const LecturerAccount = () => {
    const lecturer = useSelector(state => state.lecturer)

    const [firstName, setFirstName] = useState(lecturer.firstName)
    const [lastName, setLastName] = useState(lecturer.lastName)
    const [phone, setPhone] = useState(lecturer.phone)

    const handleOnChangeFirst = (e) => {
        setFirstName(e.target.value)
    }

    const handleOnChangeLast = (e) => {
        setLastName(e.target.value)
    }

    const handleOnChangePhone = (e) => {
        setPhone(e.target.value)
    }

    const handleUpdateInfo = async () => {
        try {
            let storageData = localStorage.getItem('accessToken')
            storageData = JSON.parse(storageData)
            const decoded = jwtDecode(storageData);

            const data = {
                lecturerID: lecturer.lecturerID,
                firstName: firstName,
                lastName: lastName,
                phone: phone
            }
            // console.log(decoded.id)

            const res = await LecturerService.updateLecturer(decoded.id, data, lecturer.accessToken)
            if (res?.status === "OK") {
                message.success('Update info successfully')
                window.location.reload()
            } else if (res?.status === "ERR") {
                console.log(res)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='flex justify-center items-center h-full w-full flex-col'>
            <div className='animate-fade-in sm:w-[502px] w-full sm:h-max h-full backdrop bg-white bg-opacity-40 rounded sm:p-3 px-6 pt-2  border border-gray-300 shadow-lg'>
                <div action="#" className='flex flex-col gap-4 h-max py-6'>
                    <legend className='pt-10 pb-8 text-[28px] text-center font-montserrat text-gray-600 font-bold '>CHANGE USER INFORMATION</legend>
                    <div>
                        <label htmlFor="lecturerID" className="block sm:text-2xl text-xl font-montserrat leading-6 text-black">lecturerID</label>
                        <div className="mt-2">
                            <input value={lecturer.lecturerID} id="lecturerID" name="lecturerID" placeholder='lecturerID' type="lecturerID" autoComplete="lecturerID" required className="font-palanquin block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" disabled />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block sm:text-2xl text-xl font-montserrat leading-6 text-black">email</label>
                        <div className="mt-2">
                            <input value={lecturer.email} id="email" name="email" placeholder='email' type="email" autoComplete="email" required className="font-palanquin block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" disabled />
                        </div>
                    </div>
                    <div className='flex flex-row w-full gap-2'>
                        <div className='w-1/2'>
                            <label htmlFor="firstName" className="block sm:text-2xl text-xl font-montserrat leading-6 text-black">first Name</label>
                            <div className="mt-2">
                                <input onChange={handleOnChangeFirst} value={firstName} id="firstName" name="firstName" placeholder='firstName' type="firstName" autoComplete="firstName" required className="font-palanquin block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className='w-1/2'>
                            <label htmlFor="lastName" className="block sm:text-2xl text-xl font-montserrat leading-6 text-black">last Name</label>
                            <div className="mt-2">
                                <input onChange={handleOnChangeLast} value={lastName} id="lastName" name="lastName" placeholder='lastName' type="lastName" autoComplete="lastName" required className="font-palanquin block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="phone" className="block sm:text-2xl text-xl font-montserrat leading-6 text-black">phone</label>
                        <div className="mt-2">
                            <input onChange={handleOnChangePhone} value={phone} id="phone" name="phone" placeholder='phone' type="phone" autoComplete="phone" required className="font-palanquin block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className="flex justify-center gap-3 pt-3">
                        <button onClick={handleUpdateInfo} className="bg-blue-500 hover:bg-blue-600 text-white font-montserrat  w-1/2 h-10 tracking-wider rounded-sm items-center transform shadow cursor-pointer">
                            <div className='flex flex-row justify-center'>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg> */}
                                <span className=''>Update Info</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LecturerAccount