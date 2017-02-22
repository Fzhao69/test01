var _ = require('lodash');
module.exports = function(err, req, res, next) {
    var res_success = (typeof err === 'string' && err === 'res') || (typeof err === "object" && err.hasOwnProperty('res'));
    var method = req.method.toLowerCase();
    if (!res_success)
        return next(err);
    //格式化返回结果
    var data = typeof err === 'string' ? {} : err.res;
    //对于ajax请求，直接返回格式化好的数据
    if (req.xhr) {
        if (method === 'get') {
            return res.json(err.res);
        } else {
            if (!data.hasOwnProperty('data')) {
                return next(new Error("返回数据格式不合法"));
            }
            data.error =  data.hasOwnProperty('error') ? data.error : 0;
            data.err_message = data.hasOwnProperty("err_message") ? data.err_message : "";
            return res.json(data);
        }
    }

    var uri = req.path,
        template = uri;
    if (uri === '/') {
        template = 'index';
    } else if (uri === '/show_main_view') {
        template = 'main';
    }else {
        template = template.substr(1);
    }
    res.render(template, data);
}
