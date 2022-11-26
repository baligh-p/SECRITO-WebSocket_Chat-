import React from 'react'
import "./Friends.scss"
import Invite from './Invite/Invite'
const Friends = () => {

    return (
        <div className='friendsContainer w-[26%] h-full ml-auto px-1.5 pb-3 border-l-2 border-neutral-700'>
            <div className='flex items-center h-[10%] justify-between'>
                <h2 className='font-bold text-xl font-body tracking-wide text-indigo-500'>Friends</h2>
                <img src="/assets/icons/search.png" className='h-6 w-6 cursor-pointer hover:scale-110 duration-150' alt="search icon profile" />
            </div>
            <div className='invitesContainer max-h-[37%] w-full overflow-y-auto space-y-3'>
                <Invite numberUnion="3" name="Baligh ZOGHLAMI" image="./assets/images/darius.jpg" />
                <Invite numberUnion="3" name="Baligh ZOGHLAMI" image="./assets/images/darius.jpg" />
                <Invite numberUnion="3" name="Baligh ZOGHLAMI" image="./assets/images/darius.jpg" />
                <Invite numberUnion="3" name="Baligh ZOGHLAMI" image="./assets/images/darius.jpg" />
                <Invite numberUnion="3" name="Baligh ZOGHLAMI" image="./assets/images/darius.jpg" />
            </div>
            <div className='friendListContainer w-full max-h-[52%] mt-3 space-y-2 text-body overflow-y-auto'>
                <div className='hover:bg-neutral-800 element flex items-center duration-150 p-1 rounded-md cursor-pointer'>
                    <div className='flex items-end relative'>
                        <img src="/assets/images/darius.jpg" className='h-11 w-11 rounded-full' alt="profile image" />
                        <div className='bg-green-500 rounded-full h-3 w-3 relative right-[14px] box-content border-[3px] border-neutral-900'></div>
                    </div>
                    <div>
                        <h5 className='text-white -ml-2 duration-150 relative'>Baligh Zoghlami</h5>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default Friends