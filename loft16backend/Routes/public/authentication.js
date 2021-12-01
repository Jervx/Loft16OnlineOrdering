const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const randomstring = require("randomstring");
const jwt = require("jsonwebtoken");

/* Models */
const User = require("../../models/User");
const Email_Confirmation = require("../../models/email_confirmation");
const Refresh_Token = require("../../models/Refresh_Token")
const TwoFactorAuth = require("../../models/TwoFactorAuth");

/* Middleware */
const auth = require("../../middleware/auth")

let ObjectId = require('mongoose').Types.ObjectId; 
const RecoveryCode = require("../../models/RecoveryCode");

//generate loft confirmation code
let generateCode = () => {
  let code = randomstring.generate({
    length: 6,
    charset: "1234567890",
  });
  return code;
};

//generate expiration date/time
const getAddedMinutes = () => {
  var minutesToAdd = process.env.EML_CONF_EXP_DRTN;
  var currentDate = new Date();
  return new Date(currentDate.getTime() + minutesToAdd * 60000);
};

// check loft confirmation code expiry d1-current d2-expiry
let isExpired = (d2) => {
  let d1 = new Date();
  let d22 = new Date(d2);

  return d1.getTime() > d22.getTime();
};

// generate a token
const generateToken = (user_data) => { return jwt.sign(user_data, process.env.JWT_SCRT, { expiresIn: process.env.JWT_EXP_TIME }) }

// reissue new token
router.post("/renewToken", async(req, res) =>{
  const refreshToken = req.cookies.refresh_token
  const { userId, email_address, user_name } = req.body

  if (!(refreshToken, userId)) 
    return res.status(401).json({
      err: 401,
      description : "Missing authorization or User information",
      solution : "Make sure that you are not logged out. Else login again"
    })

  const UserRefreshToken = await Refresh_Token.findOne({user_ID: new ObjectId(userId)})

  if (!UserRefreshToken) 
    return res.status(403).json({
      err: 403,
      description : "Looks like you are not authorized",
      solution : "Please Login"
    })

  jwt.verify(UserRefreshToken.refresh_token, process.env.JWT_RFSH, async(err, user) => {
    if (err) return res.sendStatus(403).json({
      err: 403,
      description : "Looks like theres a problem giving you authorization",
      solution : "This might not be your error, try again later"
    })

    const token = generateToken({ user_name , email_address })
    let USER = await User.findOne({ email_address });

    res.cookie( "access_token",token,{ httpOnly: true, secure : false })
    res.status(200).json({
      code: 200,
      description: "Got a new token!",
      data: {
        USER
      },
    })
  })
})

/* TODO: Recover Account */
router.post("/recover", async(req, res)=>{
  const { email_address, newPassword, recovery_code} = req.body

  if(!email_address)
    return res.status(400).json({
      err: 400,
      description: "Required Data Missing",
      solution: "Please input all required data",
    });

  const USER = await User.findOne({email_address})

  
  //check if email not exist in db
  // return no user
  if (!USER)
    return res.status(401).json({
      err: 401,
      description: "Account Not Found",
      solution:
        "The given credential doesn't belong to our existing users, please create an account",
    });
  
  //if no recovery code provided
  if(!recovery_code){
    //create code (findOneUpdate, upsert)
    const code = await RecoveryCode.findOneAndUpdate({email_address, used : false},{
      user_ID : USER._id,
      email_address,
      recovery_code : generateCode(),
      exp : getAddedMinutes()
    }, {new : true, upsert : true})
    // sent it to email TODO: implement future email helper
    //return 200 code sent
    return res.status(200).json({
      recovery_code_sent : true,
      message : "recovery code sent!"
    })
  }else{   
    //query recovery code matching email && not marked as used
    const USER_RECOVERY = await RecoveryCode.findOne({ email_address, used : false })

    //if none then
    //return 410 we haven't establish a recovery code fo that email, try again
    if(!USER_RECOVERY)
      return res.status(403).json({
        err : 403,
        description : "You didn't Send Us Recovery Request",
        solution : "We haven't establish a recovery code for your email, Try recovery again"
      })

    if(recovery_code !== USER_RECOVERY.recovery_code)
      return res.status(401).json({
        err : 401,
        description : "The provided recovery code is not correct",
        solution : "Please make sure that the recovery code provided is correct"
      })

    // check if the given code is expired or not
    // if expired then return status 410 expired code
    if(isExpired(USER_RECOVERY.exp))
      return res.status(409).json({
        err : 409,
        description : "Your recovery code was expired",
        solution : "Please resend or signin again to get a new recovery code"
      })
      //end no other logic
  }

  const password = await bcrypt.hash(newPassword, 10)
  const updatedPassword = await User.findOneAndUpdate({ email_address }, {$set : { password }} ).lean()

  //invalidate the recovery code
  const invalidateRecovery = await RecoveryCode.updateOne({email_address, used : false} , {$set : {used : true}})

  console.log(updatedPassword)

    //final return of response
    return res.status(201).json({
      code: 201,
      description: "User Created Successfully!",
      userData: {
        ...updatedPassword
      },
    });
})


