var express = require("express")
var Router = express.Router()
var { createUser, refreshUserToken, login } = require("../Controller/userController")

Router.route("/register").post(createUser)
Router.route("/refresh").post(refreshUserToken)
Router.route("/login").post(login)


module.exports = { userRouter: Router }