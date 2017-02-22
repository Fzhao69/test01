var mongoose = require("mongoose");
var WebMemberSchema = require("../schemas/webMember");

var WebMemberModel = mongoose.model("WebMember",WebMemberSchema);

module.exports = WebMemberModel;