const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const hotModuleMiddleware = require("webpack-hot-middleware")
const config = require('../../webpack.dev.config')

const compiler = webpack(config)
const middlewareOptions = {
    publicPath: '/test/scripts/' // should match your webpack.dev.config
};

module.exports = {
    devMiddleware: webpackDevMiddleware(compiler, middlewareOptions),
    hotModuleMiddleware: hotModuleMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    })
}
