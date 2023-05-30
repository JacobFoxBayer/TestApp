const _ = require('lodash')

const resolvers = {
    Query: {
    },

    Mutation: {
    }
}

const exampleResolver = require('./example')
module.exports = _.merge(resolvers, exampleResolver)