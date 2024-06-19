import { ArrowSquareOut } from '@phosphor-icons/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CourseCard = ({ course }) => {
    const navigate = useNavigate();


    const handleViewCourse = () => {
        navigate(`/lecturer/dashboard/${course._id}`);
    }
    return (
        <div href="" className='sm:p-5 p-4 bg-blue-50 h-max sm:w-[420px] rounded-xl shadow-xl overflow border border-slate-500 animate-fade'>
            <div className='flex flex-col gap-2'>
                <div className=' relative flex justify-center'>
                    <span className='font-poppins text-xl uppercase'>
                        {course.name ? course.name : 'Course Name'}
                    </span>
                    {/* <span className='absolute right-0 '>
                        <ArrowSquareOut size={30} />
                    </span> */}
                </div>
                <div className='flex bg-white border border-black rounded-md overflow-hidden w-full h-[150px] p-2'>
                    <div className='text-justify overflow-hidden text-ellipsis text-black'>
                        {course.description ? course.description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen bookorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. orem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. orem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    {course.createdAt ? course.createdAt : 'Date'}
                </div>
                <div className='flex justify-center'>
                    <button onClick={handleViewCourse} className='bg-white rounded-lg border border-black py-2 px-6 hover:scale-105 hover:bg-blue-300 transition'>
                        <span className='uppercase'>
                            View CourseName
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CourseCard