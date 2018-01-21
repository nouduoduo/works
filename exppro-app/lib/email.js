﻿
var nodemailer = require('nodemailer');

module.exports = function(credentials){
	var mailTransport = nodemailer.createTransport('SMTP',{
		//service: 'qq',
		host: "smtp.qq.com", // 主机
		secureConnection: true, // 使用 SSL
		port:465, // SMTP 端口
		auth: {
			user: credentials.QQMail.user, // 账号
			pass: credentials.QQMail.password, // 密码

		}

	});

	var from = '"RIMI Node ful" <'+credentials.QQMail.user +'>';
	var errorRecipient = credentials.QQMail.password;

	return {
		send: function(to, subj, body){
		    mailTransport.sendMail({
		        from: from,
		        to: to,
		        subject: subj,
		        html: body,
		        generateTextFromHtml: true
		    }, function(err){
		        if(err) console.error('===Unable to send email: ' + err);
		    });
		},

		emailError: function(message, filename, exception){
			var body = '<h1>RIMI W1702 Site Error</h1>' +
				'message:<br><pre>' + message + '</pre><br>';
			if(exception) body += 'exception:<br><pre>' + exception + '</pre><br>';
			if(filename) body += 'filename:<br><pre>' + filename + '</pre><br>';
		    mailTransport.sendMail({
		        from: from,
		        to: errorRecipient,
		        subject: 'RIMI W1704 Site Error',
		        html: body,
		        generateTextFromHtml: true
		    }, function(err){
		        if(err) console.error('$$$Unable to send email: ' + err);
		    });
		},
	};
};