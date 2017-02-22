var fs = require("fs");
var path = require('path');


module.exports = function()
{
    var model_path = path.join(__dirname,"../app/models");

    fs.readdirSync(model_path).forEach(function(file){

        var newPath = model_path + path.sep + file;
        var stat = fs.statSync(newPath);
        if(stat.isFile() && /(.*)\.(js|coffee)/.test(file))
            return require(newPath);

        if(stat.isDirectory())
            loadModels(newPath);
    });
};