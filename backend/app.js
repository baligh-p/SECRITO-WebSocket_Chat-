var express = require("express");
require("dotenv").config();
const { connectDB } = require("./db/connect")
const cookieparser = require("cookie-parser")
const cors = require("cors")
var app = express()
const { Server } = require("socket.io")
const { addFriend } = require("./SocketMethods/Friends")
const jwt = require("jsonwebtoken")

var { userRouter } = require("./Router/loginRoute")
const friendRouter = require("./Router/friend.router")
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
app.use(`${baseURL}/friends`, friendRouter)



const startSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
        }
    })

    io.on("connection", (socket) => {
        console.log(`user connected : ${socket.id}`)

        socket.on("message", async (data) => {
            const { token } = data
            try {
                const decoded = await jwt.verify(token, process.env.TOKEN_KEY);

            } catch (e) {
                console.log(e)
                socket.emit('authError', { error: e, origin: "message" });
            }
        })

        socket.on("joinRoomMessaging", (data) => {
            console.log(`messagingRoom-${data.sender}-${data.receiver} has been created`)
            socket.join(`messagingRoom-${data.sender}-${data.receiver}`)
        })

        /*
        TODO : use queue package to save asynchronous request to save messages in BD 
        TODO : generate ID's for the message for real-time delete,... functionnalities 
        TODO : verify that only the 2 users receive the messages
        ? the package is not installed right now 
        ! need some security 
        */
        socket.on("message", (data) => {
            console.log("message received : " + data)
            socket.to(`messagingRoom-${data.sender}-${data.receiver}`).emit("receiveMessage", data.message)
        })

        socket.on("disconnect", () => {
            console.log(`user disconnected : ${socket.id}`)
        })
    })
}

//start project
const start = async () => {
    try {
        await connectDB()
        const server = app.listen(process.env.LISTENPORT, () => {
            console.log("listening in port : " + process.env.LISTENPORT)
        })
        startSocket(server)
    } catch (e) {
        console.log(e)
    }
}

start()


