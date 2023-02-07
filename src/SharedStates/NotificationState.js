import { atom } from "recoil"


export const NotificationState = atom({
    default: {
        type: null,
        message: null
    },
    key: "notification state"
})

