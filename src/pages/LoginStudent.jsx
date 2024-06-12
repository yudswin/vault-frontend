import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ExclamationMark,
  Eye,
  EyeSlash,
  Question,
} from "@phosphor-icons/react";

const LoginStudent = () => {
  const navigate = useNavigate();

  const handleCreate = (e) => {
    // Handle create logic
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const goToCourseInfo = () => {
    navigate("/lecturer/dashboard/course");
  };

  const goToLecturerLogin = () => {
    navigate("/lecturer");
  };

  return (
    <>
      <div className='flex justify-center items-center sm:h-max h-full w-full flex-col sm:bg-opacity-0 bg-white bg-opacity-40'>
        <div className='flex sm:flex-col justify-center items-center py-6 text-center text-white font-black font-poppins pb-20'>
          <div className='sm:text-8xl text-[40px] uppercase text-stroke-black font-poppins text-[#1E0342] text-3xl'>
            Vault
          </div>
          <div className='text-lg font-bold text-[#1E0342]'>
            Attendance Management System
          </div>
        </div>

        <div className='animate-fade-in sm:w-[502px] w-full sm:bg-purple-300 sm:bg-opacity-40 sm:rounded-3xl sm:p-10 sm:shadow-2xl sm:border sm:border-black relative '>
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <div className='flex justify-center items-center sm:text-8xl bg-opacity-80 sm:py-4 py-2 px-6 rounded-full shadow-lg w-40 h-40 font-poppins font-black text-white text-3xl bg-[#1d0738]'>
              V
            </div>
          </div>
          <div className='mt-20 px-8'>
            <label className="block font-poppins text-black pb-2" htmlFor="email" value="Email"> Username </label>
            <input type='email'
              name='email'
              placeholder='student Id'
              className="w-full rounded-md py-2.5 px-4 border border-black text-sm outline-[#678dcf]" />
          </div>
          <div className="mt-4 px-8">
            <label className="block font-poppins text-black pb-2" htmlFor="password" value="Password"> Password </label>
            <div className='relative flex items-center'>
              <input type={passwordVisible ? 'text' : 'password'} className='w-full rounded-md py-2.5 px-4 border border-black text-sm outline-[#678dcf]' placeholder='your password' />
              <button type="button" id="togglePassword" className="text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600 absolute inset-y-0 right-2" onClick={togglePasswordVisibility}>
                {passwordVisible ? <EyeSlash size={26} color='currentColor' /> : <Eye size={26} color='currentColor' />}
              </button>
            </div>
          </div>
          <div className="my-4 mt-8 flex justify-center gap-3">
            <button onClick={handleCreate} className="bg-blue-500 hover:bg-blue-600 text-white font-montserrat px-12 py-2 tracking-wider rounded-xl transform shadow cursor-pointer font-bold">
              <span className='uppercase'>sign in</span>
            </button>
          </div>
          <div className='mt-4 font-poppins text-base flex justify-center items-center'>
            <span>You aren't a&nbsp;</span>
            <span className='text-blue-700'>Student?&nbsp;</span>
            <span>try as&nbsp;</span>
            <a href='' className='text-purple-800 underline' onClick={goToLecturerLogin}>Lecturer!</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginStudent;