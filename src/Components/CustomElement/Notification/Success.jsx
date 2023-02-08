import React, { useEffect, useRef } from 'react'
import { ReactComponent as SuccessIcon } from "../../../SVGs/successIcon.svg"
import { ReactComponent as CrossIcon } from "../../../SVGs/cross.svg"

const Success = ({ displayNotification, message, closeNotification }) => {
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
            <div ref={container} className='relative notification bg-white h-[70px] max-w-[450px] font-body shadow-xl rounded-md lg:w-1/3 md:w-8/12 w-10/12 ml-auto mr-auto'>
                <div className='flex items-center h-full relative'>
                    <div className='w-1/5 flex items-center h-full rounded-l-md bg-green-500 justify-center'>
                        <SuccessIcon className="h-9 w-9 fill-white stroke-[10px]" />
                    </div>
                    <div onClick={hideNotification} className='absolute z-50 right-1 top-1 cursor-pointer'>
                        <CrossIcon className='h-3 w-3 fill-neutral-900' />
                    </div>
                    <div className='relative h-full flex-1'>
                        <div className='ml-2 flex justify-center h-[98%] flex-col'>
                            <h2 className='text-lg leading-5'>Success</h2>
                            <p className='text-[14px] w-11/12 text-stone-500 leading-4'>{message}</p>
                        </div>
                        <div className='h-1 w-full timer before:h-1 before:bg-green-500 bg-transparent rounded-b-lg'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Success