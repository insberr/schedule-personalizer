import { masterSettings } from './store';
import { get } from 'svelte/store';
export async function waitForMasterSettings() {
    await new Promise<void>((res, rej) => {
        if (get(masterSettings) != undefined) {
            res();
            return;
        }
        const unsub = masterSettings.subscribe((data) => {
            if (data != undefined) {
                unsub();
                res();
            }
        });
    });
}
