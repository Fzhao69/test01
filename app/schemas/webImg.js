var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var WebImgSchema = new mongoose.Schema({
    url:String
})


module.exports = WebImgSchema;