import { SchedulesType, schedules } from './schedules';

// Bassically schedules.ts, but it's for events

export type ScheduleEvent = {
    schedule: SchedulesType
    info: {
        date: Date
        message: string
    }
}

// Should we do an array or an object?
// array would be an arry and we would have to .filter it to find any that are for the display date
// object we would have to have the display date split into year, month, and day (this is the way v1 did it), i think it would be more difficult to work with and more messy
export type ScheduleEvents = ScheduleEvent[]

// schedule can be written out or you can make the schedule in schedules.ts and use the vulue here
export const scheduleEvents: ScheduleEvents = [
    {
        schedule: schedules.lateStart,
        info: {
            message: 'This is an example',
            date: new Date("August 12, 2022")
        }
    }
]
