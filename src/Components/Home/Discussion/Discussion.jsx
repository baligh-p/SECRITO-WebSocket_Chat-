import React, { useState } from 'react'
import "./Discussion.scss"
import { ReactComponent as MicrophoneIcon } from "../../../SVGs/microphone.svg"
import { ReactComponent as ImageIcon } from "../../../SVGs/image.svg"
const Discussion = () => {

    const [message, setMessage] = useState("")




    //functions 


    return (
        <div className='Discussion h-full flex flex-col w-[48%] box-border relative pt-4 font-body'>
            <div className='flex items-center space-x-1 px-3 h-16'>
                <img src="/assets/images/darius.jpg" className='h-14 w-14 rounded-full' alt="profile image" />
                <h2 className='text-white text-xl'>Baligh Zoghlami</h2>

            </div>
            <div className='middlePart'>

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
                <div onClick={(e) => { e.target.childNodes[0].focus() }} className='flex-1 duration-200 transition-all ml-auto min-h-[25px] py-2 bg-neutral-800 flex items-center cursor-text rounded-2xl'>
                    <p onInput={(e) => { setMessage(e.target.textContent) }} placeholder="Write your funny message"
                        className='text-white ml-3 break-words outline-none overflow-hidden' contentEditable="true"></p>
                </div>
                <svg className='absolute bottom-[13px] right-2 cursor-pointer fill-indigo-600 hover:fill-indigo-500 duration-200' xmlns="http://www.w3.org/2000/svg" width="22pt" height="22pt" viewBox="0 0 64 64" style={{ isolation: "isolate" }}><defs><clipPath id="a"><rect width="64" height="64" /></clipPath></defs><g clipPath="url(#a)"><path d=" M 8.216 36.338 L 26.885 32.604 C 28.552 32.271 28.552 31.729 26.885 31.396 L 8.216 27.662 C 7.104 27.44 6.021 26.356 5.799 25.245 L 2.065 6.576 C 1.731 4.908 2.714 4.133 4.259 4.846 L 61.228 31.139 C 62.257 31.614 62.257 32.386 61.228 32.861 L 4.259 59.154 C 2.714 59.867 1.731 59.092 2.065 57.424 L 5.799 38.755 C 6.021 37.644 7.104 36.56 8.216 36.338 Z " /></g></svg>
            </div>
        </div >
    )
}

export default Discussion