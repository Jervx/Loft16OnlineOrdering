require("dotenv").config();
require("./config/database").connect();
const cors = require('cors')
const express = require("express");

const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());

app.use(cors({
    origin:"*"
}))

app.use(cookieParser());

//Routes
const authenticationRoute = require('./Routes/public/authentication')
const userController = require('./Routes/private/User/userController')

app.use('/auth', authenticationRoute)
app.use('/user', userController)

module.exports = app;