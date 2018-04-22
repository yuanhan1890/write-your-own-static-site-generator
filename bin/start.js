const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const webpackConfig = require('../webpack.config');

const compiler = webpack(webpackConfig);
const server = new webpackDevServer(compiler, webpackConfig.devServer);

const addr = `127.0.0.1:${webpackConfig.devServer.port}`;

server.listen(webpackConfig.devServer.port, '127.0.0.1', () => {
    console.log(`listen on ${addr}`);
})