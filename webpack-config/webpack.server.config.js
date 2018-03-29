const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge')
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = merge(baseConfig, {
    entry: {
        server: './server.js'
    },
    
    output: {
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
                    {
                        loader: 'isomorphic-style-loader',
                    },
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
                        loader: 'sass-loader'
                    }
                ]
            } 
        ]
    },

    // ignore node_modules
    externals: [nodeExternals()]
})
