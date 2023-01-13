import { configURL } from '$lib/settings';
import { masterSettings, lastMasterSettings } from '$lib/store/masterSettings';
import json5 from 'json5';
import { setAutoFreeze } from 'immer';
import { MasterSettingsSchema } from '$types';
import { get } from 'svelte/store';
import { serify } from '@karmaniverous/serify-deserify';
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
        let par = json5.parse(r);
        /*
        try {
            MasterSettingsSchema.validateSync(par)
        } catch (e: any) {
            alert(e.message);
            throw e
        } finally {}
        */
        //let ot = MasterSettingsSchema.validateSync(par);
        if (!MasterSettingsSchema.isValidSync(par)) {
            console.error('Master settings pulled invalid!');
            if (get(masterSettings) == undefined) {
                let msg =
                    "It looks like the master settings file is corrupt, and you dont have a local version available. Try refreshing, and if that doesn't work, try again later.";
                alert(msg);
                console.error(msg);
                throw new Error(msg);
            }
            return;
        }
        masterSettings.set(par);
        lastMasterSettings.set(Date.now());
    });

//alert(JSON.stringify(MasterSettingsSchema.describe(),null,2))
//console.log('client, ', typeof localStorage);
//window.serify = serify;
