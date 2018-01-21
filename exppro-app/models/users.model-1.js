var mongoose = require('mongoose');
var Schema      = mongoose.Schema;

var userSchema = new Schema({
    loginName:{
        type:String,
        required: true,
        unique: true
    },
    // phone:  {type:String,
    //     required: true,
    //     unique: true},
    // email: {type:String,required: true,unique: true},
    realName: {type: String},
    nickName: {type: String},
    hashedPwd: {type: String, required: true},
    profilePicPath:{type: String},
    createdAt: {type: Date, default: Date.now}
});


var User = mongoose.model('User', userSchema);
module.exports = User;
