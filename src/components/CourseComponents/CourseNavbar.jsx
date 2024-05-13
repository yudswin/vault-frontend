import React from 'react'
import { Eye, FilePlus, TrashSimple } from '@phosphor-icons/react'

const CourseNavbar = () => {
    return (
        <nav className="bg-gray-700 h-12 bg-opacity-90">
            <div className="flex flex-row text-xs h-12 items-center px-6 font-montserrat  text-white">
                <button className='flex justify-center h-full items-center hover:bg-white group p-4 gap-2 transition-colors delay-75 ease-linear w-44'>
                    <Eye size={20} color="currentColor" className='group-hover:fill-gray-500' />
                    <span href="#" className="uppercase group-hover:text-gray-500 sm:flex hidden">Student List</span>
                </button>
                <button className='flex justify-center h-full items-center hover:bg-white  group p-4 gap-2 transition-colors delay-75 ease-linear w-44'>
                    <FilePlus size={20} color="currentColor" className='group-hover:fill-gray-500' />
                    <span href="#" className="uppercase group-hover:text-gray-500 sm:flex hidden">Attendance</span>
                </button>
                <button className='flex justify-center h-full items-center hover:bg-white  group p-4 gap-2 transition-colors delay-75 ease-linear w-44'>
                    <TrashSimple size={20} color="currentColor" className='group-hover:fill-gray-500' />
                    <span href="#" className="uppercase group-hover:text-gray-500 sm:flex hidden">Course</span>
                </button>
            </div>
        </nav>
    )
}

export default CourseNavbar