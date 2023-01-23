import { ClassIDS, type CollapsedEvent } from '$types';
import { schedule } from '$lib/store/schedule';
import { schoolSettings } from '$lib/store/masterSettings';
import { object, number, string, ObjectSchema, array, boolean } from 'yup';
import { get } from 'svelte/store';
import { isWithinInterval } from 'date-fns';
let settingsValid = object({
    classID: number()
        .required()
        .integer()
        .min(ClassIDS.Zero)
        .max(ClassIDS.Custom),
    period: number(),
    teachers: object().required(),
});

function get_term(date: Date) {
    let currentTerm = get(schoolSettings).terms.findIndex((term) => {
        let start = new Date(term.start);
        let end = new Date(term.end);
        return isWithinInterval(date, { start, end });
    });
    return currentTerm;
}

export function lunch_override(
    evt: CollapsedEvent,
    _settings: any,
    date: Date
) {
    let settings = settingsValid.validateSync(_settings);
    console.log('lunch', settings);
    console.log(
        'Searching for lunch period: ',
        ClassIDS[settings.classID] + ':' + (settings.period || 'any')
    );
    let term = get_term(date);
    let lunchPeriod = get(schedule)[term].classes.find((c) => {
        if (c.classID != settings.classID) {
            return false;
        }
        if (settings.period != undefined && c.period != settings.period) {
            return false;
        }
        return true;
    });
    if (lunchPeriod == undefined) {
        console.error('No lunch period found');
        return;
    }
    let teach = find_staff_from_id(lunchPeriod.teacher.id);
    if (teach == undefined) {
        console.error('No teacher found');
        return;
    }
    console.log(
        'found lunch period:',
        lunchPeriod,
        'with teacher id',
        lunchPeriod.teacher.id,
        'and teacher',
        teach
    );
    // lunch time
    evt.message +=
        'Lunch debug: ' +
        `${lunchPeriod.teacher.id} ${teach.name.last}, ${teach.name.first}: ${lunchPeriod.name}`;
}

function find_staff_from_id(id: string) {
    let staff = get(schoolSettings).staff;
    return staff.find((s) => s.id == id);
}
