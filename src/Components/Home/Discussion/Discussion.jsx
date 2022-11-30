import React, { useState } from 'react'
import "./Discussion.scss"
import { ReactComponent as MicrophoneIcon } from "../../../SVGs/microphone.svg"
import { ReactComponent as ImageIcon } from "../../../SVGs/image.svg"
import { ReactComponent as ReactionIcon } from "../../../SVGs/reaction.svg"
import { ReactComponent as DeleteIcon } from "../../../SVGs/deleteIcon.svg"
import { ReactComponent as ShareIcon } from "../../../SVGs/share.svg"
import { ReactComponent as InfomationIcon } from "../../../SVGs/info.svg"
const Discussion = () => {

    const [message, setMessage] = useState("")




    //functions 


    return (
        <div className='Discussion h-full flex flex-col w-[48%] box-border relative pt-4 font-body'>
            <div className='flex items-center px-3 h-16 w-full'>
                <img src="/assets/images/darius.jpg" className='h-14 w-14 mr-2 rounded-full' alt="profile image" />
                <h2 className='text-white text-xl'>Baligh Zoghlami</h2>
                <div className='ml-auto'>
                    <InfomationIcon className='h-8 w-8 fill-indigo-600 cursor-pointer hover:scale-110 duration-200' />
                </div>


            </div>
            <div className='middlePart py-3 px-6 overflow-y-auto scrollbar-track-neutral-800 scrollbar-track-rounded-lg scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-thumb-rounded '>
                <div className='flex items-center [&>*:nth-child(3)]:hover:flex [&>*:nth-child(3)]:hidden my-4 space-x-2 selection:bg-indigo-500'>
                    <img src="/assets/images/darius.jpg" className='w-8 h-8 rounded-full' alt="profile image of ..." />
                    <div className='p-1.5 bg-neutral-700 rounded-2xl max-w-[70%]'>
                        <p className='text-white text-[14px] break-words'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita, atque?</p>
                    </div>
                    <div className='flex items-center space-x-1 ml-auto mr-3'>
                        <div className='p-1 hover:bg-neutral-700 rounded-full'>
                            <ReactionIcon className='h-6 w-6 fill-indigo-500 cursor-pointer' />
                        </div>
                        <div className='p-1 hover:bg-neutral-700 rounded-full'>
                            <DeleteIcon className='h-6 w-6 fill-indigo-500 cursor-pointer' />
                        </div>
                        <div className='p-1 hover:bg-neutral-700 rounded-full'>
                            <ShareIcon className='h-5 w-5 fill-indigo-500 cursor-pointer' />
                        </div>
                    </div>
                </div>
                <div className='flex items-center [&>*:nth-child(even)]:hover:ml-0 [&>*:nth-child(odd)]:hover:flex [&>*:nth-child(odd)]:hidden my-4 w-full selection:text-indigo-500 selection:bg-white'>
                    <div className='items-center space-x-1 ml-auto mr-3'>
                        <div className='p-1 hover:bg-neutral-700 rounded-full'>
                            <ShareIcon className='h-5 w-5 fill-indigo-500 cursor-pointer' />
                        </div>
                        <div className='p-1 hover:bg-neutral-700 rounded-full'>
                            <DeleteIcon className='h-6 w-6 fill-indigo-500 cursor-pointer' />
                        </div>
                        <div className='p-1 hover:bg-neutral-700 rounded-full'>
                            <ReactionIcon className='h-6 w-6 fill-indigo-500 cursor-pointer' />
                        </div>
                    </div>
                    <div className='p-1.5 ml-auto bg-indigo-700 rounded-2xl max-w-[70%]'>
                        <p className='text-white text-[14px] break-words'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus porro beatae delectus voluptas iure earum quaerat rerum dolorem assumenda exercitationem dolore iusto aperiam, nihil ab est impedit perspiciatis culpa.</p>
                    </div>
                </div>
                <div className='w-full flex items-center justify-center my-6'>
                    <p className='text-white'>19:15</p>
                </div>

            </div>
            <div className='w-full flex items-end justify-center mt-auto mb-2'>
                {(!message.length) && (<div className='flex items-center justify-around px-4 w-2/12 my-auto'>
                    <div className='cursor-pointer hover:first:fill-indigo-500 hover:scale-110 first:fill-indigo-600 duration-200'>
                        <MicrophoneIcon className='h-6 w-6' />
                    </div>
                    <div className='cursor-pointer hover:fill-indigo-500 hover:scale-110 fill-indigo-600 duration-200'>
                        <ImageIcon className='h-7 w-7' />
                    </div>
                </div>)}
                <div onClick={(e) => { e.target.childNodes[0].focus() }} className='flex-1 duration-200 transition-all ml-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-thumb-rounded-lg scrollbar-track-neutral-600 scrollbar-track-rounded-lg min-h-[25px] overflow-y-auto py-2 bg-neutral-800 flex items-center cursor-text rounded-2xl'>
                    <p onInput={(e) => { setMessage(e.target.textContent) }} placeholder="Write your funny message"
                        className='text-white ml-3 break-words outline-none max-h-[80vh]' contentEditable="true"></p>
                </div>
                <svg className='absolute bottom-[13px] right-2 cursor-pointer fill-indigo-600 hover:fill-indigo-500 duration-200' xmlns="http://www.w3.org/2000/svg" width="22pt" height="22pt" viewBox="0 0 64 64" style={{ isolation: "isolate" }}><defs><clipPath id="a"><rect width="64" height="64" /></clipPath></defs><g clipPath="url(#a)"><path d=" M 8.216 36.338 L 26.885 32.604 C 28.552 32.271 28.552 31.729 26.885 31.396 L 8.216 27.662 C 7.104 27.44 6.021 26.356 5.799 25.245 L 2.065 6.576 C 1.731 4.908 2.714 4.133 4.259 4.846 L 61.228 31.139 C 62.257 31.614 62.257 32.386 61.228 32.861 L 4.259 59.154 C 2.714 59.867 1.731 59.092 2.065 57.424 L 5.799 38.755 C 6.021 37.644 7.104 36.56 8.216 36.338 Z " /></g></svg>
            </div>
        </div >
    )
}

export default Discussion