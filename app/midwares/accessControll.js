var mongoose = require('mongoose');
mongoose.Promise = require("bluebird");
var UserModel = require('../models/webUser');
module.exports = function(req, res, next) {
    var notCheck = ['/', '/show_main_view'];
    if ('/login' === req.path.substr(0, 6) || '/data' === req.path.substr(0,5)) {
        return next();
    }
    for (var i = 0; i < notCheck.length; i++) {
        if (notCheck[i] === req.path) {
            return next();
        }
    }
    if (req.session.user.name === 'admin') {
        return next();
    } else {
        var path = req.session.path.split(",");
        var status = false;
        for (var i = 0;i<path.length;i++){
        	if(path[i]===req.path){
        		return next();
        	}
        }
        res.render("error",{e_message:"拒绝访问"})

    }


}
