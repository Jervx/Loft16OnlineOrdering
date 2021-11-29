const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../../../models/User");
const auth = require("../../../middleware/auth")

router.post("/addToCart",auth,(req,res)=>{
    res.status(200).json({
        status : 200,
        description : "Item added to cart"
    })
})

module.exports = router