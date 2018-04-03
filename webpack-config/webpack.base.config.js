const CleanWebpackPlugin = require('clean-webpack-plugin');

const path = require('path');
// // 获取src下的文件目录
// const entryPath = path.join(__dirname, 'src/entry');
// const files = fs.readdirSync(entryPath);
// const entry = files.reduce((acce, filename) => {
//     acce[path.basename(filename, '.js')] = path.join(entryPath, filename);
//     return acce;
// } , {})

module.exports = {
    // 编译时输出信息配置
    stats: {
        colors: true,
        chunks: false
    },

    // entry 相对的路径
    context: path.resolve(__dirname, '../src/view/entry'),

    resolve: {
        alias: {
            component: path.join(__dirname, '../src/component/'),
            src: path.join(__dirname, '../src')
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
    },

    plugins: [
        // new HtmlWebpackPlugin({ // 生成html，并自动引入js文件
        //     title: 'output management',
        //     template: path.join(__dirname, '../src/layout/layout.html')
        // }),
        // new CleanWebpackPlugin(['dist']), // 每次打包清理dist文件夹
        // new webpack.HotModuleReplacementPlugin(), // 热加载
        // new UglifyJSPlugin() // tree shaking 不加载没有使用的模块
    ],
}