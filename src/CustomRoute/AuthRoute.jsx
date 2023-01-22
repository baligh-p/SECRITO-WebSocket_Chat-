import React from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { useRecoilState } from "recoil"
import UserState from "../SharedStates/UserState"
const AuthRoute = () => {
    const [user, setUser] = useRecoilState(UserState)

    if (user?.isLogged) return (
        <Navigate to="/" />
    )
    else return (
        <Outlet />
    )
}

export default AuthRoute