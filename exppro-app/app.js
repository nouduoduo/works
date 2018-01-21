var express = require('express');
var path = require('path');
var map = require('./maproutecontroller'); //映射路由到控制器
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var credentials = require('./config/credentials');

var index = require('./routes/index');
var admin = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// express-session configuration
app.use(require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret
}));



// database configuration MongoDB数据库连接设置
var mongoose = require('mongoose');
var options = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};


switch(app.get('env')){
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString, options);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString, options);
        break;
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
}


//设置handlebars 视图引擎及视图目录和视图文件扩展名
var handlebars = require('express-handlebars')
    .create({
        defaultLayout: 'main', // 设置默认布局为main
        extname: '.hbs', // 设置模板引擎文件后缀为.hbs
        //创建一个Handlebars 辅助函数，让它给出一个到静态资源的链接：
        helpers: {

            section: function(name, options){
                if(!this._sections) this._sections = {};
                this._sections[name] = options.fn(this);
                return null;
            }
        }
    });
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(function(req, res, next){
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.discountContext = {
        locations: [{product: 'book', price: '99.00'}]
    };

    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.carouselContext = {
        locations: []
    };
    var Login_name='';
    if(req.session.loginName){
        Login_name = req.session.loginName;
    }

    res.locals.partials.navigationContext = {
        locations: [{Login_name: Login_name}]
    };

    next();
});

//映射文件
var prefixes = ['user','inventory', 'order','comment'];
//var prefixes = ['user','comment', 'order','inventory'];
// map route to controller
prefixes.forEach(function(prefix) {
    map.mapRoute(app, prefix);
});


app.use('/', index);
app.use('/', admin);
app.use('/manage', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;





