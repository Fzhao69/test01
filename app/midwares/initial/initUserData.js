var mongoose = require('mongoose');
var Promise = require('bluebird');
var UserModel = require("../../models/webUser");
mongoose.Promise = Promise;

module.exports = function(req, res, next) {
    UserModel.findOne().then(function(result) {
            if (result == null) {
                return UserModel.create({
                    name: "admin",
                    password: "admin",
                    email: "123456789@qq.com",
                    menus: '',
                    description:"超级管理员"
                })
            }
            next()
        })
        .catch(function(e) {
            next(e);
        })

}
