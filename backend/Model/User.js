const mongoose = require("mongoose")


const User = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username required"],
        maxlength: 20,
        minlength: 5,
        unique: [true, "username must be unique"]
    },
    email: {
        type: String,
        required: [true, "email required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password required"],
        maxlength: 20,
        minlength: 5,
    },
    dateCreation: {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model("User", User)
