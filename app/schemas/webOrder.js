var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var WebOrderSchema = new mongoose.Schema({
    order_code:{type:String,unique:true},
    amount:Number,
    status:Number,
    detail:String,
    finished_time:String,//完成订单时间
    create_time:String,//创建订单时间
    remark:String
});
module.exports = WebOrderSchema;
