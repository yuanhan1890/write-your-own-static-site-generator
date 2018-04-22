module.exports = function markdownDataLoader() {
    if (this.cacheable) {
        this.cacheable();
    }

    return `
        module.exports = ${JSON.stringify({ a: 1 })}
    `;
}