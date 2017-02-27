var mongoose = require('mongoose');
var orderModel = require('../../models/webOrder');
var Promise = require('bluebird');
mongoose.Promise = Promise;


module.exports = function (req, res, next) {
    orderModel.findOne()
        .then(function (result) {
            if(result == null){
                var orderData = require("../../../data/orderData.json");
                return orderModel.create(orderData).then(function(){
                    next();
                })
            }
            next();
        })
        .catch(function (e) {
            next(e);
        })

}