
module.exports = {
    cookieSecret: ' 把你的cookie 秘钥放在这里',
    QQMail: {
        user: '942415340@qq.com',
        password:'dcujejykuqarbcgc',
        //进入QQ邮箱，-> 设置 -> 账户 -> POP3/ -> 启用第一个 POP3/SMTP(简单的邮件传输协议)
    },

    mongo: {
        development: {
            connectionString: 'mongodb://root:12345abc@localhost:27017/admin',
        },

        production: {
            connectionString: 'mongodb://root:12345abc@localhost:27017/admin',
        }
    },
    uploadProfilePath: {
        tempPath: 'public/tempfile/' ,
        filePath: 'images/profile/',
        pythPath: 'public\\images\\profile\\',
    },

};
