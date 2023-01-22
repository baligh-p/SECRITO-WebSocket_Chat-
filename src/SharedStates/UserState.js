import { atom } from "recoil"

const UserState = atom({
    default: {
        isLogged: false,
        userData: null
    },
    key: "userStateKey"
})


export default UserState