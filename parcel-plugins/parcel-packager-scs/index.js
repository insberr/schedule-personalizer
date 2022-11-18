const { Packager } = require('@parcel/plugin');
const { SCS } = require('schedule-script');

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

module.exports = new Packager({
    async package({ bundle, logger }) {
        let pbundles = {};
        bundle.traverseAssets((asset) => {
            pbundles[cyrb53(asset.filePath, 6969)] = asset.getCode();
        });

        let bundles = {};
        for (let [k, v] of Object.entries(pbundles)) {
            bundles[k] = await v;
        }
        // console.log(out)
        //console.log(bundles)
        //console.dir(bundles, { depth: 10 });
        const code = await bundle.getMainEntry().getCode();
        //console.log('code', code);
        const bundled = new SCS(code, (guid) => {
            //console.log(guid, { depth: 10 });
            return bundles[guid];
        }).bundle();
        return {
            contents: bundled,
        };
    },
});
