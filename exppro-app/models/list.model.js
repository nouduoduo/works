/**
 * Created by admin on 2017/12/25.
 */

/* 预置库存信息
 use admin
 db.lists.insert(
 {
 id:0,
 title:"汉尼斯白色床",
 titleTwo:"板式床双人床现代简约北欧",
 price: "1366",
 value:"1",
 image:"https://img.alicdn.com/bao/uploaded/i1/TB13xm3RpXXXXbgapXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg",
 Imgone: "https://img.alicdn.com/bao/uploaded/i1/TB13xm3RpXXXXbgapXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg",
 Imgtwo:"https://img.alicdn.com/imgextra/i3/2104828928/TB2uuqMrhdkpuFjy0FbXXaNnpXa_!!2104828928.jpg_430x430q90.jpg",
 selected:true,
 img:[
 { image: "https://img.alicdn.com/imgextra/i1/2104828928/TB2d_GLgMnH8KJjSspcXXb3QFXa_!!2104828928.jpg", mode: 'widthFix'},
 { image: "https://img.alicdn.com/imgextra/i1/2104828928/TB2tuoTurJmpuFjSZFwXXaE4VXa_!!2104828928.jpg", mode: 'widthFix'},
 { image: "https://shopstatic.vivo.com.cn/vivoshop/commodity/20161219/20161219093810349285_original.jpg", mode: 'widthFix'},
 { image: "https://shopstatic.vivo.com.cn/vivoshop/commodity/20161219/20161219093813167921_original.jpg", mode: 'widthFix' },
 ]

 )
 */
var mongoose = require('mongoose');
var Schema      = mongoose.Schema;
var listSchema = new Schema({
    id:{type: Number},
    title:{type: String},
    titleTwo:{type: String},
    price: {type: String},
    value:{type: String},
    image:{type: String},
    Imgone: {type: String},
    Imgtwo:{type: String},
    selected:Boolean,
    img:{type: Array},
    createdAt: {type: Date, default: Date.now}
});
var List = mongoose.model('List', listSchema);

module.exports = List;
