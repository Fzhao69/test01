var mongoose = require('mongoose');
var salaryModel = require('../../models/webSalary');
var Promise = require('bluebird');
mongoose.Promise = Promise;


module.exports = function (req, res, next) {
    salaryModel.findOne()
        .then(function (result) {
            if(result == null){
                var salaryData = require("../../../data/salaryData.json");
                return salaryModel.create(salaryData).then(function(){
                    next();
                })
            }
            next();
        })
        .catch(function (e) {
            next(e);
        })

}