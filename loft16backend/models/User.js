const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  schema_v : { type : Number, default : 1, required : false },
  name : { type :  String, required : true},
  profile_picture : {type : String, required : false, default : null},
  user_name: { type: String, required : true },
  email_address : { type: String, unique : true, required : true },
  isVerified : { type: Boolean, default : false },
  recovery_emails : { type: Array, default : []},
  mobile_numbers : { type: Array, default : []},
  login_count : {type : Number, default : 0},
  password : {type : String, required : true},
  password_change_date : {type : Date, default : Date.now},
  two_factor_auth : {type: Boolean, default : false},
  shipping_address : {
      default_address : {type : Number, default : -1},
      addresses : {type:[{}], default : []},
  },
  cart : {
    total_items : {type : Number, default : 0},
    total_cost : {type : Number, default : 0.0 },
    items : {type : [{}] , default : [] }
  },
  n_completed_transaction : { type : Number, default : 0},
  n_completed_orders : {type : Number, default : 0},
  pending_orders : {type : [{}], default : []},
  in_progress : {type : [{}], default : []},
  cancelled : {type : [{}], default : []},
  past_transactions : {type : [{}], default : []},
  cat : {type : Date, default : Date.now},
  uat : {type : Date, default : null},
  uby : {type : mongoose.ObjectId, default : null},
  dat : {type : Date, default : null}
});

module.exports = mongoose.model("user", userSchema);