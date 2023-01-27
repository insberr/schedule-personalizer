import { ClassIDS, type CollapsedEvent, type Period } from '$types';
import { schedule } from '$lib/store/schedule';
import { schoolSettings } from '$lib/store/masterSettings';
import { object, number, string, ObjectSchema, array, boolean } from 'yup';
import { get } from 'svelte/store';
import {
    addMilliseconds,
    differenceInMilliseconds,
    isWithinInterval,
} from 'date-fns';
import { parse } from 'date-fns';
import { original } from 'immer';
import { format, set } from 'date-fns';
import { mod_time } from './helpers';
import { addDays, addMinutes } from 'date-fns/fp';

const parse_time = (time: string) => {
    return set(parse(time, 'HH:mm', new Date()), {
        milliseconds: 0,
        seconds: 0,
    });
};

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
    if (lunchPeriod == undefined) return;
    // lunch time
    console.log(
        'Lunch debug: ' +
            `${lunchPeriod.teacher.id} ${teach.name.last}, ${teach.name.first}: ${lunchPeriod.name}`
    );
    let lunch_in_event = evt.schedule.periods.find(
        (p) => p.id == lunchPeriod?.classID && p.num == lunchPeriod?.period
    );
    if (lunch_in_event == undefined) {
        console.warn('Lunch period not found in event');
        return;
    }
    let LPD = differenceInMilliseconds(
        parse_time(lunch_in_event.end),
        parse_time(lunch_in_event.start)
    );
    let TimePerLunch = LPD / 3;
    console.log(TimePerLunch / 1000 / 60);
    console.log(TimePerLunch);
    if (Math.ceil(TimePerLunch) != TimePerLunch) {
        console.warn('Lunch period is not divisible by 3');
        return;
    }
    let periodAMT = 3;
    let lunch_periods: Period[] = [];
    let lunch_start = parse_time(lunch_in_event.start);
    for (let i = 0; i < periodAMT; i++) {
        let lunch_end = addMilliseconds(lunch_start, TimePerLunch);
        lunch_periods.push({
            ...(original(lunch_in_event) as Period),
            start: format(lunch_start, 'HH:mm'),
            end: format(lunch_end, 'HH:mm'),
            extra: 'lunch_' + i,
        });
        lunch_start = lunch_end;
    }
    let detected_lunch = 3; // lol

    lunch_periods[detected_lunch - 1].id = ClassIDS.Lunch;

    for (let i = 0; i < lunch_periods.length; i++) {
        if (lunch_periods[i].id == lunch_periods[i + 1]?.id) {
            let l = lunch_periods.splice(i + 1, 1);
            lunch_periods[i].end = l[0].end;
        }
    }
    lunch_periods[0].end = mod_time(lunch_periods[0].end, addMinutes(5));
    lunch_periods[0].start = mod_time(lunch_periods[0].start, addMinutes(5));
    lunch_periods[1].start = mod_time(lunch_periods[1].start, addMinutes(5));

    evt.schedule.periods.splice(
        evt.schedule.periods.indexOf(lunch_in_event),
        1,
        ...lunch_periods
    );
    evt.message += ' Lunch is forced to 3, gotta add the teacher lunch list';
}

function find_staff_from_id(id: string) {
    let staff = get(schoolSettings).staff;
    return staff.find((s) => s.id == id);
}
