const express = require("express");
const router = express.Router();


router.get("/productImage/:imageName", (req,res)=>{
    return res.download(`./static/Products/${req.params.imageName}`) 
})


router.get("/userImage/:imageName", (req,res)=>{
    return res.download(`./static/UserAvatars/${req.params.imageName}`) 
})
module.exports = router;