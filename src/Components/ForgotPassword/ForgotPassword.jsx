import React, { useState } from 'react'
import { Link } from "react-router-dom"
import Loader from '../CustomElement/Loader/Loader'
import axiosInstance from "../../functions/AxiosIntance"
import { NotificationState } from "../../SharedStates/NotificationState"
import { useSetRecoilState } from 'recoil'
import { ReactComponent as EmailSended } from "../../SVGs/emailSended.svg"

const ForgotPassword = () => {

    const emailRgex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    const [emailValue, setEmailValue] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const notification = useSetRecoilState(NotificationState)

    const handleFocus = (e) => {
        const input = e.target
        if (input.value == "") {
            const label = input.parentNode.children[0]
            label.style.left = ""
            label.style.transform = "translateY(18px)"
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
    const handleSubmit = async (e) => {
        e.preventDefault()
        if ((emailRgex.test(emailValue) && (emailValue?.length))) {
            setIsLoading(true)
            try {
                var res = await axiosInstance({
                    method: "get",
                    url: `/users/changePWD/${encodeURIComponent(emailValue)}`
                })
                if (res.status === 200) {
                    setIsLoading(false)
                    setSuccess(true)
                    // notification({ type: "success", message: "If this email have an account , the instructions will be sent to you" })
                }
            } catch (e) {
                setIsLoading(false)
                console.log(e)
                const status = e.response?.status
                notification({ type: "error", message: "something wrong. please try again in few seconds." })
            }
        }
    }

    return (
        <div className='h-screen w-full font-body flex flex-col items-center justify-center bg-indigo-300/5'>
            <Link to="/" className='text-2xl text-pink-500 font-title font-bold fixed top-3 left-4'>Secrito</Link>
            {(!success) && (<form onSubmit={handleSubmit} className='w-full flex justify-center min-h-screen lg:min-h-0 flex-col items-center xl:w-5/12 lg:w-6/12 px-4 pb-7 pt-10 border-2 rounded-md border-neutral-200 bg-white'>
                <div className=''>
                    <img src="/assets/icons/open-mail.png" className='h-24 w-24' alt="send email illustration" />
                </div>
                <h1 className='text-2xl font-bold mt-5 mb-2 text-indigo-500'>Forget Password?</h1>
                <p className='text-[14px] w-full md:w-7/12 lg:w-10/12 text-neutral-600 text-center'>
                    Enter the email associated with you account and we'll send an email with instructions to reset your password.
                </p>
                <div className='flex space-y-1 flex-col w-full md:w-7/12 lg:w-10/12 mt-5'>
                    <label onClick={(e) => { e.target.parentNode.children[1].focus() }}
                        className='relative z-50 duration-150 left-2 cursor-text p-1 bg-white max-w-min whitespace-nowrap select-none text-stone-700 lg:translate-y-[42px] translate-y-[46px] text-[15px]
                      lg:text-sm'>Email</label>
                    <input autoComplete='off' onInput={(e) => { setEmailValue(e.target.value) }} name="email" onFocus={handleFocus} onBlur={handleBlur} type="text" className="bg-white duration-150 rounded-md outline-none text-[17px]  lg:text-base h-10 px-2 py-[25px] lg:py-[22px] border-2 border-stone-200" />
                    {((!emailRgex.test(emailValue) && (emailValue != null)))
                        && (<p className='text-red-500 font-body text-[13px] ml-1'>Invalid Email</p>)}
                </div>
                <button disabled={isLoading} type='submit' className="h-11 mt-10 w-full md:w-7/12 lg:w-10/12 flex items-center justify-center text-lg rounded-md text-white shadow-lg shadow-neutral-300 hover:bg-indigo-600 duration-200 delay-75 bg-indigo-500">
                    {(!isLoading) && (<p>Send Instructions</p>) ||
                        (<Loader height="23px" color="white" size="23px" border="3px" />)}
                </button>
                <Link to="/auth/login" className='flex hover:text-indigo-500 duration-200 delay-75 items-center mt-5 space-x-1 text-neutral-600'> <span className='text-2xl'>&#x2190;</span><p className='text-md'>back to log in</p></Link>
            </form>) ||
                <div className='flex lg:w-1/3 md:w-8/12 w-10/12 flex-col items-center justify-center'>
                    <h2 className="lg:text-5xl text-3xl text-indigo-500 mb-20">Check your email</h2>
                    <EmailSended className='mb-10' />
                    <p className='text-neutral-800 text-center mb-10'>Check your <span className='font-bold text-neutral-900'>{emailValue}</span> inbox for instructions from us on how to reset your password.</p>
                    <Link to="/auth/login" className='flex font-bold hover:text-indigo-500 duration-200 delay-75 items-center mt-5 space-x-1 text-neutral-800'> <span className='text-2xl'>&#x2190;</span><p className='text-md'>back to log in</p></Link>
                </div>

            }
        </div >
    )
}

export default ForgotPassword