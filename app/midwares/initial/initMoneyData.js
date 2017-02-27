var mongoose = require('mongoose');
var moneyModel = require('../../models/webMoney');
var Promise = require('bluebird');
mongoose.Promise = Promise;


module.exports = function (req, res, next) {
    moneyModel.findOne()
        .then(function (result) {
            if (result == null) {
                var moeneyData = require("../../../data/moneyData.json");
                return moneyModel.create(moeneyData).then(function () {
                    next();
                })
            }
            next();
        })
        .catch(function (e) {
            next(e);
        })

}