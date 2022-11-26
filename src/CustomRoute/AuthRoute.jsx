import React from 'react'
import { Navigate, Outlet } from "react-router-dom"

const AuthRoute = () => {
    const isLogged = false

    if (isLogged) return (
        <Navigate to="/" />
    )
    else return (
        <Outlet />
    )
}

export default AuthRoute