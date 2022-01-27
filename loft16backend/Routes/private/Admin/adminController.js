const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Courier = require("../../../models/Courier");

const Corier = require("../../../models/Courier")

router.post("/addCourier",async (req,res) =>{ 
    try{

        const courier = req.body

        // check if other corier with the same name exist

        // if yes return conflict

        // if not create

        const response = await Courier.create(courier)

        res.status(200).json({msg:"ok!"})

    }catch(err){
        console.log(err)
    }
})

module.exports = router