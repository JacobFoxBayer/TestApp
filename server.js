
const express = require('express');
const compression = require('compression');
const path = require('path');
const pingPage = require('@monsantoit/ping-page');
const bodyParser = require('body-parser')
const {generateHtmlMiddleware} = require('@monsantoit/phoenix-html-middleware')
const bindingsMiddleware = require('./src/middleware/serviceBindings')

const graphqlDocsMiddleware = require('./src/middleware/graphqldocs')
const graphqlServer = require('./src/middleware/graphql')
const pkg = require('./package.json')

const appBaseUrl = '/test'
const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(compression());
app.get(`/ping|${appBaseUrl}/ping`, pingPage(pkg)); // for accessing through ocelot
app.use(`${appBaseUrl}/service-bindings`, bindingsMiddleware)
let localUser = null
if ( process.env.NODE_ENV !== 'production') {
    app.use(require('./src/middleware/cors'))
    localUser = process.env.USER
    const webpack = require('./src/middleware/webpack');
    app.use(webpack.devMiddleware);
    app.use(webpack.hotModuleMiddleware);
    app.get(`${appBaseUrl}/styles/style.css`, (req, res) =>
        res.send('/* when running locally, webpack embeds this in bundle.js */'))
}

app.use('/', (req, res, next) => {
    console.log('Got a request to: ', req.path)
    req.userId = req.headers['user-id'] || localUser
    req.clientId = req.headers['client-id']
    next()
})

app.use(`${appBaseUrl}/docs`, (req, res) => res.redirect('/v1/docs'))
app.use(`${appBaseUrl}/v1/docs`, graphqlDocsMiddleware(appBaseUrl))
app.use(`${appBaseUrl}/styles`, express.static(path.resolve(__dirname, './public/styles')));
app.use(`${appBaseUrl}/scripts`, express.static(path.resolve(__dirname, './public/scripts')));
app.use(`${appBaseUrl}/images`, express.static(path.resolve(__dirname, './public/images')));

app.get(
    `/*`,
    generateHtmlMiddleware(
        appBaseUrl,
        'test',
        ['test_local'],
        {defaultSuite: 'velocity', libType: 'material', materialVersion: '11.0.0'}
    )
)




app.use('/*', (err, req, res, next) => {
    console.error(err); // handle uncaught errors
    next();
});

const setupServer = () => {
    const port = parseInt(process.env.PORT || 3378, 10);
    const hostname = process.env.NODE_ENV === 'production' ? undefined : '127.0.0.1' // unlike default, only reachable from this machine
    const server = app.listen(port, hostname, () => {
        const address = server.address();
        const url = `http://${address.host || 'localhost'}:${port}`;
        console.info(`Listening at ${url}${appBaseUrl}/`);
        console.info(`GraphQL Explorer at ${url}${appBaseUrl}/v1/docs/explorer`)
    });

    return server
}


const start = async () => {
    
    await graphqlServer.start()
    graphqlServer.applyMiddleware({
        app,
        path: `${appBaseUrl}/v1/graphql`,
        cors: false,
    })
    

    return setupServer()
}



module.exports = {start}
