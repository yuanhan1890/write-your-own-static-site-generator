const fs = require('fs');
const path = require('path');
const markTwain = require('mark-twain');

function isDirectory(filename) {
    return fs.statSync(filename).isDirectory();
}

function transformToMarkdownData(filename) {
    const ast = markTwain(fs.readFileSync(filename));
    return {
        filename,
        ...ast
    };
}

function getAllMarkdown(mdSource, transformer = i => i) {
    if (!isDirectory(mdSource)) {
        throw new Error('should be a directory path');
    }
    
    return fs.readdirSync(mdSource).reduce((fileTree, filename) => {
        const mdPath = path.resolve(mdSource, filename);
        const basename = path.basename(mdPath);
        if (isDirectory(mdPath)) {
            const subFileTree = getAllMarkdown(mdPath, transformer);
            if (Object.keys(subFileTree) === 0) {
                return fileTree;
            }
            fileTree[basename] = subFileTree;
        } else if (basename.match(/\.md$/)) {
            fileTree[`${basename}`] = transformer(mdPath);
        }

        return fileTree;
    }, {})
}

function traverseFileTree(fileTree, callback, root = '') {
    Object.keys(fileTree).forEach((key) => {
        const val = fileTree[key];

        if (typeof val === 'object') {
            traverseFileTree(val, callback, root + `/${key}`);
        } else {
            const filename = key.replace(/\.md$/, '');
            callback(filename, val, root + `/${filename}`);
        }
    })
}

module.exports = {
    isDirectory,
    getAllMarkdown,
    transformToMarkdownData,
    traverseFileTree,
}