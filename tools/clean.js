const del = require('del');

async function clean () {
    await del(['build/*', '!build/.git'], { dot: true });
}

module.exports = clean;
