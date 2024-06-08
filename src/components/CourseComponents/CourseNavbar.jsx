import React, { useState } from 'react'
import { Eye, FilePlus, TrashSimple } from '@phosphor-icons/react'
import { useNavigate, useParams } from 'react-router-dom'
import { Modal } from 'antd';
import * as message from '../MessageModal';
import * as CourseService from '../../services/CourseService';
import { jwtDecode } from 'jwt-decode';
import * as AttendanceService from '../../services/AttendanceService'


const CourseNavbar = ({ onCourseCreated }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    const { course } = useParams();

    // const goToAddSession = () => {
    //     navigate(`/lecturer/dashboard/${course}/add-session`);
    // }

    const handleDelete = async () => {
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

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleOnChangeType = (e) => {
        setSessionType(e.target.value)
        // console.log(e.target.value)
    }

    const handleOnChangeQuiz = (e) => {
        setQuizDetail(e.target.value)
        // console.log(e.target.value)
    }

    const goToDashboard = () => {
        navigate('/lecturer/dashboard/')
    }

    const goToCourseInfo = () => {
        navigate(`/lecturer/dashboard/${course}`)
    }

    const handleAddOk = () => {
        setIsAddModalOpen(false);
    };
    const handleAddCancel = () => {
        setIsAddModalOpen(false);
        setQuizDetail('')
        setSessionType('')
    };

    const [sessionType, setSessionType] = useState('')
    const [quizDetail, setQuizDetail] = useState('')

    const handleCreate = async (id, token) => {
        try {
            let storageData = JSON.parse(localStorage.getItem('accessToken'));
            const res = await AttendanceService.create(course, storageData, {
                quiz: quizDetail,
                type: sessionType,
                courseID: course
            })
            // console.log(res);
            if (res?.status === "OK") {
                message.success('Session created!');
                setIsAddModalOpen(false);
                onCourseCreated();
            } else if (res?.status === "ERR") {
                message.error(res?.message);
            }
        } catch (error) {
            console.log("Error creating session:", error);
            message.error('Error creating session');
        }
    };


    return (
        <nav className="bg-gray-700 h-12 bg-opacity-90">
            <div className="flex flex-row text-xs h-12 items-center px-6 font-montserrat  text-white">
                <button className='flex justify-center h-full items-center hover:bg-white group p-4 gap-2 transition-colors delay-75 ease-linear w-44'>
                    <Eye size={20} color="currentColor" className='group-hover:fill-gray-500' />
                    <span href="#" className="uppercase group-hover:text-gray-500 sm:flex hidden">Student List</span>
                </button>
                <button
                    onClick={() => setIsAddModalOpen(true)}
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
            <Modal open={isAddModalOpen} onOK={handleAddOk} onCancel={handleAddCancel} footer={null} className='course-modal'>
                <div className='space-y-2 h-full'>
                        <legend className='sm:hidden pt-10 pb-8 text-[28px] text-center font-montserrat text-gray-600 font-bold '>NEW ATTENDANCE</legend>
                        <label htmlFor="quizDetail" className=" block sm:text-2xl text-xl font-montserrat leading-6 text-black">Attendance Detail</label>
                        <div className="mt-2">
                            <textarea
                                onChange={handleOnChangeQuiz}
                                id="quizDetail" name="quizDetail" placeholder="Information of the quiz (date, group, section,....)" autoComplete="quizDetail" required className="resize-none block font-palanquin h-36 w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                        </div>
                        {/* Ratio */}
                        <label htmlFor="sessionType" className="block sm:text-2xl text-xl font-montserrat leading-6 text-black pt-2"></label>
                        <div className="grid grid-cols-2 gap-2 w-full">
                            <div >
                                <label className="flex flex-col text-slate-700 has-[:checked]:ring-indigo-200 has-[:checked]:text-indigo-900 has-[:checked]:bg-indigo-50 items-center gap-2 rounded-lg p-4 ring-1 ring-transparent bg-slate-50 hover:bg-slate-100 transform active:scale-90 hover:scale-95 transition-transform ">
                                    <div className='checked:border-indigo-500 text-xl font-montserrat font-semibold uppercase flex flex-row justify-between w-full items-center'>
                                        <div>Normal</div>
                                        <input
                                            onChange={handleOnChangeType}
                                            className="box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding outline-none ring-1 ring-gray-950/10 checked:border-indigo-500 checked:ring-indigo-500" type="radio" id="normal" name="sessionType" value="Normal" />
                                    </div>
                                    <span className='text-sx font-montserrat'>Do not required any submission </span>
                                </label>
                            </div>
                            <div>
                                <label className='flex flex-col text-slate-700 has-[:checked]:ring-indigo-200 has-[:checked]:text-indigo-900 has-[:checked]:bg-indigo-50 items-center gap-2 rounded-lg p-4 ring-1 ring-transparent bg-slate-50 hover:bg-slate-100 transform active:scale-90 hover:scale-95 transition-transform ' htmlFor="quiz">
                                    <div className='checked:border-indigo-500 text-xl font-montserrat font-semibold uppercase flex flex-row justify-between w-full items-center'>
                                        <span>Quiz</span>
                                        <input
                                            onChange={handleOnChangeType}
                                            className="box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding outline-none ring-1 ring-gray-950/10 checked:border-indigo-500 checked:ring-indigo-500" type="radio" id="quiz" name="sessionType" value="Quiz" />
                                    </div>
                                    <span className='text-sx font-montserrat'>Does required file submission </span>
                                </label>
                            </div>
                        </div>
                    </div>
                <div className='px-4 pt-6 flex items-center justify-center'>
                    <button
                        disabled={!sessionType || !quizDetail}
                        onClick={handleCreate} className="bg-blue-500 hover:bg-blue-600 text-white font-montserrat  w-2/3 h-10 tracking-wider rounded-sm items-center transform shadow cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed">
                        <div className='flex flex-row justify-center'>
                            <span className=''>Create</span>
                        </div>
                    </button>
                </div>
            </Modal>
        </nav>
    )
}

export default CourseNavbar