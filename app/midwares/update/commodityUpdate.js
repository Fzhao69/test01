var mongoose = require('mongoose');
var promise = require('bluebird');
mongoose.promise = promise;
var stocksModel = mongoose.model('WebStocks');
var moment = require('moment');
module.exports = function(req, res, next) {
    var result = moment(moment(new Date()).format('YYYY-MM-DD')).isSame(moment(new Date()).startOf('month').format("YYYY-MM-DD"), 'day');
    if (result) {
        stocksModel.update({}, { amount: 0 }, { multi: true })
            .then(function(e) {
                next();
            })
            .catch(function(e) {
                next(e);
            })
    } else {
        next();
    }
}
