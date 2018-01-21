
const userDB = require('../models/user.model').userDB;
const pubfun    = require('../lib/common.model');

//视图目录
const  prefixViewsDir = 'users/';

// index listing of users at /users/
exports.index = function(req, res) {

    userDB.listUsers(function(err, docs) {
        if (err) {
            res.send(err);
        } else {
            var retData = {
                title : '客户列表',
                users :docs,
                // jqusers : JSON.stringify(docs),
                // permission: pubfun.isPermission(req, res)
            };
            //if(pubfun.isPermission(req, res)){
            //     retData.title='博客管理';
            //}
            console.log('======',retData);
            res.render('users/index',retData);

        }
    });

};

// display new user form
exports.new = function(req, res) {
    // var filePath = require('path').normalize(__dirname + "/../public/users/new.html");
    // res.sendFile(filePath);
    // res.render('users/new');
    pubfun.isAuth(req,res,prefixViewsDir,'new',{});
};

// 注册user
exports.create = function(req, res) {

    var user = {
        loginName : req.body.loginName,
        hashedPwd : pubfun.hashPW(req.body.pwd)
    };

    var retData;
    if(req.session.captcha.toLowerCase() !== req.body.captcha.toLowerCase())
    {
        retData = {cpde:0,
            errorMsg: '请检查验证码是否正确！'};
        return res.send(retData);
    }

    if(req.body.repwd.toLowerCase() !== req.body.pwd.toLowerCase())
    {
        retData = {cpde:0,
            errorMsg: '两次输入的密码不一致'};
        return res.send(retData);
    }

    userDB.createUser(user, function(err,data) {
        if (err) {
            // res.send(err);
            retData = {cpde:0,
                errorMsg: err};
        } else {
            retData = {user:data}
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

    var user = {
        loginName : req.body.loginName,
        hashedPwd : pubfun.hashPW(req.body.pwd)
    };

    if(req.session.captcha.toLowerCase() !== req.body.captcha.toLowerCase())
    {
        retData = {cpde:0,
            errorMsg: '请检查验证码是否正确！'};
        return res.send(retData);
    }


    userDB.getUserByCon(user, function(err,doc) {
        if (err)
            res.send('There is no user with code of ' );
        else{
            if(doc.length>0){
                req.session.loginName = doc[0].loginName;

                if(req.xhr){
                    res.send({user : doc});
                }else{
                    res.redirect('/user/show/ ');
                }
            }
            else{
                res.redirect('/');
            }

        }

    });
};

// show a user
// exports.show = function(req, res) {
//     var loginName = req.params.sn;
//     if(loginName.trim().length == 0){
//         loginName = req.session.loginName;
//     }
//     userDB.getUser(loginName, function(err,doc) {
//         if (err)
//             res.send('There is no user with code of ' + loginName);
//         else{
//             if(req.xhr){
//                 res.send({user : doc});
//             }
//             else{
//                 res.render('users/profile',{user : doc});
//             }
//         }
//     });
// };

exports.show = function(req, res) {

    var loginName = req.params.sn;

    if(loginName.trim().length==0)
    {
        loginName = req.session.loginName;

    }

    userDB.getUser(loginName, function(err,docs) {
        if (err)
            res.send('There is no user with code of ' + loginName);
        else{
            if(req.xhr){
                res.send({user : docs});
            }
            else
            {
                var context = {
                    user: docs.map(function(doc){
                        return doc;
                    })
                };
                //console.log(context);
                if(docs.length>0){
                    var now         = new Date();
                    context.UID     = context.user[0]._id;
                    context.year    = now.getFullYear();
                    context.month   =parseInt(now.getMonth())+1;
                    context.timestr = Date.now();
                    console.log(context);
                    res.render('users/profile',context);
                }

            }
            // isAuth(req,res,'show',{title : 'Show Customer', customer : doc});
        }
    });
};


// delete a user
exports.destroy = function(req,res) {
    var id = req.params.sn;
    userDB.deleteUser(id, function(err) {
        if (err) {
            res.send('There is no user with code of ' + id);
        } else {
            console.log('deleted ' + id);
            // res.send('deleted ' + code);
            // pubfun.isAuth(req,res,prefixViewsDir,'destroy',{title : 'Show User', user : doc});
            var retUser = {}
            if(pubfun.isPermission(req, res))
            {
                retUser.code= 1;
                retUser.msg = id + '市的信息删除成功！'
            }
            else
            {
                console.log( '==2===',id,'===2===');
                retUser.code= 0;
                retUser.msg = '城市的信息删除失败！请用管理员身份登录'
            }
            res.send(retUser);
        }
    });

};


// display edit form
exports.edit = function(req, res) {
    console.log(req.params);
    var code = req.params.sn;
    console.log(code);
    userDB.getUser(code, function(err, doc) {
        console.log(doc);
        if(err)
            res.send('There is no user with code of ' + code);
        else{
            //res.render('users/edit', {title : 'Edit User', user : doc});
            pubfun.isAuth(req,res,prefixViewsDir,'edit',{title : 'Show User', user : doc});
        }

    });
};

// update a user
exports.update = function(req,res) {
    var id = req.params.sn;
    var user = {};
    if(req.body.isAudit)
    {
        user.isAudit= req.body.isAudit;
    }
    else{

        user.title= req.body.isAudit,
            user.content = req.body.content,
            user.author = author,
            user.authorId = req.body.authorId,
            user.comment= req.body.comment,
            user.like= req.body.like

    }
    console.log('----',id,'-------');
    console.log(user);
    userDB.updateUser(id, user, function(err) {
        if (err)
            res.send('Problem occured with update' + err)
        else
        {
            //res.render('users/added', {title: 'User Edited', user : user})
            // pubfun.isAuth(req,res,prefixViewsDir,'update', {title: 'User Edited', user : user});
            var retUser = {user:user}
            if(pubfun.isPermission(req, res))
            {
                retUser.code= 1;
                retUser.msg = user.name + '博客信息更新成功！'
            }
            else
            {
                console.log( '==2===',id,'===2===');
                retUser.code= 0;
                retUser.msg = '博客信息更新失败！请用管理员身份登录'
            }
            res.send(retUser);
        }

    });

};

//export data
exports.export = function(req,res) {

    var condition = req.body;
    console.log('======',condition,'======');
    userDB.getExport(condition, function(err,doc) {
        if (err)
            res.send('There is no user with code of ' + condition);
        else{
            console.log(doc);
            // res.render(prefixViewsDir+'show', {title : 'Show User', user : doc});
            pubfun.exportData(req,res,doc);
            // res.send({user : doc});
            // isAuth(req,res,'show',{title : 'Show User', user : doc});
        }

    });


};


