
var StockController = require("../controllers/stock");
var Router = require("express").Router();

Router.get("/stock",StockController.showStockList);
Router.get('/stock_manage',StockController.showStocManagekList);
Router.post("/stock_manage_add",StockController.stockManageAdd,StockController.stockManageSave);
Router.post("/stock_manage_edit",StockController.stockManageEdit,StockController.stockManageSave);
Router.post("/stock_manage_minus",StockController.stockManageMinus,StockController.stockManageSave);
Router.post("/stock_manage_plus",StockController.stockManagePlus,StockController.stockManageSave);
Router.delete("/stock_manage_delete",StockController.stockManageDelete);
module.exports = Router;
