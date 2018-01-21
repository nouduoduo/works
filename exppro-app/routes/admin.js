var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var manageModel = require('../models/manage.model');
var pubfun    = require('../lib/common.model.js');

/* 渲染页面的get路由 */
router.get('/', function (req,res,next) {
    res.render('admin/login',{layout:null});
});

router.get('/unauthorized', function(req, res) {
	res.status(403).render('unauthorized',{layout:null});
});

router.get('/sign-out', signOut);
router.get('/dashboard',authorize,dashboard);
router.get('/changepwd',authorize,changePwd);
router.get('/help',authorize,help);
router.get('/profile',authorize,profile);
router.get('/settings',authorize,settings);
router.get('/area',authorize,area);

/* 提交数据的POST路由 */
router.post('/', login);
router.put('/changepwd/:sn',authorize, changePwdSave);

//退出登录
function  signOut(req,res) {
    req.session.adminSessionID = null;
    return res.redirect('/');
}

//管理员登录
function login(req, res) {
    var data ;
    manageModel.find({loginname:req.body.loginname,
                      hashed_password:pubfun.hashPW(req.body.pwd)
                    },function (err,manages) {
                       
    if(err) {
        console.log(err);
    }else{
        if (manages.length > 0) {
            req.session.adminSessionID = manages[0].id;
            req.session.adminLoginname = manages[0].loginname;
            data = {code: 1, url: '/manage/dashboard', msg: '登录成功！'};
            res.send(data);
        } else {
            data = {code: 0, url: '/manage/', errorMsg: '登录名或密码错误！'};
            res.send(data);
        }
    }
  });
}

//主控台
function dashboard(req,res) {
     res.render('admin/dashboard',{layout:'manage'});
}

//帮助页
function help(req,res) {
    res.render('admin/help',{layout:'manage'});
}

//
function profile(req,res) {
    res.render('admin/profile',{layout:'manage'});
}

//设置
function settings(req,res) {
    res.render('admin/settings',{layout:'manage'});
}

//区域管理
function area(req,res) {
    res.render('admin/area',{layout:'manage'});
}

//修改密码
function changePwd(req,res){
    res.render('admin/changepwd',{layout:'manage',loginname: req.session.adminLoginname});
}

//保存修改后的密码
function changePwdSave(req,res){
   manageModel.update({loginname: req.body.loginname},
                {
                    $set: {
                        hashed_password: pubfun.hashPW(req.body.pwd),
                        update: true
                    }
                },
                {upsert: false, multi: false}).exec(function (err, manages) {
                if (err) {
                    data = {msg: err, code: '0'};
                } else {
                    data = {msg: '密码修改成功！', 
                            code: '1',url:'/manage/sign-out'};
                }
                return res.send(data);
            });
}

//验证管理员是否登录
function authorize(req,res,next) {
    if(req.session.adminSessionID) return next();
    res.redirect(303,'/unauthorized');  
}

module.exports = router;





