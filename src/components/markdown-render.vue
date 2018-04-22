<template>
    <pre>
        {markdownData | JSON}
    </pre>
</template>
<script>
export default {
    props: {
        markdownData: {
            type: Object,
            required: true,
        },
    },
    filters: {
        JSON (obj) {
            return JSON.stringify(obj, null, 2);
        }
    }
}
</script>