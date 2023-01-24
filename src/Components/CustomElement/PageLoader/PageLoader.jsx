import React from 'react'
import "./PageLoader.scss"
const PageLoader = ({ finish }) => {

    return (
        <div className='bg-white h-screen w-full relative bottom-10 items-center justify-center flex pageLoaderContainer'>
            <div className='w-min'>
                <h1 className='font-title text-pink-500 text-[65px]'>Secrito</h1>
            </div>
            <div style={{ width: finish ? "200vw" : "0", height: finish ? "200vw" : "0" }} className='fixed duration-1000 rounded-full bg-neutral-900'></div>
        </div>
    )
}

export default PageLoader