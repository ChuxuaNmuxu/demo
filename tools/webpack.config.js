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
                include: [
                path.join(__dirname, '../components'),
                path.join(__dirname, '../core'),
                path.join(__dirname, '../data'),
                path.join(__dirname, '../routes'),
                path.join(__dirname, '../client.js'),
                path.join(__dirname, '../server.js')
                ],
                loader: 'babel-loader'
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
