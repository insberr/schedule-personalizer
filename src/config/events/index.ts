// ? If you are adding a new event, please add it to the addonEvents.ts file.

// Import this beacsue importing node-ics directly causes build failure due to axios dependency
// I am to lazy to figure out how to make it work with axios, so this is how we are doing it
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ical from '../../../node_modules/node-ical/ical.js';
type ICalEvent = {
    type: string;
    summary: {
        val: string;
    };
    start: Date;
    end: Date;
};
import { schedules, SchedulesType } from '../schedules';
import * as addonEvents from './addonEvents';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as cal from 'bundle-text:./SWCal.ics';

const iCalEventsParsed = ical.parseICS(cal);

export const iCalEvents = (Object.values(iCalEventsParsed) as ICalEvent[])
    .map((event) => {
        if (event.type !== 'VEVENT') return null;

        const eventSummary = event.summary.val;
        // what schedule
        let evtSch: SchedulesType | null = null;
        let evtMsg = eventSummary + '<br />No Schedule Found';

        if (eventSummary === 'Late Arrival') {
            // Do nothing, since every monday is a late start
            // evtSch = schedules.lateStart1Hour;
            evtMsg = 'Late Arrival';
        }

        if (eventSummary.includes('No Students') || eventSummary.includes('No School') || eventSummary.includes('Non-student')) {
            evtSch = schedules.noSchool;
            evtMsg = 'No School<br />' + eventSummary;
        }

        // console.log(event.start, event.end, eventSummary, evtSch);
        // subtract one day from the end date for actual end date
        const newEndDate = new Date(event.end);
        newEndDate.setDate(newEndDate.getDate() - 1);

        const dateOrDateRange = event.start.toDateString() === newEndDate.toDateString() ? event.start : { start: event.start, end: newEndDate };

        const newiCalEvent: addonEvents.ScheduleEvent = {
            schedule: evtSch,
            info: {
                date: dateOrDateRange,
                message: evtMsg,
            },
        };
        return newiCalEvent;
    })
    .filter((event) => event !== null) as addonEvents.ScheduleEvents;

export const events = [...iCalEvents, ...addonEvents.scheduleEvents];

export default events;
