
var OrderController = require("../controllers/order");
var Router = require("express").Router();

Router.get('/order',OrderController.showOrderView);
Router.post("/order_add",OrderController.orderAdd,OrderController.orderSave);
Router.post("/order_edit",OrderController.orderEdit,OrderController.orderSave);
Router.delete("/order_delete",OrderController.orderDelete);
module.exports = Router;
