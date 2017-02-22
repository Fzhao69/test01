
var UserController = require("../controllers/user");
var Router = require("express").Router();

Router.get("/user",UserController.showUserView);
Router.get("/message",UserController.getMessage)
Router.post("/changepsw",UserController.changePassword);
Router.post("/user_add",UserController.userAdd);
Router.post("/user_edit",UserController.userEdit);
Router.delete("/user_delete",UserController.userDelete);
module.exports = Router;
