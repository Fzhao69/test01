var mongoose = require("mongoose");
var WebStocksSchema = require("../schemas/webStocks");

var WebStocksModel = mongoose.model("WebStocks",WebStocksSchema);

module.exports = WebStocksModel;