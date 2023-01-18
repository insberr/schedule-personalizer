import { scheduleConfig, schoolSettings } from '$lib/store/masterSettings';
import type { CollapsedEvent, SEvent } from '$types';
import { get } from 'svelte/store';
import { format } from 'date-fns';
import merge from 'lodash.merge';
import produce, { freeze } from 'immer';
import { collapseMatcher } from '$lib/matcher';
import { overrides } from './overrides';
export function DCOH(date: Date) {
    // first, we determine
    let event = Determine(date);
    console.dir(event, { depth: 20 });
    // then, we collapse
    let collapsed = Collapse(event, date);
    console.dir(collapsed, { depth: 20 });
    // then, we override
    let overriden = Overrides(collapsed);
    console.dir(overriden, { depth: 20 });
}

function Determine(date: Date): SEvent {
    let eventkey = format(date, 'MM-dd-yyyy');
    let schConfig = get(scheduleConfig);
    let ovr: Partial<SEvent> = schConfig.events.get(eventkey) || {};
    let event: SEvent = produce(schConfig.defaults, (def) => {
        merge(def, ovr);
    });
    freeze(event); // make sure we freeze that event
    return event;
}

function Collapse(event: SEvent, date: Date): CollapsedEvent {
    let schConfig = get(schoolSettings);
    let schedules = get(scheduleConfig).schedules;
    let newEvent = produce(event, (evt) => {
        evt.message = collapseMatcher(evt.message, schConfig, date);
        evt.overrides.enabled = collapseMatcher(
            evt.overrides.enabled,
            schConfig,
            date
        );
        for (let key in evt.overrides.settings) {
            evt.overrides.settings[key] = collapseMatcher(
                evt.overrides.settings[key],
                schConfig,
                date
            );
        }
        let sname = collapseMatcher(evt.schedule, schConfig, date);
        evt.schedule = sname;
    });
    let collapsed = {
        ...newEvent,
        schedule: schedules[newEvent.schedule as string],
    } as CollapsedEvent;
    return collapsed;
}

function Overrides(event: CollapsedEvent) {
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
                    func(d, settings[override])
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
