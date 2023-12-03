import React from 'react'
import MessageHistory from './MessageHistory/MessageHistory'
import Discussion from "./Discussion/Discussion"
import Friends from "./Friends/Friends"
const Home = ({ socket }) => {
    return (
        <div className='lg:h-screen min-h-screen flex w-full items-center bg-neutral-900'>
            <MessageHistory />
            <Discussion socket={socket} />
            <Friends socket={socket} />
        </div>
    )
}

export default Home