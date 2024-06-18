import React, { useEffect, useState } from 'react'
import * as StudentService from '../services/StudentService'
import * as LecturerService from '../services/LecturerService'
import * as message from '../components/MessageModal'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const [role, setRole] = useState('lecturer')
    const handleOnChangeRole = (e) => {
        setRole(e.target.value)
    }

    const handleForgot = async () => {
        try {
            if (role === 'lecturer') {
                const res = await LecturerService.forgotPassword({ email: email })
                if (res?.status === "OK") {
                    message.success(res?.message);
                } else {
                    message.error(res?.message);
                }
            } else if (role === 'student') {
                const res = await StudentService.forgotPassword({ email: email })
                if (res?.status === "OK") {
                    message.success(res?.message);
                } else {
                    message.error(res?.message);
                }
            } else return
        } catch (error) {
            message.error("Account not found")
        }
    }

    // useEffect(() => {
    //     console.log(email, role)
    // }, [email, role])

    return (
        <div className='flex justify-center items-center sm:h-max h-full w-full flex-col sm:bg-opacity-0 bg-white bg-opacity-40'>
            <div className='animate-fade-in sm:w-[502px] w-full sm:bg-white sm:bg-opacity-40 sm:rounded-3xl sm:p-3 sm:shadow-2xl sm:border sm:border-black '>
                <div className='mt-4 px-8 flex flex-col gap-2'>
                    <label htmlFor="email" className='font-poppins flex flex-row justify-center text-xl uppercase'> Enter your email </label>
                    <input type='email'
                        id='email'
                        name='email'
                        value={email} onChange={handleOnChangeEmail}
                        placeholder='Enter your email address'
                        autoComplete='email'
                        className='w-full rounded-md py-2.5 px-4 border border-black text-sm outline-none ' />
                    <select
                        onChange={handleOnChangeRole}
                        className={`flex flex-col justify-center rounded-md py-2.5 px-4 border border-black text-sm font-poppins outline-none`}>
                        <option value="lecturer">👨🏻‍🏫 Lecturer</option>
                        <option value="student">👨🏻‍🎓 Student</option>
                    </select>
                    <div className='w-full flex flex-row justify-center items-center py-2'>
                        <button
                            disabled={!email || !role}
                            onClick={handleForgot}
                            className='bg-blue-500 w-1/2 text-white font-poppins rounded-md py-2.5 px-4 text-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed'>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword