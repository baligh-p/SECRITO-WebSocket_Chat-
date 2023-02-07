const mongoose = require("mongoose")



const LinkChangePwd = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        length: 30,
        required: true
    },
    email: {
        type: String,
        required: [true, "email required"],
        validate: {
            validator: (value) => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
            },
            message: "bad email"
        }
    },
    dateCreate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("LinkChangePwd", LinkChangePwd)