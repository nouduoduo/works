var svgCaptcha = require('svg-captcha');
var express = require('express');
var router = express.Router();

var credentials = require('../config/credentials.js');
var emailService = require('../lib/email.js')(credentials);
var pubfun = require('../lib/common.model');
var userModel = require('../models/user.model');
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
/*router.post('/sendmail', function(req, res, next) {
console.log(req.body)
    emailService.send(
    req.body.email,
    req.body.title,
    req.body.content
    );
    res.render('sendmail',{msg:"success"})
});*/

router.get('/captcha', function (req, res) {
    var captcha = svgCaptcha.create();
    req.session.captcha = captcha.text;

    res.type('svg');
    res.status(200).send(captcha.data);
});

router.post('/sendmail', function(req, res, next) {
    console.log( req.body);
    emailService.send(
        req.body.email,
        req.body.titles,
        req.body.content,
        res.render("sendmail",{msg:"success"})
    )
});



// router.post('/sign-in', function(req, res, next) {
//     // console.log("sign-in,req.body :" ,req.body)
//     if(req.body.captcha.toLowerCase() === req.session.captcha.toLowerCase()){
//         console.log("sign-in,req.body :" ,req.body);
//         var user = new userModel({email:req.body.loginName});
//         user.set('hashedPwd',req.body.pwd);
//         user.save(function(err) {
//             if (err){
//                 console.log(err);
//             } else {
//                 console.log("注册成功");
//             }
//         });
//
//     }
//
// });


router.post('/sign-in',function(req,res,next){
    if(req.body.captcha.toLowerCase()
        ===req.session.captcha.toLowerCase())
    {
        console.log(req.body);
        var user = new userModel({email:req.body.loginName});
        user.set('hashedPwd',req.body.pwd);

        user.save(function(err) {
            if (err){
                console.log(err);
            } else {
                console.log("注册成功");
            }
        });
    }
});





/*router.post('/sign-up', function(req, res, next) {
    console.log("sign-up,req.body :" ,req.body)
});*/

router.post('/sign-up',function(req,res,next){
    if(req.body.captcha.toLowerCase()
        ===req.session.captcha.toLowerCase())
    {
        console.log(req.body);
        var user = new userModel({loginName:req.body.loginName});
        user.set('hashedPwd',pubfun.hashPW(req.body.pwd));

        user.save(function(err) {
            if (err){
                console.log(err);
            } else {
                console.log("注册成功");
            }
        });
    }
});


module.exports = router;
