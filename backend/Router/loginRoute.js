var express = require("express")
var Router = express.Router()
var { createUser,
    refreshUserToken,
    login,
    welcome,
    getImageByName,
    verifyCredentials,
    changePwd } = require("../Controller/userController")

var authMiddleWare = require("../middleware/auth")

Router.route("/register").post(createUser)
Router.route("/vrfC").post(verifyCredentials)
Router.route("/login").post(login)
Router.route("/refresh").get(refreshUserToken)
Router.route("/welcome").get(authMiddleWare, welcome)
Router.route("/changePWD").get(changePwd)


module.exports = { userRouter: Router }