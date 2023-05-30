const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

// example of using the should DSL without having to import it anywhere
// see chai docs
global.should = chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);
global.sinon = sinon;


const {JSDOM} = require('jsdom')
// mocha re-executes every time so we need to create this lazily
if (!global.document) {
    const dom = new JSDOM('<html><head></head><body></body></html>');
    global.document = dom.window.document
    global.window = dom.window;
    global.navigator = dom.window.navigator
}
