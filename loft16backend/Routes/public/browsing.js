const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../../models/Product");


router.get("/gethotproducts", (req,res) => {
    res.status(200).json({
        ok : "hot products"
    })
})

router.get("/getallproducts", async (req,res)=> {
   const products = await Product.find({})

   res.status(200).json({
       msg : "Ok! 👌",
       products
   })
})

router.get("/getproductdetail", (req,res) => {
    res.status(200).json({
        ok : "product description"
    })
})

router.get("/filterproduct", (req,res) => {
    res.status(200).json({
        ok : "filter products"
    })
})


module.exports = router