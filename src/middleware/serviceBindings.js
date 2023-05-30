const bindingsMiddleware = require('@monsantoit/phoenix-service-bindings-middleware')
// Docs: https://github.platforms.engineering/Phoenix/service-bindings-middleware
const config = require('../config')
// default service bindings. Use this to override the default service values.
const defaultServiceBindings = config.config

 // Data bindings are for data beyond service urls that you want to send to the
 // client.
 // For example, `localOcelot` tells the Profile Client that local ocelot
 // instance is running, and we should fetch a token.
const dataBindings = {
    localOcelot: true
}

module.exports = bindingsMiddleware(defaultServiceBindings, dataBindings)