const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge')
const webpack = require('webpack');
const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(baseConfig, {
    entry: {
        client: './client'
    },

    // output: {
    //     publicPath: path.resolve(__dirname, '../dist')
    // },

    plugins: [
        // new HtmlWebpackPlugin({ // 生成html，并自动引入js文件
        //     title: 'output management',
        //     template: path.join(__dirname, '../src/layout/layout.html')
        // }),
        new CleanWebpackPlugin(['dist']), // 每次打包清理dist文件夹
        // new webpack.HotModuleReplacementPlugin(), // 热加载
        // new UglifyJSPlugin() // tree shaking 不加载没有使用的模块
    ],

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
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
    }
})
