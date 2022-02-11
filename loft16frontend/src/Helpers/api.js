import axios from "axios";

let API = axios.create({
    baseURL : "https://192.168.1.5:3001",
    withCredentials : true
})

API.defaults.withCredentials = true

export default API;