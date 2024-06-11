import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'

const AddCourseModal = ({ isOpen, setIsOpen }) => {
    const handleOk = () => {
        setIsOpen(false);
    };
    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleOpen = () => {
        setIsOpen(true);
    }

    useEffect(() => {
        if (isOpen) {
            handleOpen()
        }
    }, [isOpen])

    return (
        <Modal open={isOpen} okText="Done" onOk={handleOk} onCancel={handleCancel} footer={null} className='course-modal'>
            <h1>Hello</h1>
        </Modal>
    )
}

export default AddCourseModal