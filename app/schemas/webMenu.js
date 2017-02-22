var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

mongoose.Promise = require('bluebird');

var WebMenuSchema = new mongoose.Schema({
    text: String,
    href: String,
    root: Boolean, //是否为根目录
    icon: String,
    children: [{ type: ObjectId, ref: "WebMenu" }] //当前仅支持二级菜单
});

WebMenuSchema.statics = {


    findAllMenus: function() {
        return this.find({ root: true })
            .populate({
                path: 'children'
            }).exec();
    }
};


module.exports = WebMenuSchema;
