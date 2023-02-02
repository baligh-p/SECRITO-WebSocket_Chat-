const mongoose = require("mongoose")


const User = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    username: {
        type: String,
        required: [true, "username required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password required"],
    },
    email: {
        type: String,
        required: [true, "email required"],
        unique: true,
        validate: {
            validator: (value) => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
            },
            message: "bad email"
        }
    },
    image: {
        type: String,
    },
    dateCreation: {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model("User", User)
