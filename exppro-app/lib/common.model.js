const crypto = require('crypto');

const pubfun = {
//密码加密
    hashPW:function(pwd){
        return crypto.createHash('sha256')
            .update(pwd).digest('base64').toString();
    },

//检查是否为数字
    checkedIsNum: function (str) {
        let pattern = /^\d+$/g;
        let result = str.match(pattern);
        if (result==null){
            return false;
        }else{
            return true;
        }
    },
    //验证用户是否为管理员登录
    isAuth:function (req,res,prefixViewsDir,routeName,obj) {
        if(! req.session.adminSessionID)
        {
            return res.redirect('/');
        }
        else{
            res.render(prefixViewsDir + routeName,obj);
        }
    },

    //验证是否有权限
    isPermission: function (req, res) {
        var ret = true;
        if(!req.session.adminSessionID)
        {
            ret = false;
        }
        return ret;
    },

};


module.exports=pubfun;