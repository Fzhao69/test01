var mongoose = require('mongoose');
var promise = require('bluebird');
mongoose.promise = promise;
var logModel = mongoose.model('WebLog');


var LogController = {
  showLogView:function(req,res,next){
        if (!req.xhr)
            return next('res');
        var param = req.query;
        var data = {};
        // console.log(param)
        if (param.timeStart != '' || param.timeEnd != '') {
            if (param.timeStart != '' && param.timeEnd != '') {
                data.time = { $gte: param.timeStart, $lt: param.timeEnd };
            } else if (param.timeStart != '' && param.timeEnd == '') {
                data.time = { $gte: param.timeStart };
            } else {
                data.time = { $lt: param.timeEnd };
            }
        }
        if (param.selectValue != '') {
            data.result = param.selectValue;
        }
        if (param.keyValue != '') {
            data.$or = [{ path: { $regex: param.keyValue } }, { user: { $regex: param.keyValue } }];
        }
        // console.log(data)
        logModel.find(data).sort({'_id':-1})
            .then(function(result) {
                var data = {
                    draw: 1,
                    recordsTotal: result.length,
                    recordsFiltered: result.length,
                    data: result
                }
                next({ res: data })
            })
            .catch(function(e) {
                next(e);
            })
  }
}

module.exports = LogController;
