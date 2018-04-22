import Vue from 'vue/dist/vue.common.js';
import VueRouter from 'vue-router';
import markdownData from './temp/markdown-data';

Vue.use(VueRouter);

const routes = [
    {
        path: '*',
        component: require('./src/pages/uni.vue').default,
    },
]

const router = new VueRouter({
    mode: 'history',
    routes,
});

new Vue({
    el: '#app',
    router,
    render(h) {
       return <router-view></router-view>;
    }
});