
const path = require('path');
const {
    getAllMarkdown
} = require('../utils/source');



module.exports = function markdownDataLoader() {
    if (this.cacheable) {
        this.cacheable();
    }

    const fileTree = getAllMarkdown(path.join(process.cwd(), './posts'));

    return `
        module.exports = ${JSON.stringify(fileTree, null, 2)}
    `;
}