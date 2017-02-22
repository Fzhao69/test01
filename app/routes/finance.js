
var FinanceController = require("../controllers/finance");
var Router = require("express").Router();

Router.get('/money',FinanceController.showMoneyView);
Router.post("/money_add",FinanceController.moneyAdd);
Router.post('/money_edit',FinanceController.moneyEdit);
Router.delete("/money_delete",FinanceController.moneyDelete)
Router.get("/salary",FinanceController.showSalaryView);

Router.post("/salary_add",FinanceController.salaryAdd,FinanceController.salarySave);
Router.post("/salary_edit",FinanceController.salarySave);
Router.delete("/salary_delete",FinanceController.salaryDelete);
module.exports = Router;
