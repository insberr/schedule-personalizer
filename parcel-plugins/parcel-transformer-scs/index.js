const { Transformer } = require('@parcel/plugin');

const { SCS } = require('schedule-script');
const { produce } = require('immer');
function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}
function recurseInto(b, cb, parent) {
    if (Array.isArray(b)) {
        b.forEach((e) => recurseInto(e, cb, parent));
    } else {
        cb(b, parent);
        b.args.forEach((c) => {
            if (c.type == 'block') {
                recurseInto(c.data, cb, b);
            }
        });
    }
}

module.exports = new Transformer({
    async transform({ asset }) {
        // Retrieve the asset's source code and source map.
        const p = new SCS(await asset.getCode());
        const newf = produce(p.parsed, (g) => {
            recurseInto(g, (s) => {
                if (s.statement == 'import') {
                    const d = guidGenerator();
                    const dep = asset.addDependency({
                        specifier: s.args[0].data,
                    });
                    s.args[0].data = dep;
                }
            });
        });

        // Run it through some compiler, and set the results
        // on the asset.
        // Return the asset
        p.parsed = newf;
        asset.setCode(p.pretty());
        console.log(p.pretty());
        return [asset];
    },
});
