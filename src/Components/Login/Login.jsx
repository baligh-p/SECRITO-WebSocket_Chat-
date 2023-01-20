import React, { useState, useEffect, useRef } from 'react'
import { GoogleLogin, } from "react-google-login"
import { Link } from 'react-router-dom'
import GoogleLoginButton from './GoogleLoginButton'

import "./Login.scss"

const clientIDGoogle = "414420068121-tjnbn6jbi62ok10mcukos75l0homidot.apps.googleusercontent.com"

const Login = () => {
    const email = useRef(null)
    const password = useRef(null)

    const slider = useRef(null)

    const successFunction = (res) => {
        console.log(res)
    }
    const failedFunction = (res) => {
        console.log(res)
    }


    const handleFocus = (e) => {
        const input = e.target
        if (input.value == "") {
            const label = input.parentNode.children[0]
            label.style.left = ""
            label.style.transform = "translateY(3px)"
            label.style.fontSize = "12px"
            input.classList.replace("border-stone-200", "border-indigo-500")
            label.classList.replace("text-stone-700", "text-indigo-600")
        }
    }
    const handleBlur = (e) => {
        const input = e.target
        const label = input.parentNode.children[0]
        if (input.value == "") {
            label.style.left = ""
            label.style.transform = ""
            label.style.fontSize = ""
            input.classList.replace("border-indigo-500", "border-stone-200")
            label.classList.replace("text-indigo-600", "text-stone-700")
        }
    }

    const [selectedSlide, setSelectedSlide] = useState(1)

    const slides = [1, 2, 3, 4, 5]
    const moveSlide = (autoMove = null) => {
        if (autoMove != null) {
            setSelectedSlide(autoMove)
            slider.current.scrollLeft = (autoMove - 1) * (slider.current.scrollWidth / slides.length)
        }
        else {
            selectedSlide == slides.length ? setSelectedSlide(() => {
                slider.current.scrollLeft = 0
                return 1
            }) : setSelectedSlide(() => {
                slider.current.scrollLeft = (selectedSlide) * (slider.current.scrollWidth / slides.length);
                return selectedSlide + 1
            })
        }
    }

    useEffect(() => {


        const time = setInterval(moveSlide, 6000)

        return () => {
            clearInterval(time)
        }

    }, [selectedSlide])


    return (
        <div className='flex w-full'>
            <div className='lg:w-[45%] py-10 w-full min-h-screen flex flex-col bg-white items-center lg:justify-center'>
                <h1 className='lg:text-[33px] text-[35px] mb-1 hidden lg:flex text-neutral-900 tracking-wider font-bold text-center'>Login</h1>
                <h1 className='lg:text-[33px] text-[35px] mb-1 lg:hidden flex  text-indigo-600 tracking-wider font-title font-bold text-center'><span className='mr-2'>Team</span>Lancers</h1>
                <p className='text-stone-500 mb-9 text-sm text-center'>log in to buy services, create or join teams.</p>
                <div className='w-full flex items-center flex-col space-y-3 justify-center'>
                    <div className='lg:w-7/12 w-10/12'>
                        <GoogleLogin clientId={clientIDGoogle}
                            render={renderProps => (
                                <GoogleLoginButton clickFunction={renderProps.onClick} disabled={renderProps.disabled} />
                            )}
                            onSuccess={successFunction}
                            onFailure={failedFunction}
                            cookiePolicy={"single_host_origin"}
                            isSignedIn={false}
                        />
                    </div>

                </div>
                <div className='flex items-center space-x-3 lg:w-7/12 w-10/12 my-10'>
                    <div className='bg-stone-300 h-[2px] w-1/2'></div>
                    <p className='text-stone-500 text-sm whitespace-nowrap'>or</p>
                    <div className='bg-stone-300 h-[2px] w-1/2'></div>
                </div>
                <div className='lg:w-7/12 w-10/12 flex flex-col space-y-5'>
                    <div className='flex space-y-1 flex-col w-full'>
                        <label onClick={(e) => { e.target.parentNode.children[1].focus() }} className='relative h-0 duration-150 left-2 cursor-text select-none text-stone-700 lg:translate-y-[18px] translate-y-[21px] text-[15px]  lg:text-sm'>Email</label>
                        <input onFocus={handleFocus} onBlur={handleBlur} type="text" className="bg-white duration-150 rounded-md outline-none text-[17px]  lg:text-base h-10 px-2 py-[25px] lg:py-[22px] border-2 border-stone-200" />
                    </div>
                    <div className='flex space-y-1 flex-col w-full'>
                        <label onClick={(e) => { e.target.parentNode.children[1].focus() }} className='relative h-0 duration-150 left-2 cursor-text select-none text-stone-700 lg:translate-y-[18px] translate-y-[21px] text-[15px]  lg:text-sm'>Password</label>
                        <input onFocus={handleFocus} onBlur={handleBlur} type="password" className="bg-white duration-150 rounded-md outline-none text-[17px]  lg:text-base h-10 px-2 py-[25px] lg:py-[22px] border-2 border-stone-200" />
                    </div>
                    <div className='flex items-center w-full'>
                        <input type="checkbox" className='mr-2 form-checkbox text-indigo-600 rounded-sm h-4 w-4' />
                        <label onClick={(e) => { e.target.parentNode.children[0].checked = !e.target.parentNode.children[0].checked }} className='select-none cursor-pointer text-sm text-neutral-700'>Remember Informations</label>
                        <Link to="/auth/forget_password" className='text-indigo-600 hover:text-indigo-700 underline decoration-indigo-600 text-sm ml-auto'>Forget Password?</Link>
                    </div>
                </div>
                <div className='lg:w-7/12 w-10/12 mt-16 mb-auto'>
                    <button className='py-2 text-lg rounded-md text-white shadow-lg shadow-neutral-300 hover:bg-indigo-600 duration-200 delay-75 w-full bg-indigo-500'>Login</button>
                </div>

            </div>
            <div className='w-[55%] bg-indigo-500 min-h-screen hidden lg:flex flex-col items-center justify-center'>
                <Link to="/" className='self-start justify-self-start absolute top-7 ml-12 text-[30px] font-extrabold font-title tracking-widest text-white hover:text-indigo-100 duration-200 delay-75'>Secrito</Link>
                <div ref={slider} className='hideScrollBar scroll-smooth overflow-scroll flex snap-x items-center'>
                    {slides.map((element, index) => {
                        if (index == slides.length - 1) {
                            console.log(slides.push(slides[0], slides[1], slides[2], slides[3]))
                        }
                        return (
                            <div key={index} className='flex w-full snap-center flex-none flex-col items-center justify-center'>
                                <img src='/assets/icons/login.png' className='h-[290px]' />
                                <h1 className='text-white tracking-wider text-[18px] text-center w-9/12 mt-14'>element {element}</h1>
                            </div>
                        )
                    })}
                </div>
                <div className='flex items-center justify-center space-x-3 relative top-10'>
                    {[1, 2, 3, 4, 5].map((element, index) => {
                        return (
                            <div key={index} onClick={() => { moveSlide(index) }} className='w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center cursor-pointer'>{selectedSlide == index && <div className='w-1.5 h-1.5 bg-indigo-700 rounded-full'></div>}</div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Login    