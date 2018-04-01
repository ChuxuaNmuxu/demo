const run = require('./run');
const del = require('del');
const webpack = require('webpack');
const Promise = require('bluebird');
const webpackConfig = require('./webpack.config');

async function clean() {
    await del(['build/*', '!build/.git'], { dot: true });
}

async function copy() {
    
}

async function bundle() {
    return new Promise((resolve, reject) => {
        let runCount = 0;
        const bundler = webpack(webpackConfig);
        const cb = (err, stats) => {
            if (err) {
                return reject(err);
            }

            //stats.toString(options) 将编译信息以字符串的形式给出，options参数为配置
            console.log(stats.toString(webpackConfig[0].stats));
            if (++runCount === (watch ? webpackConfig.length : 1)) {
                return resolve();
            }
        };
        if (watch) {
            bundler.watch(200, cb);
        } else {
        // run webpack normally
            bundler.run(cb);
        }
    });
}

async function build() {
    await run(clean);
    await run(copy);
    await run(bundle);
}

module.exports = build;
