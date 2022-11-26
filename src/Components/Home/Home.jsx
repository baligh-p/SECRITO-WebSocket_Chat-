import React from 'react'
import MessageHistory from './MessageHistory/MessageHistory'
import Discussion from "./Discussion/Discussion"
import Friends from "./Friends/Friends"
import "./Home.scss"

const Home = () => {
    return (
        <div className='homeContainer flex items-center bg-neutral-900'>
            <MessageHistory />
            <Discussion />
            <Friends />
        </div>
    )
}

export default Home