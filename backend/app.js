var express = require("express");
require("dotenv").config();
const { connectDB } = require("./db/connect")
const cookieparser = require("cookie-parser")
const cors = require("cors")
var app = express()


var { userRouter } = require("./Router/loginRoute")

//middleware 
app.use(express.json())
app.use(cookieparser());
app.use(cors(
    {
        credentials: true,
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
))

//routes  
const baseURL = "/api/v1"

app.use(`${baseURL}/users`, userRouter)


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
