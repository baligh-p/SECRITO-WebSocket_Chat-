import React from 'react'
import { ReactComponent as SendSuccessIcon } from "../../../SVGs/success.svg"


const OldDiscussion = React.memo(({ name, message, date, image }) => {
    return (
        <div className='flex flex-col items-center font-body w-full hover:bg-indigo-700 duration-200 hover:shadow-lg shadow-black/80 p-2 rounded-lg select-none cursor-pointer'>
            <div className='flex items-center justify-start font-body w-full'>
                <div className='flex items-end flex-none'>
                    <img src={image} className='h-11 w-11 rounded-full' alt="profile image" />
                    <div className='bg-green-500 rounded-full h-3 text-[10px] text-white 
                    py-[1px] px-[4px] flex items-center justify-center min-w-3 relative right-[14px]
                     box-content border-2 border-neutral-900'>2 m</div>
                </div>
                <div className='flex justify-start items-center -ml-2 w-[80%]'>
                    <div className='w-8/12'>
                        <h2 className='text-white text-[14px] font-[600] tracking-wide'>{name}</h2>
                        <p className='text-[13px] whitespace-nowrap text-neutral-300 text-ellipsis overflow-hidden'>{message}</p>
                    </div>
                    <div className='flex self-end items-end space-x-1 ml-2'>
                        <p className='text-white text-[18px]'>.</p>
                        <p className='text-[12px] text-white'>{date}</p>
                    </div>
                    <div className='my-auto ml-auto'>
                        <SendSuccessIcon className='h-[18px] w-[18px] stroke-transparent fill-stone-500 rounded-full' />
                    </div>
                </div>
            </div>
        </div >
    )
})

export default OldDiscussion