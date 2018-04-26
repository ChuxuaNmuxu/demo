const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.config');

const multiCompiler = webpack(webpackConfig);
const clientCompiler = multiCompiler.compilers.find(
  compiler => compiler.name === 'client',
);
const serverCompiler = multiCompiler.compilers.find(
  compiler => compiler.name === 'server',
);

clientCompiler.watch()

clientCompiler.hooks.compile.tap('compiler', () => {
    console.log('start compile')
})
