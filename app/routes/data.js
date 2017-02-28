var DataController = require("../controllers/data");
var Router = require("express").Router();
Router.get('/getdata',DataController.getData);
Router.get('/postData',DataController.postData);
module.exports = Router;
