const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge')
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(baseConfig, {
    entry: {
        server: './server.js'
    },
    
    output: {
        path: path.join(__dirname, '../build'),
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },

    target: 'node',

    node: {
        __filename: false,
        __dirname: false
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: ['react', 'env'],
                        plugins: [
                            'transform-es2015-modules-commonjs'
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'isomorphic-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    },
                ]

                // use: ExtractTextPlugin.extract({
                //     fallback: "isomorphic-style-loader",
                //     use: [{
                //             loader: 'css-loader',
                //             options: {
                //                 modules: true,
                //                 importLoaders: 1,
                //                 localIdentName: '[name]__[local]___[hash:base64:5]',
                //                 sourceMap: true
                //             }
                //         },
                //         {
                //             loader: 'sass-loader'
                //         }
                //     ]
                // })
            } 
        ]
    },
    // plugins: [
    //     new ExtractTextPlugin({
    //         filename: 'styles.css',
    //         allChunks: true
    //     }),
    // ],

    // ignore node_modules
    externals: [nodeExternals()]
})
