import React from 'react'
import { Outlet } from 'react-router-dom'
import { ReactComponent as MessagesIcon } from "../../SVGs/mute.svg"
const Nav = () => {
    return (
        <React.Fragment>
            <div className='fixed flex items-center justify-evenly lg:hidden bottom-0 h-14 z-50 w-full bg-indigo-600'>
                <div className='flex flex-col items-center'>
                    <MessagesIcon className='h-7 w-7 fill-white' />
                    <p className='text-white tracking- text-xs'>Disscussion</p>
                </div>
                <div className='flex flex-col items-center'>
                    <MessagesIcon className='h-7 w-7 fill-white' />
                    <p className='text-white tracking- text-xs'>Disscussion</p>
                </div>
                <div className='flex flex-col items-center'>
                    <MessagesIcon className='h-7 w-7 fill-white' />
                    <p className='text-white tracking- text-xs'>Disscussion</p>
                </div>
            </div>
            <Outlet></Outlet>
        </React.Fragment>
    )
}

export default Nav