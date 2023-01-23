import React from 'react'
import MessageHistory from './MessageHistory/MessageHistory'
import Discussion from "./Discussion/Discussion"
import Friends from "./Friends/Friends"
const Home = () => {
    return (
        <div className='lg:h-screen min-h-screen flex w-full items-center bg-neutral-900'>
            <MessageHistory />
            <Discussion />
            <Friends />
        </div>
    )
}

export default Home