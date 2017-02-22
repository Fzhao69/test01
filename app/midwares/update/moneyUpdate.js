var mongoose = require('mongoose');
var promise = require('bluebird');
mongoose.promise = promise;
var moneyModel = mongoose.model('WebMoney');
var moment = require('moment');
module.exports = function(req, res, next) {
    var start_time = moment(new Date()).startOf('month').unix();
    var end_time = moment(new Date()).unix();
    if (req.path == '/login/login') {
        moneyModel.findOneAndUpdate({ start_time: { $gte:start_time }, end_time: { $lte: end_time }},{end_time:end_time})
            .then(function(result){
                next();
            })
            .catch(function(e){
                next(e)
            })
    } else {
        next();
    }
}
