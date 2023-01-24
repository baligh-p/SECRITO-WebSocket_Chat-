import React, { useCallback } from "react"
import { useCookies } from "react-cookie"
import axiosInstance from "../functions/AxiosIntance"

export const useRefreshToken = (tryFunction = () => { }, catchFunction = () => { }) => {


    const [cookie, setCookie] = useCookies()
    const refresh = useCallback(async () => {
        try {
            const res = await axiosInstance.get("/users/refresh")
            if (res.status === 200) {
                setCookie(
                    "atk",
                    res.data.accessToken,
                    {
                        path: "/",
                        maxAge: cookie.rmbr ? 365 * 24 * 60 * 60 * 60 : undefined
                    }
                )
                tryFunction()
            }
        } catch (e) {
            //to-do::check if error server or refresh token error
            console.log(e)
            logout()
            catchFunction()
        }
    }, [cookie])
    return refresh
}