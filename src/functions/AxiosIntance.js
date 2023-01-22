import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
    baseURL: 'http://localhost:5000/api/v1',
});


export default instance