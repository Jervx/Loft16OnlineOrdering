const jwt = require("jsonwebtoken");
const config = process.env;
const GAuthVerify = require('../helper/GAuthVerify')


const verifyToken = async (req, res, next) => {
  let token = req.cookies.access_token
  let client_id = req.cookies.client_id
  let auth_iss = req.cookies.auth_iss

  //console.log("--------COOKIES USER AUTH CHECK----------\n", token+"\n---\n", client_id+"\n----\n", auth_iss)
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
    const user = jwt.verify(token, config.JWT_SCRT);
  } catch (err) {
    return res.status(401).json({
        err : 401,
        description : "Your authorization has expired",
        solution : "Login again to gain Authorization"
    })
  }
  return next();
};

module.exports = verifyToken;