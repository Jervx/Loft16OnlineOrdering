
const jwt = require("jsonwebtoken");

const config = process.env;


const verifyToken = (req, res, next) => {
  let token = req.cookies.access_token

  console.log(req.cookies)

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