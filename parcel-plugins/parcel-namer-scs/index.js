const { Namer } = require('@parcel/plugin');
const { basename } = require('path');

module.exports = new Namer({
    name({ bundle }) {
        if (bundle.type === 'scs') {
            let filePath = bundle.getMainEntry().filePath;
            return basename(filePath);
        }
        // Allow the next namer to handle this bundle.
        return null;
    },
});
