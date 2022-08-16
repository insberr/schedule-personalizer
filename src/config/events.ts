import { SchedulesType, schedules } from './schedules';
import { ClassIDS, getTimeW } from '../types'

// Bassically schedules.ts, but it's for events

export type ScheduleEvent = {
    schedule: SchedulesType;
    info: {
        date: Date;
        message: string;
    };
};

export type ScheduleEvents = ScheduleEvent[];

// schedule can be written out or you can make the schedule in schedules.ts and use the vulue here
export const scheduleEvents: ScheduleEvents = [
    /*
    {
        schedule: schedules.noSchool,
        info: {
            message: "summer",
            date: new Date()
        }
    },
    */
    {
        schedule: schedules.normal,
        info: {
            message: "First Day Of School",
            date: new Date("September 6, 2022"),
        },
    }
];
