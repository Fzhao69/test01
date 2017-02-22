
var IndexController = require("../controllers/index");
var Router = require("express").Router();
Router.get('/',IndexController.showFrameView);
Router.get("/show_main_view",IndexController.showMainView);
Router.get("/box_message",IndexController.getBoxMessage);
Router.get('/echarts_message_commodity',IndexController.getEchartsMessageCommodity);
Router.get("/echarts_message_commodity_money",IndexController.getEchartsMessageMoney);
module.exports = Router;
