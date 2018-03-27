const path = require('path');
// // 获取src下的文件目录
// const entryPath = path.join(__dirname, 'src/entry');
// const files = fs.readdirSync(entryPath);
// const entry = files.reduce((acce, filename) => {
//     acce[path.basename(filename, '.js')] = path.join(entryPath, filename);
//     return acce;
// } , {})

module.exports = {
    // entry: {
    //     client: path.join(__dirname, 'src/entry/client.js')
    // },

    // entry 相对的路径
    context: path.resolve(__dirname, '../src/entry'),

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },

    // devtool: 'inline-source-map', // source map

    /**
     * 以下都是需要下载的
     */
    // devServer: { // dev-server服务器
    //     contentBase: './dist',
    //     hot: true // 热加载
    // },

    resolve: {
        alias: {
            component: path.join(__dirname, '../src/component/')
        },
        extensions: ['.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}
