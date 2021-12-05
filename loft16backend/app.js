require("dotenv").config();
require("./config/database").connect();

const cors = require('cors')
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
//var session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
        origin:"https://localhost:3000",
        methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
        credentials: true
    }))
app.use(cookieParser());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });

// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
//   }))

//Routes
const authenticationRoute = require('./Routes/public/authentication')
const userController = require('./Routes/private/User/userController')
const browsing = require('./Routes/public/browsing')

app.use('/auth', authenticationRoute)
app.use('/user', userController)
app.use('/browse', browsing)

app.get('/getcookie', (req,res)=>{

    console.log("Something trigger get cookie")

    res.cookie('cookie1', 'cokeiajfa 🍪',{httpOnly: true, secure : true})
    res.cookie('cookie2', 'cokeiajfa 🍪',{httpOnly: true, secure : true})
    res.cookie('cookie3', 'cokeiajfa 🍪',{httpOnly: true, secure : true})

    res.status(200).json({msg : "ok 👌"})
})

app.get('/nocookie',(req,res)=>{
    res.status(200).json({msg : "no cookie ok 🍪 but its 👌ok"})
})

const Product = require("./models/Product")
app.post('/createProduct', async(req,res) => {
    // TODO: Fill Products name, categories[string], description, variants [{name, stock, price}], 
    const product_data = req.body

    let total_stock = 0
    product_data.variants.forEach((variant) => { total_stock += variant.stock })

    const product = await Product.create({
        ...product_data
    })    

    res.status(201).json({
        msg : 'created 👌',
        product : product
    })
})


module.exports = app;
