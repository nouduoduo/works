/**
 * Created by admin on 2017/12/25.
 */
/* 预置库存信息
 use admin
 db.comments.insert(
 {
 content: "我是评论",
 customer: "5a4089636c3340345426cabf",
 status: "A",
 isAudit:3,

 }
 )
 */

var mongoose = require('mongoose');
var Schema      = mongoose.Schema;

var commentSchema = new Schema({
    content: {type: String, required: true},
    customer: {
        type:  Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    status: {type: Object},
    isAudit: {type: Number, default:0},
    createdAt: {type: Date, default: Date.now}
});

var Comment = mongoose.model('Comment', commentSchema);


exports.commentDB = {

    //创建新信息
    createComment: function (comment, callback) {

        var commentObj = new Comment(comment);

        commentObj.save( function(err, data) {
            callback(err,data);
        });

    },

    //列出所有信息
    listComments: function (callback) {
        Comment.find({}, function (err, docs) {
            callback(err,docs);
        });
    },

    //按条件获取信息
    getComment: function(sn, callback) {
        Comment.findOne({sn: sn}, function (err,doc) {
            console.log(err);
            callback(err, doc);
        });
    },

    //按条件删除信息
    deleteComment: function(sn, callback) {
        Comment.remove({sn: sn}, function(err) {
            callback(err);
        });
    },

    //按条件更新信息
    updateComment: function(sn, comment, callback) {
        Comment.update({sn: sn},
            comment, function(err) {
                callback(err);
            });
    },

    //按条件导出数据
    getExport:  function(condition, callback) {
        Comment.find(condition, function (err,doc) {
            console.log(err);
            callback(err, doc);
        });
    },
};
