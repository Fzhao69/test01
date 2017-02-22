var logModel = require("../models/webLog");
module.exports = function(req, res, next) {
    if (req.path.match('edit') || req.path.match('add') || req.path.match('delete') || req.path.match('minus') || req.path.match('plus')) {
        var commodity = "";
        var number = '';
        if (req.path.match("manage") && !req.path.match('delete')) {
            commodity = req.body.stock.name;
            number = req.body.stock.surplus;
        }
        if(req.path.match('delete')){
            commodity = req.body.names;
        }
        logModel.create({
                user: req.session.user.name,
                path: req.path,
                method: req.method,
                data: req.body,
                time: Math.round(new Date().getTime() / 1000),
                commodity: commodity,
                number: number,
                result: true
            })
            .then(function(result) {
                next();
            }).catch(function(e) {
                next(e);
            })
    } else {
        next();
    }

}
