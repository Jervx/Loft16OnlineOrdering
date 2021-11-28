const mongoose = require("mongoose");

const getAddedMinutes = () => {
    var minutesToAdd = process.env.EML_CONF_EXP_DRTN;
    var currentDate = new Date();
    return new Date(currentDate.getTime() + minutesToAdd*60000);
}

const email_confirmationSchema = new mongoose.Schema({
  schema_v : { type : Number, default : 1 },
  name : { type :  String, required : true},
  user_name: { type: String, required : true },
  email_address : { type: String, unique : true, required : true },
  password : {type : String, required : true},
  confirmation_code : { type : String, required : true },
  iat : {type: Date, default : Date.now},
  exp : {type: Date, default : getAddedMinutes() },
});

module.exports = mongoose.model("email_confirmation", email_confirmationSchema);