/*TODO: Signout
  invalidate access token
  remove refresh token
*/

/*SIGNIN 
  TODO: Sign via Google 
  if via google then bypass two factor auth
  */ 
router.post("/signin", async (req, res) => {
  const { email_address, password, twoFactCode } = req.body;

  //check if all required fields has value
  if (!(email_address, password))
    return res.status(400).json({
      err: 400,
      description: "Required Data Missing",
      solution: "Please input all required data",
    });

  const USER = await User.findOne({ email_address }).lean();

  if (!USER)
    return res.status(401).json({
      err: 401,
      description: "Account Not Found",
      solution:
        "The given credential doesn't belong to our existing users, please create an account",
    });


  if (!(await bcrypt.compare(password, USER.password)))
    return res.status(403).json({
        err: 403,
        description: "Forbidden",
        solution: "Please check the credential provided",
      });

  if(USER.two_factor_auth == true)
    if(!twoFactCode){
      // ✅ Two Factor Sign In
      // iissue a two factor code & save it on two factor auth db

      let code = await TwoFactorAuth.findOneAndUpdate({email_address},{
        user_ID : USER._id,
        email_address,
        confirmation_code : generateCode(),
        exp : getAddedMinutes()
      }, {new : true, upsert : true})

      //send it to email - TODO: @jervx to be implemented later
      return res.status(200).json({ twoFactorRequired : true, code })
      // if code provided
    }else{
      // query the code from two_factor_auth
      const users_twoFactorCode = await TwoFactorAuth.findOne({
        email_address })

      // if no result then it means hindi tayo nag signin
      if(!users_twoFactorCode)
        return res.status(403).json({
          err : 403,
          description : "You didn't Sign In",
          solution : "Looks like you don't have a valid confirmation code, please sign in"
        })

      // check if the given code  == two factor auth
      // if not, then return invalid auth 401
      if(twoFactCode !== users_twoFactorCode.confirmation_code)
        return res.status(401).json({
          err : 401,
          description : "The provided authentication code is not correct",
          solution : "Please make sure that the code provided is correct"
        })

      // check if the given code is expired or not
      // if expired then return status 410 expired code
      if(isExpired(users_twoFactorCode.exp))
        return res.status(409).json({
          err : 409,
          description : "Your two factor authentication code was expired",
          solution : "Please resend or signin again to get new confirmation code"
        })
      else
        await TwoFactorAuth.deleteOne( {email_address} )
    }
    

  const token = generateToken( { email_address, user_name : USER.user_name } )
  const refresh = jwt.sign( { email_address, user_name : USER.user_name } , process.env.JWT_RFSH)

  // Create a session Refresh Token for attaining new access token
  // should be destroyed on logout - @hjerbe
  await Refresh_Token.create({
    user_ID : USER._id,
    refresh_token : refresh
  })
  
  // set authorization via cookie & httponly secure desu 
  res.cookie( "access_token",token,{ httpOnly: true, secure : false } )
  res.cookie( "refresh_token", refresh, { httpOnly: true, secure : false })

  console.log(USER)

  return res.status(200).json(
    { 
      code: 200,
      description: "Signed in successfuly!",
      twoFactorRequired : false,
      userData: {
        ...USER
      },
    });
});

