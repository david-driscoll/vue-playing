const parser = require('vue-loader/lib/parser');

var Module = require('module').Module;
var modulePrototype = Module.prototype;
var originalRequire = modulePrototype.require;
modulePrototype.require = function(filePath) {
    if (filePath === 'source-map-support') {
        return { install: () => {} };
    }
    return originalRequire.call(this, filePath);
};
require('ts-node/register');

module.exports = function(wallaby) {
    return {
        files: [
            {
                pattern: 'client/**/*.*',
            },
        ],

        tests: [
            {
                pattern: 'test/**/*.spec.ts',
            },
        ],

        env: {
            type: 'node',
        },

        testFramework: 'mocha',

        preprocessors: {
            '**/*.vue': file => {
                const component = parser(file.content, file.path, true);
                const newPath = file.path + '.' + (component.script.lang || 'js');
                const map = component.script.map;
                file.rename(newPath);

                const code =
                    component.script.content +
                    `

(exports["default"].options || exports["default"]).template = decodeURIComponent('${encodeURIComponent(
                        component.template.content
                    )}');`;
                return { code, map };
            },
            '**/*.scss': f => '',
        },

        compilers: {
            '**/*.ts': wallaby.compilers.typeScript({}),
        },

        setup: function(wallaby) {
            require(wallaby.localProjectDir + '/test/setup.js');
            // window.__moduleBundler.loadTests();
            // wallaby.testFramework is jasmine/QUnit/mocha object
            // you can access 'window' object in a browser environment,
            // 'global' object or require(...) something in node environment
        },
    };
};
