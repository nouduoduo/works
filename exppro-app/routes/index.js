var svgCaptcha = require('svg-captcha');
var express = require('express');
var router = express.Router();
var validator = require('validator');
var formidable = require('formidable');
var fs = require('fs');

const userDB = require('../models/user.model').userDB;



var credentials = require('../config/credentials.js');
var emailService = require('../lib/email.js')(credentials);
var pubfun = require('../lib/common.model');
var userModel = require('../models/user.model');
var bannerModel = require('../models/banner.model');
var listModel = require('../models/list.model');
/* GET home page. */
router.get('/', function(req, res, next) {
  var arr = [
      {user:{name:"jack",age:20}},
      {user:{name:"bill",age:30}},
      {user:{name:"mike",age:40}}
  ];

  var aar = [];
  var obj = {};
  var arr1 = NaN;

 res.render('index', {data:arr,
     data_a:aar,
     data_o:obj,
     data_n:arr1,
     currencies:['USD','GBP','BTC'],
     currency: {
         name: 'United States dollars',
         abbrev: 'USD',
     },

     tours: [{ name: 'Hood River', price: '$99.95' },
         { name: 'Oregon Coast', price: '$159.95'} ]

 });
});
router.get('/about', function(req, res, next) {
    res.render('about', { title: 'Express with <em>hbs</em>' });
});
router.get('/contart', function(req, res, next) {
    res.render('contart', { title: 'Express with <em>hbs</em>' });
});
router.get('/shoppingcar',function (req, res, next) {
    res.render('inventory/shoppingcar',{ title: 'Express with <em>hbs</em>' })
});
router.get('/signout',signOut);
router.get('/myorder',function (req, res, next) {
    res.render('order/myorder')
});
router.get('/banner/list',function (req,res,next) {
   var retData = {
       code:0,

   };
    bannerModel.find({},function(err,banners){
        if(err){
            return;
        }
        else{
            if(banners.length>0){
                retData.data=banners
                console.log(banners)
            }
            return res.send(retData);
        }

    })
});
router.get('/lists',function (req,res,next) {
    var retData = {
        code:0,

    };
    listModel.find({},function(err,lists){
        if(err){
            return;
        }
        else{
            if(lists.length>0){
                retData.data=lists;
                console.log(lists)
            }
            return res.send(retData);
        }

    })
});

//退出登录
function signOut(req,res) {
    req.session.user = null;
    req.session.loginName = null;
    return res.redirect('/');
}

/*router.post('/sendmail', function(req, res, next) {
console.log(req.body)
    emailService.send(
    req.body.email,
    req.body.title,
    req.body.content
    );
    res.render('sendmail',{msg:"success"})
});*/

router.get('/changpwd',function (req,res) {
    if(req.session.loginName){
        res.render('users/changpwd', {loginName: req.session.loginName});
    }else{
        res.redirect('/');
    }

});

 router.post('/changpwd',changePassword);

router.post('/upload-profile/:UID/:year/:month/:timestr',uploadProfile);

