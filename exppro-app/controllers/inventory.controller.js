
const inventoryDB = require('../models/inventory.model').inventoryDB;
const pubfun    = require('../lib/common.model');

//视图目录
const  prefixViewsDir = 'inventory/';

// index listing of inventorys at /inventorys/
exports.index = function(req, res) {

    inventoryDB.listInventorys(function (err, docs) {
        if (err) {
            res.send(err);
        } else {
            var retData = {
                title: '库存列表',
                inventorys: docs,
                permission: pubfun.isPermission(req, res)
            };
            if (pubfun.isPermission(req, res)) {

                retData.title = '库存管理';
                retData.layout = 'manage';
                res.render('admin/inventorys/index', retData);
            }
            else {
                console.log('======', retData);
                res.send(retData);
            }


        }
    });
}

// display new inventory form
exports.new = function(req, res) {
    if(pubfun.isPermission(req,res)){
        res.render(prefixViewsDir+'new');
    }else {
        res.redirect('/unauthorized')
    }
    // var filePath = require('path').normalize(__dirname + "/../public/inventorys/new.html");
    // res.sendFile(filePath);
   // pubfun.isAuth(req,res,prefixViewsDir,'new',{});
};

// 新增inventory
exports.create = function(req, res) {

    var inventory = {
        sku: req.body.sku,
        description: req.body.description,
        instock: req.body.instock,
        picPath: req.body.picPath,
        price:  req.body.price,
        originalPrice:  req.body.originalPrice,
        status:  req.body.status,
        tags:  req.body.tags,
        size:  req.body.size
    };

    var retData;

    if(!req.body.sku.length>0)
    {
        retData = {cpde:0,
            errorMsg: 'sku不能为空'};
        return res.send(retData);
    }

    inventoryDB.createInventory(inventory, function(err,data) {
        if (err) {
            // res.send(err);
            retData = {code:0,
                errorMsg: err};
        } else {
            retData = {inventory:data}
            // if(pubfun.isPermission(req, res))
            // {
            retData.code= 1;
            retData.msg = data.sku + '添加成功！'
            // }
        }
        res.send(retData);
    });
};

//登录
exports.postshow = function(req, res) {
    var inventory = {
        loginName : req.body.loginName,
        hashedPwd : pubfun.hashPW(req.body.pwd)
    };

    if(req.session.captcha.toLowerCase() !== req.body.captcha.toLowerCase())
    {
        retData = {cpde:0,
            errorMsg: '请检查验证码是否正确！'};
        return res.send(retData);
    }


    inventoryDB.getInventoryByCon(inventory, function(err,doc) {
        if (err)
            res.send('There is no inventory with code of ' + phone);
        else{
            console.log(doc);
            // res.render(prefixViewsDir+'show', {title : 'Show Inventory', inventory : doc});
            res.send({inventory : doc});
            // isAuth(req,res,'show',{title : 'Show Inventory', inventory : doc});
        }

    });
};

// show a inventory
exports.show = function(req, res) {
    var sku = req.params.sn;

    inventoryDB.getInventory(sku, function(err,doc) {
        if (err)
            res.send('There is no inventory with code of ' + sku);
        else{
            console.log(doc);
            res.render(prefixViewsDir+'details', {title : 'Show Inventory', inventory : doc});
            //res.send({inventory : doc});
            // isAuth(req,res,'show',{title : 'Show Inventory', inventory : doc});
        }

    });
};

// delete a inventory
exports.destroy = function(req,res) {
    var id = req.params.sn;
    inventoryDB.deleteInventory(id, function(err) {
        if (err) {
            res.send('There is no inventory with code of ' + id);
        } else {
            console.log('deleted ' + id);
            // res.send('deleted ' + code);
            // pubfun.isAuth(req,res,prefixViewsDir,'destroy',{title : 'Show Inventory', inventory : doc});
            var retInventory = {}
            if(pubfun.isPermission(req, res))
            {
                retInventory.code= 1;
                retInventory.msg = id + '市的信息删除成功！'
            }
            else
            {
                console.log( '==2===',id,'===2===');
                retInventory.code= 0;
                retInventory.msg = '城市的信息删除失败！请用管理员身份登录'
            }
            res.send(retInventory);
        }
    });

};


// display edit form
exports.edit = function(req, res) {
    console.log(req.params);
    var code = req.params.sn;
    console.log(code);
    inventoryDB.getInventory(code, function(err, doc) {
        console.log(doc);
        if(err)
            res.send('There is no inventory with code of ' + code);
        else{
            //res.render('inventorys/edit', {title : 'Edit Inventory', inventory : doc});
            pubfun.isAuth(req,res,prefixViewsDir,'edit',{title : 'Show Inventory', inventory : doc});
        }

    });
};

// update a inventory
exports.update = function(req,res) {
    var id = req.params.sn;
    var inventory = {};
    if(req.body.isAudit)
    {
        inventory.isAudit= req.body.isAudit;
    }
    else{

        inventory.title= req.body.isAudit,
            inventory.content = req.body.content,
            inventory.author = author,
            inventory.authorId = req.body.authorId,
            inventory.comment= req.body.comment,
            inventory.like= req.body.like

    }
    console.log('----',id,'-------');
    console.log(inventory);
    inventoryDB.updateInventory(id, inventory, function(err) {
        if (err)
            res.send('Problem occured with update' + err)
        else
        {
            //res.render('inventorys/added', {title: 'Inventory Edited', inventory : inventory})
            // pubfun.isAuth(req,res,prefixViewsDir,'update', {title: 'Inventory Edited', inventory : inventory});
            var retInventory = {inventory:inventory}
            if(pubfun.isPermission(req, res))
            {
                retInventory.code= 1;
                retInventory.msg = inventory.name + '博客信息更新成功！'
            }
            else
            {
                console.log( '==2===',id,'===2===');
                retInventory.code= 0;
                retInventory.msg = '博客信息更新失败！请用管理员身份登录'
            }
            res.send(retInventory);
        }

    });

};

//export data
exports.export = function(req,res) {

    var condition = req.body;
    console.log('======',condition,'======');
    inventoryDB.getExport(condition, function(err,doc) {
        if (err)
            res.send('There is no inventory with code of ' + condition);
        else{
            console.log(doc);
            // res.render(prefixViewsDir+'show', {title : 'Show Inventory', inventory : doc});
            pubfun.exportData(req,res,doc);
            // res.send({inventory : doc});
            // isAuth(req,res,'show',{title : 'Show Inventory', inventory : doc});
        }

    });


};


