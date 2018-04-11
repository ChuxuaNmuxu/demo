import path from 'path';
import cp from 'child_process';
// Should match the text string used in server.js
const RUNNING_REGEXP = /Server is listening at http:\/\/(.*?)\//;
let server;
const webpackConfig = require('./webpack.dev.config');

// const { output } = webpackConfig.find(x => x.target === 'node');

// const serverPath = path.join(output.path, output.filename);
const serverPath = path.join(__dirname, '../server.js');

console.log('serverPath: ', serverPath)

function runServer(cb) {
    function onStdOut(data) {
        console.log('server std out')
        const match = data.toString('utf8').match(RUNNING_REGEXP);
        process.stdout.write(data);
        if (match) {
            server.stdout.removeListener('data', onStdOut);
            server.stdout.on('data', data => {
                process.stdout.write(data);
            })
            if (cb) {
                cb(null, match[1]); // e.g. cb(null, 'localhost:3000')
            }
        }
    }
    if (server) {
        server.kill('SIGTERM');
    }
    server = cp.spawn('node', [serverPath], {
        env: Object.assign({ NODE_ENV: 'development' }, process.env),
        silent: false
    });
    server.stdout.on('data', onStdOut);
    server.stderr.on('data', data => process.stderr.write(data));
}

export default runServer;
