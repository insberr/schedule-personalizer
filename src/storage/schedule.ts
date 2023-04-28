import { computed, signal } from '@preact/signals';
import { Class, Term, Terms } from '../types';
import * as settings from '../config/settings';
import { CL } from '../types';
import { setupComplete } from './misc';
import { ScheduleEvent } from '../config/events';
import { schedules } from '../config/schedules';
import { persist } from './persistSignal';

export const displayDate = signal<Date>(new Date());
export const userLunch = persist<number>('userLunch', 1);
export const scheduleDataTerms = persist<Terms>('scheduleDataTerms', settings.termsDates);
export const computedScheduleForDisplay = computed(() => {
    // this function will take the schedule (studentvue or manual) and create the displayDate's schedule

    // What is the current term?
    const displayDateCurrentTermIndex = 2; // for testing
    const displayDateCurrentTerm = scheduleDataTerms.value[displayDateCurrentTermIndex];
    if (displayDateCurrentTerm.classes === null) setupComplete.value = false;

    const TEMP_ScheduleEvent = {
        schedule: displayDate.value.getDay() === 6 || displayDate.value.getDay() === 0 ? schedules.weekend : schedules.advisory, // temporary lol
        info: { date: new Date(), message: 'Test' },
    };
    return TEMP_CreateDisplaySchedule(displayDateCurrentTerm, TEMP_ScheduleEvent); //! FOR NOW. PLEASE CHANGE LATER
});

export function getScheduleDataForTerm(termIndex: number): CL[] {
    return scheduleDataTerms.value[termIndex].classes;
}

export function setScheduleDataTerms(terms: Terms) {
    scheduleDataTerms.value = terms;
}

// TEMPORARY !!!!
function TEMP_CreateDisplaySchedule(displayTerm: Term, displayDaySchedule: ScheduleEvent): Class[] {
    const scheduleForDisplay: Class[] = [];
    if (displayDaySchedule.schedule === null) return scheduleForDisplay; // TEMP FOR SURE FOR SURE
    for (const period of displayDaySchedule.schedule.classes) {
        const periodNeeded = displayTerm.classes.filter((p) => p.classID == period.classID && p.period == period.period);

        for (const pd of periodNeeded) {
            const h: Class = {
                classID: period.classID,
                period: period.period,
                studentVuePeriod: pd?.studentVuePeriod || null,
                name: pd?.name || '',
                room: pd?.room || '',
                teacher: {
                    name: pd?.teacher.name || '',
                    email: pd?.teacher.email || '',
                    id: pd?.teacher.id || '',
                },
                startTime: period.startTime,
                endTime: period.endTime,
            };
            scheduleForDisplay.push(h);
        }
    }
    return scheduleForDisplay;
}
