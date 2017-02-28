var mongoose = require("mongoose");
var WebOrderSchema = require("../schemas/webOrder");

var WebOrderModel = mongoose.model("WebOrder",WebOrderSchema);


module.exports = WebOrderModel;
