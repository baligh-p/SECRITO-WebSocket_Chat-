var express = require("express");
require("dotenv").config();
const { connectDB } = require("./db/connect")

var app = express()


var { userRouter } = require("./Router/loginRoute")

//middleware 
app.use(express.json())

//routes  
const baseURL = "/api/v1"

app.use(baseURL + "/users", userRouter)


//start project
const start = async () => {
    try {
        await connectDB()
        app.listen(5000, () => {
            console.log("listening in port : " + process.env.LISTENPORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
