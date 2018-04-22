const webpack = require('webpack');
const path = require('path');
const webpackDevServer = require('webpack-dev-server');

const webpackConfig = require('../webpack.config');

const devServerOptions = {
    hot: true,
    port: 9004,
    contentBase: path.join(__dirname, '../public'),
    publicPath: "/",
    historyApiFallback: true,
    host: 'localhost',
};

webpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions);

const compiler = webpack(webpackConfig);
const server = new webpackDevServer(compiler, devServerOptions);

const addr = `127.0.0.1:${devServerOptions.port}`;

server.listen(devServerOptions.port, 'localhost', () => {
    console.log(`listen on ${addr}`);
})