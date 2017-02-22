var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var WebLogSchema = new mongoose.Schema({
	user:String,
	path:String,
	method:String,
	data:Schema.Types.Mixed,
	time:String,
	commodity:String,
	result:Boolean,
	number:Number
	
});

module.exports = WebLogSchema;
