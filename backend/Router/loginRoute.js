var express = require("express")
var Router = express.Router()
var { createUser, getUsers, getUserbyId } = require("../Controller/userController")

Router.route("/create").post(createUser)
Router.route("/getAll").get(getUsers)
Router.route("/getUser/:id").get(getUserbyId)


module.exports = { userRouter: Router }