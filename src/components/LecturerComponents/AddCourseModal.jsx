import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as CourseService from '../../services/CourseService'
import { jwtDecode } from 'jwt-decode'
import * as message from '../MessageModal'

const AddCourseModal = ({ isOpen, setIsOpen, onCourseCreated }) => {
    const handleOk = () => {
        setIsOpen(false);
    };
    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleOpen = () => {
        setIsOpen(true);
    }

    const navigate = useNavigate()
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')

    const handleCreate = async () => {
        let storageData = JSON.parse(localStorage.getItem('accessToken'));
        const decoded = jwtDecode(storageData);
        console.log(decoded);
        const res = await CourseService.create({
            name: name,
            description: description,
            lecturerId: decoded.id,
        }, storageData, decoded.id);
        console.log(res?.data);
        if (res?.status === "OK") {
            message.success('Course created!');
            onCourseCreated();
            handleOk();
        } else if (res?.status === "ERR") {
            message.error(res?.message);
        }
    };

    const handleOnChangeCourseName = (e) => {
        setName(e.target.value)
    }

    const handleOnChangeCourseInfo = (e) => {
        setDescription(e.target.value)
    }


    useEffect(() => {
        if (isOpen) {
            handleOpen()
        }
    }, [isOpen])

    return (
        <Modal open={isOpen} okText="Done" onOk={handleOk} onCancel={handleCancel} footer={null} className='course-modal'>
            <div>
                <form action="#" className='space-y-2'>
                    <legend className='sm:hidden pt-10 pb-8 text-[28px] text-center font-montserrat text-gray-600 font-bold '>CREATE NEW CLASS</legend>
                    <label htmlFor="name" className="block sm:text-2xl text-xl font-montserrat leading-6 text-black">Course Name</label>
                    <div className="mt-2">
                        <input id="name" name="name" placeholder='Name of the class' type="input" required className="font-palanquin block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={handleOnChangeCourseName} value={name}
                        />
                    </div>
                    <label htmlFor="description" className=" block sm:text-2xl text-xl font-montserrat leading-6 text-black">Description</label>
                    <div className="mt-2">
                        <textarea id="description" name="description" placeholder="Information of the class (date, group, section,....)" required className="resize-none block font-palanquin h-36 w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={handleOnChangeCourseInfo} value={description}
                        ></textarea>
                    </div>
                </form>
                <div className="pt-5 flex justify-center gap-3">
                    <button
                        disabled={!name || !description}
                        onClick={handleCreate} className="bg-blue-500 hover:bg-blue-600 text-white font-montserrat  w-1/2 h-10 tracking-wider rounded-sm items-center transform shadow cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed">
                        <div className='flex flex-row justify-center'>
                            <span className=''>Create</span>
                        </div>
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default AddCourseModal