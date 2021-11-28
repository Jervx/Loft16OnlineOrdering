const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
    schema_v : {type : Number, default : 1},
    token : {type : String, require : true},
    user_ID  : mongoose.Types.ObjectId,
    iat : {type : Date, default : Date.now}
})


module.exports = mongoose.model('refresh_token',refreshTokenSchema)