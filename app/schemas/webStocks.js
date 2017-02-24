var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var WebStocksSchema = new mongoose.Schema({
    name:String,
    code:String,
    original_price:Number,
    selling_price:Number,
    surplus:Number,
    total:Number,
    remark:String,
    create_time:Number,
    amount:Number,
    url:[{ type: Schema.Types.ObjectId, ref: "WebImg" }]
});
module.exports = WebStocksSchema;
