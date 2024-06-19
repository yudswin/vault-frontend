import React, { useEffect, useState } from 'react';
import { CheckCircle } from '@phosphor-icons/react';
import { Modal } from 'antd';
import * as AttendanceService from '../services/AttendanceService';
import * as CourseService from '../services/CourseService';
import * as RecordService from '../services/RecordService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as message from '../components/MessageModal';

const StudentDashboard = () => {
    const [pinCode, setPinCode] = useState('');
    const [sessionInfo, setSessionInfo] = useState('');
    const [courseName, setCourseName] = useState('');
    const [timeStamp, setTimeStamp] = useState('');

    const student = useSelector(state => state.student)
    const auth = useSelector(state => state.auth)

    const navigation = useNavigate();
    const goToQuiz = () => {
        localStorage.setItem('code', JSON.stringify(sessionInfo));
        message.success('Session found!')
        navigation(`/dashboard/${pinCode}`);
    }

    const handlePinChange = (e) => {
        setPinCode(e.target.value);
        // console.log(pinCode)
    };

    const fetchCourseName = async (id) => {
        try {
            const res = await CourseService.getCourseName(id);
            if (res?.status === "OK") {
                // console.log("Course res",res);
                setCourseName(res.data);
                showModal();
            } else if (res?.status === "ERR") {
                message.error(res?.message);
            }
        } catch (error) {
            // console.error("Error fetching course name:", error);
        }
    }

    const handleCreateRecord = async (sessionId) => {
        try {
            const res = await RecordService.createNormal(sessionId, { studentID: student.studentID });
            // console.log("Student: ", res)
            // console.log("StudentID: ", student.studentID);
            if (res?.status === "OK") {
                message.success('Record created!');
                // console.log("Record created: ", res);
            } else if (res?.status === "ERR") {
                message.error(res?.message);
            }
        } catch (error) {
            // console.error("Error creating record:", error);
        }
    }

    const handleEnter = async () => {
        // console.log("Pin entered: ", pinCode);
        try {
            const res = await AttendanceService.getDetailsByCode(pinCode);
            if (res?.status === "OK") {
                if (res?.data.type === "Normal") {
                    setSessionInfo(res);
                    // console.log("Session info: ", sessionInfo);

                    // Set timeStamp to the current date and time
                    const currentTime = new Date();
                    setTimeStamp(currentTime.toString());

                    // Fetch course name
                    fetchCourseName(res.data.courseID);

                    // Create record
                    handleCreateRecord(res.data._id);

                } else if (res?.data.type === "Quiz") { goToQuiz() }
            } else if (res?.status === "ERR") {
                message.error(res?.message);
            }
        } catch (error) {
            // console.error("Error fetching details:", error);
        }
    };


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isEditInfo, setIsEditInfo] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setPinCode('');
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

    useEffect(() => {
        if (!auth.isAuthenticated && !localStorage.getItem('accessToken')) {
            message.warning('Please login to continue');
        }
    }, []);

    return (

        <div className='flex justify-center items-center sm: h-full h-svg w-full flex-col bg-white bg-opacity-40 sm:bg-opacity-10'>
            <div className='sm:p-4 flex justify-center rounded-2xl items-center align-middle text-center'>
                <span className='sm:flex hidden font-poppins text-5xl normal-case drop-shadow-2xl text-white font-black text-stroke-black'>
                    Attendance Session
                </span>
            </div>
            <div className='sm:bg-white sm:bg-opacity-40 animate-fade-in sm:w-[400px] w-full sm:h-max h-full rounded-xl sm:p-8 px-6 pt-2 shadow-xl flex justify-center items-center'>
                <form action="#" noValidate className='flex-col flex gap-6 sm:w-full w-full items-center'>
                    <legend className='sm:hidden border-b border-black'>
                        <div className=''>
                            <span className='font-poppins text-3xl uppercase text-white font-black text-stroke-black'>
                                Attendance Session
                            </span>
                        </div>
                    </legend>
                    <label htmlFor="pinCode" className="flex flex-col-reverse justify-center font-montserrat leading-6 text-black w-full sm:pt-0 pt-5">
                        <input
                            id="pinCode"
                            name="pinCode"
                            placeholder='Session Code'
                            type="text"
                            required
                            maxLength="6"
                            autoComplete="off"
                            pattern='[A-Za-z0-9]{6}'
                            value={pinCode}
                            onChange={handlePinChange}
                            className='font-poppins font-medium tracking-widest block w-full rounded-lg  p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black placeholder:flex placeholder:justify-center placeholder:items-center sm:text-xl sm:leading-6 text-center uppercase peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 ' />
                        <span className="hidden text-sm text-red-500  peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                            Enter a correct pin with only 6 characters
                        </span>
                    </label>
                    <button type="button" onClick={handleEnter} className='font-montserrat w-full py-2 border border-black rounded-lg bg-white uppercase hover:scale-105 transition  '>
                        Enter
                    </button>
                </form>
            </div>
            <>
                <Modal open={isModalOpen} okText="Done" onOk={handleOk} onCancel={handleCancel} footer={null} className='session-success-modal fixed inset-0 flex items-center justify-center sm:w-[500px]'>
                    <legend className=' uppercase flex flex-col font-montserrat justify-center items-center'>
                        <div className=''>
                            <CheckCircle size={80} color="#20ac22" />
                        </div>
                    </legend>
                    <div className='sm:py-4 pb-4 flex flex-col justify-center items-center gap-2'>
                        <div className='flex sm:flex-row flex-col justify-center items-center sm:text-lg text-xs font-montserrat leading-6 text-black'>
                            <span>Attendance roll call complete!&nbsp;</span>
                            <span>
                                You have been accounted for today's session
                            </span>
                        </div>
                        <div id="courseName" className='sm:text-4xl text-2xl uppercase font-montserrat'>
                            {courseName}
                        </div>
                        <div id="timeStamp" className='sm:text-lg text-sm font-poppins'>
                            {timeStamp}
                        </div>
                    </div>
                    <div>
                        <button onClick={handleOk} className='font-montserrat w-full py-2 border border-black rounded-lg bg-white uppercase hover:scale-105 transition'>
                            Done
                        </button>
                    </div>
                </Modal>
            </>
        </div>
    );
}

export default StudentDashboard;
