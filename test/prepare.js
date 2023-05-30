const prepare = require('mocha-prepare')
const config = require('../src/config/')

// mocha-prepare adds hooks for asynchronous setup. This allows the config library to
// initalize from multiple sources and processors prior to the test suite
// See: https://config.phoenix-tools-np.io/testing/
prepare((done) =>
    config
        .init()
        .then(() => done())
        .catch(done) // pass the error along so the call-stack shows what's up.
)