/*SUGNUP && issuance of email confirmation
TODO: Sign via Google 
  if via google gmail, bypass email confirmation code
*/
router.post("/signup", async (req, res) => {
  try {
    const { name, user_name, email_address, password, confirmation_code } =
      req.body;

    //check if all required fields has value
    if (!(name, user_name, email_address, password, confirmation_code))
      return res.status(400).json({
        err: 400,
        description: "Required Data Missing",
        solution: "Please input all required data",
      });

    //check again if email has duplicates
    const duplicates = await User.findOne({ email_address });
    if (duplicates)
      return res.status(409).json({
        err: 409,
        description: "User already exist using that Email",
        solution: "Please use other Email",
      });

    //get existing registration confirmation record
    const confirmation_codeRecord = await Email_Confirmation.findOne({
      email_address,
    });

    //check if the user already has an issued confirmation email
    if (!confirmation_codeRecord)
      return res.status(401).json({
        err: 401,
        description: "You didn't sign up",
        solution: "Please sign up",
      });

    //check if the given confirmation code is valid to the issued confirmation code
    if (confirmation_codeRecord.confirmation_code !== confirmation_code)
      return res.status(401).json({
        err: 401,
        description: "The confirmation code is not correct ",
        solution: "Please input a valid confirmation code",
      });

    //check if the confirmation code is still valid or has already expired
    if (isExpired(confirmation_codeRecord.exp))
      return res.status(410).json({
        err: 410,
        description: "The confirmation code has expired",
        solution: "Please resend or signup again",
      });

    //if everything goes right, the registration entry confirmation code will be cleared from
    //loft 16 confirmation code collections
    const ress = await Email_Confirmation.deleteOne({ email_address });

    //user password will be hashed
    const hashedPassword = await bcrypt.hash(password, 10);

    //creation of user data to database
    const user = await User.create({
      name,
      user_name,
      email_address,
      password: hashedPassword,
    });

    const token = generateToken( { user_name, email_address } )
    const refresh = jwt.sign( {user_name, email_address} , process.env.JWT_RFSH)

    // set authorization via cookie & httponly 
    res.cookie( "access_token",token,{ httpOnly: true, secure : false } )
    res.cookie( "refresh_token", refresh, { httpOnly: true, secure : false })

    //final return of response
    return res.status(201).json({
      code: 201,
      description: "User Created Successfully!",
      data: {
        user
      },
    });
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      err: 500,
      description: e,
      solution: "Try Again Later",
    });
  }
});

//Email Confirmation
router.post("/confirm_email", async (req, res) => {
  try {
    const { isResent, name, user_name, email_address, password } = req.body;

    if (!(name, user_name, email_address, password))
      return res.status(400).json({
        err: 400,
        description: "Required Data Missing",
        solution: "Please input all required data",
      });

    let email_confirmation = await Email_Confirmation.findOne({
      email_address,
    });
    let alreadyInUse = await User.findOne({ email_address });

    if (alreadyInUse)
      return res.status(409).json({
        err: 409,
        description: "Email is already used",
        solution: "Please use other email",
      });

    if (email_confirmation)
      await Email_Confirmation.deleteOne({ email_address });

    email_confirmation = await Email_Confirmation.create({
      name,
      user_name,
      email_address,
      password,
      confirmation_code: generateCode(),
      exp: getAddedMinutes(),
    });

    return res.status(201).json({
      status: 201,
      message:
        "Registration created, Please see confirmation code we sent to your Email",
      data: email_confirmation,
    });
  } catch (e) {
    return res.status(408).json({
      status: 403,
      message: "Theres an error",
      err: e,
    });
  }
});

module.exports = router;
