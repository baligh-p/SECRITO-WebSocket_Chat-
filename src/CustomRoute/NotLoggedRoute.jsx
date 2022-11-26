import React from 'react'
import { Navigate, Outlet } from "react-router-dom"

const NotLoggedRoute = () => {
    const isLogged = false

    if (!isLogged) return (
        <Navigate to="/auth/login" />
    )
    else return (
        <Outlet />
    )
}

export default NotLoggedRoute