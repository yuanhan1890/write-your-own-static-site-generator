const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const { getAllMarkdown, traverseFileTree } = require('../utils/source');

const webpackConfig = require('../webpack.config');

webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
}));

webpack(webpackConfig, (err, stats) => {
    if (err !== null) {
        return console.error(err);
    }

    if (stats.hasErrors()) {
        console.log(stats.toString('errors-only'));
        return;
    }

    const fileTree = getAllMarkdown(path.join(process.cwd(), './posts'), true);

    traverseFileTree(fileTree, (key, value, url) => {
        const output = path.join(process.cwd(), './_site', url);
        mkdirp.sync(path.dirname(output));
        fs.writeFileSync(`${output}.html`, `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="/bundle.js"></script>
    </body>
    </html>
`.trim());
        console.log(`created: ${output}`);
    }, '.')

    console.log('Done!');
});

