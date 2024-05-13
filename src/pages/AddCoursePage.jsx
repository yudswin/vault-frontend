import { ArrowLineLeft } from '@phosphor-icons/react'
import React from 'react'

const AddCoursePage = () => {
    return (
        <>
            <div className='flex justify-center items-center h-full w-full flex-col'>
                <div className='animate-fade-in sm:w-[502px] w-full sm:h-[360px] h-full backdrop bg-white bg-opacity-40 rounded sm:p-3 px-6 pt-2  border border-gray-300 shadow-lg'>
                    <form action="#" className='space-y-2 h-full'>
                        <legend className='sm:hidden pt-10 pb-8 text-[28px] text-center font-montserrat text-gray-600 font-bold '>CREATE NEW CLASS</legend>
                        <label htmlFor="courseName" className="block sm:text-2xl text-xl font-montserrat leading-6 text-black">Class Name</label>
                        <div className="mt-2">
                            <input id="courseName" name="courseName" placeholder='Name of the class' type="courseName" autoComplete="courseName" required className="font-palanquin block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <label htmlFor="classInfo" className=" block sm:text-2xl text-xl font-montserrat leading-6 text-black">Description</label>
                        <div className="mt-2">
                            <textarea id="classInfo" name="classInfo" placeholder="Information of the class (date, group, section,....)" autoComplete="classInfo" required className="resize-none block font-palanquin h-36 w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                        </div>
                        <div className="flex justify-center gap-3 pt-3">
                            <button className='sm:block hidden bg-gray-400 hover:bg-gray-600 text-white font-montserrat w-1/2 h-10 tracking-wider rounded-sm items-center transform shadow cursor-pointer'>
                                <div className='flex flex-row justify-center items-center'>
                                    <span>Return</span>
                                </div>
                            </button>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-montserrat  w-1/2 h-10 tracking-wider rounded-sm items-center transform shadow cursor-pointer">
                                <div className='flex flex-row justify-center'>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg> */}
                                    <span className=''>Create</span>
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
                <footer className='sm:hidden h-20 bg-white w-full flex items-center pl-5 hover:text-gray-100'>
                    <button className='flex items-center justify-center'>
                        <ArrowLineLeft size={16} color="#6b7280" weight="bold" onMouseOver={() => setColor("#fff")} />
                        <span className='uppercase pl-2 text-gray-500 text-sm font-montserrat font-bold hover:text-gray-600'>
                            Return to Dashboard
                        </span>
                    </button>
                </footer>
            </div>
        </>
    )
}

export default AddCoursePage
