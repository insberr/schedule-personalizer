import { masterSettings, scheduleConfig } from './store';
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

export async function waitForDownloadedSchedule() {
    await new Promise<void>((res, rej) => {
        if (get(scheduleConfig) != undefined) {
            res();
            return;
        }
        const unsub = scheduleConfig.subscribe((data) => {
            if (data != undefined) {
                unsub();
                res();
            }
        });
    });
}
