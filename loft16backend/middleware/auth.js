const jwt = require("jsonwebtoken");
const config = process.env;
const GAuthVerify = require('../helper/GAuthVerify')


const verifyToken = async (req, res, next) => {
  let token = req.cookies.access_token
  let issuer = req.cookies.issuer

  console.log(token)
  if(issuer)
    if(issuer === process.env.JWT_ISSUER){
      try{
        const auth_user = await GAuthVerify(token, issuer)
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
        description : "Authorization is missing",
        solution : "Please sign in to get authorization"
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