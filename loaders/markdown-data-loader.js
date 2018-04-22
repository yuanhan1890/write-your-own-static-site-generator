const fs = require('fs');
const path = require('path');
const markTwain = require('mark-twain');

function isDirectory(filename) {
    return fs.statSync(filename).isDirectory();
}

function getAllMarkdown(mdSource) {
    if (!isDirectory(mdSource)) {
        throw new Error('should be a directory path');
    }
    
    return fs.readdirSync(mdSource).reduce((fileTree, filename) => {
        const mdPath = path.resolve(mdSource, filename);
        const basename = path.basename(mdPath);
        if (isDirectory(mdPath)) {
            const subFileTree = getAllMarkdown(mdPath);
            if (Object.keys(subFileTree) === 0) {
                return fileTree;
            }
            fileTree[basename] = subFileTree;
        } else if (basename.match(/\.md$/)) {
            fileTree[`${basename}`] = markTwain(fs.readFileSync(mdPath));
        }

        return fileTree;
    }, {})
}

module.exports = function markdownDataLoader() {
    if (this.cacheable) {
        this.cacheable();
    }

    const fileTree = getAllMarkdown(path.join(process.cwd(), './posts'));

    return `
        module.exports = ${JSON.stringify(fileTree, null, 2)}
    `;
}