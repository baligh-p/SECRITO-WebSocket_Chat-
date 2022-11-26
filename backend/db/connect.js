var mongoose = require("mongoose")
require("dotenv").config();


const connectDB = () => {
    return mongoose.connect(process.env.MONGO_URI)
}

module.exports = {
    connectDB
}