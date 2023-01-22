import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import Login from "./Login/Login"
import AuthRoute from "../CustomRoute/AuthRoute"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotLoggedRoute from "../CustomRoute/NotLoggedRoute";
import Home from "./Home/Home";
import Nav from "./Nav/Nav";
import { useRecoilState } from "recoil"
import UserState from "./../SharedStates/UserState"
import axiosInstance from "../functions/AxiosIntance"
import { useCookies } from "react-cookie"

const App = () => {
  const [user, setUser] = useRecoilState(UserState)
  const [cookie, setCookie] = useCookies()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (user.isLogged && cookie.atk) {
      console.log("verification and getting data")
      axiosInstance.get("/welcome", {
        headers: {
          Authorization: "Bearer " + cookie.atk
        }
      }).then((res) => {
        if (res.status === 200) {
          setUser({ ...user, userData: res.data })
        }
      }).catch((err) => {

        if (err.response?.status == 403 || (err.response?.data.message == "JsonWebTokenError")) {
          //no token provided or bad token
        }
        else if (err.response?.status === 406 && err.response.data.message == "TokenExpiredError") {
          //expired token
        }
      })
    }
  }, [user.isLogged])


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
        <Route path="/rq" element={<NotLoggedRoute />}>
          <Route path="" element={<div> not auth</div>} />
        </Route>

        <Route path="/" element={<Nav />}>
          <Route path="" element={<Home />} />
        </Route>

        <Route path="/auth" element={<AuthRoute />}>
          <Route path="login" element={<Login />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
