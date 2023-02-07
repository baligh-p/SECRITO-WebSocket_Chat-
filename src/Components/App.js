// import { gapi } from "gapi-script";
import React, { useEffect, useState } from "react";
import AuthRoute from "../CustomRoute/AuthRoute"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotLoggedRoute from "../CustomRoute/NotLoggedRoute";
import { useSetRecoilState } from "recoil"
import UserState from "./../SharedStates/UserState"
import { useCookies } from "react-cookie"
import Login from "./Login/Login"
import Home from "./Home/Home"
import { useTokenRequest } from "../Hooks/useTokenRequest"
import PageLoader from "./CustomElement/PageLoader/PageLoader";
import Sign from "./Sign/Sign";
import EmailVerify from "./Sign/EmailVerify/EmailVerify";
import Loader from "./CustomElement/Loader/Loader";
import ChangePassword from "./ChangePassword/ChangePassword";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import Notification from "./CustomElement/Notification/Notification";

const App = () => {

  const setUser = useSetRecoilState(UserState)
  const [cookie] = useCookies()
  const [loading, setLoading] = useState(true) // define a loading to let custom auth route waiting loading payload

  console.log("main app render")

  const refreshTokenRequest = useTokenRequest(
    "/users/welcome",
    "get",
    { forMain: true, setIsLoading: setLoading },
    (data) => {
      setUser((user) => { return { ...user, userData: data, isLogged: true } })
    })

  //verify and get payload from server
  useEffect(() => {
    if (cookie.atk) {
      refreshTokenRequest()
    }
    else {
      setLoading(false)
    }
  }, [cookie.atk])


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
          <Route path="" element={<Home />} />
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
