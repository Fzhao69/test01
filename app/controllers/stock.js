var mongoose = require('mongoose');
var promise = require('bluebird');
mongoose.promise = promise;
var stocksModel = mongoose.model('WebStocks');
var logModel = mongoose.model('WebLog');
var imgModel = mongoose.model("WebImg");

var StockController = {
    showStocManagekList: function (req, res, next) {
        if (!req.xhr)
            return next('res');
        var data = {};
        if (req.query.keyValue != '') {
            data.$or = [{
                name: {
                    $regex: req.query.keyValue
                }
            }, {
                code: {
                    $regex: req.query.keyValue
                }
            }];
        }
        if (req.query.timeStart != '' || req.query.timeEnd != '') {
            if (req.query.timeStart != '' && req.query.timeEnd != '') {
                data.create_time = {
                    $gte: req.query.timeStart,
                    $lt: req.query.timeEnd
                };
            } else if (req.query.timeStart != '' && req.query.timeEnd == '') {
                data.create_time = {
                    $gte: req.query.timeStart
                };
            } else {
                data.create_time = {
                    $lt: req.query.timeEnd
                };
            }
        }
        stocksModel.find(data)
            .populate({
                path: "url"
            })
            .then(function (result) {
                var data = {
                    draw: 1,
                    recordsTotal: result.length,
                    recordsFiltered: result.length,
                    data: result
                }
                next({
                    res: data
                })
            })
            .catch(function (e) {
                next(e);
            })
    },
    //图片上传
    stockImgUpload: function (req, res, next) {
        // console.log(req.file);
        imgModel.create({
            url: "img/stock_img/" + req.file.filename
        }).then(function (result) {
            next({
                res: {
                    data: result
                }
            });
        }).catch(function (e) {
            next(e);
        })
    },
    stockManageAdd: function (req, res, next) {
        var stock = req.body.stock;
        stock.original_price = stock.original_price * 100;
        stock.selling_price = stock.selling_price * 100;
        stock.create_time = Math.round(new Date().getTime() / 1000);
        stock.amount = -stock.original_price * stock.total;
        stock.surplus = stock.total;
        stocksModel.count({
                name: stock.name,
                code: stock.code
            })
            .then(function (result) {
                if (result > 0) {
                    logModel.find({}).sort({
                            'time': -1
                        }).limit(1)
                        .then(function (re) {
                            var id = re[0]._id;
                            return logModel.findOneAndUpdate({
                                _id: id
                            }, {
                                result: false
                            })
                        })
                    return next({
                        res: {
                            error: 1,
                            error_message: "商品：" + stock.name + '&emsp;编码：' + stock.code + "&emsp;已存在",
                            data: null
                        }
                    })
                }
                next();
            })
            .catch(function (e) {
                next(e);
            })
    },
    stockManageEdit: function (req, res, next) {
        var stock = req.body.stock;
        stock.original_price = stock.original_price * 100;
        stock.selling_price = stock.selling_price * 100;
        delete stock.amount;
        stocksModel.count({
                name: stock.name,
                code: stock.code,
                _id: {
                    $ne: stock._id
                }
            })
            .then(function (result) {
                if (result > 0) {
                    logModel.find({}).sort({
                            'time': -1
                        }).limit(1)
                        .then(function (re) {
                            var id = re[0]._id;
                            return logModel.findOneAndUpdate({
                                _id: id
                            }, {
                                result: false
                            })
                        })
                    return next({
                        res: {
                            error: 1,
                            error_message: "商品：" + stock.name + '&emsp;编码：' + stock.code + "&emsp;已存在",
                            data: null
                        }
                    })
                }
                next();
            })
            .catch(function (e) {
                next(e);
            })
    },
    stockManageMinus: function (req, res, next) {
        var stock = req.body.stock;
        stock.original_price = stock.original_price * 100;
        stock.selling_price = stock.selling_price * 100;
        stock.amount = parseInt(stock.amount * 100) + parseInt(stock.surplus) * (parseInt(stock.selling_price) - parseInt(stock.original_price));
        stocksModel.find({
                _id: stock._id
            })
            .then(function (result) {
                var surplus = result[0].surplus;
                if (surplus < stock.surplus) {
                    logModel.find({}).sort({
                            'time': -1
                        }).limit(1)
                        .then(function (re) {
                            var id = re[0]._id;
                            return logModel.findOneAndUpdate({
                                _id: id
                            }, {
                                result: false
                            })
                        })
                    return next({
                        res: {
                            error: 1,
                            error_message: "商品库存不足",
                            data: null
                        }
                    })
                }
                stock.surplus = surplus - stock.surplus;
                next();
            }).catch(function (e) {
                next(e);
            })

    },
    stockManagePlus: function (req, res, next) {
        var stock = req.body.stock;
        stock.original_price = stock.original_price * 100;
        stock.selling_price = stock.selling_price * 100;
        stock.amount = parseInt(stock.amount) * 100 - parseInt(stock.surplus) * parseInt(stock.original_price);
        stock.total = parseInt(stock.total) + parseInt(stock.surplus);
        stocksModel.find({
                _id: stock._id
            })
            .then(function (result) {
                stock.surplus = result[0].surplus + parseInt(stock.surplus);
                next();
            }).catch(function (e) {
                next(e);
            })
    },
    stockManageSave: function (req, res, next) {
        var stock = req.body.stock;
        var _id = stock._id;
        delete stock._id;
        if (_id.length < 1) {
            stocksModel.create(stock)
                .then(function (result) {
                    next({
                        res: {
                            data: result
                        }
                    })
                })
                .catch(function (e) {
                    next(e);
                })
        } else {
            stocksModel.update({
                    _id: _id
                }, stock)
                .then(function (result) {
                    next({
                        res: {
                            data: result
                        }
                    })
                })
                .catch(function (e) {
                    next(e);
                })
        }
    },
    stockManageDelete: function (req, res, next) {
        stocksModel.remove({
                _id: {
                    $in: req.body._ids
                }
            })
            .then(function (result) {
                next({
                    res: {
                        error: 0,
                        error_message: "",
                        data: null
                    }
                })
            }).catch(function (e) {
                next(e);
            })
    },
    showStockList: function (req, res, next) {
        if (!req.xhr)
            return next('res');
        var param = req.query;
        var data = {};
        data.path = {
            $regex: param.selectValue
        }
        // console.log(param)
        if (param.timeStart != '' || param.timeEnd != '') {
            if (param.timeStart != '' && param.timeEnd != '') {
                data.time = {
                    $gte: param.timeStart,
                    $lt: param.timeEnd
                };
            } else if (param.timeStart != '' && param.timeEnd == '') {
                data.time = {
                    $gte: param.timeStart
                };
            } else {
                data.time = {
                    $lt: param.timeEnd
                };
            }
        }

        if (param.keyValue != '') {
            data.$or = [{
                commodity: {
                    $regex: param.keyValue
                }
            }, {
                user: {
                    $regex: param.keyValue
                }
            }];
        }
        // console.log(data)
        logModel.find(data).sort({
                'time': -1
            })
            .then(function (result) {
                var data = {
                    draw: 1,
                    recordsTotal: result.length,
                    recordsFiltered: result.length,
                    data: result
                }
                next({
                    res: data
                })
            })
            .catch(function (e) {
                next(e);
            })
    }
}

module.exports = StockController;