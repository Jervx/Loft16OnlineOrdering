require("dotenv").config();
require("./config/database").connect();

const cors = require('cors')
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(express.urlencoded({extended:true}))

const corsConfig = {
    origin: true,
    credentials: true,
  };
  
app.use(cookieParser());
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
app.use((req, res, next) => {
    const allowedOrigins = ['https://127.0.0.1:3000', 'https://localhost:3000', 'https://127.0.0.1:3000', 'https://localhost:3000', 'https://192.168.1.100:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin))
        res.setHeader('Access-Control-Allow-Origin', origin);
    //res.header('Access-Control-Allow-Origin', "https://192.168.1.100:3000");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


//Routes
const authenticationRoute = require('./Routes/public/authentication')
const userController = require('./Routes/private/User/userController')
const browsing = require('./Routes/public/browsing')

const adminController = require('./Routes/private/Admin/adminController')

app.use('/auth', authenticationRoute)
app.use('/user', userController)
app.use('/browse', browsing)
app.use('/admin', adminController)

const Product = require("./models/Product")
app.post('/createProduct', async(req,res) => {
    const product_data = req.body
const mongoose = require('mongoose')

    let total_stock = 0
    product_data.variants.forEach((variant) => { total_stock += variant.stock })

    const product = await Product.create({ ...product_data })    

    res.status(201).json({
        msg : 'created 👌',
        product : product
    })
})


module.exports = app;
