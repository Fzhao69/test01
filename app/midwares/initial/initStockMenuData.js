var mongoose = require('mongoose');
var stockModal = require('../../models/webStocks');
var Promise = require('bluebird');
var imgModal = require("../../models/webImg");
mongoose.Promise = Promise;


module.exports = function (req, res, next) {
    stockModal.findOne()
        .then(function (result) {
            if (result == null) {
                return imgModal.create({
                    url: "img/stock_img/1.jpg"
                })
            }
        })
        .then(function (result) {
            if (result == undefined) {
                return next();
            } else {
                var stockData = require("../../../data/stockData.json");
                for (var i = 0; i < stockData.length; i++) {
                    stockData[i].create_time = Math.round(new Date().getTime() / 1000);
                    stockData[i].url = result._id;
                }
                return stockModal.create(stockData)
                    .then(function () {
                        next();
                    })
            }
        })
        .catch(function (e) {
            next(e);
        })

}