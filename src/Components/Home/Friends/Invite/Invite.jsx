import React from 'react'

const Invite = React.memo(({ numberUnion, name, image }) => {
    return (
        <div className='w-[95%] mx-auto flex item-center bg-neutral-800 rounded-md p-1.5 select-none'>
            <img src={image} className='h-11 w-11 rounded-full' alt="profile image" />
            <div className='ml-1.5'>
                <h2 className='text-white text-[13px] tracking-wide text-body'>{name}</h2>
                <p className='text-xs text-stone-400'>{numberUnion} amis en commun</p>
            </div>
            <div className='flex items-center ml-auto space-x-1.5'>
                <button className='text-sm text-green-500 py-0.5 px-2 rounded-sm
                 border border-green-500 hover:border-green-400 hover:text-green-400 duration-200 delay-75'>Accept</button>
                <button className='text-sm py-1 px-1 rounded-sm
                         hover:bg-transparent hover:underline decoration-red-500 text-red-500 duration-200 delay-75'>Refuse</button>
            </div>
        </div>

    )
})

export default Invite