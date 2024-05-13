import React from 'react';

const GradientBackground = ({ children }) => {
    return (
        <>
            <div className='z-[-1]'>
                <div className='fixed'>
                    <div className=" fixed bottom-5 left-1/3  transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className=" fixed bottom-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className=" fixed top-1/3 right-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-800 rounded-2xl mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                    <div className=" fixed w-full h-full bg-blue-100 z-[-10]"></div>
                </div>
            </div>
            
            <div className='flex items-center justify-center align-middle h-screen '>
                {children}
            </div>
        </>
    );
}

export default GradientBackground;