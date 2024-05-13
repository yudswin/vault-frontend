import { Radio } from '@material-tailwind/react'
import { ArrowLineLeft } from '@phosphor-icons/react'
import React from 'react'

const AddSessionPage = () => {
    return (
        <>
            <div className='flex justify-center items-center h-full w-full flex-col'>
                <div className='animate-fade-in sm:w-[502px] w-full sm:h-[420px] h-full backdrop bg-white bg-opacity-40 rounded sm:p-3 px-6 pt-2  border border-gray-300 shadow-lg'>
                    <form action="#" className='space-y-2 h-full'>
                        <legend className='sm:hidden pt-10 pb-8 text-[28px] text-center font-montserrat text-gray-600 font-bold '>NEW ATTENDANCE</legend>
                        <label htmlFor="quizDetail" className=" block sm:text-2xl text-xl font-montserrat leading-6 text-black">Attendance Detail</label>
                        <div className="mt-2">
                            <textarea id="quizDetail" name="quizDetail" placeholder="Information of the quiz (date, group, section,....)" autoComplete="quizDetail" required className="resize-none block font-palanquin h-36 w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                        </div>
                        {/* Ratio */}
                        <label htmlFor="sessionType" className="block sm:text-2xl text-xl font-montserrat leading-6 text-black pt-2"></label>
                        <div className="grid grid-cols-2 gap-2 w-full">
                            <div >
                                <label className="flex flex-col text-slate-700 has-[:checked]:ring-indigo-200 has-[:checked]:text-indigo-900 has-[:checked]:bg-indigo-50 items-center gap-2 rounded-lg p-4 ring-1 ring-transparent bg-slate-50 hover:bg-slate-100 transform active:scale-90 hover:scale-95 transition-transform ">
                                    <div className='checked:border-indigo-500 text-xl font-montserrat font-semibold uppercase flex flex-row justify-between w-full items-center'>
                                        <div>Normal</div>
                                        <input className="box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding outline-none ring-1 ring-gray-950/10 checked:border-indigo-500 checked:ring-indigo-500" type="radio" id="normal" name="sessionType" value="normal" checked />
                                    </div>
                                    <span className='text-sx font-montserrat'>Do not required any submission </span>
                                </label>
                            </div>
                            <div>
                                <label className='flex flex-col text-slate-700 has-[:checked]:ring-indigo-200 has-[:checked]:text-indigo-900 has-[:checked]:bg-indigo-50 items-center gap-2 rounded-lg p-4 ring-1 ring-transparent bg-slate-50 hover:bg-slate-100 transform active:scale-90 hover:scale-95 transition-transform ' htmlFor="quiz">
                                    <div className='checked:border-indigo-500 text-xl font-montserrat font-semibold uppercase flex flex-row justify-between w-full items-center'>
                                        <span>Quiz</span>
                                        <input className="box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding outline-none ring-1 ring-gray-950/10 checked:border-indigo-500 checked:ring-indigo-500" type="radio" id="quiz" name="sessionType" value="quiz" />
                                    </div>
                                    <span className='text-sx font-montserrat'>Does required file submission </span>


                                </label>
                            </div>
                        </div>
                        <div className="flex justify-center gap-3 pt-3">
                            <button className='sm:block hidden bg-gray-400 hover:bg-gray-600 text-white font-montserrat w-1/2 h-10 tracking-wider rounded-sm items-center transform shadow cursor-pointer'>
                                <div className='flex flex-row justify-center items-center'>
                                    <span>Return</span>
                                </div>
                            </button>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-montserrat  w-1/2 h-10 tracking-wider rounded-sm items-center transform shadow cursor-pointer">
                                <div className='flex flex-row justify-center'>
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

export default AddSessionPage