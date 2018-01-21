/**
 * Created by admin on 2017/12/25.
 */


/* 预置库存信息
 use admin
 db.inventories.insert(
 {
 sku: "MANYU-2017-1",
 description: "MANYU-2017-1",
 instock: "10000",
 picPath: "",
 price: "298.00",
 originalPrice: "398.00",
 status: "A",
 tags: ["red", "blank", "plain"],
 size: { h: 14, w: 21, uom: "cm" },
 comments : [{"_id":"iuuiioiopioiuiu"}],
 }
 )
 */


var mongoose = require('mongoose');
var Schema      = mongoose.Schema;

var inventorySchema = new Schema({
    sku: {type:String, required: true,
        unique: true},
    description:  {type:String},
    instock: {type:Number,default: 0},
    picPath: {type: Array},
    price: {type:Number},
    originalPrice: {type:Number},
    status: {type: String},
    tags: {type: Array},
    size: {type: Object},
    comments : [{ type: Schema.Types.ObjectId,
        ref: 'Comment' }],
    createdAt: {type: Date, default: Date.now}
});

var Inventory = mongoose.model('Inventory', inventorySchema);


exports.inventoryDB = {

    //创建新信息
    createInventory: function (inventory, callback) {

        var inventoryObj = new Inventory(inventory);

        inventoryObj.save( function(err, data) {
            callback(err,data);
        });

    },

    //列出所有信息
    listInventorys: function (callback) {
        Inventory.find({}, function (err, docs) {
            callback(err,docs);
        });
    },

    //按条件获取信息
    getInventory: function(sku, callback) {
        Inventory.findOne({sku: sku}, function (err,doc) {
            console.log(err);
            callback(err, doc);
        });
    },

    //按条件删除信息
    deleteInventory: function(sn, callback) {
        Inventory.remove({sn: sn}, function(err) {
            callback(err);
        });
    },

    //按条件更新信息
    updateInventory: function(sn, inventory, callback) {
        Inventory.update({sn: sn},
            inventory, function(err) {
                callback(err);
            });
    },

    //按条件导出数据
    getExport:  function(condition, callback) {
        Inventory.find(condition, function (err,doc) {
            console.log(err);
            callback(err, doc);
        });
    },
};
