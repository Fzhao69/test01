module.exports = function(req,res,next){
	var err  = new Error("页面或服务不存在");
	err.status = 404;
	next(err);
}