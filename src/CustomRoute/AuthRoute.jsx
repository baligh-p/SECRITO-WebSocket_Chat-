import React, { useState, useEffect } from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { useRecoilState } from "recoil"
import PageLoader from '../Components/CustomElement/PageLoader/PageLoader'
import UserState from "../SharedStates/UserState"
const AuthRoute = React.memo(({ loading }) => {
    const [user, setUser] = useRecoilState(UserState)
    const [ready, setReady] = useState(loading)
    useEffect(() => {
        var time
        if (!loading) {
            time = setTimeout(() => {
                setReady(false)
            }, 400)
        }
        return () => {
            clearTimeout(time)
        }
    }, [loading])
    if (ready) {
        return <div></div>
    }
    else if (user?.isLogged) {

        return (
            <Navigate to="/" />
        )
    }
    else {
        return (
            <Outlet />
        )
    }
})

export default AuthRoute