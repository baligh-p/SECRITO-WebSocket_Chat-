import React, { useCallback } from "react"
import { useCookies } from "react-cookie"
import axiosInstance from "../functions/AxiosIntance"
import { useLogOut } from "./Logout"

export const useTokenRequest = (requestFunction = () => { }, setLoading = () => { }) => {

    const [cookie, setCookie] = useCookies()
    const logout = useLogOut()

    const refresh = useCallback(async (ck = null) => {
        console.log("ck : " + ck)
        var atk = ck || cookie.atk
        try {
            await requestFunction(atk) // only contains axios block without try catch
        }
        catch (err) {
            console.log(err)
            setLoading(false)
            //no token provided or bad token
            if ((err.response?.status === 403 && err.response?.data?.name === "NoTokenProvided")
                || (err.response?.data?.name === "JsonWebTokenError")) {
                logout()
            }
            else if (err.response?.status === 406 && err.response?.data?.name === "TokenExpiredError") {
                //expired token | user must be notified
                try {
                    console.log("refreshing token")
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
                        console.log("after refresh : " + res.data.accessToken)
                        return refresh(res.data.accessToken)
                    }
                } catch (e) {
                    console.log(e)
                    logout()
                }
            }
        }
    }, [cookie.atk])
    return refresh
}