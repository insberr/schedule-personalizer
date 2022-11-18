const { Optimizer } = require('@parcel/plugin');
const { SCS } = require('schedule-script');

module.exports = new Optimizer({
    async optimize({ contents, map }) {
        const code = new SCS(contents).minify();
        return {
            contents: code,
            map,
        };
    },
});
