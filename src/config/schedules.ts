import { ClassIDS, getTimeW, Time } from '../types';
import '../types/schedules.types';


export type SCHCL = {
    classID: ClassIDS,
    period: number,
    startTime: Time,
    endTime: Time,
}

export type Lunch = {
    order: {
        startTime: Time,
        endTime: Time,
        classID: ClassIDS,
    }[]
}

export type SchedulesType = {
    classes: SCHCL[],
    lunch: {
        hasLunch: boolean,
        basedOnPeriod?: number,
        numberOfLunches?: number,
        lunches?: {
            [key: number]: Lunch
        }
    },
}

export type Schedules = {
    [key: string]: SchedulesType
}


/* A schedule is 
    {
        classes: [
            {
                classID: ClassIDS,
                period: number, // 0 for all non-period classes (ie. zero hour, advisory, dismissal, assembly, etc)
                startTime: Time,
                endTime: Time
            },
        ]
    }
*/

export const schedules: Schedules = {
    normal: {
        classes: [
            { classID: ClassIDS.Zero, period: 0, startTime: getTimeW(6, 0, 0), endTime: { hours: 7, minutes: 30 } },
            { classID: ClassIDS.Period, period: 1, startTime: getTimeW(7, 35,0), endTime: { hours: 8, minutes: 45 } },
            { classID: ClassIDS.Period, period: 2, startTime: { hours: 8, minutes: 50 }, endTime: { hours: 9, minutes: 55 } },
            { classID: ClassIDS.Period, period: 3, startTime: { hours: 10, minutes: 0 }, endTime: { hours: 11, minutes: 40 } },
            { classID: ClassIDS.Period, period: 4, startTime: { hours: 11, minutes: 45 }, endTime: { hours: 12, minutes: 55 } },
            { classID: ClassIDS.Period, period: 5, startTime: { hours: 13, minutes: 0 }, endTime: { hours: 14, minutes: 5 } },
        ],
        lunch: {
            hasLunch: true,
            basedOnPeriod: 3,
            numberOfLunches: 3,
            lunches: {
                1: { order: [ { classID: ClassIDS.Lunch, startTime: getTimeW(7, 35), endTime: getTimeW(7, 35) }, { classID: ClassIDS.Period, startTime: getTimeW(7, 35), endTime: getTimeW(7, 35) } ] },
                2: { order: [ { classID: ClassIDS.Period, startTime: getTimeW(7, 35), endTime: getTimeW(7, 37) }, { classID: ClassIDS.Lunch, startTime: getTimeW(7, 35), endTime: getTimeW(7, 35) }, { classID: ClassIDS.Period, startTime: getTimeW(7, 35), endTime: getTimeW(7, 35) } ] },
                3: { order: [ { classID: ClassIDS.Period, startTime: getTimeW(7, 35), endTime: getTimeW(7, 35) }, { classID: ClassIDS.Lunch, startTime: getTimeW(7, 35), endTime: getTimeW(7, 35) } ] },
            }
        }
    },
    advisory: {
        classes: [
            { classID: ClassIDS.Advisory, period: 0, startTime: getTimeW(7, 35,0), endTime: { hours: 8, minutes: 45 } },
            { classID: ClassIDS.Period, period: 1, startTime: getTimeW(7, 35,0), endTime: { hours: 8, minutes: 45 } },
            { classID: ClassIDS.Period, period: 2, startTime: { hours: 8, minutes: 50 }, endTime: { hours: 9, minutes: 55 } },
            { classID: ClassIDS.Period, period: 3, startTime: { hours: 10, minutes: 0 }, endTime: { hours: 11, minutes: 40 } },
            { classID: ClassIDS.Period, period: 4, startTime: { hours: 11, minutes: 45 }, endTime: { hours: 12, minutes: 55 } },
            { classID: ClassIDS.Period, period: 5, startTime: { hours: 13, minutes: 0 }, endTime: { hours: 14, minutes: 5 } },
        ],
        lunch: {
            hasLunch: true,
            basedOnPeriod: 3,
            numberOfLunches: 3,
            lunches: {
                1: { order: [ { classID: ClassIDS.Lunch, startTime: getTimeW(7, 35), endTime: getTimeW(7, 35) }, { classID: ClassIDS.Period, startTime: getTimeW(7, 35), endTime: getTimeW(7, 35) } ] },
                2: { order: [] },
                3: { order: [] },
            }
        }
    },
    weekend: {
        classes: [
            { classID: ClassIDS.Weekend, period: 0, startTime: getTimeW(0, 0), endTime: getTimeW(24, 0) },
        ],
        lunch: {
            hasLunch: false
        }
    },
    lateStart: {
        classes: [
            { classID: ClassIDS.Zero, period: 0, startTime: getTimeW(9, 35,0), endTime: { hours: 8, minutes: 45 } },
            { classID: ClassIDS.Period, period: 1, startTime: getTimeW(7, 35,0), endTime: { hours: 8, minutes: 45 } },
            { classID: ClassIDS.Period, period: 2, startTime: { hours: 8, minutes: 50 }, endTime: { hours: 9, minutes: 55 } },
            { classID: ClassIDS.Period, period: 3, startTime: { hours: 10, minutes: 0 }, endTime: { hours: 11, minutes: 40 } },
            { classID: ClassIDS.Period, period: 4, startTime: { hours: 11, minutes: 45 }, endTime: { hours: 12, minutes: 55 } },
            { classID: ClassIDS.Period, period: 5, startTime: { hours: 13, minutes: 0 }, endTime: { hours: 14, minutes: 5 } },
        ],
        lunch: {
            hasLunch: true,
            basedOnPeriod: 3,
            numberOfLunches: 3,
            lunches: {
                1: { order: [ { classID: ClassIDS.Lunch, startTime: getTimeW(7, 35), endTime: getTimeW(7, 35) }, { classID: ClassIDS.Period, startTime: getTimeW(7, 35), endTime: getTimeW(7, 35) } ] },
                2: { order: [] },
                3: { order: [] },
            }
        }
    },
    noSchool: {
        classes: [
            { classID: ClassIDS.NoSchool, period: 0, startTime: getTimeW(7, 35,0), endTime: { hours: 8, minutes: 45 } },
        ],
        lunch: {
            hasLunch: false,
        }
    }
}

/*
    Anytime no schedule is defined for some odd reason, this will be used as the default.
    However, I highly recommend NOT relying on the default fallback;
        Both to reduce the risk of the site crashing and for code and/or data clarity.
*/
export const defaultSchedule: SchedulesType = schedules.normal;

/*
    Days of the week. This is for if theres a different schedule for each day of the week.

    ie.
        Monday, Wednesday, Friday are normal
        Tuesday, Thursday are advisory

    Remeber JS Date.getDay() returns 0 for Sunday, 1 for Monday, etc.

    You can leave out days, they will default to the defaultSchedule value
        However I do not recommend doing this, as it can cause risk of the site crashing
        and it reduces code clarity.
    
    The order does not matter, as the 'day' property is used in a Array.filter() method

*/
export const weekSchedule = [
    // Weekends
    { day: 0, schedule: schedules.weekend }, // Sunday
    { day: 6, schedule: schedules.weekend }, // Saturday

    // Weekdays
    { day: 1, schedule: schedules.normal }, // Monday
    { day: 2, schedule: schedules.advisory },
    { day: 3, schedule: schedules.normal },
    { day: 4, schedule: schedules.advisory },
    { day: 5, schedule: schedules.normal },
]
