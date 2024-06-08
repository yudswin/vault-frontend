import React, { useState } from 'react'
import { Eye, FilePlus, TrashSimple } from '@phosphor-icons/react'
import { useNavigate, useParams } from 'react-router-dom'
import { Modal } from 'antd';
import * as message from '../MessageModal';
import * as CourseService from '../../services/CourseService';

const CourseNavbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    const { course } = useParams();

    const goToAddSession = () => {
        navigate(`/lecturer/dashboard/${course}/add-session`);
    }

    const handleDelete = async () =>  {
        try {
            let storageData = JSON.parse(localStorage.getItem('accessToken'));
            const res = await CourseService.deleteCourse(course, storageData);
            if (res?.status === "OK") {
                message.success('Course deleted!');
                setIsModalOpen(false);
                navigate('/lecturer/dashboard');
            } else {
                message.error(res?.message);
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            message.error('Error deleting course');
        }
        
    }

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <nav className="bg-gray-700 h-12 bg-opacity-90">
            <div className="flex flex-row text-xs h-12 items-center px-6 font-montserrat  text-white">
                <button className='flex justify-center h-full items-center hover:bg-white group p-4 gap-2 transition-colors delay-75 ease-linear w-44'>
                    <Eye size={20} color="currentColor" className='group-hover:fill-gray-500' />
                    <span href="#" className="uppercase group-hover:text-gray-500 sm:flex hidden">Student List</span>
                </button>
                <button
                    onClick={goToAddSession}
                    className='flex justify-center h-full items-center hover:bg-white  group p-4 gap-2 transition-colors delay-75 ease-linear w-44'>
                    <FilePlus size={20} color="currentColor" className='group-hover:fill-gray-500' />
                    <span href="#" className="uppercase group-hover:text-gray-500 sm:flex hidden">Attendance</span>
                </button>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className='flex justify-center h-full items-center hover:bg-white  group p-4 gap-2 transition-colors delay-75 ease-linear w-44'>
                    <TrashSimple size={20} color="currentColor" className='group-hover:fill-gray-500' />
                    <span href="#" className="uppercase group-hover:text-gray-500 sm:flex hidden">Course</span>
                </button>
            </div>
            <Modal open={isModalOpen} okText="Done" onOk={handleOk} onCancel={handleCancel} footer={null} className='course-modal'>
                <div className='flex flex-col justify-center gap-2 p-4'>
                    <div>Are you sure you want to delete this course?</div>
                    <button onClick={handleDelete}
                        className='font-poppins uppercase p-2 rounded-lg border border-black hover:bg-red-200'>Delete</button>
                </div>
            </Modal>
        </nav>
    )
}

export default CourseNavbar