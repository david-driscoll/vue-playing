// setup JSDOM
require('jsdom-global')();

var Module = require('module').Module;
var modulePrototype = Module.prototype;
var originalRequire = modulePrototype.require;
modulePrototype.require = function(filePath) {
    if (filePath === 'source-map-support') {
        return { install: () => {} };
    }
    if (filePath === 'vue') {
        return {
            default: originalRequire(require.resolve('vue/dist/vue.common')),
            __esModule: true,
        };
    }
    if (filePath === 'vue-router') {
        return {
            default: originalRequire(require.resolve('vue-router')),
            __esModule: true,
        };
    }
    return originalRequire.call(this, filePath);
};

// vue.config.errorHandler = function(err) {
//     throw err;
// };

var chai = require('chai');
var sinonChai = require('sinon-chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

// make expect available globally
global.expect = chai.expect;
global.assert = chai.assert;
chai.should();
