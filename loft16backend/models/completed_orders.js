const mongoose = require("mongoose");

const completed_orders = new mongoose.Schema({
  schema_v: { type: Number, default: 1 },
  order_ID: { type: String, required: true},
  user_mobiles : { type: [], required: true },
  n_items : { type : Number , required : true },
  total_cost : { type : Number, required : true }, 
  payment_mode : { type : String, required : true },
  
  // for future implementation of Gcash, for now it is the limitation in this thesis
  transaction_no : {type : String, default : null },
  transaction_status : {type : String, default : null},
  is_payed : {type : Boolean, default : false},
  payed_amount : { type : Number, default : 0 },

  order_status : {type : Number, default : 0},
  reason : {type : String, default : "Cancelled By Admin"},
  courier : {type : {} , required : true},
  items : {type : [] , required : true},
  address : { type : {}, required : true},
  cat: { type: Date, default: Date.now },
  uat: { type: Date, default: Date.now },
  dat: { type: Date, default: null },
});

module.exports = mongoose.model("completed_order", completed_orders);
