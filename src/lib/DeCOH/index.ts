import {
    ClassIDS,
    type CL,
    type CollapsedEvent,
    type DisplayCL,
    type HydratedEvent,
    type MasterSettingsSchool,
    type SchoolScheduleConfig,
    type SEvent,
    type Terms,
} from '$types';
import { get } from 'svelte/store';
import { format, isWithinInterval } from 'date-fns';
import merge from 'lodash.merge';
import produce, { freeze } from 'immer';
import { collapseMatcher } from '$lib/matcher';
import { overrides } from './overrides';
import { nameFromClass } from '$lib/names';
export function DeCOH(
    date: Date,
    sCFG: SchoolScheduleConfig,
    schCFG: MasterSettingsSchool,
    water: Terms
): HydratedEvent {
    // first, we determine
    let event = Determine(date, sCFG);
    console.log('Determine', event);
    // then, we collapse
    let collapsed = Collapse(event, date, sCFG, schCFG);
    console.log('Collapse', collapsed);
    // then, we override
    let overriden = Overrides(collapsed, date);
    console.log('Override', overriden);

    // finally, we hydrate
    let hydrated = Hydrate(overriden, date, water, schCFG);
    console.log('Hydrate', hydrated);
    return hydrated;
}

function Determine(date: Date, schConfig: SchoolScheduleConfig): SEvent {
    let eventkey = format(date, 'MM-dd-yyyy');
    let ovr: Partial<SEvent> = schConfig.events.get(eventkey) || {};
    let event: SEvent = produce(schConfig.defaults, (def) => {
        merge(def, ovr);
    });
    freeze(event); // make sure we freeze that event
    return event;
}

function Collapse(
    event: SEvent,
    date: Date,
    schConfig: SchoolScheduleConfig,
    schoolConfig: MasterSettingsSchool
): CollapsedEvent {
    let schedules = schConfig.schedules;
    let newEvent = produce(event, (evt) => {
        evt.message = collapseMatcher(evt.message, schoolConfig, date);
        evt.overrides.enabled = collapseMatcher(
            evt.overrides.enabled,
            schoolConfig,
            date
        );
        for (let key in evt.overrides.settings) {
            evt.overrides.settings[key] = collapseMatcher(
                evt.overrides.settings[key],
                schoolConfig,
                date
            );
        }
        let sname = collapseMatcher(evt.schedule, schoolConfig, date);
        evt.schedule = sname;
    });
    let collapsed = {
        ...newEvent,
        schedule: schedules[newEvent.schedule as string],
    } as CollapsedEvent;
    if (!collapsed.schedule)
        throw new Error('Schedule not found: ' + newEvent.schedule);
    return collapsed;
}

function Overrides(event: CollapsedEvent, date: Date) {
    let enabledOverrides = event.overrides.enabled.split(',');
    let settings = event.overrides.settings;
    let evt = structuredClone(event);
    enabledOverrides.forEach((override) => {
        let func = overrides[override];
        if (func) {
            try {
                console.log(
                    'Executing overide: ' + override,
                    evt,
                    settings[override]
                );
                evt = produce(evt, (d: CollapsedEvent) =>
                    func(d, settings[override], date)
                );
                console.log('->', evt);
            } catch (err) {
                console.error(err);
            }
        } else {
            console.error('Override not found: ' + override);
        }
    });
    return evt;
}

function Hydrate(
    evt: CollapsedEvent,
    date: Date,
    water: Terms,
    School: MasterSettingsSchool
): HydratedEvent {
    let currentTerm = School.terms.findIndex((term) => {
        let start = new Date(term.start);
        let end = new Date(term.end);
        return isWithinInterval(date, { start, end });
    });
    let classes = water[currentTerm].classes;
    let periods: DisplayCL[] = evt.schedule.periods.map((period) => {
        if (period.id == ClassIDS.Period || period.id == ClassIDS.Advisory) {
            // merge with class
            let classFor = classes.find(
                (cls) =>
                    cls.classID == period.id &&
                    (cls.classID == ClassIDS.Advisory ||
                        period.num == cls.period)
            );
            if (!classFor) {
                console.warn('No class found for', period.id, period.num);
                return {
                    start: period.start,
                    end: period.end,
                    classID: period.id,
                    period: period.num,
                    room: '',
                    teacher: {
                        name: '',
                        email: '',
                        id: '',
                    },
                    name: nameFromClass(period.id),
                } as DisplayCL;
            }
            return {
                start: period.start,
                end: period.end,
                classID: period.id,
                room: classFor.room,
                teacher: classFor.teacher,
                name:
                    classFor.name.trim() == ''
                        ? 'Period ' + period.num.toString()
                        : classFor.name,
            } as DisplayCL;
        } else {
            return {
                start: period.start,
                end: period.end,
                classID: period.id,
                period: period.num,
                room: '',
                teacher: {
                    name: '',
                    email: '',
                    id: '',
                },
                name: nameFromClass(period.id),
            } as DisplayCL;
        }
    });
    let hydrated: HydratedEvent = {
        ...evt,
        schedule: periods,
    };
    return hydrated;
}
