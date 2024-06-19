import React, { useEffect, useState } from 'react'
import { TrayArrowUp, X } from '@phosphor-icons/react'
import { message } from 'antd';
import * as CourseService from '../services/CourseService';
import { useNavigate, useParams } from 'react-router-dom';
import * as AttendanceService from '../services/AttendanceService';


const QuizPage = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');


    useEffect(() => {
        if (file) {
            const name = file.name;
            const extension = name.split('.').pop();
            const truncatedName = name.length > 15 ? name.substring(0, 15) + '...' : name;
            setFileName(`${truncatedName}.${extension}`);
        }
    }, [file]);

    const handleFileChange = (e) => {
        const files = e.target.files?.[0];
        if (files) {
            setFile(files);
        }
    };

    const removeFile = () => {
        const fileNameElement = document.getElementById('fileNameElement');
        if (fileNameElement) {
            fileNameElement.innerText = 'Browse your file here';
        }
        setFile(null);
        console.log(file);
    };

    const { code } = useParams();

    const [sessionCode, setSessionCode] = useState('');
    const [sessionQuiz, setSessionQuiz] = useState('');
    const [courseName, setCourseName] = useState('');

    const fetchCourseName = async (id) => {
        try {
            const res = await CourseService.getCourseName(id);
            if (res?.status === "OK") {
                // console.log("Course res",res);
                setCourseName(res.data);
            } else if (res?.status === "ERR") {
                message.error(res?.message);
            }
        } catch (error) {
            // console.error("Error fetching course name:", error);
        }
    }
    const navigate = useNavigate();

    const handleComplete = () => {
        message.success('Quiz submitted!');
        navigate('/dashboard');
    }

    const fetchSession = async () => {
        const res = await AttendanceService.getDetailsByCode(code);
        if (res?.status === "OK") {
            setSessionCode(code);
            setSessionQuiz(res.data.quiz);
            fetchCourseName(res.data.courseID);
        } else if (res?.status === "ERR") {
            message.error(res?.message);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            fetchSession();
        }
    })

    return (
        <div className='flex justify-center sm:items-center h-max sm:w-full flex-col sm:py-0 py-2'>
            <div className={`sm:bg-white sm:bg-opacity-40 sm:w-[80%] sm:h-max rounded-2xl p-6`}>
                <div className='flex flex-col sm:justify-center items-center p-4'>
                    <div className='font-poppins sm:text-2xl text-xl normal-case drop-shadow-2xl font-black'>
                        {sessionCode ? sessionCode : 'Session Code'}
                    </div>
                    <div className='sm:flex font-poppins sm:text-4xl text-2xl normal-case drop-shadow-2xl text-white font-black text-stroke-black'>
                        {courseName ? courseName : 'Course Name'}
                    </div>
                </div>
                <div className='flex p-6 bg-white sm:h-2/3 min-h-1/3 max-h-[400px] rounded-xl'>
                    <div className='sm:text-3xl text-base font-poppins text-justify text-ellipsis overflow-scroll'>
                        {sessionQuiz ? sessionQuiz : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen bookorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. orem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. orem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
                    </div>
                </div>
                <div className='flex sm:flex-row gap-4 justify-end p-4'>
                    <div className='flex flex-row items-center sm:w-1/2 w-max'>
                        <label htmlFor="dropzone-file" className="w-full group flex flex-row justify-between items-center gap-4 sm:border-2 rounded-xl hover:bg-blue-500 border hover:border-solid transition ease-in-out duration-500  border-dashed p-4 border-black ">
                            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                            <div className="flex flex-row gap-4 items-center justify-center">
                                <div className={`${file === null ? 'flex' : 'hidden'} text-sm sm:text-gray-500 text-black group-hover:text-white`}>
                                    <TrayArrowUp size={32} />
                                </div>
                                <div className={`w-1/2 flex flex-row overflow-hidden text-xs sm:text-gray-500 text-black group-hover:text-white font-poppins transition ${file ? 'sm:overflow-visible overflow-ellipsis' : 'sm:overflow-visible overflow-hidden'} whitespace-nowrap`}>
                                    {file ? (window.innerWidth > 640 ? file.name : fileName) : 'Browse your file here'}
                                </div>
                            </div>

                            <button onClick={removeFile} className={`${file === null ? 'hidden' : 'flex'} border group-hover:border-white text-[#ed3833] border-[#ed3833] p-2 rounded-full group hover:scale-110`}>
                                <X size={16} className='group-hover:text-white' />
                            </button>
                        </label>
                    </div>
                    <button
                        onClick={handleComplete}
                        className='border border-black sm:w-1/5  rounded-xl p-2  bg-white transition hover:bg-blue-500 ease-in-out duration-500 group'>
                        <span className='sm:text-lg text-xs uppercase font-montserrat sm:text-gray-500 text-black font-black tracking-wider group-hover:text-white'>
                            Submit
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default QuizPage
