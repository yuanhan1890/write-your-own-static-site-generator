<template>
    <markdown-renderer :markdown-data="pageData" />
</template>
<script>
import markdownData from '@markdown-data';
import MarkdownRenderer from '../components/markdown-renderer.js';

export default {
    components: {
        MarkdownRenderer,
    },
    computed: {
        pageData() {
            try {
                let currentPath = this.$route.path;
                if (currentPath[currentPath.length - 1] === '/') {
                    currentPath += '/index';
                }

                const paths = currentPath.split('/').filter(i => i);

                const lastPath = paths[paths.length - 1];
                paths[paths.length - 1] = `${lastPath}.md`;

                return paths.reduce((pageData, path) => {
                    return pageData[path];
                }, markdownData);
            } catch (e) {
                this.$router.push({
                    path: '/404',
                });
            }
        }
    }
}
</script>