//处理上传文件
function uploadProfile(req,res) {
    console.log(req.body);
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = credentials.uploadProfilePath.tempPath;	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.parse(req, function(err, fields, files){
        if(err) return res.redirect(303, '/error');

        var extName = '';  //后缀名
        switch (files.photo.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
        console.log(files);
        //req.params.timestr
        var newPath = credentials.uploadProfilePath.pythPath + req.params.UID+"_"+req.params.timestr+"."+extName;
        //var newPath = credentials.uploadProfilePath.pythPath + req.params.UID+"."+extName;

        fs.renameSync(files.photo.path, newPath);  //重命名
        //console.log(files.photo.path+"-----"+files.photo.name +"###"+ extName +"==="+req.params.year);
        //console.log('received fields:');
        var imgpath=credentials.uploadProfilePath.filePath + req.params.UID+"_"+req.params.timestr+"."+extName;
        //var imgpath=credentials.uploadProfilePath.filePath + req.params.UID+"."+extName;

        updateProfilePicture (req.params.UID,imgpath);

        //var data = {imgpath:imgpath};
        return  res.redirect('/user/show/ ?imgpath='+imgpath);
        // return  res.send(data);

    });
}


//更新个人俏像
function updateProfilePicture (UID,imgpath) {
    var condition = {_id:UID};
    var customer  = {profilePicPath:imgpath};
    userDB.updateUser(condition, customer, function(err) {
        if (err)
        {
            // res.send('Problem occured with update' + err)
        }

        else
        {
            var retCustomer = {customer:customer}

            // res.send(retCustomer);
        }
    });
}



function changePassword(req,res,next) {
    //修改密码
        var condition = {
            loginName: req.body.loginName,
            hashedPwd: pubfun.hashPW(req.body.pwd),

        };
        var customer= {
            hashedPwd: pubfun.hashPW(req.body.newpwd)
        };

        if(req.body.newpwd.length == 0 || req.body.tonewpwd.length == 0){
            data = {errorMsg: '新密码不能为空！', code: '0'};
            return res.send(data);
        }
        if (req.body.newpwd !== req.body.tonewpwd) {
            data = {errorMsg: '两次输入的新密码不一至！', code: '0'};
            return res.send(data);
        }

    userDB.updateUser(condition, customer, function(err) {
            if (err){

                res.send('Problem occured with update' + err)
            }

            else
            {
                var retCustomer = { };
                //res.render('customers/added', {title: 'Customer Edited', customer : customer})
                // pubfun.isAuth(req,res,prefixViewsDir,'update', {title: 'Customer Edited', customer : customer});

                retCustomer.code= 1;
                retCustomer.msg = customer.name

                    + '更新成功！';
                retCustomer.url = '/signout'

                res.send(retCustomer);
            }

        });

    }

//验证码
router.get('/captcha', function (req, res) {
    var captcha = svgCaptcha.create({
        background:'#cc9977',
        color:'ff0',
        noise:1,
    }

    );
    req.session.captcha = captcha.text;

    res.type('svg');
    res.status(200).send(captcha.data);
});


//管理人员查看后台
router.get('/list',function(req, res,next){
    var ret = {};
    userModel.find({},function (err,users) {
    if(err){
        console.log(err);
    }else {
        if(users.length>0){

            if(req.xhr){
                res.send(users);
            }else {
                res.render('users/list',{data: users})
            }

        }
    }
    })

});

//邮箱发送消息
router.post('/sendmail', function(req, res, next) {
    console.log( req.body);
    emailService.send(
        req.body.email,
        req.body.titles,
        req.body.content,
        res.render("sendmail",{msg:"success"})
    )
});



router.post('/checked-login-name',function (req, res, next) {
    //判断用户是否存在
    userModel.find({"localName": req.body.localName}, function (err,doc) {

            var ret = {};
            userModel.find({'loginName':req.body.loginName},
                function (err, doc) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        if (doc.length > 0) {
                            ret.code = 1;
                            ret.msg = req.body.loginName + "已存在！";
                        }else {
                            ret.code = 0;
                            ret.msg = req.body.loginName + "可以注册！";
                        }
                    }
                    res.send(ret);
                })
        });
});

//登录
router.post('/sign-in',validatorCaptacha,signIn);

function signIn(req, res, next) {
    console.log("signIn =====" ,req.body);
    var ret = {};
    userModel.find({loginName: req.body.loginName,
            hashedPwd: pubfun.hashPW(req.body.pwd)}
        ,function(err,docs){
            if(err) { console.log(err)}
            else{
                if(docs.length>0)
                {
                    ret.code = 1;
                    ret.data = docs;
                    res.render('users/profile',ret)
                }
            }

        });
//     if (req.body.captcha.toLowerCase()
//         === req.session.captcha.toLowerCase()) {
//         console.log(req.body);
//         var user = new userModel({email: req.body.loginName});
//         user.set('hashedPwd', req.body.pwd);
//
//         user.save(function (err) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log("注册成功");
//             }
//         });
//     }
}



    //注册
    router.post('/sign-up', validatorCaptacha, signUp);
    //验证用户名
    function validatorLoginName(req, res, next) {
        var ret = {code:1};
        if(pubfun.checkedIsNum(req.body.loginName))
        {
            if(!validator.isMobilePhone(req.body.loginName, 'zh-CN')){
                ret.code = 0;
                ret.msg ="手机号码格式不正确！";
            }

        }else
        {
            if(!validator.isEmail(req.body.loginName)){
                ret.code = 0;
                ret.msg ="邮箱格式不正确！";
            }
        }
        res.send(ret);

    }
    //验证码
    function validatorCaptacha(req, res, next) {
        var ret = {};
        if (req.body.captcha.toLowerCase() !== req.session.captcha.toLowerCase()) {
            console.log("验证码不正确");
            ret.code = 0;
            ret.msg = '验证码不正确'
        } else {
            next()
        }
    }


    function signUp(req, res, next) {
        var user = new userModel({loginName: req.body.loginName});
        user.set('hashedPwd', pubfun.hashPW(req.body.pwd));

        user.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("注册成功");
            }
        });
    }




module.exports = router;
