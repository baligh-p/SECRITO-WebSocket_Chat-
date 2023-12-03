
var User = require('../Model/User')


const searchUser = async (req, res) => {
    try {
        const { keyword } = req.params
        console.log(keyword)
        const users = await User.find({ username: { $regex: keyword || "", $options: "i" } })
        return users.length ? res.status(200).json(users) : res.status(204).json(users)
    } catch (e) {
        console.log(e)
    }
}






module.exports = {
    searchUser
}