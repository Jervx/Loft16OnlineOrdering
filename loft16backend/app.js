require("dotenv").config();
require("./config/database").connect();

const cors = require('cors')
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cors({ origin:"*" }))
app.use(cookieParser());

//Routes
const authenticationRoute = require('./Routes/public/authentication')
const userController = require('./Routes/private/User/userController')

app.use('/auth', authenticationRoute)
app.use('/user', userController)

app.get('getTest', (req,res) => {
    res.status(200).json({
        data : 'ok 👌'
    })
})

app.get('postTest', (req,res) => {
    res.status(201).json({
        data : 'ok 👌'
    })
})

module.exports = app;