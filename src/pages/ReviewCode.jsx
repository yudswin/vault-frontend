import React, { useEffect, useState } from 'react'
import BreadcrumbComponent from '../components/BreadcrumbComponent'
import { Clipboard } from '@phosphor-icons/react'
import * as AttendanceService from '../services/AttendanceService'
import * as CourseService from '../services/CourseService'
import { message } from 'antd'
import { useParams } from 'react-router-dom'

const ReviewCode = () => {

    const [quiz, setQuiz] = useState('');
    const [courseName, setCourseName] = useState('');
    const [dateCreated, setDateCreated] = useState('');

    const handleCopy = () => {
        const textToCopy = process.env.REACT_APP_QR_URL;

        if (!textToCopy) {
            console.log('No text to copy');
            return;
        }

        try {
            navigator.clipboard.writeText(textToCopy);
            console.log('Text copied to clipboard');
        } catch (err) {
            console.log('Failed to copy text: ', err);
        }
    }

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

    const { session } = useParams();

    const fetchData = async () => {
        try {
            const res = await AttendanceService.getDetailsByCode(session);
            if (res?.status === "OK") {
                setQuiz(res.data.quiz);
                setCourseName(res.data.courseName);
                setDateCreated(res.data.createdAt);
                fetchCourseName(res.data.courseID);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <div className={`bg-gradient-to-tr from-violet-400 to-sky-200 w-screen h-[947px] p-4`}>
                <BreadcrumbComponent />
                <div className='px-20 pt-10'>
                    <div className='p-8 bg-white border border-black rounded-xl h-[500px] flex flex-col gap-4 justify-between'>
                        <div className='flex overflow-hidden w-full h-full p-2'>
                            <div className='w-full text-3xl text-justify text-ellipsis overflow-scroll p-2'>
                                {quiz ? quiz : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen bookorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. orem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. orem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen boo'}
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between border-t border-black'>
                                <span>
                                    {dateCreated ? dateCreated : 'Date Created'}
                                </span>
                                <span>
                                    {courseName ? courseName : 'Course Name'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='px-20 pt-5 flex justify-center'>
                    <div className='bg-white flex flex-row-reverse h-max gap-12 py-4 px-10 w-max items-center border border-black rounded-xl'>
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&amp;data=https://echeckin.vercel.app/" alt="" className='pl-4 border-l-2 border-black' />
                        <div className='flex flex-row items-center gap-6'>
                            <button className='hover:scale-110' onClick={handleCopy}>
                                <Clipboard size={60} />
                            </button>
                            <div className='flex flex-col'>
                                <span className='text-8xl font-poppins uppercase'>
                                    {session ? session : 'CODEXD'}
                                </span>
                                <span>https://echeckin.vercel.app/</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewCode