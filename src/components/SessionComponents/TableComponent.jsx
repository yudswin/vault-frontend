import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import moment from 'moment';


const TableComponent = ({ record }) => {
    const formatDate = (dateString) => {
        return moment(dateString).format('DD/MM HH:mm:ss');
    };

    const columns = [
        {
            title: () => <span className='max-w-32'>Index</span>,
            dataIndex: 'index',
            sorter: (a, b) => a.index - b.index,
            render: (text) => <span className='flex'>{text}</span>,
        },
        {
            title: 'Student ID',
            dataIndex: 'studentId',
            sorter: (a, b) => a.studentId - b.studentId,
            render: (text) => <span className='font-palanquin uppercase '>{text}</span>,
        },
        {
            title: 'Student Name',
            dataIndex: 'studentName',
            sorter: (a, b) => a.studentName.length - b.studentName.length,
        },
        {
            title: 'Join At',
            dataIndex: 'joinAt',
            sorter: (a, b) => moment(a.joinAt, 'DD/MM HH:mm:ss').valueOf() - moment(b.joinAt, 'DD/MM HH:mm:ss').valueOf(),
        },
        {
            title: 'File Upload',
            dataIndex: 'fileUpload',
            render: (text, record) => (
                <a href={record.fileUpload} target="_blank" rel="noopener noreferrer">
                    {record.fileUpload === 'No file uploaded' ? 'No file uploaded' : 'View'}
                </a>
            ),
        },
    ];


    const [data, setData] = useState([])
    const [nameList, setNameList] = useState([])

    const handleGetName = async (id) => {
        try {
            const res = await StudentService.getStudentName(id)
            if (res?.status === "OK") {
                setNameList(prev => [...prev, res.data])
            } else if (res?.status === "ERR") {
                message.error(res?.message);
            }
        } catch (e) {
            message.error(e);
        }
    
    }

    useEffect(() => {
        if (record) {
            
            const newData = record.map((item, index) => ({
                key: index,
                index: index + 1,
                studentId: item.studentID,
                studentName: item.studentName,
                joinAt: formatDate(item.createdAt),
                fileUpload: item.fileUpload ? item.fileUpload : 'No file uploaded',
            }));


            while (newData.length < 8) {
                newData.push({
                    key: newData.length,
                    index: newData.length + 1,
                    studentId: '',
                    studentName: '',
                    joinAt: '',
                    fileUpload: 'No file uploaded',
                });
            }

            setData(newData);
        }
        // console.log('record', record);
        // console.log('data', data);
    }, [record]);


    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    };

    return <Table pagination={{ pageSize: 8 }} rowSelection={rowSelection} columns={columns} dataSource={data} className='w-full antd-table' />;
};

export default TableComponent;