
var mongoose = require('mongoose');
var Schema      = mongoose.Schema;

var userSchema = new Schema({
    loginName:{type:String, required: true, unique: true},
    hashedPwd: {type: String, required: true},
    phone:  {type:String},
    email: {type:String},
    realName: {type: String},
    nickName: {type: String},
    gender:{type:Number,default: 0},
    profilePicPath:{type: String},
    createdAt: {type: Date, default: Date.now}
});
var User = mongoose.model('User', userSchema);


exports.userDB = {

    //创建新信息
    createUser: function (user, callback) {

        var userObj = new User(user);

        userObj.save( function(err, data) {
            callback(err,data);
        });

    },

    //sigin
    getUserByCon: function (user, callback) {

        User.find(user, function (err, docs) {
            callback(err,docs);
        });

    },
    //列出所有信息
    listUsers: function (callback) {
        User.find({}, function (err, docs) {
            callback(err,docs);
        });
    },

    //按条件获取信息
    getUser: function(sn, callback) {
        User.find({loginName: sn}, function (err,doc) {
            console.log(err);
            callback(err, doc);
        });
    },

    //按条件删除信息
    deleteUser: function(sn, callback) {
        User.remove({sn: sn}, function(err) {
            callback(err);
        });
    },

    //按条件更新信息
    updateUser: function(condition, user, callback) {
        User.update(condition,
            user, function(err) {
                callback(err);
            });
    },

    //按条件导出数据
    getExport:  function(condition, callback) {
        User.find(condition, function (err,doc) {
            console.log(err);
            callback(err, doc);
        });
    },
};
