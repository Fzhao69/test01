var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var WebUserSchema = new mongoose.Schema({
    name:{type:String,unique:true},
    description:String,
    password:String,
    email:String,
    menus:String,
});
module.exports = WebUserSchema;
