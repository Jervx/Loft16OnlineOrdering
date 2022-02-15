const express = require("express");
const router = express.Router();


router.get("/profile/:imageName", (req,res)=>{
    return res.download(`./static/profile/${req.params.imageName}`) 
})

router.get("/userImage/:imageName", (req,res)=>{
    return res.download(`./static/profile/${req.params.imageName}`) 
})

router.get("/assets/:imageName", (req,res)=>{
    return res.download(`./static/assets/${req.params.imageName}`) 
})
module.exports = router;