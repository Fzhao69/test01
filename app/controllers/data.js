var mongoose = require('mongoose');
var promise = require('bluebird');
mongoose.promise = promise;
var stocksModel = mongoose.model('WebStocks');
var orderModel = mongoose.model("WebOrder");
var DataController = {
    getData: function (req, res, next) {
        var find = {};
        var sort = {
            "selling_price": -1
        };
        if (req.query.amount != undefined && req.query.amount == "up") {
            sort = {
                'selling_price': 1
            };
        }
        if (req.query.name != undefined) {
            find = {
                name: {
                    $regex: req.query.name
                }
            };
        }
        stocksModel.find(find).sort(sort)
            .populate("url")
            .then(function (result) {
                res.json({
                    data: result
                });
            })
            .catch(function (e) {
                res.json(e);
            })
    },
    postData: function (req, res, next) {
        // console.log(req.query);
        var data = {
            order_code: createOrderCode(),
            amount: parseInt(req.query.amount) * 100,
            status: 0,
            remark: "",
            create_time: Math.round(new Date().getTime() / 1000),
            detail: req.query.detail
        }
        orderModel.create(data)
            .then(function(result){
                res.json({error:0,error_message:""});
            })
            .catch(function(e){
                res.json({error:1,error_message:e});
            })
    }
}

module.exports = DataController;

function createOrderCode() {
    var string = '';
    for (var i = 0; i < 6; i++) {
        string += parseInt(Math.random() * 10);
    }
    string += Math.round(new Date().getTime() / 1000);
    return string;
}