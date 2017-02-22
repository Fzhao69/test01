module.exports = function(err, req, res, next) {
    var error = err.status || 500;
    var error_message = err.message;
    if (req.xhr) {
        return res.json({ error: error, error_message: error_message, data: null });
    }

    res.locals.e_message = error;
    res.locals.e_status = error_message;
    res.status(res.locals.e_status);
    res.render('error');
}
