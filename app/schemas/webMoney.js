var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var WebMoneySchema = new mongoose.Schema({
    order_amount:Number,
    commodity_amount:Number,
    salary_amount:Number,
    other_amount:Number,
    start_time:String,//起始时间
    end_time:String,//结束时间
    remark:String
});
module.exports = WebMoneySchema;
