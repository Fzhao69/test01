var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var WebStocksSchema = new mongoose.Schema({
    name:String,
    job:String,
    salary:Number,
    remark:String
});
module.exports = WebStocksSchema;
