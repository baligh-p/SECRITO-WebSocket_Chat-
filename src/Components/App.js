import { gapi } from "gapi-script";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import AuthRoute from "../CustomRoute/AuthRoute"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotLoggedRoute from "../CustomRoute/NotLoggedRoute";
import { useSetRecoilState } from "recoil"
import UserState from "./../SharedStates/UserState"
import axiosInstance from "../functions/AxiosIntance"
import { useCookies } from "react-cookie"
import Login from "./Login/Login"
import Home from "./Home/Home"
import { useLogOut } from "../Hooks/Logout";
import { useRefreshToken } from "../Hooks/RefreshToken"

const App = () => {

  const setUser = useSetRecoilState(UserState)
  const [cookie, setCookie] = useCookies()
  const [loading, setLoading] = useState(true) // define a loading to let custom auth route waiting loading payload
  console.log("main app render")


  const logout = useLogOut()
  const refreshToken = useRefreshToken(function () { }, () => {
    setLoading(false)
  })

  //verify and get payload from server
  const verifyToken = useCallback(async () => {

    if (cookie.atk) {
      try {
        var res = await axiosInstance.get("/users/welcome", {
          headers: {
            Authorization: "Bearer " + cookie.atk
          }
        })
        setLoading(false)
        if (res.status === 200) {
          setUser((user) => { return { ...user, userData: res.data, isLogged: true } })
        }
      }
      catch (err) {
        console.log(err)
        //no token provided or bad token
        if ((err.response?.status === 403 && err.response?.data?.name === "NoTokenProvided")
          || (err.response?.data?.name === "JsonWebTokenError")) {
          setLoading(false)
          logout()
        }
        else if (err.response?.status === 406 && err.response?.data?.name === "TokenExpiredError") {
          //expired token | user must be notified
          refreshToken()
        }
      }
    }
    else {
      setLoading(false)
    }
  }, [cookie.atk])

  useEffect(() => {
    verifyToken()
  }, [cookie.atk])


  useEffect(() => {
    const clientID = "414420068121-tjnbn6jbi62ok10mcukos75l0homidot.apps.googleusercontent.com"
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: ""
      })
    }
    gapi.load("client:auth2", start)
  }, [])


  return (

    <BrowserRouter>
      <Routes>

        <Route path="/" element={<NotLoggedRoute loading={loading} />}>
          <Route path="" element={<Home />} />
        </Route>

        <Route path="/auth" element={<AuthRoute loading={loading} />}>
          <Route path="login" element={<Login />} />
        </Route>

      </Routes>
    </BrowserRouter >
  );
}

export default App;
