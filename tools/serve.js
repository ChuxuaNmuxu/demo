const path = require('path');
const cp = require('child_process');
const Promise = require('bluebird');
const build = require('./build');
const run = require('./run');

async function serve() {
    const watch = true;
    const app = path.join(__dirname, '../build/server.js')
    const gaze = Promise.promisify(require('gaze'));
    await run(build, { watch });
    console.log('await run build')
    await new Promise((resolve, reject) => {
        function start() {
            const server = cp.spawn(
                'node',
                [path.join(__dirname, '../build/server.js')],
                {
                    env: Object.assign(
                        { NODE_ENV: 'development' },
                        process.env
                    ),
                    silent: false
                }
            );

            server.stdout.on('data', data => {
                process.stdout.write(new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/,'[$1] '));
                process.stdout.write(data);
                if (data.toString('utf8').includes('Node.js server is listening at')) {
                    resolve();
                }
            });

            server.stderr.on('data', data => process.stderr.write(data));
            server.once('error', err => reject(err));
            process.on('exit', () => server.kill('SIGTERM'));
            return server;
        }
        let server = start();
        if (watch) {
        // when the server.js file changes, we will restart the server
            gaze('build/server.js').then(watcher => {
                watcher.on('changed', () => {
                    server.kill('SIGTERM');
                    server = start();
                });
            });
        }
    });
}

module.exports = serve;
