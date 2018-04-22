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
            const paths = this.$route.path.split('/').filter(i => i);
            const lastPath = paths[paths.length - 1];
            paths[paths.length - 1] = `${lastPath}.md`;

            try {
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