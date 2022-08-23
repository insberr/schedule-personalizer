import { SchedulesType, schedules } from './schedules';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    if (range.start.getTime() <= currentDate.getTime() && range.end.getTime() >= currentDate.getTime()) {
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
            message: "Its Summer",
            date: { start: new Date("August 21, 2022"), end: new Date("September 5, 2022") },
        }
    },
    {
        schedule: schedules.normal,
        info: {
            message: "First Day Of School",
            date: new Date("September 6, 2022"),
        },
    },
]; 
