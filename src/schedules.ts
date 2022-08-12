import { ClassIDS, getTimeW, Time } from './types'

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

export type Schedules = { // oh god oh fck
    [key: string]: {
        classes: SCHCL[],
        lunch: {
            basedOnPeriod: number,
            numberOfLunches: number,
            lunches: {
                [key: number]: Lunch
            }
        }
    }
}


export const Schedules: Schedules = {
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
            basedOnPeriod: 3,
            numberOfLunches: 3,
            lunches: {
                1: { order: [ { classID: ClassIDS.Lunch, startTime: getTimeW(7, 35), endTime: getTimeW(7, 35) }, { classID: ClassIDS.Period, startTime: getTimeW(7, 35), endTime: getTimeW(7, 35) } ] },
                2: { order: [] },
                 3: { order: [] },
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
            basedOnPeriod: 3,
            numberOfLunches: 3,
            lunches: {
                1: { order: [ { classID: ClassIDS.Lunch, startTime: getTimeW(7, 35), endTime: getTimeW(7, 35) }, { classID: ClassIDS.Period, startTime: getTimeW(7, 35), endTime: getTimeW(7, 35) } ] },
                2: { order: [] },
                3: { order: [] },
            }
        }
    },
    lateStart: {
        classes: [
            { classID: ClassIDS.Advisory, period: 0, startTime: getTimeW(7, 35,0), endTime: { hours: 8, minutes: 45 } },
            { classID: ClassIDS.Period, period: 1, startTime: getTimeW(7, 35,0), endTime: { hours: 8, minutes: 45 } },
            { classID: ClassIDS.Period, period: 2, startTime: { hours: 8, minutes: 50 }, endTime: { hours: 9, minutes: 55 } },
            { classID: ClassIDS.Period, period: 3, startTime: { hours: 10, minutes: 0 }, endTime: { hours: 11, minutes: 40 } },
            { classID: ClassIDS.Period, period: 4, startTime: { hours: 11, minutes: 45 }, endTime: { hours: 12, minutes: 55 } },
            { classID: ClassIDS.Period, period: 5, startTime: { hours: 13, minutes: 0 }, endTime: { hours: 14, minutes: 5 } },
        ],
        lunch: {
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
            basedOnPeriod: 0,
            numberOfLunches: 0,
            lunches: {
            }
        }
    }
}