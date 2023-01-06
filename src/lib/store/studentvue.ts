import { persistWritable } from '$lib/persistStore';
import type { Terms } from '$types';
import {
    convertStudentvueDataToTerms,
    type StudentVueAPIData,
    type StudentVueAPIDataUserDate,
} from '$lib/studentvue';
import { derived, get } from 'svelte/store';

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
    [studentVueSchedule, isStudentvue],
    (v) => {
        let [schedule, isSTV] = v;
        if (!isSTV || schedule == undefined) {
            return undefined;
        }
        return convertStudentvueDataToTerms(schedule);
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
    stvID = setInterval(async () => {
        let creds = get(studentVueCreds);
        // piss
    }, 5 * 60 * 1000);
}

isStudentvue.subscribe(updStv);
//studentVueCreds.subscribe(updStv);
