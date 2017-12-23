var nyc = require('nyc');
var libReport = require('./node_modules/nyc/node_modules/istanbul-lib-report');
var fs = require('fs');

// this is a giant hack to make nyc work with vue properly
// All this is for is so that we can contribute a custom sourceFinder which deals with
// the extranious names
var cc = libReport.createContext;
libReport.createContext = function () {
    var reuslt = cc.apply(this, arguments);
    reuslt.sourceFinder = function (path) {
        try {
            if (path.indexOf('.vue.ts') > -1) {
                return fs.readFileSync(path.substr(0, path.length - 3), 'utf8');
            }
            return fs.readFileSync(path, 'utf8');
        } catch (ex) {
            throw new Error('Unable to lookup source: ' + path + '(' + ex.message + ')');
        }
    };
    return reuslt;
}

require('./node_modules/nyc/bin/nyc');
