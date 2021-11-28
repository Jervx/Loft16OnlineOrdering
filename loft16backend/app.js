require("dotenv").config();
require("./config/database").connect();
const cors = require('cors')
const express = require("express");

const app = express();
app.use(express.json());

app.use(cors({
    origin:"*"
}))

//Routes
const authenticationRoute = require('./Routes/public/authentication')

app.use('/auth', authenticationRoute)


module.exports = app;