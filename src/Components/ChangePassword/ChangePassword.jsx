import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import Loader from '../CustomElement/Loader/Loader'
const ChangePassword = () => {

    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [changed, setChanged] = useState(false)

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

    const submit = (data) => {
        setChanged(true)
    }
    return (
        <div className='min-h-screen lg:py-3 font-body w-full flex items-center justify-center bg-indigo-300/5'>
            <Link to="/" className='text-2xl text-pink-500 font-title font-bold lg:fixed absolute lg:top-3 lg:left-4 left-2 top-1'>Secrito</Link>
            <form onSubmit={handleSubmit(submit)} className="lg:w-5/12 xl:w-4/12 min-h-screen lg:min-h-min shadow-neutral-300 shadow-lg w-full p-7 rounded-md bg-white flex flex-col items-center justify-center">
                <img className='h-24' src="/assets/images/padlock.png" alt="change password logo" />
                <h1 className='my-5 font-bold text-2xl tracking-wide text-indigo-600'>Change Password</h1>
                <p className='text-stone-500 text-sm text-center mb-5'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi corrupti quia a eum quasi officiis.</p>
                {(!changed) && (<><div className='flex space-y-1 flex-col w-full md:w-9/12 lg:w-full'>
                    <label style={{ color: errors.password?.message ? "rgb(239 68 68)" : "" }} onClick={(e) => { e.target.parentNode.children[1].focus() }}
                        className='relative z-50 duration-150 left-2 cursor-text p-1 bg-white max-w-min whitespace-nowrap select-none text-stone-700 lg:translate-y-[42px] translate-y-[46px] text-[15px]
                      lg:text-sm'>Password</label>
                    <input name="password" style={{ borderColor: errors.password?.message ? "rgb(239 68 68)" : "" }} {...register("password", {
                        required: "Too short password",
                        minLength: {
                            value: 5,
                            message: "Password must have at least 5 characters"
                        }
                    })}
                        onFocus={handleFocus} onBlur={handleBlur} type="password" className="bg-white duration-150 rounded-md outline-none text-[17px]  lg:text-base h-10 px-2 py-[25px] lg:py-[22px] border-2 border-stone-200" />
                    <p className='text-red-500 font-body text-[13px] ml-1'>{errors.password?.message}</p>
                </div>
                    <div className='flex space-y-1 flex-col w-full md:w-9/12 lg:w-full'>
                        <label style={{ color: errors.confirme?.message ? "rgb(239 68 68)" : "" }} onClick={(e) => { e.target.parentNode.children[1].focus() }}
                            className='relative z-50 duration-150 left-2 cursor-text p-1 bg-white max-w-min whitespace-nowrap select-none text-stone-700 lg:translate-y-[42px] translate-y-[46px] text-[15px]
                      lg:text-sm'>Confirme Password</label>
                        <input name="confirme" style={{ borderColor: errors.confirme?.message ? "rgb(239 68 68)" : "" }} {...register("confirme", {
                            required: watch("password") !== watch("confirme") ? "Please confirme right your password" : ""
                        })}
                            onFocus={handleFocus} onBlur={handleBlur} type="password" className="bg-white duration-150 rounded-md outline-none text-[17px]  lg:text-base h-10 px-2 py-[25px] lg:py-[22px] border-2 border-stone-200" />
                        <p className='text-red-500 font-body text-[13px] ml-1'>{errors.confirme?.message}</p>
                    </div></>)}
                <div className='w-full md:w-9/12 lg:w-full'>
                    {(!changed) && (<button disabled={isLoading} type='submit' className="h-11 mt-14 flex items-center justify-center text-lg rounded-md text-white shadow-lg shadow-neutral-300 hover:bg-indigo-600 duration-200 delay-75 w-full bg-indigo-500">
                        {(!isLoading) && (<p>Change Password</p>) ||
                            (<Loader height="23px" color="white" size="23px" border="3px" />)}
                    </button>) ||
                        (<div className='bg-green-300 h-11 rounded-md flex items-center'>
                            <img src="/assets/icons/checked.png" className='h-5 mx-2' alt="success icon" />
                            <p className='text-md text-green-800'>Password changed successfully</p>
                        </div>)}
                </div>
            </form>
        </div >
    )
}

export default ChangePassword