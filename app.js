var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);
var app = express();
var config = require("./app/config/config");

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

//静态资源加载
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));

//连接数据库
mongoose.connect(config.getConnectionUri());
//加载所有模块
require("./helpers/loadModel")();


app.use(logger('dev'));
app.use(bodyParser.json());
//只有设置为true才能把表单中的field[key]解析成数组
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
	secret:config.SESSION_KEY,
	resave:false,
	saveUninitialized:true,
	store: new mongoStore({
		url:config.getConnectionUri(),
		collection:config.SESSION_TABLE
	})
}));

//日志
app.use(require("./app/midwares/logSave"));



// 登录验证
app.use(require("./app/midwares/loginRequire"));
// 权限控制
app.use(require("./app/midwares/accessControll"));
//菜单初始化
app.use(require("./app/midwares/initial/initMenuData"));
//用户初始化
app.use(require("./app/midwares/initial/initUserData"));
//月初商品更新
app.use(require("./app/midwares/update/commodityUpdate"));
// 费用管理更新
app.use(require('./app/midwares/update/moneyUpdate'));
//路由设置
app.use('/', require('./app/routes/index'));
app.use('/user',require('./app/routes/user'));
app.use('/login',require('./app/routes/login'));
app.use("/order",require("./app/routes/order"));
app.use("/finance",require("./app/routes/finance"));
app.use("/stock",require("./app/routes/stock"));
app.use('/log',require('./app/routes/log'));




//全局中间件
app.use(require("./app/midwares/pageNotFound"));
app.use(require("./app/midwares/response"));
app.use(require("./app/midwares/pageError"));
module.exports = app;
