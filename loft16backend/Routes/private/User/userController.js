const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../../../models/User");
const auth = require("../../../middleware/auth")

const GAuthVerify = require("../../../helper/GAuthVerify")

// 👌 TODO: Should update the total items & total cost
router.post("/addToCart",auth, async (req,res)=>{

    let { _id , item } = req.body

    _id = mongoose.Types.ObjectId(_id)

    item.product_ID = mongoose.Types.ObjectId(item.product_ID)

    const result = await User.updateOne( {_id}, {
        $push : { "cart.items" : item },
        $inc : { "cart.total_items" : 1, "cart.total_cost" : item.variant_price * item.qty }
    } )

    res.status(200).json({
        status : 200,
        description : "Item added to cart",
        ...result
    })
})

//remove a specific item from cart
router.delete("/removefromcart", auth, async(req,res)=>{
    let { _id , item } = req.body
    _id = mongoose.Types.ObjectId(_id)

    item.product_ID = mongoose.Types.ObjectId(item.product_ID)

    const itemExist = await User.findOne({ _id }, { cart : 1}).lean()

    if(itemExist.cart.total_items === 0) 
        return res.status(200).json({
            status : 200,
            description : "No item to remove"
        })

    const result = await User.updateOne( {_id}, {
        $pull : { "cart.items" : { product_ID : item.product_ID } },
        $inc : { "cart.total_items" : -1, "cart.total_cost" : -(item.variant_price * item.qty) }
    } )

    res.status(200).json({
        status : 200,
        description : "Item removed from cart",
        ...result
    })
})

//getUserDetails
router.get("/mydetails/:id", auth ,async(req, res)=>{

    let _id = req.params.id

    if(!_id) 
        return res.status(400).json( { err : 400, description : "Missing Required Fields", solution : "Please provide required fields"} )

    _id = mongoose.Types.ObjectId(_id)

    const userData = await User.findOne( { _id } ).lean()
    if(!userData) return res.status(404).json( { err : 404, description : "User not found", solution : "User is not registered" } )

    return res.status(200).json({
        status : "200 : ok 👌",
        userData
    })
})

//getUserCart
router.get("/mycart/:_id",auth, async(req,res)=>{
    let _id = req.params._id
    
    // if id is null return 400
    if(!_id) 
        return res.status(400).json( { err : 400, description : "Missing Required Fields", solution : "Please provide required fields"} )

    _id = mongoose.Types.ObjectId(_id)

    // get user mycart
    const userCart = await User.findOne({ _id }, { _id : 0, cart : 1}).lean()

    // check if items stock, variant. name & price exist or changes
    // if it does change then update that item

    res.status(200).json(
        userCart
    )

    // else return the cart data
})



module.exports = router