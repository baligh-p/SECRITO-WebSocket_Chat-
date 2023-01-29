var express = require("express")
var Router = express.Router()
var { createUser, refreshUserToken, login, welcome, getImageByName } = require("../Controller/userController")
var authMiddleWare = require("../middleware/auth")

Router.route("/register").post(createUser)
Router.route("/login").post(login)
Router.route("/refresh").get(refreshUserToken)
Router.route("/welcome").get(authMiddleWare, welcome)
Router.route("/getUserImage/:userId").get(getImageByName)


module.exports = { userRouter: Router }