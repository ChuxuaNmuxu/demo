const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// 获取src下的文件目录
const entryPath = path.join(__dirname, 'src/entry');
const files = fs.readdirSync(entryPath);
const entry = files.reduce((acce, filename) => {
    acce[path.basename(filename, '.js')] = path.join(entryPath, filename);
    return acce;
} , {})

module.exports = {
    // entry,
    entry: [
        'webpack-dev-server/client?http://localhost:8080/',
        path.join(__dirname, './src/entry/app.js')
    ],

    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, './dist')
    },

    devtool: 'inline-source-map', // source map

    devServer: { // dev-server服务器
        contentBase: './dist',
        hot: true // 热加载
    },

    resolve: {
        alias: {
            component: path.join(__dirname, 'src/component/')
        },
        extensions: ['.js', '.jsx']
    },

    plugins: [
        new HtmlWebpackPlugin({ // 生成html，并自动引入js文件
            title: 'output management',
            template: path.join(__dirname, 'src/layout/layout.html')
        }), 
        // new CleanWebpackPlugin(['dist']), // 每次打包清理dist文件夹
        new webpack.HotModuleReplacementPlugin() // 热加载
        // new UglifyJSPlugin() // tree shaking 不加载没有使用的模块
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
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
}
