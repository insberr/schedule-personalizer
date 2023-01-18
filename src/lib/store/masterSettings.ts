import { persistWritable } from '$lib/persistStore';
import type {
    MasterSettings,
    MasterSettingsSchool,
    SchoolScheduleConfig,
} from '$types';
import { derived, get } from 'svelte/store';
import json5 from 'json5';
import { deserify } from '@karmaniverous/serify-deserify';
export const masterSettings = persistWritable<MasterSettings>(
    'masterSettings',
    //@ts-ignore;
    undefined
);
export const lastMasterSettings = persistWritable<number>(
    'lastMasterSettings',
    0
);
export const schoolName = persistWritable<string>('schoolName', '');

export const schoolSettings = derived(
    [masterSettings, schoolName],
    ([ms, sn]) => {
        return ms.schools.find((s) => s.stvName == sn) as MasterSettingsSchool;
    }
);
//@ts-ignore
export const scheduleConfig = persistWritable<SchoolScheduleConfig>(
    'scheduleConfig',
    //@ts-ignore;
    undefined
);

let schoolUpdateI: NodeJS.Timer | undefined;
schoolName.subscribe((schoolName) => {
    if (schoolUpdateI) {
        clearInterval(schoolUpdateI);
    }
    if (!schoolName) return;
    let schools = get(masterSettings).schools;
    let found = schools.find((s) => s.stvName == schoolName);
    if (!found) {
        return;
    }
    function fn() {
        if (!found) {
            return;
        }
        fetch(found.scheduleURL)
            .then((r) => r.text())
            .then((sInfo) => {
                let p = deserify(json5.parse(sInfo));
                scheduleConfig.set(p);
            }); // maybe change this to an array and .find?
    }
    fn();
    schoolUpdateI = setInterval(() => {
        fn();
    }, 60 * 1000);
});
