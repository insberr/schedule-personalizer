import { configURL } from '$lib/settings';
import { masterSettings, lastMasterSettings } from '$lib/store/masterSettings';
import json5 from 'json5';
import { setAutoFreeze } from 'immer';
/*if (
    get(masterSettings) == undefined ||
    Date.now() - get(lastMasterSettings) >= 1000 * 60 * 60 * 24
) {
    fetch(configURL)
        .then((r) => r.text())
        .then((r) => {
            const par = json5.parse(r);
            masterSettings.set(par);
            lastMasterSettings.set(Date.now());
        });
}*/
setAutoFreeze(false);
fetch(configURL)
    .then((r) => r.text())
    .then((r) => {
        const par = json5.parse(r);
        masterSettings.set(par);
        lastMasterSettings.set(Date.now());
    });
//console.log('client, ', typeof localStorage);
