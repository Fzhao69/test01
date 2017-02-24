var mongoose = require("mongoose");
var WebImgSchmea = require("../schemas/webImg");

var WebImgModel = mongoose.model("WebImg",WebImgSchmea);
module.exports = WebImgModel;