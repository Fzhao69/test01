var mongoose = require("mongoose");
var WebSalarySchema = require("../schemas/webSalary");

var WebSalaryModel = mongoose.model("WebSalary",WebSalarySchema);

module.exports = WebSalaryModel;