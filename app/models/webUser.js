var mongoose = require("mongoose");
var WebUserSchema = require("../schemas/webUser");

var WebUserModel = mongoose.model("WebUser",WebUserSchema);
WebUserModel.ERROR_NO_USER = 1;
WebUserModel.ERROR_PSWERROR = 2;
WebUserModel.LOGIN_MESSAGE = ["",'用户名不存在','密码不正确'];
module.exports = WebUserModel;