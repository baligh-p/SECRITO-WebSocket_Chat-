var express = require("express")
var Router = express.Router()
var { createUser,
    refreshUserToken,
    login,
    welcome,
    verifyCredentials,
    changePwd,
    sendChangePwdLink } = require("../Controller/userController")

var authMiddleWare = require("../middleware/auth")

Router.route("/register").post(createUser)
Router.route("/vrfC").post(verifyCredentials)
Router.route("/login").post(login)
Router.route("/refresh").get(refreshUserToken)
Router.route("/welcome").get(authMiddleWare, welcome)
Router.route("/changePWD").post(changePwd)
Router.route("/changePWD/:email").get(sendChangePwdLink)

module.exports = { userRouter: Router }