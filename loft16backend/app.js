require("dotenv").config();
require("./config/database").connect();

const cors = require('cors')
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { OAuth2Client } = require('google-auth-library');

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const corsConfig = {
    origin: true,
    credentials: true,
  };
  
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

app.use(cookieParser());

app.use(function(req, res, next) {
    const allowedOrigins = ['https://127.0.0.1:3000', 'https://localhost:3000', 'https://127.0.0.1:3000', 'https://localhost:3000', 'https://192.168.1.100:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', "https://192.168.1.100:3000");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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

const client = new OAuth2Client(process.env.GCLIENTID)

async function verify(token, client_id) {
	const ticket = await client.verifyIdToken({ idToken: token, audience: client_id });
	const payload = ticket.getPayload();
	const userid = payload['sub'];
  return {payload , userid, msg:"Ok lods!👌"}
}

app.get("/test",async(req,res)=>{
  const access_token = req.cookies.access_token
  const client_id = req.cookies.client_id

  console.log("AT,CI",access_token, client_id)

  const ress = await verify(access_token, client_id)

  res.status(200).json({
    ress
  })
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
