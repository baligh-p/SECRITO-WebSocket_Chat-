import React from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { useRecoilState } from "recoil"
import Loader from '../Components/CustomElement/Loader/Loader'
import UserState from "../SharedStates/UserState"
const NotLoggedRoute = React.memo(({ loading }) => {

    const [user, setUser] = useRecoilState(UserState)
    if (loading) {
        return <div className='z-50 h-screen w-full bg-white flex items-center justify-center'>
            <Loader height="50px" size="50px" border="5px" color="rgb(99 102 241)" />
        </div>
        //loader page
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