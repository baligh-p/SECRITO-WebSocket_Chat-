import { gapi } from "gapi-script";
import { useEffect } from "react";
import Login from "./Login/Login"
import AuthRoute from "../CustomRoute/AuthRoute"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotLoggedRoute from "../CustomRoute/NotLoggedRoute";
import Home from "./Home/Home";




const App = () => {
  const clientID = "414420068121-tjnbn6jbi62ok10mcukos75l0homidot.apps.googleusercontent.com"

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: ""
      })
    }
    gapi.load("client:auth2", start)
  })


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rq" element={<NotLoggedRoute />}>
          <Route path="" element={<div> not auth</div>} />
        </Route>

        <Route path="/" element={<Home />}>
        </Route>

        <Route path="/auth" element={<AuthRoute />}>
          <Route path="login" element={<Login />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
