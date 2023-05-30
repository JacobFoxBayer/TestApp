const fs = require('fs')
const graphqlDocs = require('@monsantoit/graphql-docs')
const path = require('path')

const overviewMarkdown = fs.readFileSync(path.resolve(__dirname, '../../README.md'), 'utf-8')

module.exports = (appBaseUrl) => graphqlDocs({
    name: 'test',
    baseUrl: `${appBaseUrl}/v1/docs`,
    graphUrl: `${appBaseUrl}/v1/graphql`,
    headerColor: '#65a4c3',
    pages: [
        {title: 'Overview', type: 'markdown', url: '/', markdown: overviewMarkdown},
        {title: 'Explorer', type: 'graphiql', url: '/explorer'},
        {title: 'Diagram', type: 'navigator', url: '/diagram'},
    ]
})