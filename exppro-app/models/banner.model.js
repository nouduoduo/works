/**
 * Created by admin on 2017/12/25.
 */

/* 预置库存信息
 use admin
 db.banners.insert(
 {
 url: 'https://img.alicdn.com/bao/uploaded/i2/2099074223/TB1KKDZdRfM8KJjSZFhXXcRyFXa_!!0-item_pic.jpg_430x430q90.jpg' ,

 }
 )
 */
var mongoose = require('mongoose');
var Schema      = mongoose.Schema;
var bannerSchema = new Schema({

    url: {type: String},
    text: {type: Array},
    createdAt: {type: Date, default: Date.now}
});
var Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
