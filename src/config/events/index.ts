// ? If you are adding a new event, please add it to the addonEvents.ts file.

import * as ical from 'node-ical';
import { schedules, SchedulesType } from '../schedules';
import * as addonEvents from './addonEvents';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as cal from 'bundle-text:./SWCal.ics';

const iCalEventsParsed = ical.sync.parseICS(cal);

export const iCalEvents = Object.values(iCalEventsParsed)
    .map((event) => {
        if (event.type !== 'VEVENT') return null;

        const eventSummary = event.summary.val;
        // what schedule
        let evtSch: SchedulesType | null = null;
        let evtMsg = eventSummary;

        if (eventSummary === 'Late Arrival') {
            evtSch = schedules.lateStart1Hour;
        }

        if (eventSummary.includes('No Students') || eventSummary.includes('No School') || eventSummary.includes('Non-student')) {
            evtSch = schedules.noSchool;
            evtMsg = 'No School<br />' + eventSummary;
        }

        console.log(event.start, event.end, eventSummary, evtSch);
        const newiCalEvent: addonEvents.ScheduleEvent = {
            schedule: evtSch,
            info: {
                // TODO Broken
                // ! Broken!!!
                date: { start: new Date(event.start), end: new Date(event.end) }, // todo - { start, end }
                message: evtMsg,
            },
        };
        return newiCalEvent;
    })
    .filter((event) => event !== null) as addonEvents.ScheduleEvents;

export const events = [...iCalEvents, ...addonEvents.scheduleEvents];

export default events;

