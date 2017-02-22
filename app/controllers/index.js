var mongoose = require('mongoose');
var promise = require('bluebird');
mongoose.promise = promise;
var menuModel = mongoose.model('WebMenu');
var moneyModel = mongoose.model('WebMoney');
var orderModel = mongoose.model('WebOrder');
var stocksModel = mongoose.model('WebStocks');
var moment = require('moment')
var IndexController = {
    showFrameView: function(req, res, next) {
        menuModel
            .findAllMenus()
            .then(function(menus) {
                return next({ res: { menus: menus } });
            })
            .catch(function(e) {
                next(e);
            })
    },
    showMainView: function(req, res, next) {
        next("res");
    },
    getBoxMessage: function(req, res, next) {
        var retData = {};
        var start_time = moment(new Date()).startOf('month').unix();
        var end_time = moment(new Date()).unix();
        orderModel.count({})
            .then(function(result) {
                retData.box1 = result;
            })
            .then(function() {
                return orderModel.count({ finished_time: { $gte: start_time, $lt: end_time }, status: 1 })
                    .then(function(result) {
                        retData.box2 = result;
                    })
            })
            .then(function() {
                return moneyModel.find({ start_time: { $gte: start_time }, end_time: { $lt: end_time } })
                    .then(function(result) {
                        retData.box3 = result[0].commodity_amount / 100;
                        retData.box4 = parseInt(result[0].order_amount) / 100 + parseInt(result[0].commodity_amount) / 100 + parseInt(result[0].salary_amount) / 100 - parseInt(result[0].other_amount) / 100;
                    })
            })
            .then(function() {
                return res.json({ error: 0, err_message: "", data: retData });
            })
            .catch(function(e) {
                next(e);
            })
    },
    getEchartsMessageCommodity: function(req, res, next) {
        stocksModel.find({}).sort({ "amount": -1 }).limit(10)
            .then(function(result) {
                next({ res: { data: result } })
            })
            .catch(function(e) {
                next(e);
            })
    },
    getEchartsMessageMoney: function(req, res, next) {
        moneyModel.find({}).sort({'start_time':-1}).limit(6).sort({'start_time':1})
            .then(function(result) {
                next({ res: { data: result } })
            })
            .catch(function(e) {
                next(e)
            })
    }
}

module.exports = IndexController;
