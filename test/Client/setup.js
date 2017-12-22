// setup JSDOM
require('jsdom-global')();

var chai = require('chai');
var sinonChai = require("sinon-chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.use(sinonChai);

// make expect available globally
global.expect = chai.expect;
global.assert = chai.assert;
chai.should();
