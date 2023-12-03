const addFriend = (socket) => {
    socket.on("inviteFriend", (data) => {
        socket.emit(data)
    })
}






module.exports = { addFriend }