var mongoose = require("mongoose");
var WebLogSchema = require("../schemas/webLog");

var WebLogModel = mongoose.model("WebLog",WebLogSchema);
module.exports = WebLogModel;