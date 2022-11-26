
const User = require("../Model/User")

const createUser = async (req, res) => {
    try {
        const data = req.body
        const userInstance = await User.create({
            username: data.username,
            password: data.password,
            email: data.email
        })
        await userInstance.save()
        res.status(201).json({
            success: true
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
        })
    }
}

const deleteUser = () => {

}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, "username password")
        res.status(200).json({ data: users, success: true })
    } catch (e) {
        res.status(500).json({
            success: false
        })
        console.log(e)
    }
}


const getUserbyId = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, "username");
        res.status(200).json({ data: user, success: true })
    } catch (e) {
        res.status(500).json({ success: false })
    }
}

const changePassword = () => {
    try {
        await User.find
        res.status(200).json({ success: true })
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false })
    }
}

const login = () => {

}

module.exports = {
    createUser,
    deleteUser,
    getUsers,
    changePassword,
    login,
    getUserbyId
}