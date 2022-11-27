import React from 'react'
import { Outlet } from 'react-router-dom'

const Nav = () => {
    return (
        <React.Fragment>
            <div className='flex items-center bg-neutral-900 justify-between h-[65px]'>
                <h1 className='text-4xl ml-5 tracking-widest text-white'>title</h1>
                <img src="./assets/images/darius.jpg" className='rounded-full w-[50px] h-[50px] mr-5'></img>
            </div>
            <Outlet />
        </React.Fragment>
    )
}

export default Nav