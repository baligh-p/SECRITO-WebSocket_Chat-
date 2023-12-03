const express = require("express")
const Router = express.Router()
const {
    searchUser
} = require("../Controller/friendController")
var authMiddleWare = require("../middleware/auth")
Router.route("/findUser/:keyword").get(authMiddleWare, searchUser)


module.exports = Router