
var LogController = require("../controllers/log");
var Router = require("express").Router();
Router.get('/log',LogController.showLogView);
module.exports = Router;
