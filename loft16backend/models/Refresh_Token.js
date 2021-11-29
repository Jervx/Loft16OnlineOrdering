const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
    schema_v : {type : Number, default : 1},
    refresh_token : {type : String, required : true},
    user_ID  : {type : mongoose.Types.ObjectId, required : true },
    iat : {type : Date, default : Date.now}
})
    
module.exports = mongoose.model('refresh_token',refreshTokenSchema)