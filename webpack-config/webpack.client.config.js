const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge')
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
    entry: {
        client: './client'
    },

    output: {
        publicPath: '/',
        path: path.join(__dirname, '../build'),
        filename: 'client.js'
    },

    devtool: 'inline-source-map', // source map

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s?css$/,
                // use: ExtractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: [{
                //         loader: "css-loader", // translates CSS into CommonJS
                //         options: {
                //             modules: true,
                //             importLoaders: 1,
                //             localIdentName: '[name]__[local]___[hash:base64:5]',
                //             sourceMap: true
                //         }
                //     }, {
                //         loader: "sass-loader" // compiles Sass to CSS
                //     },
                //     {
                //         loader: 'postcss-loader'
                //     }]
                // })
                use: [
                    'style-loader',
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
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
        ]
    },

    // plugins: [
    //     new ExtractTextPlugin({
    //         filename: 'styles.css',
    //         allChunks: true
    //     })
    // ],
})
