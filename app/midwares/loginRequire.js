module.exports = function(req,res,next){
	if('/login' === req.path.substr(0,6) || '/img' === req.path.substr(0,4)|| '/data'===req.path.substr(0,5)){
	return next();
	}
	if(!req.session.user){
		return res.redirect('/login/login')
	}
	next();
}