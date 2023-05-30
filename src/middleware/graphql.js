const { ApolloServer } = require('apollo-server-express')
const {makeExecutableSchema} = require('graphql-tools')
const fs = require('fs')
const path = require('path')
const resolvers = require('../api/resolvers')

const schema = makeExecutableSchema({
    typeDefs: fs.readFileSync(path.resolve(__dirname, '../api/schema.graphqls'), 'utf-8'),
    resolvers: resolvers
})

module.exports = new ApolloServer({
    schema,
    context: ({req}) => ({
        clientId: req.clientId,
        userId: req.userId
    }),
    introspection: true,
})
