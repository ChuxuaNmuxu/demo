const path = require('path');
const extend = require('extend');

const common = {
    stats: {
        colors: true,
        chunks: false
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/ ,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: 'url-loader?limit=10000'
            },
            {
                test: /\.(eot|ttf|wav|mp3)$/,
                loader: 'file-loader'
            },
            {
                test: /\.scss$/,
                include: [
                    path.join(__dirname, '../components')
                ],
                loader: 'style-loader!css-loader?modules&' + 'localIdentName=[name]_[local]_[hash:base64:3]!' + 'postcss-loader'
            }
        ]
    }
};

const client = extend(true, {}, common, {
    entry: path.join(__dirname, '../src/entry/app.js'),
    output: {
        publicPath: '/',
        path: path.join(__dirname, '../build/public'),
        filename: 'client.js'
    }
});

const server = extend(true, {}, common, {
    entry: path.join(__dirname, '../server.js'),
    output: {
        path: path.join(__dirname, '../build'),
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },
    target: 'node',
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false
    },
    externals: /^[a-z][a-z\/\.\-0-9]*$/i
});


module.exports = [client, server];
