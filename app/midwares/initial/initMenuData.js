var mongoose = require('mongoose');
var menuModel = require('../../models/webMenu')
var Promise = require('bluebird');
mongoose.Promise = Promise;


module.exports = function(req, res, next) {
    var menuData = require("../../../data/menuData.json")
    menuModel.findOne().then(function(result) {
        if (result == null) {
            return Promise.all(menuData.items.map(function(item) {
                return new Promise(function(resolve, reject) {
                    if (item.children) {
                        Promise.all(item.children.map(function(menu) {
                            return menuModel.create({
                                text: menu.text,
                                href: menu.href,
                                icon: menu.icon,
                                root: false
                            });
                        })).then(function(result) {
                            var children = result.map(function(doc) {
                                return doc._id;
                            });
                            return menuModel.create({
                                text: item.text,
                                href: item.href,
                                icon: item.icon,
                                children: children,
                                root: true
                            });
                        }).then(function() {
                            resolve()
                        }).catch(function(err) {
                            reject(err)
                        });
                    }
                });
            }));
        }
    }).then(function() {
        return next();
    }).catch(function(err) {
        return next(err);
    })
}
