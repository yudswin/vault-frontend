import React, { useEffect, useState } from 'react'
import CourseNavbar from '../components/CourseComponents/CourseNavbar'
import BreadcrumbComponent from '../components/BreadcrumbComponent'
import SessionCard from '../components/CourseComponents/SessionCard'
import { CheckFat, NotePencil } from '@phosphor-icons/react'
import { Modal } from 'antd'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import * as CourseService from '../services/CourseService'
import * as AttendanceService from '../services/AttendanceService'


const CourseInfoPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isEditInfo, setIsEditInfo] = useState(false);

    const [courseName, setCourseName] = useState('');
    const [courseInfo, setCourseInfo] = useState('');

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        if (isEdit === true) {
            setIsEdit(false);
        }
        if (isEditInfo === true) {
            setIsEditInfo(false);
        }
    };

    const showEdit = () => {
        setIsEdit(true);
        document.getElementById('courseNameInput').focus();
        console.log(isEdit);
    }

    const handleUpdate = () => {
        setIsEdit(false);
    }

    const showEditInfo = () => {
        setIsEditInfo(true);
        document.getElementById('courseDescriptionInput').focus();
        console.log(isEdit);
    }

    const handleUpdateInfo = () => {
        setIsEditInfo(false);
    }

    const [sessionList, setSessionList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const totalPages = Math.ceil(sessionList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentSessions = sessionList.slice(startIndex, endIndex);

    const handleClick = (pageNumbers) => {
        setCurrentPage(pageNumbers);
    }

    const { course } = useParams();

    const getAllSession = async () => {
        try {
            let storageData = JSON.parse(localStorage.getItem('accessToken'));
            // console.log(decoded);
            const res = await AttendanceService.getAll(course, storageData);
            // console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const fetchSession = async () => {
        let storageData = JSON.parse(localStorage.getItem('accessToken'));
        const res = await CourseService.getDetails(course, storageData);
        if (res?.status === "OK") {
            setCourseName(res.data.name);
            setCourseInfo(res.data.description);
        } else if (res?.status === "ERR") {
            message.error(res?.message);
        }
    }

    const querySession = useQuery({ queryKey: ['sessions'], queryFn: getAllSession })
    const { isLoading: isLoadingSessions, data: dataSessions, error: errorSessions } = querySession

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            fetchSession();
        }
        getAllSession()
            .then(res => {
                setSessionList(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    return (
        <div className={`sm:h-full h-full bg-gradient-to-tr from-violet-400 to-sky-200`}>
            <CourseNavbar />
            <div className="p-4">
                <BreadcrumbComponent />
                <div id='course-info' className='px-6 py-4 flex flex-col sm:gap-1 border-[1px] border-gray-700 bg-white w-full relative'>
                    <h1 className='font-poppins sm:text-4xl text-2xl items-center flex flex-row gap-4'>
                        <span>
                            {courseName ? courseName : 'Course Name'}
                        </span>
                    </h1>
                    <div className='bg-white rounded-lg h-max  2xl:w-[1400px]'>
                        <div className='text-justify font-palanquin sm:text-xl text-sm'>
                            {courseInfo ? courseInfo : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'}
                        </div>
                    </div>
                    <div>
                        <button onClick={showModal} className='absolute right-0 bottom-0 p-2 transition delay-100 '>
                            <NotePencil size={32} color='currentColor' className='transition hover:scale-110' />
                        </button>
                    </div>
                </div>
                <div id='sessions-container' className='py-12 h-[450px] flex gap-8 justify-center flex-wrap'>
                    {currentSessions.map((session, index) => (
                        <SessionCard key={`${currentPage}-${index}`} session={session} />
                    ))
                    }
                </div>
                <div className="flex gap-4 pt-4 justify-center">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handleClick(index + 1)}
                            className={`rounded-lg border border-black py-2 px-6 font-poppins tabular-nums w-[60px] ${currentPage === index + 1 ? 'bg-blue-200 scale-110' : 'bg-white'} transition duration-200 ease-in-out`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
            <>
                <Modal open={isModalOpen} okText="Done" onOk={handleOk} onCancel={handleCancel} footer={null} className='course-modal'>
                    <legend className=' uppercase flex flex-col font-montserrat justify-center items-center'>
                        <div className='text-xl'>Course Configuration</div>
                        <div className='text-3xl'> COURSEID </div>
                    </legend>
                    <div id='courseName' className='flex flex-col mt-4'>
                        <label htmlFor="courseName" className="block sm:text-lg text-sm font-montserrat leading-6 text-black">Class Name</label>
                        <div className="flex relative">
                            <input
                                id="courseNameInput"
                                name="courseName"
                                placeholder='Name of the class'
                                type="courseName"
                                className={`font-palanquin block w-full rounded-md px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-blue-600 sm:text-sm sm:leading-6 ${isEdit ? "pointer-events-auto" : "pointer-events-none"}`}
                            />
                            <button onClick={showEdit} className={`${isEdit ? "hidden" : ""} absolute inset-y-0  right-2 transition delay-100 hover:scale-110`}>
                                <NotePencil size={30} color='currentColor' className='' />
                            </button>
                            <button className={`${isEdit ? "" : "hidden"} absolute inset-y-0 right-2 transition delay-100 hover:scale-110`} onClick={handleUpdate}>
                                <CheckFat size={30} color='#2b5432' weight='bold' className='' />
                            </button>
                        </div>
                    </div>
                    <div id='courseDescription' className='flex flex-col mt-4'>
                        <label htmlFor="courseDescription" className="block sm:text-lg text-sm font-montserrat leading-6 text-black">Course Description</label>
                        <div className="mt-2 relative">
                            <input id="courseDescriptionInput" name="courseDescription" placeholder='Description of the course' type="text" className={`font-palanquin block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-blue-600 sm:text-sm sm:leading-6 ${isEditInfo ? "pointer-events-auto" : "pointer-events-none"}`} />
                            <button onClick={showEditInfo} className={`${isEditInfo ? "hidden" : ""} absolute inset-y-0  right-2 transition delay-100 hover:scale-110`}>
                                <NotePencil size={30} color='currentColor' className='' />
                            </button>
                            <button className={`${isEditInfo ? "" : "hidden"} absolute inset-y-0 right-2 transition delay-100 hover:scale-110`} onClick={handleUpdateInfo}>
                                <CheckFat size={30} color='#2b5432' weight='bold' className='' />
                            </button>
                        </div>
                    </div>
                </Modal>
            </>
        </div>
    )
}

export default CourseInfoPage