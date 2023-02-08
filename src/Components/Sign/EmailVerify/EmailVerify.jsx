import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import { useCookies } from "react-cookie"
import axiosInstance from "../../../functions/AxiosIntance"
import "./EmailVerify.scss"
import Loader from '../../CustomElement/Loader/Loader'
const EmailVerify = React.memo(() => {
    const [firstInput, setFirstInput] = useState(null)
    const [secondInput, setSecondInput] = useState(null)
    const [thirdInput, setThirdInput] = useState(null)
    const [fourthInput, setFourthInput] = useState(null)

    const [isLoading, setIsLoading] = useState(false)

    const [cookie, setCookie] = useCookies()
    const navigate = useNavigate()

    const location = useLocation()

    const form = useRef(null)
    const submit = async () => {
        try {
            setIsLoading(true)
            var res = await axiosInstance.post("/users/register", location.state)
            if (res.status === 200) {
                setCookie("rmbr", true, { path: "/", maxAge: 365 * 24 * 60 * 60 * 60 })
            }
            setCookie(
                "atk",
                res.data?.accessToken,
                {
                    path: "/",
                    maxAge: 365 * 24 * 60 * 60 * 60
                }
            )
        } catch (e) {
            console.log(e)
            setIsLoading(false)
            //server error or user error
        }
    }
    function generateAccountVerifyCode(code1, code2) {
        var firstNumber = Math.abs(Number(code2[0]) - Number(code1[0]) + 5) % 9
        var secondNumber = (9 - Number(code2[1]) + 1) % 9
        var thirdNumber = Math.abs((Number(code2[1]) - Number(code1[1]) + 3)) % 9
        var fourthNumber = (9 - Number(code2[0]) + 6) % 9
        return "" + firstNumber + "" + secondNumber + "" + thirdNumber + "" + fourthNumber
    }
    const cd = useMemo(() => location.state?.fCode ? generateAccountVerifyCode(location.state?.fCode, location.state?.bCode) : null, [location.state])
    useEffect(() => {
        if (location.state) {
            if (!firstInput) form.current.childNodes[0].focus()
            else if (!secondInput) form.current.childNodes[1].focus()
            else if (!thirdInput) form.current.childNodes[2].focus()
            else if (!fourthInput) form.current.childNodes[3].focus()
            if (fourthInput) {
                const code = firstInput + secondInput + thirdInput + fourthInput
                if (code === cd) {
                    submit()
                }
                else {
                    setFirstInput("")
                    setSecondInput("")
                    setThirdInput("")
                    setFourthInput("")
                    form.current.reset()
                }
            }
        }
    }, [firstInput, secondInput, thirdInput, fourthInput])
    if (!location.state) return <Navigate to="/" />
    else return (
        <div className='h-screen w-full font-body flex items-center justify-center'>
            {(isLoading) && (<div className='h-screen w-full flex items-center justify-center bg-indigo-50/80 fixed top-0 left-0 z-50 '>
                <Loader size="50px" height="50px" border="4px" color="#4f46e5" />
            </div>)}
            <Link to="/" className='text-2xl text-pink-500 font-title font-bold fixed top-3 left-4'>Secrito</Link>
            <div className='flex flex-col items-center justify-center'>
                <div className='p-4 bg-indigo-600/30 rounded-full mb-8'>
                    <img src="/assets/images/mail.png" className='h-10 w-10 relative bottom-px' alt="logo of mail received" />
                </div>
                <h1 className='text-3xl text-indigo-700 font-body font-bold'>Check Your Email</h1>
                <p className='text-sm text-stone-700 font-body mt-5'>We sent 4-digit code to <span className='text-indigo-900 font-bold'>{location.state.email}</span>.
                    <br />Please enter it below. Can't find it? check your spam folder. </p>
                <form ref={form} className='flex items-center justify-center mt-14 space-x-5'>
                    <input disabled={isLoading} name="first" onInput={(e) => { setFirstInput(e.target.value) }} style={{ opacity: 1 }}
                        maxLength="1" type="tel" className='bg-indigo-100 rounded-sm border border-indigo-800 h-14 w-14 outline-none text-center text-[29px]' />
                    <input name="second" disabled={!firstInput || isLoading} onInput={(e) => { setSecondInput(e.target.value) }} style={{ opacity: !firstInput ? 0.4 : 1 }}
                        type="tel" maxLength="1" className='bg-indigo-100 rounded-sm border border-indigo-800 h-14 w-14 outline-none text-center text-[29px]' />
                    <input name="third" disabled={!secondInput || isLoading} onInput={(e) => { setThirdInput(e.target.value) }} style={{ opacity: !secondInput ? 0.4 : 1 }}
                        type="tel" maxLength="1" className='bg-indigo-100 rounded-sm border border-indigo-800 h-14 w-14 outline-none text-center text-[29px]' />
                    <input name="fourth" disabled={!thirdInput || isLoading} onInput={(e) => { setFourthInput(e.target.value) }} style={{ opacity: !thirdInput ? 0.4 : 1 }}
                        type="tel" maxLength="1" className='bg-indigo-100 rounded-sm border border-indigo-800 h-14 w-14 outline-none text-center text-[29px]' />
                </form>
                <div className='text-sm mt-32 text-stone-700'>
                    Don't received an email? <span className='hover:underline font-semibold decoration-pink-500 cursor-pointer text-pink-500'>send new code</span>
                </div>
            </div>
        </div >
    )
})

export default EmailVerify