var mongoose = require('mongoose');
var promise = require('bluebird');
mongoose.promise = promise;
var userModel = mongoose.model('WebUser');
var menuModel = mongoose.model("WebMenu");
var logModel = mongoose.model('WebLog');
var moment = require('moment');
var UserController = {
    showUserView: function(req, res, next) {
        if (!req.xhr) {
            menuModel.find({ root: true })
                .populate({
                    path: 'children'
                })
                .then(function(result) {
                    next({ res: { menus: result } });
                })
                .catch(function(e) {
                    next(e);
                })
        } else {
            userModel.find({})
                .then(function(result) {
                    var data = {
                        draw: req.query.draw,
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
    },
    userAdd: function(req, res, next) {
        var user = req.body.user;
        delete user._id;
        user.password = '888888';
        userModel.count({ name: user.name })
            .then(function(result) {
                if (result > 0) {
                    logModel.find({}).sort({ 'time': -1 }).limit(1)
                        .then(function(re) {
                            var id = re[0]._id;
                            return logModel.findOneAndUpdate({ _id: id }, { result: false })
                        })
                    return next({ res: { error: 1, error_message: "用户名：" + user.name + "&emsp;已存在", data: null } })
                }
            })
            .then(function() {
                return userModel.create(user).then(function(result) {
                    next({ res: { data: result } });
                })
            })
            .catch(function(e) {
                next(e);
            })
    },
    userEdit: function(req, res, next) {
        console.log(req.body.user);
        var user = req.body.user;
        if (!user.menus)
            user.menus = '';
        if (user.name == 'admin') {
            logModel.find({}).sort({ 'time': -1 }).limit(1)
                .then(function(re) {
                    var id = re[0]._id;
                    return logModel.findOneAndUpdate({ _id: id }, { result: false })
                })
            return next({ res: { error: 1, error_message: "超级管理员无法修改", data: null } })
        } else {
            userModel.count({ name: user.name, _id: { $ne: user._id } })
                .then(function(result) {
                    if (result > 0) {
                        return next({ res: { error: 1, error_message: "用户名：" + user.name + "&emsp;已存在", data: null } })
                    }
                })
                .then(function() {
                    var id = user._id;
                    delete user._id;
                    return userModel.update({ _id: id }, user)
                        .then(function(result) {
                            next({ res: { data: result } });
                        })
                })
                .catch(function(e) {
                    next(e);
                })
        }

    },
    userDelete: function(req, res, next) {
        userModel.remove({ _id: { $in: req.body._ids } })
            .then(function(result) {
                next({ res: { error: 0, error_message: "", data: null } })
            }).catch(function(e) {
                next(e);
            })
    },
    changePassword:function(req,res,next){
        userModel.update({name:req.session.user.name},{password:req.body.password})
            .then(function(result){
                res.json({error:0,error_message:"",data:null});
            })
            .catch(function(e){
                next(e);
            })
    },
    getMessage:function(req,res,next){
        userModel.find({name:req.session.name})
            .then(function(result){
                res.json({error:0,error_message:"",data:result});
            })
            .catch(function(e){
                next(e);
            })
    }
}
module.exports = UserController;
