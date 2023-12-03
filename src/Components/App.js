// import { gapi } from "gapi-script";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import AuthRoute from "../CustomRoute/AuthRoute"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotLoggedRoute from "../CustomRoute/NotLoggedRoute";
import { useRecoilValue, useSetRecoilState } from "recoil"
import UserState from "./../SharedStates/UserState"
import { useCookies } from "react-cookie"
import Login from "./Login/Login"
import Home from "./Home/Home"
import { useTokenRequest } from "../Hooks/useTokenRequest"
import PageLoader from "./CustomElement/PageLoader/PageLoader";
import Sign from "./Sign/Sign";
import EmailVerify from "./Sign/EmailVerify/EmailVerify";
import ChangePassword from "./ChangePassword/ChangePassword";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import Notification from "./CustomElement/Notification/Notification";
import io from "socket.io-client"
import { useLogOut } from "../Hooks/Logout";
import AxiosInstance from "../functions/AxiosIntance"


const App = () => {
  const socket = io.connect("http://localhost:5000")
  const setUser = useSetRecoilState(UserState)
  const [cookie] = useCookies()
  const [loading, setLoading] = useState(true)
  const user = useRecoilValue(UserState)
  // define a loading to let custom auth route waiting loading payload

  const welcomeFunction = async (token) => {
    const response = await AxiosInstance({
      url: "/users/welcome",
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setLoading(false)
    if (response.status === 200) {
      setUser((user) => { return { ...user, userData: response?.data, isLogged: true } })
    }
  }
  const welcomeRequest = useTokenRequest(welcomeFunction, setLoading)

  //verify and get user data from server 
  useLayoutEffect(() => {
    if (cookie.atk) {
      welcomeRequest()
    }
    else {
      setLoading(false)
    }
  }, [cookie.atk])


  const logout = useLogOut()

  useEffect(() => {
    console.log(user.isLogged)
    if (user.isLogged) {
      socket.on("connect", () => {
        console.log("connected")
        socket.emit("joinRooms", user.userData)
      })

      socket.on("disconnect", () => {
        console.log("disconnected")
      })

      socket.on("authError", async (data) => {
        if (data.error.name === "NoTokenProvided" || data.error.name === "JsonWebTokenError") {
          logout()
        }
        else if (data.error.name === "TokenExpiredError") {
          /*
          ? trigger refresh using welcome request
          */
          await welcomeRequest()
          /*
          TODO : resend the request after refreshing token(welcome request refresh the token)
          ? we can send the request after waiting but we cannot verify that the token is refreshed
          */
        }
      })





    }
    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("authError")
      socket.off(`friendRequest`)
    }
  }, [user.isLogged])
  console.log("app re-render")


  // useEffect(() => {
  //   const clientID = "414420068121-tjnbn6jbi62ok10mcukos75l0homidot.apps.googleusercontent.com"
  //   function start() {
  //     gapi.client.init({
  //       clientId: clientID,
  //       scope: ""
  //     })
  //   }
  //   gapi.load("client:auth2", start)
  // }, [])


  return (

    <BrowserRouter>
      <React.Fragment>
        <Notification />
      </React.Fragment>
      <Routes>
        <Route path="/" element={<NotLoggedRoute loading={loading} />}>
          <Route path="" element={<Home socket={socket} />} />
        </Route>

        <Route path="/auth" element={<AuthRoute loading={loading} />}>
          <Route path="login" element={<Login />} />
          <Route path="sign" element={<Sign />} />
          <Route path="email-verify" element={<EmailVerify />} />
          <Route path="forget-password" element={<ForgotPassword />} />
          <Route path="change-password/:email/:code" element={<ChangePassword />} />
        </Route>
        <Route path="/loader" element={<PageLoader />} />
      </Routes>
    </BrowserRouter >
  );
}


export default App;
