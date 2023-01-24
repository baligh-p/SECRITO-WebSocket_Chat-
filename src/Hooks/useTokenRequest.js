import React, { useCallback } from "react"
import { useCookies } from "react-cookie"
import axiosInstance from "../functions/AxiosIntance"
import { useLogOut } from "./Logout"

export const useTokenRequest = (url, method, { forMain = false, setIsLoading = () => { } }, successFunction = () => { }, failureFunction = () => { }) => {

    const [cookie, setCookie] = useCookies()
    const logout = useLogOut()
    const refresh = useCallback(async () => {
        try {
            var res = await axiosInstance({
                url: url,
                method: method,
                headers: {
                    Authorization: "Bearer " + cookie.atk
                }
            })
            if (forMain) setIsLoading(false)
            if (res.status === 200) {
                successFunction(res.data)
            }
        }
        catch (err) {
            console.log(err)
            //no token provided or bad token
            if ((err.response?.status === 403 && err.response?.data?.name === "NoTokenProvided")
                || (err.response?.data?.name === "JsonWebTokenError")) {
                if (forMain) setIsLoading(false)
                logout()
            }
            else if (err.response?.status === 406 && err.response?.data?.name === "TokenExpiredError") {
                //expired token | user must be notified
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
                    }
                } catch (e) {
                    failureFunction() //to-do::check if error server or refresh token error
                    console.log(e)
                    logout()
                    if (forMain) setIsLoading(false)
                }
            }
        }
    }, [cookie.atk])
    return refresh
}