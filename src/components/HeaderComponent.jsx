import React, { Fragment, useEffect, useState } from 'react'
import logo from '../assets/Logo.svg'
import { CaretDown, Faders, List, SignOut } from '@phosphor-icons/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const HeaderComponent = ({ title, role }) => {
    const [showProfile, setShowProfile] = useState(true)
    const [userName, setUserName] = useState('')
    let user = role === 'student' ? useSelector(state => state.student) : useSelector(state => state.lecturer);
    const navigate = useNavigate()

    const handleSignOut = () => {
        localStorage.clear()
        window.location.reload()
    }

    const goToAccount = () => {
        navigate('/' + role + 'Account')
    }

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            setUserName(user?.firstName + ' ' + user?.lastName);
        }
    }, [user]);

    return (
        <>
            <header className='bg-white w-full flex justify-between sm:px-6 lg:px-8 items-center align-middle shadow-xl border-b border-black'>
                <div className='flex'>
                    <a href="#" className='-m-1.5 p-1.5'>
                        <img src={logo} alt="logo" className='w-auto h-20 items-center' />
                    </a>
                    <div className='hidden sm:flex flex-col gap-0.5 uppercase text-left justify-center font-poppins text-gray-500'>
                        <div className='text-lg uppercase'> {title} </div>
                        <div className='text-sm capitalize'> {role} </div>
                    </div>
                </div>
                {title === 'Login Page' ? Fragment : <div className='flex flex-col space-x-2 capitalize items-center text-lg pr-[18px] sm:pr-0'>
                    <button className='flex font-poppins text-gray-500 justify-center items-center gap-2 border-opacity-50 py-2 sm:px-4 rounded-md hover:text-black sm:hover:bg-slate-100 transition ease-in-out delay-50' onClick={() => setShowProfile(!showProfile)} type='button'>
                        <span className='hidden sm:flex capitalize'>
                            {userName ? userName : 'User'}
                        </span>
                        <div className='sm:border-transparent hover:bg-slate-100 border-[1px] sm:p-0 p-3 rounded-lg border-gray-800 border-opacity-95'>
                            <CaretDown size={16} color="#040c1e" className={`hidden sm:block transition-transform duration-300 ease-in-out ${showProfile ? 'transform rotate-180' : ''}`} />
                            <List size={20} color="#040c1e" className={`sm:hidden transition-transform duration-300 ease-in-out ${showProfile ? 'transform rotate-180' : ''}`} />
                        </div>
                    </button>
                    <div id='profileModal' className={showProfile ? 'hidden' : 'z-10 absolute top-14'}>
                        <ul id='desktop' className='sm:flex hidden bg-slate-100 rounded-lg shadow-xl p-4 flex-col gap-3 justify-start border-2 font-poppins'>
                            <li>
                                <button onClick={goToAccount} className='flex flex-row items-center gap-2'>
                                    <Faders size={20} color="#040c1e" className='rotate-90' />
                                    <span>Account</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={handleSignOut} className='flex flex-row items-center gap-2'>
                                    <SignOut size={20} color="#040c1e" />
                                    <a href="">Logout</a>
                                </button>
                            </li>
                        </ul>
                        <div id='mobile' className='sm:hidden absolute right-0 bg-slate-100 rounded-lg shadow-xl p-4 flex flex-col gap-6 justify-start border-[1px] font-poppins text-xl'>
                            <button onClick={goToAccount} className=''>
                                Account
                            </button>
                            <button onClick={handleSignOut} className=''>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>}
            </header >
        </>
    )
}

export default HeaderComponent