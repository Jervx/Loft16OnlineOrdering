const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const randomstring = require("randomstring")

const User = require("../../models/User");
const Email_Confirmation = require("../../models/email_confirmation");
const { listenerCount } = require("../../models/User");


//generate loft confirmation code
let generateCode = () => {
  let code = randomstring.generate({
      length: 6,
      charset: '1234567890'
    })
  return code
}

// check loft confirmation code expiry d1-current d2-expiry
let isExpired = (d2) => {
  d1 = new Date()
  d2 = new Date(d2)
  return d1.getTime() > d2.getTime()
}

router.post("/signup", async (req, res) => {

  try {
    const { name, user_name, email_address, password, confirmation_code } = req.body;

    //check if all required fields has value
    if (!(name, user_name, email_address, password, confirmation_code)) {
      res.status(400).json({
        err: 400,
        description: "Required Data Missing",
        solution: "Please input all required data",
      });
    }

    //check again if email has duplicates
    const duplicates = await User.findOne({ email_address });
    if (duplicates) {
      return res.status(409).json({
        err: 409,
        description: "User already exist using that Email",
        solution: "Please use other Email",
      });
    }

    //get existing registration confirmation record
    const confirmation_codeRecord = await Email_Confirmation.findOne({ email_address })

    //check if the user already has an issued confirmation email
    if(!confirmation_codeRecord)
      return res.status(401).json({
        err: 401,
        description: "You didn't sign up",
        solution: "Please sign up"
      })

    //check if the given confirmation code is valid to the issued confirmation code
    if(confirmation_codeRecord.confirmation_code !== confirmation_code)
      return res.status(401).json({
        err: 401,
        description: "The confirmation code is not correct ",
        solution: "Please input a valid confirmation code"
      })
    
    //check if the confirmation code is still valid or has already expired
    if(isExpired(confirmation_codeRecord.exp))
      return res.status(401).json({
        err: 410,
        description: "The confirmation code has expired",
        solution: "Please resend or signup again"
      })
    
    //if everything goes right, the registration entry confirmation code will be cleared from
    //loft 16 confirmation code collections
    const ress = await Email_Confirmation.deleteOne({ email_address })

    //user password will be hashed
    const hashedPassword = (encryptedPassword = await bcrypt.hash(
      password,
      10
    ));
    
    //creation of user data to database
    const user = await User.create({
      name,
      user_name,
      email_address,
      password: hashedPassword,
    });

    //final return of response
    res.status(201).json({
        code : 201,
        description : "User Created Successfully!",
        data : user
    });
  } catch (e) {
    // ERROR
    console.log(e)
    res.status(500).json({
      err: 500,
      description: e,
      solution: "Try Again Later",
    });
  }
});

router.post("/confirm_email", async(req,res) => {
  try{
    const {isResent , name, user_name, email_address, password } = req.body;

    if (!(name, user_name, email_address, password)) {
      res.status(400).json({
        err: 400,
        description: "Required Data Missing",
        solution: "Please input all required data",
      });
    }

    let email_confirmation = await Email_Confirmation.findOne({email_address})
    let alreadyInUse = await User.findOne({email_address})

    if(alreadyInUse){
      res.status(409).json({
        err: 409,
        description: "Email is already used",
        solution: "Please use other email",
      });
    }

    if(email_confirmation){
      await Email_Confirmation.deleteOne({email_address})
    }

    email_confirmation = await Email_Confirmation.create({name, user_name, email_address, password, confirmation_code: generateCode()})

    res.status(201).json({
      status : 201,
      message : "Registration created, Please see confirmation code we sent to your Email",
      data : email_confirmation
    })
  }catch(e){
    res.status(408).json({
      status : 403,
      message : "Theres an error",
      err : e
    })
  }
})

module.exports = router;
