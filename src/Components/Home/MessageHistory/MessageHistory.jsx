import React from 'react'
import OldDiscussion from './OldDiscussion'
import "./MessageHistory.scss"

const MessageHistory = () => {
    return (
        <div className='h-full w-[26%] pr-2 pl-0.5 mr-auto flex flex-col'>
            <div className='h-[13%]'>
                <div className='w-full p-2'>
                    <h1 className='font-title text-pink-500 text-4xl'>Logo</h1>
                </div>
            </div>
            <div className='flex flex-col space-y-3 h-[87%]'>
                <OldDiscussion image="/assets/images/darius.jpg" date="25 min" name="Baligh zoghlami" message="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " />
                <OldDiscussion image="/assets/images/darius.jpg" date="25 min" name="Baligh zoghlami" message="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " />
                <OldDiscussion image="/assets/images/darius.jpg" date="25 min" name="Baligh zoghlami" message="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " />
                <OldDiscussion image="/assets/images/darius.jpg" date="25 min" name="Baligh zoghlami" message="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " />
            </div>
        </div>
    )
}

export default MessageHistory