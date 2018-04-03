import { isArray } from 'util';

const run = require('./run');
const del = require('del');
const webpack = require('webpack');
const Promise = require('bluebird');
const webpackConfig = require('./webpack.config');

async function clean() {
    await del(['build/*', '!build/.git'], { dot: true });
}

async function copy() {
    // const ncp = Promise.promisify(require('ncp'));
    // we copy everything inside public and package.json to the build folder
    // await ncp('public', 'build/public');
    // await ncp('package.json', 'build/package.json');
}

async function bundle({watch}) {
    return new Promise((resolve, reject) => {
        let runCount = 0;
        const bundler = webpack(webpackConfig);
        const bundlers = isArray(bundler.compilers) ? bundler.compilers : [bundler];

        const cb = (err, stats) => {
            if (err) {
                return reject(err);
            }

            //stats.toString(options) 将编译信息以字符串的形式给出，options参数为配置
            console.log(stats.toString(webpackConfig[0].stats));
            console.log(runCount)
            if (runCount === (watch ? webpackConfig.length : 1)) {
                console.log('resolve')
                return resolve();
            }
        };

        console.log('watch: ', watch);
        if (watch) {
            bundlers.forEach(bundle => {
                ++runCount;
                bundler.watch(200, cb);
            });
        } else {
            // run webpack normally
            bundlers.forEach(bundle => {
                ++runCount;
                bundler.watch(cb);
            });
        }
    });
}

async function build(options = { watch: false }) {
    await run(clean);
    await run(copy);
    await run(bundle, options);
}

module.exports = build;
