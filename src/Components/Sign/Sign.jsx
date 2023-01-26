import React, { useState, useEffect, useRef } from 'react'
import Loader from '../CustomElement/Loader/Loader'
import axiosInstance from "../../functions/AxiosIntance"
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useCookies } from "react-cookie"
import { useNavigate } from 'react-router-dom'
const clientIDGoogle = "414420068121-tjnbn6jbi62ok10mcukos75l0homidot.apps.googleusercontent.com"

const Sign = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const slider = useRef(null)

    const [conditionsError, setConditionsError] = useState(false)

    const successFunction = (res) => {
        console.log(res)
        //add the user in the base if don't exist and verify token
    }
    const failedFunction = (res) => {
        console.log(res)
    }

    const [isLoading, setIsLoading] = useState(false)

    const [cookie, setCookie] = useCookies()
    const navigate = useNavigate()
    const submit = async (data) => {
        if (!data.conditions) setConditionsError(true)
        else {
            setIsLoading(true)
            setConditionsError(false)
            var res = await axiosInstance.post("/users/register", data)
            console.log(res)
            setIsLoading(false)
        }
    }

    //animate inputs
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
            <div className={`${conditionsError ? "h-11" : "h-0"} flex overflow-hidden items-center duration-150 delay-75 px-1.5 justify-center font-body fixed top-0 w-full z-50 left-0 bg-red-500`}>
                <p className='lg:text-lg text-[13px] text-center text-white'>We couldn’t find an account matching the email
                    and password you entered.<span className='hidden lg:inline-flex'>Please check your email and password and try again.</span></p>
            </div>
            <div className='lg:w-[45%] py-10 w-full min-h-screen flex flex-col bg-white items-center justify-center'>
                <h1 className='lg:text-[40px] text-[35px] mb-1 flex  text-indigo-500 tracking-wider font-title font-bold text-center'>Secrito</h1>
                <p className='text-stone-500 mb-9 text-sm text-center'>log in to buy services, create or join teams.</p>
                <div className='w-full flex items-center flex-col space-y-3 justify-center'>
                    <div className='lg:w-7/12 w-10/12'>
                        {/* <GoogleLogin clientId={clientIDGoogle}
                            render={renderProps => (
                                <GoogleLoginButton clickFunction={renderProps.onClick} disabled={renderProps.disabled} />
                            )}
                            onSuccess={successFunction}
                            onFailure={failedFunction}
                            cookiePolicy={"single_host_origin"}
                            isSignedIn={false}
                        /> */}
                    </div>

                </div>
                <div className='flex items-center space-x-3 lg:w-8/12 w-10/12 my-7'>
                    <div className='bg-stone-300 h-[2px] w-1/2'></div>
                    <p className='text-stone-500 text-sm whitespace-nowrap'>or</p>
                    <div className='bg-stone-300 h-[2px] w-1/2'></div>
                </div>
                <form onSubmit={handleSubmit(submit)} className='lg:w-8/12 w-10/12 flex flex-col space-y-5'>
                    <div className='lg:flex items-start space-y-5 lg:space-y-0 lg:space-x-[2%]'>
                        <div className='flex space-y-1 flex-col lg:w-[49%]'>
                            <label style={{ color: errors.name?.message ? "rgb(239 68 68)" : "" }} onClick={(e) => { e.target.parentNode.children[1].focus() }} className='relative h-0 duration-150 left-2 cursor-text select-none text-stone-700 lg:translate-y-[18px] translate-y-[21px] text-[15px]  lg:text-sm'>Name</label>
                            <input style={{ borderColor: errors.name?.message ? "rgb(239 68 68)" : "" }} name="name" {...register("name", {
                                required: "Name is required",
                            })}
                                onFocus={handleFocus} onBlur={handleBlur} type="text" className="bg-white duration-150 rounded-md outline-none text-[17px]  lg:text-base h-10 px-2 py-[25px] lg:py-[22px] border-2 border-stone-200" />
                            <p className='text-red-500 font-body text-[13px] ml-1'>{errors.name?.message}</p>
                        </div>
                        <div className='flex space-y-1 flex-col lg:w-[49%]'>
                            <label style={{ color: errors.username?.message ? "rgb(239 68 68)" : "" }} onClick={(e) => { e.target.parentNode.children[1].focus() }} className='relative h-0 duration-150 left-2 cursor-text select-none text-stone-700 lg:translate-y-[18px] translate-y-[21px] text-[15px]  lg:text-sm'>Username</label>
                            <input style={{ borderColor: errors.username?.message ? "rgb(239 68 68)" : "" }} name="username" {...register("username", {
                                required: "Username is required",


                            })}
                                onFocus={handleFocus} onBlur={handleBlur} type="text" className="bg-white duration-150 rounded-md outline-none text-[17px]  lg:text-base h-10 px-2 py-[25px] lg:py-[22px] border-2 border-stone-200" />
                            <p className='text-red-500 font-body text-[13px] ml-1'>{errors.username?.message}</p>
                        </div>
                    </div>
                    <div className='flex space-y-1 flex-col w-full'>
                        <label style={{ color: errors.email?.message ? "rgb(239 68 68)" : "" }} onClick={(e) => { e.target.parentNode.children[1].focus() }} className='relative h-0 duration-150 left-2 cursor-text select-none text-stone-700 lg:translate-y-[18px] translate-y-[21px] text-[15px]  lg:text-sm'>Email</label>
                        <input style={{ borderColor: errors.email?.message ? "rgb(239 68 68)" : "" }} name="email" {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Invalid Email"
                            }
                        })}
                            onFocus={handleFocus} onBlur={handleBlur} type="text" className="bg-white duration-150 rounded-md outline-none text-[17px]  lg:text-base h-10 px-2 py-[25px] lg:py-[22px] border-2 border-stone-200" />
                        <p className='text-red-500 text-[13px] font-body ml-1'>{errors.email?.message}</p>
                    </div>
                    <div className='flex space-y-1 flex-col w-full'>
                        <label style={{ color: errors.password?.message ? "rgb(239 68 68)" : "" }} onClick={(e) => { e.target.parentNode.children[1].focus() }} className='relative h-0 duration-150 left-2 cursor-text select-none text-stone-700 lg:translate-y-[18px] translate-y-[21px] text-[15px]  lg:text-sm'>Password</label>
                        <input style={{ borderColor: errors.password?.message ? "rgb(239 68 68)" : "" }} name="password" {...register("password", {
                            required: "Too short password",
                            minLength: {
                                value: 5,
                                message: "Password must have at least 5 characters"
                            }
                        })}
                            onFocus={handleFocus} onBlur={handleBlur} type="password" className="bg-white duration-150 rounded-md outline-none text-[17px]  lg:text-base h-10 px-2 py-[25px] lg:py-[22px] border-2 border-stone-200" />
                        <p className='text-red-500 font-body text-[13px] ml-1'>{errors.password?.message}</p>
                    </div>
                    <div className='flex items-start w-full'>
                        <input {...register("conditions")} name="conditions" type="checkbox" className='mr-2 mt-[2px] form-checkbox text-neutral-900 rounded-sm h-4 w-4' />
                        <label className='select-none text-xs text-neutral-700'>
                            Creating an account means you’re okay with our <Link to="/conditions/terms_service" className='text-pink-600 hover:underline decoration-pink-600 font-semibold'>Terms of Service</Link> and <Link to="/conditions/private_policy" className='text-pink-600 hover:underline decoration-pink-600 font-semibold'>Privacy Policy</Link>.</label>
                    </div>
                    <div className='w-full relative top-4 mb-auto'>
                        <button disabled={isLoading} type='submit' className="h-11 flex items-center justify-center text-lg rounded-md text-white shadow-lg shadow-neutral-300 hover:bg-indigo-600 duration-200 delay-75 w-full bg-indigo-500">
                            {(!isLoading) && (<p>Create account</p>) ||
                                (<Loader height="23px" color="white" size="23px" border="3px" />)}
                        </button>
                    </div>
                    <div className='relative top-6 mx-auto'>
                        <p className='font-body text-neutral-800 text-sm'>Already have an account ?<Link to="/auth/login" className='font-bold text-pink-500 ml-3 hover:underline decoration-pink-500'>Sign in</Link></p>
                    </div>
                </form>

            </div>
            <div className='w-[55%] fixed top-0 right-0 from-indigo-500 via-indigo-500 to-indigo-400/90 bg-gradient-to-tr min-h-screen hidden lg:flex flex-col items-center justify-center'>
                <div ref={slider} className='hideScrollBar scroll-smooth overflow-scroll flex snap-x items-center'>
                    {slides.map((element, index) => {
                        return (
                            <div key={index + 1} className='flex w-full snap-center flex-none flex-col items-center justify-center'>
                                <img src='/assets/icons/login.png' className="h-[290px]" />
                                <h1 className='text-white tracking-wider text-[18px] text-center w-9/12 mt-14'>element {element}</h1>
                            </div>
                        )
                    })}
                </div>
                <div className='flex items-center justify-center space-x-3 relative top-10'>
                    {[1, 2, 3, 4, 5].map((element, index) => {
                        return (
                            <div key={index + 1} onClick={() => { moveSlide(index + 1) }} className='w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center cursor-pointer'>{selectedSlide == index + 1 && <div className='w-1.5 h-1.5 bg-indigo-700 rounded-full'></div>}</div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Sign