var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var WebMemberSchema = new mongoose.Schema({
    name:String,
    job:String,
    salary:Number
});

module.exports = WebMemberSchema;
