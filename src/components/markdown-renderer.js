const JsonML = require('jsonml.js/lib/utils');

let nodeId = 0;

const standaloneTags = [
    'area',
    'base',
    'br',
    'col',
    'command',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'menuitem',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
];

function isStandalone(tagName) {
    return standaloneTags.indexOf(tagName) !== -1;
};

function markdownNodeToVdom(h, node, nodeId) {
    if (typeof node === 'string') {
        return node;
    }
    const attrs = JsonML.getAttributes(node) || {};
    const tagName = JsonML.getTagName(node);

    return h(tagName, {
        attrs,
        key: nodeId,
        class: attrs.class,
    }, isStandalone(tagName) ? undefined : JsonML.getChildren(node).map((childNode, index) => {
        return markdownNodeToVdom(h, childNode, index);
    }));
}

export default {
    props: {
        markdownData: {
            type: Object,
            required: true,
        },
    },
    render(h) {
        const { markdownData } = this.$props;
        const { content: jsonml } = markdownData;

        return markdownNodeToVdom(h, jsonml, nodeId++);
    }
}