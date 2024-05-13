import { CalendarBlank, ListMagnifyingGlass, Users } from '@phosphor-icons/react'
import React from 'react'

const gradients = [
    // 'bg-gradient-to-r from-green-400 to-blue-500',
    // 'bg-gradient-to-r from-red-400 to-yellow-500',
    // 'bg-gradient-to-r from-purple-400 to-pink-500',
    // 'bg-gradient-to-r from-blue-400 to-indigo-500',
    'bg-white',
    'bg-red-400',
    'bg-yellow-400',
    'bg-green-400',
];

function getRandomGradient() {
    const randomIndex = Math.floor(Math.random() * gradients.length);
    return gradients[randomIndex];
}

const mockDate = {
    day: '15',
    month: 'November',
    year: '2022'
};

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const SessionCard = ({ studentNum, date }) => {
    const monthNumber = monthNames.indexOf(mockDate.month) + 1;
    return (
        <a href='' className={`sm:p-5 p-4 ${getRandomGradient()} flex flex-col-reverse bg-opacity-45 hover:bg-opacity-95 h-max sm:min-w-60 min-w-1/3 rounded-xl shadow-xl overflow hover:scale-105 transition duration-200 justify-between gap-2`}>
            <div className='bg-white p-2 flex  sm:relative sm:justify-center justify-between rounded-xl sm:items-center group'>
                <span className='cursor-pointer uppercase font-poppins text-xl group-hover:scale-110'>
                    CodeXD
                </span>
                <button className='sm:absolute sm:flex hidden right-2 hover:scale-110 p-1 border-[1px] border-black rounded-lg hover:bg-slate-100'>
                    <ListMagnifyingGlass size={20} weight="light" />
                </button>
            </div>
            <div className='bg-white flex flex-col p-2 sm:pl-8 rounded-xl'>
                <div className='flex flex-row'>
                    <span className='sm:pr-6 pr-2'>
                        <Users size={20} weight="light" />
                    </span>
                    <span className='font-montserrat flex'>
                        {studentNum ? studentNum : 0}
                        &nbsp;
                        <span className='hidden sm:flex'>Students</span>
                    </span>
                </div>
                <div className='flex flex-row'>
                    <span className='sm:pr-6 pr-2'>
                        <CalendarBlank size={20} weight='light' />
                    </span>
                    <span className='font-montserrat text-black flex'>
                        {mockDate ?
                            <>
                                <span>{mockDate.day}</span>
                                <span className='sm:flex hidden'>&nbsp;</span>
                                <span className='sm:flex hidden'>{mockDate.month}&nbsp;</span>
                                <span className='sm:hidden flex'>/{monthNumber < 10 ? '0' + monthNumber : monthNumber}&nbsp;</span>
                                <span className='sm:flex hidden'>{mockDate.year}&nbsp;</span>
                            </> : '##/Month/####'}
                    </span>
                </div>
            </div>
        </a>
    )
}

export default SessionCard