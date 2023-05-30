const _ = require('lodash');
const webpack = require('webpack')
const config = require('./webpack.config')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = _.chain(config)
.clone()
.extend({
    mode: 'development',
    entry: [
        'webpack-hot-middleware/client?path=http://localhost:3378/__webpack_hmr?reload=true',
        './src/scripts/main'
    ],
    module: {
            rules: [
                // {test: /\.json$/, use: 'json-loader'},
                {test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/},
                {
                    test: /\.(scss|css)$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: require('sass')
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                            name: "[name].[ext]",
                            outputPath: "fonts/",
                            },
                        },
                    ],
                },
            ]
    },
    devtool: 'inline-cheap-module-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new ReactRefreshPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin({
            resourceRegExp: /nodent|js-beautify/,
            contextRegExp: /ajv/
        })
    ],
    resolve: {
        extensions: [
            '.js',
            '.json',
            '.jsx',
        ],
        mainFields: ['main', 'module'],

        fallback:{
            "crypto": require.resolve("crypto-browserify"),
            "path": require.resolve("path-browserify"),
            "util": require.resolve("util/"),
            "buffer": require.resolve("buffer/")
        }
    }
})
.value();
