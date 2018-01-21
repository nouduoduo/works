
const commentDB = require('../models/comment.model').commentDB;
const pubfun    = require('../lib/common.model');

//视图目录
const  prefixViewsDir = 'comments/';

// index listing of comments at /comments/
exports.index = function(req, res) {

    commentDB.listComments(function(err, docs) {
        if (err) {
            res.send(err);
        } else {
            var retData = {title : '用户评论',
                comments :docs,
                // jqcomments : JSON.stringify(docs),
                // permission: pubfun.isPermission(req, res)
            };
            //if(pubfun.isPermission(req, res)){
            //     retData.title='博客管理';
            //}
            console.log('======',retData);
            res.render('comment/index',retData);

        }
    });

};

// display new comment form
exports.new = function(req, res) {
    // var filePath = require('path').normalize(__dirname + "/../public/comments/new.html");
    // res.sendFile(filePath);
    // res.render('comments/new');
    pubfun.isAuth(req,res,prefixViewsDir,'new',{});
};

// 注册comment
exports.create = function(req, res) {

    var comment = {
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

    commentDB.createComment(comment, function(err,data) {
        if (err) {
            // res.send(err);
            retData = {cpde:0,
                errorMsg: err};
        } else {
            retData = {comment:data}
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
    var comment = {
        loginName : req.body.loginName,
        hashedPwd : pubfun.hashPW(req.body.pwd)
    };

    if(req.session.captcha.toLowerCase() !== req.body.captcha.toLowerCase())
    {
        retData = {cpde:0,
            errorMsg: '请检查验证码是否正确！'};
        return res.send(retData);
    }


    commentDB.getCommentByCon(comment, function(err,doc) {
        if (err)
            res.send('There is no comment with code of ' + phone);
        else{
            console.log(doc);
            // res.render(prefixViewsDir+'show', {title : 'Show Comment', comment : doc});
            res.send({comment : doc});
            // isAuth(req,res,'show',{title : 'Show Comment', comment : doc});
        }

    });
};

// show a comment
exports.show = function(req, res) {
    var phone = req.params.sn;
    console.log('======',phone,'======');
    commentDB.getComment(phone, function(err,doc) {
        if (err)
            res.send('There is no comment with code of ' + phone);
        else{
            console.log(doc);
            // res.render(prefixViewsDir+'show', {title : 'Show Comment', comment : doc});
            res.send({comment : doc});
            // isAuth(req,res,'show',{title : 'Show Comment', comment : doc});
        }

    });
};

// delete a comment
exports.destroy = function(req,res) {
    var id = req.params.sn;
    commentDB.deleteComment(id, function(err) {
        if (err) {
            res.send('There is no comment with code of ' + id);
        } else {
            console.log('deleted ' + id);
            // res.send('deleted ' + code);
            // pubfun.isAuth(req,res,prefixViewsDir,'destroy',{title : 'Show Comment', comment : doc});
            var retComment = {}
            if(pubfun.isPermission(req, res))
            {
                retComment.code= 1;
                retComment.msg = id + '市的信息删除成功！'
            }
            else
            {
                console.log( '==2===',id,'===2===');
                retComment.code= 0;
                retComment.msg = '城市的信息删除失败！请用管理员身份登录'
            }
            res.send(retComment);
        }
    });

};


// display edit form
exports.edit = function(req, res) {
    console.log(req.params);
    var code = req.params.sn;
    console.log(code);
    commentDB.getComment(code, function(err, doc) {
        console.log(doc);
        if(err)
            res.send('There is no comment with code of ' + code);
        else{
            //res.render('comments/edit', {title : 'Edit Comment', comment : doc});
            pubfun.isAuth(req,res,prefixViewsDir,'edit',{title : 'Show Comment', comment : doc});
        }

    });
};

// update a comment
exports.update = function(req,res) {
    var id = req.params.sn;
    var comment = {};
    if(req.body.isAudit)
    {
        comment.isAudit= req.body.isAudit;
    }
    else{

        comment.title= req.body.isAudit,
            comment.content = req.body.content,
            comment.author = author,
            comment.authorId = req.body.authorId,
            comment.comment= req.body.comment,
            comment.like= req.body.like

    }
    console.log('----',id,'-------');
    console.log(comment);
    commentDB.updateComment(id, comment, function(err) {
        if (err)
            res.send('Problem occured with update' + err)
        else
        {
            //res.render('comments/added', {title: 'Comment Edited', comment : comment})
            // pubfun.isAuth(req,res,prefixViewsDir,'update', {title: 'Comment Edited', comment : comment});
            var retComment = {comment:comment}
            if(pubfun.isPermission(req, res))
            {
                retComment.code= 1;
                retComment.msg = comment.name + '博客信息更新成功！'
            }
            else
            {
                console.log( '==2===',id,'===2===');
                retComment.code= 0;
                retComment.msg = '博客信息更新失败！请用管理员身份登录'
            }
            res.send(retComment);
        }

    });

};

//export data
exports.export = function(req,res) {

    var condition = req.body;
    console.log('======',condition,'======');
    commentDB.getExport(condition, function(err,doc) {
        if (err)
            res.send('There is no comment with code of ' + condition);
        else{
            console.log(doc);
            // res.render(prefixViewsDir+'show', {title : 'Show Comment', comment : doc});
            pubfun.exportData(req,res,doc);
            // res.send({comment : doc});
            // isAuth(req,res,'show',{title : 'Show Comment', comment : doc});
        }

    });


};


