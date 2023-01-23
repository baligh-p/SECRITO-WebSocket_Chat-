import { gapi } from "gapi-script";
import React, { useEffect, useState } from "react";
import AuthRoute from "../CustomRoute/AuthRoute"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotLoggedRoute from "../CustomRoute/NotLoggedRoute";
import { useSetRecoilState } from "recoil"
import UserState from "./../SharedStates/UserState"
import axiosInstance from "../functions/AxiosIntance"
import { useCookies } from "react-cookie"
import Login from "./Login/Login"
import Home from "./Home/Home"
import { disconnect, refreshToken } from "./../functions/tokenHandler"

const App = () => {

  const setUser = useSetRecoilState(UserState)
  const [cookie] = useCookies()
  const [loading, setLoading] = useState(true)
  console.log("main app render")

  useEffect(() => {
    if (cookie.atk) {
      axiosInstance.get("/users/welcome", {
        headers: {
          Authorization: "Bearer " + cookie.atk
        }
      }).then((res) => {
        setLoading(false)
        if (res.status === 200) {
          setUser((user) => { return { ...user, userData: res.data, isLogged: true } })
        }
      }).catch((err) => {
        setLoading(false)
        console.log(err)
        if (err.response?.status == 403 || (err.response?.data.message == "JsonWebTokenError")) {
          //no token provided or bad token
          disconnect()

        }
        else if (err.response?.status === 406 && err.response.data.message == "TokenExpiredError") {
          //expired token
          refreshToken()
        }
      })
    }
    else {

      setLoading(false)
    }
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
