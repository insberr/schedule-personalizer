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

/*
    
    About getTimeW(hour: number, minute: number)
        It uses numbers; to represent '05', for example, you can type 5 or 0o5 (dont ask because idk)

        The first number is the hour, the second number is the minute

        The hours are in 24 hour format
    //

    Classes are displayed in the order they are put in the 'classes' array

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
            { classID: ClassIDS.Zero, period: 0, startTime: getTimeW(6, 35), endTime: getTimeW(7, 30) },
            { classID: ClassIDS.Period, period: 1, startTime: getTimeW(7, 35), endTime: getTimeW(8, 45) },
            { classID: ClassIDS.Period, period: 2, startTime: getTimeW(8, 50), endTime: getTimeW(9, 55) },
            { classID: ClassIDS.Period, period: 3, startTime: getTimeW(9, 55), endTime: getTimeW(11, 40) },
            { classID: ClassIDS.Period, period: 4, startTime: getTimeW(11, 45), endTime: getTimeW(12, 55) },
            { classID: ClassIDS.Period, period: 5, startTime: getTimeW(13, 0), endTime: getTimeW(14, 5) },
            { classID: ClassIDS.Dismissal, period: 0, startTime: getTimeW(14, 5), endTime: getTimeW(14, 10) },
        ],
        lunch: {
            hasLunch: true,
            basedOnPeriod: 3,
            numberOfLunches: 3,
            lunches: {
                1: { order: [
                    { classID: ClassIDS.Lunch, startTime: getTimeW(9, 55), endTime: getTimeW(10, 25) },
                    { classID: ClassIDS.Period, startTime: getTimeW(10, 30), endTime: getTimeW(11, 40) }
                ]},
                2: { order: [
                    { classID: ClassIDS.Period, startTime: getTimeW(10, 0), endTime: getTimeW(10, 30) },
                    { classID: ClassIDS.Lunch, startTime: getTimeW(10, 30), endTime: getTimeW(11, 0) },
                    { classID: ClassIDS.Period, startTime: getTimeW(11, 5), endTime: getTimeW(11, 40) }
                ]},
                3: { order: [
                    { classID: ClassIDS.Period, startTime: getTimeW(10, 0), endTime: getTimeW(11, 10) },
                    { classID: ClassIDS.Lunch, startTime: getTimeW(11, 10), endTime: getTimeW(11, 40) }
                ]},
            }
        }
    },
    advisory: {
        classes: [
            { classID: ClassIDS.Zero, period: 0, startTime: getTimeW(6, 35), endTime: getTimeW(7, 30) },
            { classID: ClassIDS.Advisory, period: 0, startTime: getTimeW(7, 35), endTime: getTimeW(8, 5) },
            { classID: ClassIDS.Period, period: 1, startTime: getTimeW(8, 10), endTime: getTimeW(9, 5) },
            { classID: ClassIDS.Period, period: 2, startTime: getTimeW(9, 10), endTime: getTimeW(10, 10) },
            { classID: ClassIDS.Period, period: 3, startTime: getTimeW(10, 10), endTime: getTimeW(11, 55) },
            { classID: ClassIDS.Period, period: 4, startTime: getTimeW(12, 0), endTime: getTimeW(1, 0) },
            { classID: ClassIDS.Period, period: 5, startTime: getTimeW(13, 5), endTime: getTimeW(14, 5) },
            { classID: ClassIDS.Dismissal, period: 0, startTime: getTimeW(14, 5), endTime: getTimeW(14, 10) },
        ],
        lunch: {
            hasLunch: true,
            basedOnPeriod: 3,
            numberOfLunches: 3,
            lunches: {
                1: { order: [
                    { classID: ClassIDS.Lunch, startTime: getTimeW(10, 10), endTime: getTimeW(10, 40) },
                    { classID: ClassIDS.Period, startTime: getTimeW(10, 45), endTime: getTimeW(11, 55) }
                ]},
                2: { order: [
                    { classID: ClassIDS.Period, startTime: getTimeW(10, 15), endTime: getTimeW(10, 45) },
                    { classID: ClassIDS.Lunch, startTime: getTimeW(10, 45), endTime: getTimeW(11, 15) },
                    { classID: ClassIDS.Period, startTime: getTimeW(11, 20), endTime: getTimeW(11, 55) }
                ]},
                3: { order: [
                    { classID: ClassIDS.Period, startTime: getTimeW(10, 15), endTime: getTimeW(11, 25) },
                    { classID: ClassIDS.Lunch, startTime: getTimeW(11, 25), endTime: getTimeW(11, 55) }
                ]},
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
    lateStart1Hour: {
        classes: [
            { classID: ClassIDS.Arrival, period: 0, startTime: getTimeW(8, 15), endTime: getTimeW(8, 30) },
            { classID: ClassIDS.Period, period: 1, startTime: getTimeW(8, 35), endTime: getTimeW(9, 25) },
            { classID: ClassIDS.Period, period: 2, startTime: getTimeW(9, 30), endTime: getTimeW(10, 25) },
            { classID: ClassIDS.Period, period: 3, startTime: getTimeW(10, 25), endTime: getTimeW(12, 10) },
            { classID: ClassIDS.Period, period: 4, startTime: getTimeW(12, 15), endTime: getTimeW(13, 10) },
            { classID: ClassIDS.Period, period: 5, startTime: getTimeW(13, 15), endTime: getTimeW(14, 5) },
            { classID: ClassIDS.Dismissal, period: 0, startTime: getTimeW(14, 5), endTime: getTimeW(14, 10) },
        ],
        lunch: {
            hasLunch: true,
            basedOnPeriod: 3,
            numberOfLunches: 3,
            lunches: {
                1: { order: [
                    { classID: ClassIDS.Lunch, startTime: getTimeW(10, 25), endTime: getTimeW(10, 55) },
                    { classID: ClassIDS.Period, startTime: getTimeW(11, 0), endTime: getTimeW(12, 10) }
                ]},
                2: { order: [
                    { classID: ClassIDS.Period, startTime: getTimeW(10, 30), endTime: getTimeW(11, 0) },
                    { classID: ClassIDS.Lunch, startTime: getTimeW(11, 0), endTime: getTimeW(11, 30) },
                    { classID: ClassIDS.Period, startTime: getTimeW(11, 35), endTime: getTimeW(12, 10) }
                ]},
                3: { order: [
                    { classID: ClassIDS.Period, startTime: getTimeW(10, 30), endTime: getTimeW(11, 40) },
                    { classID: ClassIDS.Lunch, startTime: getTimeW(11, 40), endTime: getTimeW(12, 10) }
                ]},
            }
        }
    },

    // Not Added
    lateStart2Hour: {
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

    earlyDissmissal: {
        classes: [
            { classID: ClassIDS.Arrival, period: 0, startTime: getTimeW(8, 15), endTime: getTimeW(8, 30) },
            { classID: ClassIDS.Period, period: 1, startTime: getTimeW(8, 35), endTime: getTimeW(9, 25) },
            { classID: ClassIDS.Period, period: 2, startTime: getTimeW(9, 30), endTime: getTimeW(10, 25) },
            { classID: ClassIDS.Period, period: 3, startTime: getTimeW(10, 25), endTime: getTimeW(12, 10) },
            { classID: ClassIDS.Period, period: 4, startTime: getTimeW(12, 15), endTime: getTimeW(13, 10) },
            { classID: ClassIDS.Period, period: 5, startTime: getTimeW(13, 15), endTime: getTimeW(14, 5) },
            { classID: ClassIDS.Dismissal, period: 0, startTime: getTimeW(14, 5), endTime: getTimeW(14, 10) },
        ],
        lunch: {
            hasLunch: false,
        }
    },

    noSchool: {
        classes: [
            { classID: ClassIDS.NoSchool, period: 0, startTime: getTimeW(0, 0), endTime: getTimeW(24, 0) },
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
    [Implement]
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
