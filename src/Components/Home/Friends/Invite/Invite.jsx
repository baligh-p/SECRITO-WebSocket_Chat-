import React from 'react'

const Invite = React.memo(({ numberUnion, name, image }) => {
    return (
        <div className='w-full flex item-center bg-neutral-800 rounded-md p-1.5 select-none'>
            <img src={image} className='h-12 w-12 rounded-full' alt="profile image" />
            <div className='ml-1.5'>
                <h2 className='text-white text-sm tracking-wide text-body'>{name}</h2>
                <p className='text-xs text-stone-400'>{numberUnion} amis en commun</p>
            </div>
            <div className='flex items-center ml-auto space-x-1.5'>
                <button className='text-sm text-green-900 py-1 px-2.5 rounded-sm bg-green-500
                         hover:bg-transparent hover:text-green-500 border border-green-500 duration-200 delay-75'>Accept</button>
                <button className='text-sm text-red-900 py-1 px-2.5 rounded-sm bg-red-500
                         hover:bg-transparent hover:text-red-500 border border-red-500 duration-200 delay-75'>Refuse</button>
            </div>
        </div>

    )
})

export default Invite