import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { static as staticMiddleware } from 'express';
import run from './run';
import runServer from './runServer';
import webpackConfig from './webpack.dev.config';

async function start() {
    // await run(require('./clean'));

    await new Promise(resolve => {
        webpackConfig
        .filter(x => x.target !== 'node')
        .forEach(x => {
            x.entry = [...x.entry, 'webpack-hot-middleware/client'];
            x.plugins.push(new webpack.HotModuleReplacementPlugin());
            x.plugins.push(new webpack.NoEmitOnErrorsPlugin());
        });

        const bundler = webpack(webpackConfig);

        const middleware = [
            staticMiddleware(path.join(__dirname, '../build')),
            webpackDevMiddleware(bundler, {
                stats: webpackConfig[0].stats
            }),
            ...bundler.compilers
            .filter(compiler => compiler.options.target !== 'node')
            .map(compiler => webpackHotMiddleware(compiler))
        ];

        let handleServerBundleComplete = () => {
            runServer((err, host) => {
                console.log('error: ', err)
                if (!err) {
                    const bs = require('browser-sync').create();
                    bs.init({
                        proxy: { target: host, middleware }
                    }, resolve);
                    handleServerBundleComplete = () => runServer();
                }
            });
        };

        bundler.compilers
            .find(x => x.options.target === 'node')
            .plugin('done', () => handleServerBundleComplete())
    });
}
module.exports = start;