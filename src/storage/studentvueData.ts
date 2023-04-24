import { effect, computed } from '@preact/signals';
import { StudentVueAPIData } from '../apis/studentvue/studentVueAPI';
import { persist } from './persistSignal';
import { isStudentVue, studentVueCredentials } from './studentvue';
import * as settings from '../config/settings';

export type studentVueStudentDataType = {
    name: string;
    grade: number;
    school: string;
};
export const studentVueScheduleData = persist<null | StudentVueAPIData>('schedule_data', null);
export const studentVueStudentData = persist<null | studentVueStudentDataType>('student_data', null);

let stvInterval: NodeJS.Timer | null = null;

export function refreshStudentVueSchedule() {
    // refresh schwedule
    console.log('Pull user schedule and update it');
}

effect(() => {
    if (stvInterval != null) clearInterval(stvInterval);
    if (studentVueCredentials.value.username == null || studentVueCredentials.value.password == null) {
        isStudentVue.value = false;
        return;
    }
    if (!isStudentVue.value) return;
    refreshStudentVueSchedule();
    stvInterval = setInterval(() => {
        refreshStudentVueSchedule();
    }, settings.studentvueRefreshInterval);
});

export const studentVueSchedule = computed(() => {
    // convert studentVueScheduleData -> the same type as a manual schedule
});
