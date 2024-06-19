import {  Plus } from '@phosphor-icons/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const EmptyCard = () => {
    const navigate = useNavigate();

    const goToCreateCourse = () => {
        navigate('/lecturer/dashboard/add-course')
    }

    return (
        <div className='w-[420px] flex justify-center items-center'>
            <div href="" className='sm:p-5 p-4 bg-blue-50 h-[250px] w-[320px] rounded-xl shadow-xl overflow border border-slate-500 hover:scale-105 transition ease-in-out'>
                <div className='flex flex-col gap-2 h-full'>
                    <div className='flex justify-center'>
                        <span className='font-poppins text-xl uppercase'>
                            New Course
                        </span>
                    </div>
                    <div className='h-full flex justify-center items-center p-2'>
                        <button onClick={goToCreateCourse} className='flex bg-white border border-black rounded-xl justify-center align-middle overflow-hidden w-full h-full '>
                            <Plus size={60} className='h-full' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmptyCard