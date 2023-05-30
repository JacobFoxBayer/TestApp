const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')


module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: [
        './src/scripts/main',
    ],
    module: {
        rules: [
            {test: /.json$/, use: 'json-loader'},
            {test: /.jsx?$/, use: 'babel-loader', exclude: /node_modules/},
            {
                test: /\.scss|\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
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
        ],
    },
    output: {
        filename: 'bundle.js',
        path: `${__dirname}/public/scripts/`,
        publicPath: '/test/scripts/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
        new webpack.IgnorePlugin({resourceRegExp: /nodent|js-beautify/}),
        new MiniCssExtractPlugin({
            filename: '../styles/style.css'
        }),
        
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({parallel: true})
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.json',
            '.jsx',
        ],
        mainFields: ['main', 'module']
    },
}
