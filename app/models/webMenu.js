var mongoose = require("mongoose");
var WebMenuSchema = require("../schemas/webMenu");

var WebMenuModel = mongoose.model("WebMenu",WebMenuSchema);

module.exports = WebMenuModel;