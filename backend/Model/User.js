const mongoose = require("mongoose")


const User = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username required"],
        minlength: [3, "username minlength"],
        unique: true,
    }, password: {
        type: String,
        required: [true, "password required"],
        minlength: [5, "password minlength"],
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
        type : String,
        required : [true, "image required"]
    },
    dateCreation: {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model("User", User)
