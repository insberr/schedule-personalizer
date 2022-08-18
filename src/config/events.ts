import { SchedulesType, schedules } from './schedules';
import { ClassIDS, getTimeW } from '../types'

// Bassically schedules.ts, but it's for events

export type DateRange = {
    start: Date;
    end: Date;
}

export type ScheduleEvent = {
    schedule: SchedulesType;
    info: {
        date: Date | DateRange;
        message: string;
    };
};

export type ScheduleEvents = ScheduleEvent[];

export function scheduleEventsDateRange(range: DateRange, currentDate: Date): Date {
    if ((currentDate.getDate() >= range.start.getDate() && currentDate.getMonth() >= range.start.getMonth()) || (currentDate.getDate() <= range.end.getDate() && currentDate.getMonth() <= range.end.getMonth())) {
        return currentDate;
    } else {
        return range.start;
    }
    // return new Date();
}

// schedule can be written out or you can make the schedule in schedules.ts and use the vulue here
export const scheduleEvents: ScheduleEvents = [
    {
        schedule: schedules.noSchool,
        info: {
            message: "summer",
            date: { start: new Date("August 18, 2022"), end: new Date("September 5, 2022") },
        }
    },
    {
        schedule: schedules.normal,
        info: {
            message: "First Day Of School",
            date: new Date("September 6, 2022"),
        },
    }
];
