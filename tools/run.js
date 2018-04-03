function format(time) {
    // return readable string
    return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');

}

async function run(fn, options) {
    const start = new Date();
    console.log(`[${format(start)}] Starting '${fn.name}'...`);

    await fn(options);
    const end = new Date();
    const time = end.getTime() - start.getTime();
    console.log(`[${format(end)}] Finished '${fn.name}' after ${time} ms`);
}

/**
 * 本模块没有依赖其他模块且cli指令大于2（除了运行文件的指令还带有参数指令）
 * 防止在require(`./${module}.js`)中重复加载本模块
 * process.mainModule: node cli执行命令的文件，如node index.js则为index.js
 * module.children: 本模块require的模块
 * process.argv: node cli 执行命令的参数数组，如node index.js则两个参数
*/
if (process.mainModule.children.length === 0 && process.argv.length > 2) {
    delete require.cache[__filename];
    const module = process.argv[2];
    run(require(`./${module}.js`))
        .catch(err => console.log(err.stack));
}

module.exports = run;
