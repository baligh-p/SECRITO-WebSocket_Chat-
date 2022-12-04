import React from 'react'
import OldDiscussion from './OldDiscussion'
import "./MessageHistory.scss"

const MessageHistory = () => {
    return (
        <div className='h-full lg:w-[26%] w-full pr-2 pl-0.5 font-body mr-auto flex flex-col'>
            <div className='h-[18%] sticky lg:shadow-none shadow-md shadow-neutral-500 top-0 bg-neutral-900 z-40 flex flex-col'>
                <div className='w-full'>
                    <h1 className='font-title text-pink-500 text-[40px]'>Secrito</h1>
                </div>
                <div className='mt-auto hidden mb-3 ml-2 lg:flex items-center space-x-4'>
                    <div className='cursor-pointer hover:scale-105 bg-pink-500 duration-150 hover:bg-pink-500/90 rounded-full px-2 py-0.5 '>
                        <h3 className='text-rose-800 text-lg w-min'>Chats</h3>
                    </div>
                    <div className='bg-pink-500 hover:bg-pink-500/90 duration-150 rounded-full px-2 py-0.5 cursor-pointer hover:scale-105'>
                        <h3 className='text-rose-800 text-lg w-min '>Communities</h3>
                    </div>
                </div>
            </div>
            <div className='flex flex-col space-y-3 pr-2.5 lg:h-[82%] lg:overflow-y-auto 
            lg:scrollbar-thin lg:scrollbar-track-neutral-800 lg:scrollbar-track-rounded-lg
            scrollbar-thumb-rounded-lg lg:scrollbar-thumb-indigo-600'>
                <OldDiscussion image="/assets/images/darius.jpg" disconnectTime="" date="25 min" name="Baligh zoghlami" message="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " />
                <OldDiscussion image="/assets/images/darius.jpg" disconnectTime="2 m" date="25 min" name="Baligh zoghlami" message="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " />
                <OldDiscussion image="/assets/images/darius.jpg" disconnectTime="2 m" date="25 min" name="Baligh zoghlami" message="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " />
                <OldDiscussion image="/assets/images/darius.jpg" disconnectTime="2 m" date="25 min" name="Baligh zoghlami" message="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " />
                <OldDiscussion image="/assets/images/darius.jpg" disconnectTime="2 m" date="25 min" name="Baligh zoghlami" message="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " />
                <OldDiscussion image="/assets/images/darius.jpg" disconnectTime="2 m" date="25 min" name="Baligh zoghlami" message="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " />
                <OldDiscussion image="/assets/images/darius.jpg" disconnectTime="2 m" date="25 min" name="Baligh zoghlami" message="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " />
                <OldDiscussion image="/assets/images/darius.jpg" disconnectTime="2 m" date="25 min" name="Baligh zoghlami" message="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " />
                <OldDiscussion image="/assets/images/darius.jpg" disconnectTime="2 m" date="25 min" name="Baligh zoghlami" message="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " />
                <OldDiscussion image="/assets/images/darius.jpg" disconnectTime="2 m" date="25 min" name="Baligh zoghlami" message="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " />
                <OldDiscussion image="/assets/images/darius.jpg" disconnectTime="2 m" date="25 min" name="Baligh zoghlami" message="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " />
                <OldDiscussion image="/assets/images/darius.jpg" disconnectTime="2 m" date="25 min" name="Baligh zoghlami" message="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " />
                <OldDiscussion image="/assets/images/darius.jpg" disconnectTime="2 m" date="25 min" name="Baligh zoghlami" message="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " />
                <OldDiscussion image="/assets/images/darius.jpg" disconnectTime="2 m" date="25 min" name="Baligh zoghlami" message="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " />
                <OldDiscussion image="/assets/images/darius.jpg" disconnectTime="2 m" date="25 min" name="Baligh zoghlami" message="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " />
                <OldDiscussion image="/assets/images/darius.jpg" disconnectTime="2 m" date="25 min" name="Baligh zoghlami" message="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " />
            </div>
        </div>
    )
}

export default MessageHistory