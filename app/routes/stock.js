var StockController = require("../controllers/stock");
var Router = require("express").Router();
var multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/stock_img/');
    },
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
var upload = multer({
    storage: storage
});
Router.get("/stock", StockController.showStockList);
Router.get('/stock_manage', StockController.showStocManagekList);
Router.post("/stock_manage_add", StockController.stockManageAdd, StockController.stockManageSave);
Router.post("/stock_manage_edit", StockController.stockManageEdit, StockController.stockManageSave);
Router.post("/stock_img_upload", upload.single("file"), StockController.stockImgUpload);
Router.post("/stock_manage_minus", StockController.stockManageMinus, StockController.stockManageSave);
Router.post("/stock_manage_plus", StockController.stockManagePlus, StockController.stockManageSave);
Router.delete("/stock_manage_delete", StockController.stockManageDelete);
module.exports = Router;