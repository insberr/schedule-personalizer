import { persistWritable } from '$lib/persistStore';
import type { Terms } from '$types';
import {
    convertStudentvueDataToTerms,
    type StudentVueAPIData,
    type StudentVueAPIDataUserDate,
    getAllSchedules,
    getStudentInfo,
} from '$lib/studentvue';
import { derived, get } from 'svelte/store';
import { schoolSettings } from './masterSettings';
import { waitForMasterSettings } from '$lib/waitFor';

export const studentVueSchedule = persistWritable<
    StudentVueAPIData | undefined
>('stvSchedule', undefined);
export const studentInfo = persistWritable<
    StudentVueAPIDataUserDate | undefined
>('stvStudentInfo', undefined);
export const isStudentvue = persistWritable<boolean>('isStudentvue', false);
export const studentVueCreds = persistWritable<{
    username: string;
    password: string;
}>('stvInfo', { username: '', password: '' });
export const convertedSTVSchedule = derived(
    [studentVueSchedule, isStudentvue, schoolSettings],
    (v) => {
        let [schedule, isSTV, sch] = v;
        if (!isSTV || schedule == undefined) {
            return undefined;
        }
        return convertStudentvueDataToTerms(schedule, sch);
    }
);
let stvID: NodeJS.Timer | undefined;
function updStv() {
    if (stvID) {
        clearInterval(stvID);
    }
    if (!get(isStudentvue)) {
        return;
    }
    async function trigger_update() {
        await waitForMasterSettings();
        let creds = get(studentVueCreds);
        getAllSchedules(creds.username, creds.password).then((r) => {
            studentVueSchedule.set(r);
        });
        getStudentInfo(creds.username, creds.password).then((r) => {
            studentInfo.set(r);
        });
    }
    stvID = setInterval(async () => {
        trigger_update();
    }, 5 * 60 * 1000);
    trigger_update();
}

isStudentvue.subscribe(updStv);
//studentVueCreds.subscribe(updStv);
