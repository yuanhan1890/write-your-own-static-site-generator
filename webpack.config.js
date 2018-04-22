const webpack = require('webpack');
const path = require('path');

const babelOptions = {
    presets: [
        '@babel/preset-env',
    ],
    plugins: [
        'transform-vue-jsx',
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
    resolve: {
        alias: {
            '@markdown-data': path.resolve(__dirname, './temp/markdown-data.js'),
        },
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
                test: /\.vue$/,
                exclude: /node_modules/,
                use: {
                    loader: 'vue-loader'
                },
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
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
};
