import { CalendarBlank, ListMagnifyingGlass, Users } from '@phosphor-icons/react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const gradients = [
    'bg-white',
    'bg-red-400',
    'bg-yellow-400',
    'bg-green-400',
]

function getRandomGradient() {
    const randomIndex = Math.floor(Math.random() * gradients.length);
    return gradients[randomIndex];
}



const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const SessionCard = ({ studentNum, session }) => {
    // console.log(session)
    const navigate = useNavigate()
    const mockDate = new Date(session?.createdAt)
    const day = mockDate.getDate();
    const month = mockDate.getMonth() + 1;
    const year = mockDate.getFullYear();
    // console.log(mockDate)
    const { course } = useParams()
    const monthNumber = monthNames.indexOf(mockDate.month) + 1;
    const goToCard = () => {
        navigate(`/lecturer/dashboard/${course}/${session.code}/review`)
    }

    return (
        <div
            className={`sm:p-5 p-4 ${session?.type === 'Quiz' ? 'bg-white' : 'bg-red-400'} flex flex-col-reverse bg-opacity-45 hover:bg-opacity-95 h-max sm:min-w-60 min-w-1/3 rounded-xl shadow-xl overflow hover:scale-105 transition duration-200 justify-between gap-2`}>
            <div className='bg-white p-2 flex  sm:relative sm:justify-center justify-between rounded-xl sm:items-center group'>
                <span className='uppercase font-poppins text-xl'>
                    {session ? session.code : 'CODEXD'}
                </span>
                <button
                    onClick={goToCard}
                    className='sm:absolute sm:flex hidden right-2 hover:scale-110 p-1 border-[1px] border-black rounded-lg hover:bg-slate-100'>
                    <ListMagnifyingGlass size={20} weight="light" />
                </button>
            </div>
            <div className='bg-white flex flex-col p-2 sm:pl-8 rounded-xl'>
                <div className='flex flex-row'>
                    <span className='sm:pr-6 pr-2'>
                        <Users size={20} weight="light" />
                    </span>
                    <span className='font-montserrat flex'>
                        {studentNum ? studentNum : Math.floor(Math.random() * 30)}
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
                                <span>{day < 10 ? '0' + day : day}</span>
                                <span className='sm:flex hidden'>&nbsp;</span>
                                <span className='sm:flex hidden'>{month < 10 ? '0' + month : month}&nbsp;</span>
                                <span className='sm:hidden flex'>/{month < 10 ? '0' + month : month}&nbsp;</span>
                                <span className='sm:flex hidden'>{year}&nbsp;</span>
                            </> : '##/Month/####'}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SessionCard