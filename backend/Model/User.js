const mongoose = require("mongoose")


const User = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username required"],
        minlength: 3,
        unique: true,
    }, password: {
        type: String,
        required: [true, "password required"],
        minlength: 5,
    },
    email: {
        type: String,
        required: [true, "email required"],
        unique: true
    },
    dateCreation: {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model("User", User)
