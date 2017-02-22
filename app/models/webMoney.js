var mongoose = require("mongoose");
var WebMoneySchema = require("../schemas/webMoney");

var WebMoneyModel = mongoose.model("WebMoney",WebMoneySchema);

module.exports = WebMoneyModel;