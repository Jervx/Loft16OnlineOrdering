const jwt = require("jsonwebtoken");
const config = process.env;
const GAuthVerify = require('../helper/GAuthVerify')
const Admin = require('../models/Admin')

const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

const verifyAdminToken = async (req, res, next) => {
  let token = req.cookies.admin_access_token
  let client_id = req.cookies.client_id
  let auth_iss = req.cookies.auth_iss

  await snooze(2000)

  console.log("--------COOKIES ADMIN AUTH CHECK----------\n", token+"\n---\n", client_id+"\n----\n", auth_iss)
  if(auth_iss)
    if(auth_iss === process.env.GIssuer){
      try{
        const auth_user = await GAuthVerify(token, client_id)
      }catch(error){
        return res.status(401).json({
          err : 401,
          description : "Your authorization has expired",
          solution : "Login to google again to gain Authorization"
        })
      }
    }

  if (!token)
    return res.status(403).json({
        err : 403,
        description : "Your sign in was expired",
        solution : "Please sign out & sign in again" 
    })

  try {
    const adminData = jwt.verify(token, config.JWT_SCRT);
    const isAdmin = await Admin.findOne({ _id : adminData._id, })

    if(!isAdmin)
        return res.status(403).json({
            err : 403,
            description : "Sorry, You Are Not Authorized!",
            solution : "We cannot find an admin under the credential you provided" 
        })
    
  } catch (err) {
    return res.status(401).json({
        err : 401,
        description : "Your authorization has expired",
        solution : "Login again to gain Authorization"
    })
  }
  return next();
};

module.exports = verifyAdminToken;