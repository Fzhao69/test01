
var LoginController = require("../controllers/login");
var Router = require("express").Router();
Router.get('/login',LoginController.showLoginView);
Router.post('/check_login',LoginController.checkLogin);
Router.get("/logout",LoginController.logOut);
module.exports = Router;
