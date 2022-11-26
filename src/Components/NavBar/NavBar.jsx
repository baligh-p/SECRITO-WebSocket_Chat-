import React, { useState, useRef, useEffect } from 'react'
import { Link } from "react-router-dom"
import "./NavBar.scss"


const NavBar = () => {


    //refs 
    const slideCategories = useRef(null)

    const searchInput = useRef(null)

    //states
    const [intervalMovingCategories, setIntervalMovingCategories] = useState(null)

    //slider functions
    //--right
    const executeMovingRight = () => {
        slideCategories.current.scrollLeft += 1
    }
    const moveRight = () => {
        const interval = setInterval(executeMovingRight, 5)
        setIntervalMovingCategories(interval)
    }
    const stopMovingRight = () => {
        clearInterval(intervalMovingCategories)
    }
    //--left
    const executeMovingLeft = () => {
        slideCategories.current.scrollLeft -= 1
    }
    const moveLeft = () => {
        const interval = setInterval(executeMovingLeft, 5)
        setIntervalMovingCategories(interval)
    }
    const stopMovingLeft = () => {
        clearInterval(intervalMovingCategories)
    }


    return (
        <div className='fixed  top-0 left-0 w-full'>
            <div className='flex items-center w-full h-[80px] bg-white'>
                <div className='w-1/6 flex items-center justify-center'>
                    <h1 className='text-[26px] tracking-widest font-title font-bold text-indigo-600'>Team Lancers</h1>
                </div>
                <div className='w-2/6 flex items-center'>
                    <input type="text" className="border focus:border-neutral-600 delay-75 focus:border-2 focus:border-r-0 text-[18px] font-body rounded-l-md border-r-0 focus:outline-none border-neutral-300 h-11 px-4 w-full" placeholder='search' />
                    <div className='w-14 h-11 flex hover:bg-neutral-900 cursor-pointer rounded-r-md items-center justify-center bg-neutral-800'>
                        <svg className='fill-white' xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                            <path d="m19.6 21-6.3-6.3q-.75.6-1.725.95Q10.6 16 9.5 16q-2.725 0-4.612-1.887Q3 12.225 3 9.5q0-2.725 1.888-4.613Q6.775 3 9.5 3t4.613 1.887Q16 6.775 16 9.5q0 1.1-.35 2.075-.35.975-.95 1.725l6.3 6.3ZM9.5 14q1.875 0 3.188-1.312Q14 11.375 14 9.5q0-1.875-1.312-3.188Q11.375 5 9.5 5 7.625 5 6.312 6.312 5 7.625 5 9.5q0 1.875 1.312 3.188Q7.625 14 9.5 14Z" />
                        </svg>
                    </div>
                </div>
                <div className='w-2/6 flex items-center font-[700] justify-center space-x-12 font-body text-neutral-700/90 text-[16px]'>
                    <Link className='NavBarLinkAnimateUnderline hover:text-indigo-500 delay-75 duration-200' to="/services">Services</Link>
                    <Link className='NavBarLinkAnimateUnderline hover:text-indigo-500 delay-75 duration-200' to="/chat_with_teams">Chat with teams</Link>
                </div>
                <div className='w-1/6 font-body flex items-center font-[800] justify-start space-x-7 flex-nowrap'>
                    <Link to="/auth/login" className='text-indigo-500 tracking-widest hover:underline decoration-indigo-500'>Login</Link>
                    <Link to="/auth/sign_up" className='px-6 py-2.5 border-2 border-indigo-500 duration-200 delay-75 bg-indigo-500 rounded-sm
                 text-white hover:bg-white hover:text-indigo-500'>Sign up</Link>
                </div>
            </div>
            <div className='w-full flex justify-start items-center font-[500] border-y border-stone-200'>
                <div id="movingLeftIcon" onMouseEnter={moveLeft} onMouseLeave={stopMovingLeft} className='absolute z-10 left-0.5 cursor-pointer opacity-30 hover:opacity-75'>
                    <img src="/assets/icons/left-arrow.png" className='h-6 w-6' />
                </div>
                <div ref={slideCategories} className='w-full h-10 flex items-center bg-white text-gray-500 overflow-x-auto hideScroll'>
                    <div className='px-4 border-b-[4px] border-b-transparent hover:border-b-indigo-500 cursor-pointer delay-75
                     h-full flex items-center justify-center'>
                        <h2 className='relative top-[2px]'>Informatique</h2>
                    </div>
                    <div className='px-4 border-b-[4px] border-b-transparent hover:border-b-indigo-500 cursor-pointer delay-75
                     h-full flex items-center justify-center'>
                        <h2 className='relative top-[2px]'>Informatique</h2>
                    </div>
                    <div className='px-4 border-b-[4px] border-b-transparent hover:border-b-indigo-500 cursor-pointer delay-75
                     h-full flex items-center justify-center'>
                        <h2 className='relative top-[2px]'>Informatique</h2>
                    </div>
                    <div className='px-4 border-b-[4px] border-b-transparent hover:border-b-indigo-500 cursor-pointer delay-75
                     h-full flex items-center justify-center'>
                        <h2 className='relative top-[2px]'>Informatique</h2>
                    </div>
                    <div className='px-4 border-b-[4px] border-b-transparent hover:border-b-indigo-500 cursor-pointer delay-75
                     h-full flex items-center justify-center'>
                        <h2 className='relative top-[2px]'>Informatique</h2>
                    </div>
                    <div className='px-4 border-b-[4px] border-b-transparent hover:border-b-indigo-500 cursor-pointer delay-75
                     h-full flex items-center justify-center'>
                        <h2 className='relative top-[2px]'>Informatique</h2>
                    </div>
                    <div className='px-4 border-b-[4px] border-b-transparent hover:border-b-indigo-500 cursor-pointer delay-75
                     h-full flex items-center justify-center'>
                        <h2 className='relative top-[2px]'>Informatique</h2>
                    </div>
                    <div className='px-4 border-b-[4px] border-b-transparent hover:border-b-indigo-500 cursor-pointer delay-75
                     h-full flex items-center justify-center'>
                        <h2 className='relative top-[2px]'>Informatique</h2>
                    </div>
                    <div className='px-4 border-b-[4px] border-b-transparent hover:border-b-indigo-500 cursor-pointer delay-75
                     h-full flex items-center justify-center'>
                        <h2 className='relative top-[2px]'>Informatique</h2>
                    </div>
                    <div className='px-4 border-b-[4px] border-b-transparent hover:border-b-indigo-500 cursor-pointer delay-75
                     h-full flex items-center justify-center'>
                        <h2 className='relative top-[2px]'>Informatique</h2>
                    </div>
                    <div className='px-4 border-b-[4px] border-b-transparent hover:border-b-indigo-500 cursor-pointer delay-75
                     h-full flex items-center justify-center'>
                        <h2 className='relative top-[2px]'>Informatique</h2>
                    </div>
                    <div className='px-4 border-b-[4px] border-b-transparent hover:border-b-indigo-500 cursor-pointer delay-75
                     h-full flex items-center justify-center'>
                        <h2 className='relative top-[2px]'>Informatique</h2>
                    </div>
                    <div className='px-4 border-b-[4px] border-b-transparent hover:border-b-indigo-500 cursor-pointer delay-75
                     h-full flex items-center justify-center'>
                        <h2 className='relative top-[2px]'>Informatique</h2>
                    </div>
                    <div className='px-4 border-b-[4px] border-b-transparent hover:border-b-indigo-500 cursor-pointer delay-75
                     h-full flex items-center justify-center'>
                        <h2 className='relative top-[2px]'>Informatique</h2>
                    </div>
                    <div className='px-4 border-b-[4px] border-b-transparent hover:border-b-indigo-500 cursor-pointer delay-75
                     h-full flex items-center justify-center'>
                        <h2 className='relative top-[2px]'>Informatique</h2>
                    </div>
                    <div className='px-4 border-b-[4px] border-b-transparent hover:border-b-indigo-500 cursor-pointer delay-75
                     h-full flex items-center justify-center'>
                        <h2 className='relative top-[2px]'>Informatique</h2>
                    </div>
                    <div className='px-4 border-b-[4px] border-b-transparent hover:border-b-indigo-500 cursor-pointer delay-75
                     h-full flex items-center justify-center'>
                        <h2 className='relative top-[2px]'>Informatique</h2>
                    </div>
                    <div className='px-4 border-b-[4px] border-b-transparent hover:border-b-indigo-500 cursor-pointer delay-75
                     h-full flex items-center justify-center'>
                        <h2 className='relative top-[2px]'>Informatique</h2>
                    </div>


                </div>
                <div onMouseEnter={moveRight} onMouseLeave={stopMovingRight} className='absolute right-0.5 opacity-30 cursor-pointer hover:opacity-75'>
                    <img src="/assets/icons/right-arrow.png" className='h-6 w-6' />
                </div>
            </div>
        </div >
    )
}

export default NavBar