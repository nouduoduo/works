/**
 * Created by admin on 2017/12/25.
 */

/* 预置库存信息
 use admin
 db.orders.insert(
 {
     item : "rqwerwr",
     user: "5a4089636c3340345426cabf",
     qty: 12,
     price: 9.90,
 }
 )
 */


var mongoose = require('mongoose');
var Schema      = mongoose.Schema;

var orderSchema = new Schema({
        item : { type: Object },
        customer: {
            type:  Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        qty: {type:Number,default:0},
        price: {type:Number,default:0},

        //payment 0:货到付款;1:微信支款;3:支付宝支付
        patternPayment: {type:Number,default:0},
        //payment 0:未付款;1:已付款
        payment:{type:Number,default:0},
        createdAt: {type: Date, default: Date.now}
    }
);
var Order = mongoose.model('Order', orderSchema);
exports.orderDB = {

    //创建新信息
    createOrder: function (order, callback) {

        var orderObj = new Order(order);

        orderObj.save( function(err, data) {
            callback(err,data);
        });

    },

    //列出所有信息
    listOrder: function (callback) {
        Order.find({}, function (err, docs) {
            callback(err,docs);
        });
    },

    //按条件获取信息
    getOrder: function(sn, callback) {
        Order.findOne({sn: sn}, function (err,doc) {
            console.log(err);
            callback(err, doc);
        });
    },

    //按条件删除信息
    deleteOrder: function(sn, callback) {
        Order.remove({sn: sn}, function(err) {
            callback(err);
        });
    },

    //按条件更新信息
    updateOrder: function(sn, order, callback) {
        Order.update({sn: sn},
            order, function(err) {
                callback(err);
            });
    },

    //按条件导出数据
    getExport:  function(condition, callback) {
        Order.find(condition, function (err,doc) {
            console.log(err);
            callback(err, doc);
        });
    },
};
