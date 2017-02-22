var mongoose = require('mongoose');
var promise = require('bluebird');
mongoose.promise = promise;
var orderModel = mongoose.model('WebOrder');
var moment = require('moment');

var OrderController = {
    showOrderView: function(req, res, next) {
        if (!req.xhr)
            return next("res");
        var data = {};
        if (req.query.timeStart != '' || req.query.timeEnd != '') {
            if (req.query.timeStart != '' && req.query.timeEnd != '') {
                data.create_time = { $gte: req.query.timeStart, $lt: req.query.timeEnd };
            } else if (req.query.timeStart != '' && req.query.timeEnd == '') {
                data.create_time = { $gte: req.query.timeStart };
            } else {
                data.create_time = { $lt: req.query.timeEnd };
            }
        }
        if (req.query.selectValue != '') {
            data.status = req.query.selectValue;
        }
        if (req.query.keyValue != '') {
            data.$or = [{ order_code: { $regex: req.query.keyValue } }];
        }
        orderModel.find(data).sort({"create_time":-1})
            .then(function(result) {
                var data = {
                    draw: req.query.draw,
                    recordsTotal: result.length,
                    recordsFiltered: result.length,
                    data: result
                };
                next({ res: data });
            })
            .catch(function(e) {
                next(e);
            })
    },
    orderAdd: function(req, res, next) {
        var order = req.body.order;
        
        order.order_code = createOrderCode();
        order.finished_time = null;
        order.create_time = Math.round(new Date().getTime() / 1000);
        order.status = 0;
        next();
    },
    orderEdit: function(req, res, next) {
        var order = req.body.order;
        
        if (order.status == 0) {
            order.finished_time = null;
        } else {
            order.finished_time = Math.round(new Date().getTime() / 1000);
        }
        next();
    },
    orderSave: function(req, res, next) {
        var order = req.body.order;
        var _id = order._id;
        order.amount = order.amount * 100;
        delete order._id;
        if (_id.length > 0) {
            orderModel.update({ _id: _id }, order)
                .then(function(result) {
                    next({ res: { data: result } });
                })
                .catch(function(e) {
                    next(e);
                })
        } else {
            orderModel.create(order)
                .then(function(result) {
                    next({ res: { data: result } });
                })
                .catch(function(e) {
                    next(e);
                })
        }
    },
    orderDelete: function(req, res, next) {
        orderModel.remove({ _id: { $in: req.body._ids } })
            .then(function(result) {
                next({ res: { error: 0, error_message: "", data: null } })
            }).catch(function(e) {
                next(e);
            })
    }
}





//生成16位订单码 6位随机数+时间戳
function createOrderCode() {
    var string = '';
    for (var i = 0; i < 6; i++) {
        string += parseInt(Math.random() * 10);
    }
    string += Math.round(new Date().getTime() / 1000);
    return string;
}

module.exports = OrderController;
