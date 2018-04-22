const webpack = require('webpack');
const path = require('path');

const babelOptions = {
    presets: [
        '@babel/preset-env',
    ],
};

const loadMarkdownPlaceholder = path.join(__dirname, './temp/markdown-data.js');

module.exports = {
    mode: 'none',
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions,
                }
            },
            {
                test(filename) {
                    return filename === loadMarkdownPlaceholder;
                },
                use: {
                    loader: path.join(__dirname, './loaders/markdown-data-loader.js'),
                }
            }
        ]
    },
    devServer: {
        port: 9004,
        contentBase: path.join(__dirname, 'public'),
        publicPath: "/",
        hot: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
};
