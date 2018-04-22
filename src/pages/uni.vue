<template>
    <div>
        <auto-menu :menu="markdownData" root=""></auto-menu>
        <markdown-renderer :markdown-data="pageData"></markdown-renderer>
    </div>
</template>
<script>
import markdownData from '@markdown-data';
import MarkdownRenderer from '../components/markdown-renderer.js';
import AutoMenu from '../components/auto-menu.js';

export default {
    components: {
        MarkdownRenderer,
        AutoMenu,
    },
    computed: {
        markdownData() {
            return markdownData;
        },
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