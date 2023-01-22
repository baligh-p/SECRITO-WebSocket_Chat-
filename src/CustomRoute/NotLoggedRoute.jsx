import React from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { useRecoilState } from "recoil"
import UserState from "../SharedStates/UserState"
const NotLoggedRoute = () => {

    const [user, setUser] = useRecoilState(UserState)
    if (!user?.isLogged) return (
        <Navigate to="/auth/login" />
    )
    else return (
        <Outlet />
    )
}

export default NotLoggedRoute