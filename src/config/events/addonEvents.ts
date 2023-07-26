import { isAfter, isBefore, isSameDay } from 'date-fns';
import { SchedulesType, schedules } from '../schedules';

// Bassically schedules.ts, but it's for events

export type DateRange = {
    start: Date;
    end: Date;
};

export type ScheduleEvent = {
    schedule: SchedulesType | null;
    info: {
        date: Date | DateRange;
        message: string;
    };
};

export type ScheduleEvents = ScheduleEvent[];

export function scheduleEventsDateRange(range: DateRange, currentDate: Date): Date {
    if (
        (isAfter(currentDate, range.start) || isSameDay(currentDate, range.start)) &&
        (isBefore(currentDate, range.end) || isSameDay(currentDate, range.end))
    ) {
        return currentDate;
    } else {
        return range.start;
    }
    // return new Date();
}

// schedule can be written out or you can make the schedule in schedules.ts and use the vulue here
export const scheduleEvents: ScheduleEvents = [
    /*
    // TODO: Better Event Idea:
    {
        date: { start: Date, endL Data } | Date,
        events: [
            {
                type?: messgae, schedule, holiday, break// make enum for this
                schedule: SchedulesType | null,
                message: string
            }
        ]
    }
    */
    {
        schedule: schedules.summer,
        info: {
            message: 'Its Summer Silly',
            date: {
                start: new Date('July 20, 2023'),
                end: new Date('August 29, 2023'),
            },
        },
    },
];
