import React, { useState, useEffect } from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { useRecoilState } from "recoil"
import PageLoader from '../Components/CustomElement/PageLoader/PageLoader'
import UserState from "../SharedStates/UserState"
const NotLoggedRoute = React.memo(({ loading }) => {

    const [user, setUser] = useRecoilState(UserState)
    const [ready, setReady] = useState(loading)
    useEffect(() => {
        var time
        if (!loading) {
            time = setTimeout(() => {
                setReady(false)
            }, 1010)
        }

        return () => {
            clearTimeout(time)
        }
    }, [loading])

    if (ready) {
        return <PageLoader finish={!loading} />
    }
    else if (!user?.isLogged) {
        return (
            <Navigate to="/auth/login" />
        )
    }
    else {
        return (
            <Outlet />
        )
    }
})

export default NotLoggedRoute