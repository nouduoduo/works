
const orderDB = require('../models/order.model').orderDB;
const pubfun    = require('../lib/common.model');

//视图目录
const  prefixViewsDir = 'order/';

// index listing of order at /order/
exports.index = function(req, res) {

    orderDB.listOrder(function(err, docs) {
        if (err) {
            res.send(err);
        } else {
            var retData = {
                title : '订单列表',
                orders :docs,
                permission: pubfun.isPermission(req, res)
            };
            if(pubfun.isPermission(req, res)){
                retData.layout= 'manage',
                    retData.title='订单管理';
                res.render('admin/orders/index',retData);
            }
            else{
                retData.code = 1;
                console.log('======',retData);
                res.send(retData);
            }


        }
    });

};


// display new order form
exports.new = function(req, res) {
    // var filePath = require('path').normalize(__dirname + "/../public/order/new.html");
    // res.sendFile(filePath);
    // res.render('order/new');
    pubfun.isAuth(req,res,prefixViewsDir,'new',{});
};

// 注册order
exports.create = function(req, res) {
    var order = {
        customer: req.body.customer,
        item:JSON.parse(req.body.item),
        qty:req.body.qty,
        price:req.body.price
    };


    orderDB.createOrder(order, function(err,data) {
        if (err) {
            // res.send(err);
            retData = {cpde:0,
                errorMsg: err};
        } else {
            retData = {order:data}
            // if(pubfun.isPermission(req, res))
            // {
            retData.code= 1;
            retData.msg = data.loginName + '帐号注册成功！'
            // }
        }
        res.send(retData);
    });
};

//登录
exports.postshow = function(req, res) {
    var order = {
        loginName : req.body.loginName,
        hashedPwd : pubfun.hashPW(req.body.pwd)
    };

    if(req.session.captcha.toLowerCase() !== req.body.captcha.toLowerCase())
    {
        retData = {cpde:0,
            errorMsg: '请检查验证码是否正确！'};
        return res.send(retData);
    }


    orderDB.getOrderByCon(order, function(err,doc) {
        if (err)
            res.send('There is no order with code of ' + phone);
        else{
            console.log(doc);
            // res.render(prefixViewsDir+'show', {title : 'Show Order', order : doc});
            res.send({order : doc});
            // isAuth(req,res,'show',{title : 'Show Order', order : doc});
        }

    });
};

// show a order
exports.show = function(req, res) {
    var phone = req.params.sn;
    console.log('======',phone,'======');
    orderDB.getOrder(phone, function(err,doc) {
        if (err)
            res.send('There is no order with code of ' + phone);
        else{
            console.log(doc);
            // res.render(prefixViewsDir+'show', {title : 'Show Order', order : doc});
            res.send({order : doc});
            // isAuth(req,res,'show',{title : 'Show Order', order : doc});
        }

    });
};

// delete a order
exports.destroy = function(req,res) {
    var id = req.params.sn;
    orderDB.deleteOrder(id, function(err) {
        if (err) {
            res.send('There is no order with code of ' + id);
        } else {
            console.log('deleted ' + id);
            // res.send('deleted ' + code);
            // pubfun.isAuth(req,res,prefixViewsDir,'destroy',{title : 'Show Order', order : doc});
            var retOrder = {}
            if(pubfun.isPermission(req, res))
            {
                retOrder.code= 1;
                retOrder.msg = id + '市的信息删除成功！'
            }
            else
            {
                console.log( '==2===',id,'===2===');
                retOrder.code= 0;
                retOrder.msg = '城市的信息删除失败！请用管理员身份登录'
            }
            res.send(retOrder);
        }
    });

};


// display edit form
exports.edit = function(req, res) {
    console.log(req.params);
    var code = req.params.sn;
    console.log(code);
    orderDB.getOrder(code, function(err, doc) {
        console.log(doc);
        if(err)
            res.send('There is no order with code of ' + code);
        else{
            //res.render('order/edit', {title : 'Edit Order', order : doc});
            pubfun.isAuth(req,res,prefixViewsDir,'edit',{title : 'Show Order', order : doc});
        }

    });
};

// update a order
exports.update = function(req,res) {
    var id = req.params.sn;
    var order = {};
    if(req.body.isAudit)
    {
        order.isAudit= req.body.isAudit;
    }
    else{

        order.title= req.body.isAudit,
            order.content = req.body.content,
            order.author = author,
            order.authorId = req.body.authorId,
            order.comment= req.body.comment,
            order.like= req.body.like

    }
    console.log('----',id,'-------');
    console.log(order);
    orderDB.updateOrder(id, order, function(err) {
        if (err)
            res.send('Problem occured with update' + err)
        else
        {
            //res.render('order/added', {title: 'Order Edited', order : order})
            // pubfun.isAuth(req,res,prefixViewsDir,'update', {title: 'Order Edited', order : order});
            var retOrder = {order:order}
            if(pubfun.isPermission(req, res))
            {
                retOrder.code= 1;
                retOrder.msg = order.name + '博客信息更新成功！'
            }
            else
            {
                console.log( '==2===',id,'===2===');
                retOrder.code= 0;
                retOrder.msg = '博客信息更新失败！请用管理员身份登录'
            }
            res.send(retOrder);
        }

    });

};

//export data
exports.export = function(req,res) {

    var condition = req.body;
    console.log('======',condition,'======');
    orderDB.getExport(condition, function(err,doc) {
        if (err)
            res.send('There is no order with code of ' + condition);
        else{
            console.log(doc);
            // res.render(prefixViewsDir+'show', {title : 'Show Order', order : doc});
            pubfun.exportData(req,res,doc);
            // res.send({order : doc});
            // isAuth(req,res,'show',{title : 'Show Order', order : doc});
        }

    });


};


