const mongoose = require("mongoose");

const completed_orders = new mongoose.Schema({
    schema_v: { type: Number, default: 1 },
    order_ID: { type: mongoose.ObjectId, required: true},
    user_ID : {type : mongoose.ObjectId, required : true },
    user_email : {type : String, required : true},
    n_items : {type : Number, required : true},
    total_cost : {type : Number, required : true},
    courier : { type : {} , required : true},
    cat: { type: Date, default: Date.now },
    uat: { type: Date, default: Date.now },
    uby: { type : mongoose.ObjectId, default : null},
    dat: { type: Date, default: null },
});

module.exports = mongoose.model("completed_order", completed_orders);
