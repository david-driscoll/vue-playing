// setup JSDOM
require('jsdom-global')();

// Have to shim here for tests
const vueFull = require('vue/dist/vue.common');
vueFull.default = vueFull;
vueFull.full = 'full';

const vue = require('vue');
const vueRouter = require('vue-router');
vueRouter.default = vueRouter;
Object.assign(vue, vueFull);

vue.config.errorHandler = function(err) {
    throw err;
};

var chai = require('chai');
var sinonChai = require('sinon-chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

// make expect available globally
global.expect = chai.expect;
global.assert = chai.assert;
chai.should();
