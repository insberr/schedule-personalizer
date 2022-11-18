const { Packager } = require('@parcel/plugin');
const { SCS } = require('schedule-script');

module.exports = new Packager({
    async package({ bundle, logger }) {
        let pbundles = {};
        bundle.traverseAssets((asset) => {
            pbundles[asset.id] = asset.getCode();
        });

        let bundles = {};
        for (let [k, v] of Object.entries(pbundles)) {
            bundles[k] = await v;
        }
        // console.log(out)
        //console.log(bundles)
        console.dir(bundles, { depth: 10 });
        const code = await bundle.getMainEntry().getCode();
        console.log('code', code);
        try {
            const bundled = new SCS(code, (guid) => {
                console.log(guid, { depth: 10 });
                return bundles[guid];
            }).bundle();
        } catch (e) {
            console.log(e);
        }
        return {
            contents: 'piss;',
        };
    },
});
