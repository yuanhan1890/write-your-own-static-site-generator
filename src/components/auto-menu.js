export default {
    name: 'auto-menu',
    props: {
        menu: {
            type: [Object, String],
            required: true,
        },
        root: {
            type: String,
            required: true,
        },
    },
    render(h) {
        const { menu, root } = this.$props;

        if (typeof menu !== 'object' || menu.filename) {
            return null;
        }

        return h('ul', {
        }, Object.keys(menu).map((key) => {
            const dict = menu[key];
            let canBeLink = null;
            if (dict['index.md']) {
                canBeLink = h('router-link', {
                    props: {
                        to: `${root}/${key.replace(/\.md$/, '')}/index` 
                    },
                }, key);
            } else if (dict.filename) {
                canBeLink = h('router-link', {
                    props: {
                        to: `${root}/${key.replace(/\.md$/, '')}`,
                    },
                }, key);
            } else {
                canBeLink = h('span', {}, key);
            }

            return h('li', {
            }, [
                canBeLink,
                h('auto-menu', {
                    props: {
                        menu: dict,
                        root: `${root}/${key.replace(/\.md$/, '')}`,
                    }
                })
            ])
        }))
    }
}