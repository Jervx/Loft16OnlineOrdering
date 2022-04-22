import axios from "axios";
require("dotenv").config();

const baseURL = process.env.REACT_APP_SERVERURL

let API = axios.create({
    baseURL : baseURL,
    withCredentials : true
})

API.defaults.withCredentials = true

export default API;