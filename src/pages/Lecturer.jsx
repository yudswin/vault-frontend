import React, { useEffect, useState } from 'react'
import BreadcrumbComponent from '../components/BreadcrumbComponent'
import { PlusSquare } from '@phosphor-icons/react'
import CourseCard from '../components/LecturerComponents/CourseCard'
import EmptyCard from '../components/LecturerComponents/EmptyCard'
import { useQuery } from '@tanstack/react-query'
import * as CourseService from '../services/CourseService'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const Lecturer = () => {
    const navigate = useNavigate();
    const [courseList, setCourseList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const totalPages = Math.ceil(courseList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCourses = courseList.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const getAllCourses = async () => {
        try {
            let storageData = JSON.parse(localStorage.getItem('accessToken'));
            const decoded = jwtDecode(storageData);
            // console.log(decoded);
            const res = await CourseService.getAll(decoded.id, storageData);
            // console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const queryCourse = useQuery({ queryKey: ['courses'], queryFn: getAllCourses })
    const { isLoading: isLoadingCourses, data: dataCourses, error: errorCourses } = queryCourse

    useEffect(() => {
        getAllCourses()
            .then(res => {
                setCourseList(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const goToCreateCourse = () => {
        navigate('/lecturer/dashboard/add-course')
    }

    return (
        <div className={`${courseList > 8 ? `sm:h-full` : `sm:h-svh`} sm:flex hidden bg-gradient-to-tr from-violet-400 to-sky-200 p-4 flex-col gap-2 `}>
            <BreadcrumbComponent />

            <div id="title" className='animate-fade-in flex flex-col px-4'>
                <div className='flex flex-row items-center'>
                    <span className='text-black sm:text-4xl text-2xl font-poppins uppercase px-4'>
                        Course List
                    </span>
                    <button onClick={goToCreateCourse} className='hover:animate-spin-slow transition'>
                        <PlusSquare size={40} />
                    </button>
                </div>
            </div>
            {/* fix animation later */}
            <div id="card-container" className='pt-2 px-8 justify-center items-center flex flex-wrap w-full h-[700px] gap-8 transition-all'>
                {currentCourses.map((course, index) => (
                    <div className={`transition delay-[${index * 1000}ms]`} key={`${currentPage}-${index}`}>
                        <CourseCard course={course}/>
                    </div>
                ))}
                {currentPage === totalPages && currentCourses.length % 8 !== 0 ?  <div className='animate-fade'><EmptyCard /></div> : null}
            </div>
            <div className='flex gap-4 pt-4 justify-center'>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        className={` rounded-lg border border-black py-2 px-6 font-poppins tabular-nums w-[60px] ${currentPage === index + 1 ? 'bg-blue-200 scale-110' : 'bg-white'} transition duration-200 ease-in-out`}
                        key={index} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>

        </div>
    )
}

export default Lecturer