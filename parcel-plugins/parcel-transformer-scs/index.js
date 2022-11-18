const { Transformer } = require('@parcel/plugin');

const { SCS } = require('schedule-script');
const { produce, original } = require('immer');

const cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }

    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}
async function recurseInto(b, cb, parent) {
    if (Array.isArray(b)) {
        for (const e of b) {
            await recurseInto(e, cb, parent);
        }
    } else {
        await cb(b, parent);
        for (const c of b.args) {
            if (c.type == 'block') {
                await recurseInto(c.data, cb, b);
            }
        }
    }
}

module.exports = new Transformer({
    async transform({ asset, resolve }) {
        // Retrieve the asset's source code and source map.

        const p = new SCS(await asset.getCode());
        const newf = await produce(p.parsed, async (g) => {
            await recurseInto(g, async (s) => {
                if (s.statement == 'import') {
                    const d = guidGenerator();
                    const dep = asset.addDependency({
                        specifier: s.args[0].data,
                    });
                    s.args[0].data = cyrb53(await resolve(asset.filePath, s.args[0].data.replaceAll('\\', '\\\\')), 6969).toString();
                }
            });
        });

        // Run it through some compiler, and set the results
        // on the asset.
        // Return the asset
        p.parsed = newf;
        asset.setCode(p.pretty());
        //console.log(p.pretty());
        return [asset];
    },
});
