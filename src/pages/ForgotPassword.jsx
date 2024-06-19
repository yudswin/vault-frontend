import React, { createRef, useState } from 'react'
import * as StudentService from '../services/StudentService'
import * as LecturerService from '../services/LecturerService'
import * as message from '../components/MessageModal'
import PasswordStrengthMeter from '../components/LoginComponent/PasswordStrengthMeter'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const [role, setRole] = useState('lecturer')
    const handleOnChangeRole = (e) => {
        setRole(e.target.value)
    }

    const [forgot, setForgot] = useState(true)

    const handleForgot = async () => {
        try {
            if (role === 'lecturer') {
                const res = await LecturerService.forgotPassword({ email: email })
                if (res?.status === "OK") {
                    setShowOtpInput(true);
                    setForgot(false)
                    message.success(res?.message);
                } else {
                    message.error(res?.message);
                }
            } else if (role === 'student') {
                const res = await StudentService.forgotPassword({ email: email })
                if (res?.status === "OK") {
                    setShowOtpInput(true);
                    setForgot(false)
                    message.success(res?.message);
                } else {
                    message.error(res?.message);
                }
            } else return
        } catch (error) {
            message.error("Account not found")
        }
    }

    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');

    const input1Ref = createRef();
    const input2Ref = createRef();
    const input3Ref = createRef();
    const input4Ref = createRef();

    const handleInputChange = (e, setInput, nextInputRef) => {
        if (e.target.value === '' || (e.target.value.length <= 1 && e.target.value.match(/^[0-9]$/))) {
            setInput(e.target.value);
            if (e.target.value.length === 1) {
                nextInputRef && nextInputRef.current.focus();
            }
        }
    }

    const [showOtpInput, setShowOtpInput] = useState(false);
    const handleOTP = async () => {
        const otp = input1 + input2 + input3 + input4;
        const data = { email: email, otp: otp }
        try {
            if (role === 'lecturer') {
                const res = await LecturerService.verifyOTP(data)
                if (res?.status === "OK") {
                    message.success(res?.message);
                    // window.location.href = '/reset-password';
                    setShowChangePass(true)
                    setShowOtpInput(false)
                } else {
                    message.error(res?.message);
                }
            } else if (role === 'student') {
                const res = await StudentService.verifyOTP(data)
                if (res?.status === "OK") {
                    message.success(res?.message);
                    setShowChangePass(true)
                    setShowOtpInput(false)
                } else {
                    message.error(res?.message);
                }
            } else return
        } catch (error) {
            message.error("Invalid OTP")
        }
    }

    const [showChangePass, setShowChangePass] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value)
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    // useEffect(() => {
    //     console.log(email, role)
    // }, [email, role])

    const handleChangePassword = async () => {
        if (newPassword == confirmPassword) {
            const otp = input1 + input2 + input3 + input4;
            const data = {
                email: email,
                otp: otp,
                newPassword: newPassword,
                confirmPassword: confirmPassword
            }
            try {
                if (role === 'lecturer') {
                    const res = await LecturerService.changePassword(data)
                    if (res?.status === "OK") {
                        message.success(res?.message);
                        navigate('/lecturer')
                    } else {
                        message.error(res?.message);
                    }
                } else if (role === 'student') {
                    const res = await StudentService.changePassword(data)
                    if (res?.status === "OK") {
                        message.success(res?.message);
                        navigate('/')
                        // window.location.href = '/login';
                    } else {
                        message.error(res?.message);
                    }
                } else return
            } catch (error) {
                message.error("Failed to change password")
            }
        } else {
            message.error("Password does not match")
        }
    }

    const [strength, setStrength] = useState(0)
    const handleStrengthChange = (newStrength) => {
        setStrength(newStrength)
    }

    return (
        <>
            {forgot && (
                <div className='animate-fade-in flex justify-center items-center sm:h-max h-full w-full flex-col sm:bg-opacity-0 bg-white bg-opacity-40 transition ease-linear'>
                    <div className='animate-fade-in sm:w-[502px] w-full sm:bg-white sm:bg-opacity-40 sm:rounded-3xl sm:p-3 sm:shadow-2xl sm:border sm:border-black '>
                        <div className='px-8 py-4 flex flex-col gap-2'>
                            <div className={`${showOtpInput ? "hidden" : ""} flex flex-col gap-2`}>
                                <label htmlFor="email" className='font-poppins flex flex-row justify-center text-xl uppercase transition ease-in-out'>
                                    Enter your email
                                </label>
                                <input type='email'
                                    id='email'
                                    name='email'
                                    disabled={showOtpInput}
                                    value={email} onChange={handleOnChangeEmail}
                                    placeholder='Enter your email address'
                                    autoComplete='email'
                                    className='w-full rounded-md py-2.5 px-4 border border-black text-sm outline-none ' />
                            </div>
                            <select
                                disabled={showOtpInput}
                                onChange={handleOnChangeRole}
                                className={`${showOtpInput ? "hidden" : ""} flex flex-col justify-center rounded-md py-2.5 px-4 border border-black text-sm font-poppins outline-none`}>
                                <option value="lecturer">👨🏻‍🏫 Lecturer</option>
                                <option value="student">👨🏻‍🎓 Student</option>
                            </select>
                            <div className={`${showOtpInput ? "hidden" : ""} w-full flex flex-row justify-center items-center py-2`}>
                                <button
                                    disabled={!email || !role}
                                    onClick={handleForgot}
                                    className={` bg-blue-500 w-1/2 text-white font-poppins rounded-md py-2.5 px-4 text-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed`}>
                                    Submit
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
            {showOtpInput && (
                <div className='animate-fade-in flex justify-center items-center sm:h-max h-full w-full flex-col sm:bg-opacity-0 bg-white bg-opacity-40 transition ease-linear'>
                    <div className='animate-fade-in sm:w-[502px] w-full sm:bg-white sm:bg-opacity-40 sm:rounded-3xl sm:p-3 sm:shadow-2xl sm:border sm:border-black '>
                        <div className='px-8 py-4 flex flex-col gap-2'>
                            <div className='w-full flex flex-col justify-center items-center gap-2 animate-fade-in'>
                                <div className='font-poppins flex flex-row justify-center text-xl uppercase '>
                                    OTP Validation
                                </div>
                                <div>
                                </div>
                                <div className='flex flex-row gap-6'>
                                    <input ref={input1Ref} type="text" maxLength="1" value={input1} onChange={(e) => handleInputChange(e, setInput1, input2Ref)} className='w-full rounded-md py-2.5 px-4 border border-black text-sm outline-none text-center' />
                                    <input ref={input2Ref} type="text" maxLength="1" value={input2} onChange={(e) => handleInputChange(e, setInput2, input3Ref)} className='w-full rounded-md py-2.5 px-4 border border-black text-sm outline-none text-center' />
                                    <input ref={input3Ref} type="text" maxLength="1" value={input3} onChange={(e) => handleInputChange(e, setInput3, input4Ref)} className='w-full rounded-md py-2.5 px-4 border border-black text-sm outline-none text-center' />
                                    <input ref={input4Ref} type="text" maxLength="1" value={input4} onChange={(e) => handleInputChange(e, setInput4)} className='w-full rounded-md py-2.5 px-4 border border-black text-sm outline-none text-center' />
                                </div>
                                <div className='w-full pt-4 flex flex-col items-center'>
                                    <button
                                        onClick={handleOTP}
                                        disabled={!input1 || !input2 || !input3 || !input4}
                                        className={`bg-blue-500 w-2/3 text-white font-poppins rounded-md py-2.5 px-4 text-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed`}>
                                        Verify
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showChangePass && (
                <div className='animate-fade-in flex justify-center items-center sm:h-max h-full w-full flex-col sm:bg-opacity-0 bg-white bg-opacity-40 transition ease-linear'>
                    <div className='animate-fade-in sm:w-[502px] w-full sm:bg-white sm:bg-opacity-40 sm:rounded-3xl sm:p-3 sm:shadow-2xl sm:border sm:border-black '>
                        <div className='px-8 py-4 flex flex-col gap-2'>
                            <div className='w-full flex flex-col justify-center items-center gap-2 animate-fade-in'>
                                <div className='font-poppins flex flex-row justify-center text-xl uppercase '>
                                    Change Password
                                </div>
                                <div>
                                </div>
                                <div className='w-full flex flex-col gap-2'>
                                    <input type='password'
                                        id='password'
                                        name='password'
                                        onPaste={(e) => e.preventDefault()}
                                        onCopy={(e) => e.preventDefault()}
                                        onDrop={(e) => e.preventDefault()}
                                        placeholder='Enter your new password'
                                        autoComplete='password'
                                        onChange={handleNewPassword}
                                        className='w-full rounded-md py-2.5 px-4 border border-black text-sm outline-none ' />
                                    <input type='password'
                                        id='confirm-password'
                                        name='confirm-password'
                                        onPaste={(e) => e.preventDefault()}
                                        onCopy={(e) => e.preventDefault()}
                                        onDrop={(e) => e.preventDefault()}
                                        placeholder='Confirm your new password'
                                        autoComplete='confirm-password'
                                        onChange={handleConfirmPassword}
                                        className='w-full rounded-md py-2.5 px-4 border border-black text-sm outline-none ' />
                                </div>
                                <div className='w-full'>
                                    <PasswordStrengthMeter password={newPassword} onStrengthChange={handleStrengthChange} />
                                </div>
                                <div className='w-full pt-4 flex flex-col items-center'>
                                    <button
                                        disabled={!newPassword || !confirmPassword || strength < 5}
                                        onClick={handleChangePassword}
                                        className={`disabled:bg-gray-400 disabled:cursor-not-allowed bg-blue-500 w-2/3 text-white font-poppins rounded-md py-2.5 px-4 text-sm hover:bg-blue-700`}>
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ForgotPassword