import axios from "axios";

const API = axios.create({
    baseURL : "https://192.168.1.100:3001",
    withCredentials : true
})

export default API;