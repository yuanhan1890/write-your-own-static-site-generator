const path = require('path');
const {
    getAllMarkdown,
    transformToMarkdownData,
} = require('../utils/source');

module.exports = function markdownDataLoader() {
    if (this.cacheable) {
        this.cacheable();
    }

    const fileTree = getAllMarkdown(path.join(process.cwd(), './posts'), (filename) => {
        this.addDependency(filename);
        return transformToMarkdownData(filename)
    });
    

    return `
        module.exports = ${JSON.stringify(fileTree, null, 2)}
    `;
}