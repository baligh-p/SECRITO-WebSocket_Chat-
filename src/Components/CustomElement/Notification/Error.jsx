import React, { useRef, useEffect } from 'react'
import { ReactComponent as ErrorIcon } from "../../../SVGs/errorIcon.svg"
import "./Notification.scss"

const Error = ({ displayNotification, message, closeNotification }) => {


    const container = useRef(null)

    useEffect(() => {
        if (!displayNotification) {
            container.current.style.transform = "translateY(-140%)"
        }
    }, [displayNotification])


    const hideNotification = () => {
        container.current.style.transform = "translateY(-140%)"
        setTimeout(() => {
            closeNotification()
        }, 800)
    }
    return (
        <div className='notificationContainer h-screen w-full z-50 bg-transparent fixed inset-0 flex justify-center'>
            <div ref={container} className='notification max-w-[350px] font-body flex flex-col items-center shadow-xl rounded-md lg:w-1/3 md:w-8/12 w-10/12 ml-auto mr-auto'>
                <div className='bg-red-500 rounded-t-md min-h-[200px] w-full h-3/5 py-3 flex flex-col items-center justify-center'>
                    <ErrorIcon className='h-9 w-9 lg:w-14 lg:h-14 mb-2' />
                    <h3 className='font-bold text-xl text-white tracking-wide mb-4'>Oh, It's an Error</h3>
                    <p className='text-stone-100 w-11/12 text-sm ml-2 text-center'>{message || ""}</p>
                </div>
                <div className='w-full rounded-b-md hover:bg-stone-100 flex items-center bg-white'>
                    <button onClick={hideNotification} className='w-full h-10 text-red-500'>Okay</button>
                </div>
                <div className='h-1 w-full timer before:h-1 before:bg-red-600 bg-transparent rounded-b-lg'></div>
            </div>
        </div>
    )
}

export default Error