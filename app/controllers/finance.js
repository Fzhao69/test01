var mongoose = require('mongoose');
var promise = require('bluebird');
mongoose.promise = promise;
var moneyModel = mongoose.model('WebMoney');
var stocksModel = mongoose.model('WebStocks');
var salaryModel = mongoose.model('WebSalary');
var orderModel = mongoose.model("WebOrder");
var logModel = mongoose.model("WebLog");
var moment = require('moment');
var FinanceController = {
    showMoneyView: function(req, res, next) {
        if (!req.xhr) {
            return next('res');
        }
        var data = {};
        moneyModel.find(data)
            .then(function(result) {
                var data = {
                    draw: req.query.draw,
                    recordsTotal: result.length,
                    recordsFiltered: result.length,
                    data: result
                }
                next({ res: data })
            })
            .catch(function(e) {
                next(e);
            })
    },
    moneyAdd: function(req, res, next) {
        var money = req.body.money;
        delete money._id;
        money.other_amount = money.other_amount * 100;
        money.start_time = moment(new Date()).startOf('month').unix();
        money.end_time = moment(new Date()).unix();
        orderModel.find({ finished_time: { $gte: money.start_time, $lt: money.end_time }, status: 1 })
            .then(function(result) {
                var amount = 0;
                for (var i = 0; i < result.length; i++) {
                    amount += result[i].amount;
                }
                money.order_amount = amount;
            })
            .then(
                salaryModel.find({})
                .then(function(result) {
                    var amount = 0;
                    for (var i = 0; i < result.length; i++) {
                        amount += result[i].salary;
                    }
                    money.salary_amount = amount;
                })
            )
            .then(
                stocksModel.find({})
                .then(function(result) {
                    var amount = 0;
                    for (var i = 0; i < result.length; i++) {
                        amount += result[i].amount;
                    }
                    money.commodity_amount = amount;
                })
            )
            .then(function() {
                return moneyModel.find({ start_time: { $gte: money.start_time }, end_time: { $lte: money.end_time } })
                    .then(function(result) {
                        var remark = '';
                        var amount = 0;
                        for (var i = 0; i < result.length; i++) {
                            amount += parseInt(result[i].other_amount);
                            if (i == 0) { remark = result[0].remark; } else { remark += (result[i].remark + ','); }

                        }
                        money.other_amount = parseInt(money.other_amount) + parseInt(amount);
                        if (remark == '') {
                            money.remark = money.remark;
                        } else {
                            money.remark = money.remark + ',' + remark;
                        }

                    })
            })
            .then(function() {
                return moneyModel.remove({ start_time: { $gte: money.start_time }, end_time: { $lte: money.end_time } })
                    .then(function() {})
            })
            .then(function() {
                moneyModel.create(money)
                    .then(function(result) {
                        return next({ res: { data: result } })
                    })
            })
            .catch(function(e) {
                next(e);
            })
    },
    moneyEdit: function(req, res, next) {
        var id = req.body.money._id;
        delete req.body.money._id;
        moneyModel.update({ _id: id }, req.body.money)
            .then(function(result) {
                next({ res: { data: result } });
            })
            .catch(function(e) {
                next(e);
            })
    },
    moneyDelete: function(req, res, next) {
        moneyModel.remove({ _id: { $in: req.body._ids } })
            .then(function(result) {
                next({ res: { error: 0, error_message: "", data: null } })
            }).catch(function(e) {
                next(e);
            })
    },
    showSalaryView: function(req, res, next) {
        if (!req.xhr)   
            return next("res");
        var param = req.query;
        var data = {};
        if (param.keyValue != '') {
            data.$or = [{ name: { $regex: param.keyValue } }, { job: { $regex: param.keyValue } }];
        }
        salaryModel.find(data)
            .then(function(result) {
                var data = {
                    draw: req.query.draw,
                    recordsTotal: result.length,
                    recordsFiltered: result.length,
                    data: result
                }
                next({ res: data })
            })
            .catch(function(e) {
                next(e);
            })
    },
    salaryAdd: function(req, res, next) {
        var salary = req.body.salary;
        salaryModel.count({ name: salary.name, job: salary.job })
            .then(function(result) {
                if (result > 0) {
                    logModel.find({}).sort({ 'time': -1 }).limit(1)
                        .then(function(re) {
                            var id = re[0]._id;
                            return logModel.findOneAndUpdate({ _id: id }, { result: false })
                        })
                    return next({ res: { error: 1, error_message: "该员工&emsp;" + salary.name + '&emsp;已存在', data: null } })
                }
                next();
            })
            .catch(function(e) {
                next(e);
            })
    },
    salarySave: function(req, res, next) {
        var salary = req.body.salary;
        var _id = salary._id;
        salary.salary = salary.salary * 100;
        delete salary._id;
        if (_id.length > 0) {
            salaryModel.update({ _id: _id }, salary)
                .then(function(result) {
                    next({ res: { data: result } });
                })
                .catch(function(e) {
                    next(e);
                })
        } else {
            salaryModel.create(salary)
                .then(function(result) {
                    next({ res: { data: result } });
                })
                .catch(function(e) {
                    next(e);
                })
        }
    },
    salaryDelete: function(req, res, next) {
        salaryModel.remove({ _id: { $in: req.body._ids } })
            .then(function(result) {
                next({ res: { error: 0, error_message: "", data: null } })
            }).catch(function(e) {
                next(e);
            })
    }
}

module.exports = FinanceController;
