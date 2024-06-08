import { Eye, EyeSlash } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutationHook } from '../hooks/useMutationHook'
import * as StudentService from '../services/StudentService'
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux'
import { updateStudent } from '../redux/slices/studentSlice'
import { login } from '../redux/slices/authSlice'
// import * as message from '../components/MessageModal'
import { message } from 'antd'


const LoginStudent = () => {
    const navigate = useNavigate()
    const goToLecturer = () => {
        navigate('/lecturer')
    }

    const [studentID, setStudentID] = useState('')
    const [password, setPassword] = useState('')

    const mutation = useMutationHook(
        data => StudentService.loginUser(data)
    )

    const { data, isSuccess, isError } = mutation

    const handleOnChangeID = (e) => {
        setStudentID(e.target.value);
    }

    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const handleSignIn = () => {
        // console.log(`Signing in with ID: ${studentID} and password: ${password}`);
        // console.log(process.env.REACT_APP_TEST)
        mutation.mutate({
            studentID,
            password,
        })
    }

    const dispatch = useDispatch()
    const handleGetDetailUser = async (id, token) => {
        dispatch(login({ role: 'student' }));
        const res = await StudentService.getDetailStudent(id, token);
        dispatch(updateStudent({ ...res?.data, accessToken: token }));
        // console.log(res?.data);
    };

    useEffect(() => {
        if (data?.status === "OK") {
            navigate('/dashboard')
            message.success('Login Success')
            localStorage.setItem('accessToken', JSON.stringify(data?.accessToken))
            localStorage.setItem('role', 'student');
            // console.log('Role:', localStorage.getItem('role'));
            // console.log('test', data)
            if (data?.accessToken) {
                const decoded = jwtDecode(data?.accessToken);
                // console.log('decoded', decoded)
                if (decoded?.id) {
                    handleGetDetailUser(decoded?.id, data?.accessToken);
                }
            }
        } else if (data?.status === "Error") {
            message.error(data?.message)
        } else if (data?.status === "404") {
            message.error
        }

    }, [data, isSuccess, isError])


    return (
        <>
            <div className='flex justify-center items-center sm:h-max h-full w-full flex-col sm:bg-opacity-0 bg-white bg-opacity-40'>
                <div className='flex sm:flex-row flex-col sm:gap-6 justify-center items-center py-6 text-center text-white font-black font-poppins '>
                    <div className='sm:text-8xl text-[40px] uppercase text-stroke-black'>E-Checking</div>
                    <div className='sm:text-3xl text-xl bg-blue-500 bg-opacity-80 sm:py-4 py-2 px-6 rounded-xl'>System</div>
                </div>
                <div className='animate-fade-in sm:w-[502px] w-full sm:bg-white sm:bg-opacity-40 sm:rounded-3xl sm:p-3 sm:shadow-2xl sm:border sm:border-black '>
                    <div className='mt-4 px-8'>
                        <label className="block font-poppins text-black pb-2" htmlFor="id"> Username </label>
                        <input type='id'
                            id='id'
                            name='id'
                            value={studentID} onChange={handleOnChangeID}
                            placeholder='student Id'
                            autoComplete='id'
                            className="w-full rounded-md py-2.5 px-4 border border-black text-sm outline-[#678dcf]" />
                    </div>
                    <div className="mt-4 px-8">
                        <label className="block font-poppins text-black pb-2" htmlFor="password" value={password}> Password </label>
                        <div className=' relative flex items-center'>
                            <input type={passwordVisible ? 'text' : 'password'}
                                value={password} onChange={handleOnChangePassword}
                                id='password'
                                className='w-full rounded-md py-2.5 px-4 border border-black text-sm outline-[#678dcf]' placeholder='your password' />
                            <button type="button" id="togglePassword" className="text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600 absolute inset-y-0 right-2" onClick={togglePasswordVisibility}>
                                {passwordVisible ? <EyeSlash size={26} color='currentColor' /> : <Eye size={26} color='currentColor' />}
                            </button>
                        </div>
                    </div>
                    <div className="my-4 mt-8 flex justify-center gap-3">
                        <button onClick={handleSignIn}
                            disabled={!studentID || !password}
                            className=" bg-blue-500 hover:bg-blue-600 text-white font-montserrat px-12 py-2  tracking-wider rounded-xl transform shadow cursor-pointer font-bold disabled:bg-gray-400 disabled:cursor-not-allowed">
                            <span className='uppercase'>sign in</span>
                        </button>
                    </div>
                </div>
                <div className='sm:pt-8 pt-2 font-poppins sm:text-xl text-base flex flex-row items-center'>
                    <span className=''>
                        You aren't a &nbsp;
                    </span>
                    <span className='text-blue-700 flex flex-row items-center'>
                        Student?&nbsp;
                    </span>
                    <span>
                        try as&nbsp;
                    </span>
                    <button onClick={goToLecturer} className='text-purple-800 underline'>
                        Lecturer!
                    </button>
                </div>
            </div>
        </>

    )
}

export default LoginStudent