import React, { useState, useRef, useEffect } from 'react'
import "./Friends.scss"
import Invite from './Invite/Invite'
const Friends = () => {
    //States
    const [isSearching, setIsSearching] = useState(false)
    //Refs 
    const searchInput = useRef()
    //effects
    useEffect(() => {
        if (isSearching) {
            searchInput.current.focus()
        }
    }, [isSearching])
    //methods 
    const hideSearch = () => {
        setIsSearching(false)
        searchInput.current.value = ""
    }
    return (
        <div className='friendsContainer w-[26%] h-full ml-auto px-1.5 pb-3'>
            <div className='invitesContainer max-h-[33%] w-full overflow-y-auto space-y-3'>
                <Invite numberUnion="3" name="Baligh ZOGHLAMI" image="./assets/images/darius.jpg" />
                <Invite numberUnion="3" name="Baligh ZOGHLAMI" image="./assets/images/darius.jpg" />
                <Invite numberUnion="3" name="Baligh ZOGHLAMI" image="./assets/images/darius.jpg" />
                <Invite numberUnion="3" name="Baligh ZOGHLAMI" image="./assets/images/darius.jpg" />
                <Invite numberUnion="3" name="Baligh ZOGHLAMI" image="./assets/images/darius.jpg" />
            </div>
            <div className='flex items-center h-[10%] relative'>
                <h2 className="font-bold text-xl font-body absolute tracking-wide text-indigo-500">Friends</h2>
                {(!isSearching) && (<svg onClick={() => { setIsSearching(() => !isSearching) }} className='absolute z-20 right-0 fill-stone-200 h-10 w-10 cursor-pointer hover:scale-110 duration-150' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 101">
                    <path d="M63.3 59.9c3.8-4.6 6.2-10.5 6.2-17 0-14.6-11.9-26.5-26.5-26.5S16.5
                 28.3 16.5 42.9 28.4 69.4 43 69.4c6.4 0 12.4-2.3 17-6.2l20.6 20.6c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4L63.3 59.9zm-20.4
                  4.7c-12 0-21.7-9.7-21.7-21.7s9.7-21.7 21.7-21.7 21.7 9.7 21.7 21.7-9.7 21.7-21.7 21.7z" />
                </svg>)}
                {(isSearching) && (<svg onClick={hideSearch} xmlns="http://www.w3.org/2000/svg" className='absolute z-20 mr-2 right-0 fill-stone-200 h-5 w-5 cursor-pointer hover:scale-110 duration-150' enablBackground="new 0 0 32 32" viewBox="0 0 32 32"><path d="M31.5,2.42828c0-0.51752-0.20148-1.00427-0.56763-1.36987c-0.73224-0.73224-2.00751-0.73224-2.73975,0L16,13.25104L3.80737,1.05841c-0.73224-0.73224-2.00751-0.73224-2.73975,0C0.70154,1.42401,0.5,1.91077,0.5,2.42828c0,0.51746,0.20154,1.00421,0.56763,1.36987l12.19263,12.19263L1.06763,28.18341C0.70154,28.54901,0.5,29.03577,0.5,29.55328c0,0.51746,0.20154,1.00421,0.56763,1.36987c0.73224,0.73224,2.00751,0.73224,2.73975,0L16,18.73053l12.19263,12.19263c0.36615,0.36609,0.85242,0.56763,1.36987,0.56763c0.51752,0,1.00378-0.20154,1.36987-0.56763C31.29852,30.5575,31.5,30.07074,31.5,29.55328c0-0.51752-0.20148-1.00427-0.56763-1.36987L18.73975,15.99078L30.93237,3.79816C31.29852,3.4325,31.5,2.94574,31.5,2.42828z" /></svg>)}
                <input ref={searchInput} onBlur={() => { if (!searchInput.current.value.length) setIsSearching(false) }} type="text"
                    className={`${isSearching ? "w-full px-2 border" : "w-0"} ml-auto duration-200 z-10 h-11 bg-neutral-900 outline-none text-white border-white rounded-md`} />
            </div>
            <div className='friendListContaine w-full max-h-[55%] mt-3 space-y-2 text-body overflow-y-auto'>
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