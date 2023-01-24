
import React, { useCallback } from "react"
import { useResetRecoilState } from "recoil"
import UserState from "../SharedStates/UserState"
import { useCookies } from "react-cookie"

export const useLogOut = () => {
    const resetUser = useResetRecoilState(UserState)
    const [, , removeCookie] = useCookies()
    const logout = useCallback(() => {
        resetUser()
        removeCookie("atk", { path: "/" })
    }, [])
    return logout
}