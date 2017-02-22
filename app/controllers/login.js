var mongoose = require("mongoose");
var WebUserModel = mongoose.model("WebUser");


var LoginController = {
    showLoginView: function(req, res, next) {
        if (req.session.user) {
            return res.redirect("/");
        }
        var err = req.query.err ? req.query.err : "";
        res.render("login",{error:err})
    },
    checkLogin: function(req, res, next) {
        var login = req.body.login;
        WebUserModel.findOne({ name: login.name })
            .then(function(result) {
                if (!result) {
                    res.redirect("/login/login?err=用户名不存在")
                }
                if(result.password !== login.password){
                	res.redirect("/login/login?err=密码不正确")
                }
                req.session.user = login;
                req.session.path = result.menus;
                res.redirect("/")
            })
            .catch(function(e) {
                next(e);
            })
    },
    logOut:function(req,res,next){
    	delete req.session.user;
    	res.redirect("/login/login");
    }
}

module.exports = LoginController;
