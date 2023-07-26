import { EventSchedule } from '../pages/schedule';
import { CL, ClassIDS, getTimeW, getTimeW_Input12Hour, Time } from '../types';
import '../types/schedulesTypes';
import { examSchedule } from './schedules/examSchedule';
import { teachers } from './teachers';
import * as config from './settings';

export type CLIdentifier = {
    classID: ClassIDS;
    customID?: number;
    period: number;
};

export type SCHCL = {
    classID: ClassIDS;
    period: number;
    name?: string; // for custom
    customID?: number;
    startTime: Time;
    endTime: Time;
};

export type Lunch = {
    order: {
        startTime: Time;
        endTime: Time;
        classID: ClassIDS;
    }[];
};

export enum ReplaceType {
    Replace,
    Before,
    After,
    Remove,
}

export type Replace = {
    type: ReplaceType;
    base: CLIdentifier;
    with: SCHCL;
};

export type Overides = {
    replace: Replace[];
};

export type CambridgeOverideGrade = {
    forceLunch?: number;
    ignoreLunchConfig?: boolean;
    overides: Overides;
};

export type CambridgeOveride = {
    // grade number
    [key: number]: CambridgeOverideGrade;
};

export type OverideForName = {
    forGrade: string | number;
    forceLunch?: number;
    ignoreLunchConfig?: boolean;
    lunches?: {
        startTime: Time;
        endTime: Time;
        classID: ClassIDS;
    }[];
    overides?: Overides;
};

export type ScheduleOverride = {
    name: string;
    // PLS ADD TYPES LMAO
    condition: (event: EventSchedule, config: Record<string, unknown>, termSchedule: CL[], displayDate: Date, userGrade: string) => boolean;
    overides: OverideForName[];
};

export type SchedulesType = {
    name: string; // This is used by the event editor
    noOverride?: boolean; // This is to be used for schedules that should not be overridden by any event, really only for weekends and summer
    classes: SCHCL[];
    // Might be a bad idea having it optional ...
    overides?: ScheduleOverride[];
    cambridge?: CambridgeOveride;
    lunch: {
        hasLunch: boolean;
        basedOnPeriod?: number | number[];
        basedOnPeriodID?: ClassIDS;
        numberOfLunches?: number;
        useLunchConfigId?: string;
        lunches?: {
            [key: number]: Lunch;
        };

        /* DOES NOT WORK YET */
        isMultiLunch?: boolean;
        multiLunches?: {
            /// <basedOnPeriod>: { <lunch>: { order: [] } }
            [key: number]: {
                [key: number]: Lunch;
            };
        };
    };
};

export type Schedules = {
    [key: string]: SchedulesType;
};

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
        name: 'Normal',
        classes: [
            {
                classID: ClassIDS.Zero,
                period: 0,
                startTime: getTimeW(6, 35),
                endTime: getTimeW(7, 30),
            },
            {
                classID: ClassIDS.Period,
                period: 1,
                startTime: config.schoolStartTime,
                // classDuration: durationTime({ minutesLong: 55}), Temporary idea, might add to sp v10
                endTime: getTimeW(8, 45),
            },
            {
                classID: ClassIDS.Period,
                period: 2,
                startTime: getTimeW(8, 50),
                endTime: getTimeW(9, 55),
            },
            {
                classID: ClassIDS.Period,
                period: 3,
                startTime: getTimeW(9, 55),
                endTime: getTimeW(11, 40),
            },
            {
                classID: ClassIDS.Period,
                period: 4,
                startTime: getTimeW(11, 45),
                endTime: getTimeW(12, 55),
            },
            {
                classID: ClassIDS.Period,
                period: 5,
                startTime: getTimeW(13, 0),
                endTime: getTimeW(14, 5),
            },
            {
                classID: ClassIDS.Dismissal,
                period: 0,
                startTime: config.schoolEndTime,
                endTime: getTimeW(14, 10),
            },
        ],
        overides: [
            {
                name: 'cambridge',
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                condition: (_event, config, sch) => {
                    if (config?.cambridgePeriods === undefined || config?.cambridgePeriods === null) return false;
                    return sch.filter((c) => (config.cambridgePeriods as number[]).includes(c.period)).length > 0;
                },
                overides: [
                    {
                        forGrade: 10,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 1 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 11,
                                        startTime: getTimeW(7, 35),
                                        endTime: getTimeW(8, 22),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 2 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 12,
                                        startTime: getTimeW(8, 27),
                                        endTime: getTimeW(9, 14),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 12 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 13,
                                        startTime: getTimeW(9, 19),
                                        endTime: getTimeW(9, 55),
                                    },
                                },
                            ],
                        },
                    },
                    {
                        forGrade: 11,
                        forceLunch: 3,
                        ignoreLunchConfig: true,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 2 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 11,
                                        startTime: getTimeW(8, 50),
                                        endTime: getTimeW(9, 37),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 3 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 12,
                                        startTime: getTimeW(9, 42),
                                        endTime: getTimeW(10, 29),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 12 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 13,
                                        startTime: getTimeW(10, 33),
                                        endTime: getTimeW(11, 10),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 13 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Lunch,
                                        period: 13,
                                        startTime: getTimeW(11, 10),
                                        endTime: getTimeW(11, 40),
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        ],
        lunch: {
            hasLunch: true,
            basedOnPeriod: 3,
            numberOfLunches: 3,
            lunches: {
                1: {
                    order: [
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(9, 55),
                            endTime: getTimeW(10, 25),
                        },
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 30),
                            endTime: getTimeW(11, 40),
                        },
                    ],
                },
                2: {
                    order: [
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 0),
                            endTime: getTimeW(10, 30),
                        },
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(10, 30),
                            endTime: getTimeW(11, 0),
                        },
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(11, 5),
                            endTime: getTimeW(11, 40),
                        },
                    ],
                },
                3: {
                    order: [
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 0),
                            endTime: getTimeW(11, 10),
                        },
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(11, 10),
                            endTime: getTimeW(11, 40),
                        },
                    ],
                },
            },
        },
    },
    advisory: {
        name: 'Advisory',
        classes: [
            {
                classID: ClassIDS.Zero,
                period: 0,
                startTime: getTimeW(6, 35),
                endTime: getTimeW(7, 30),
            },
            {
                classID: ClassIDS.Advisory,
                period: 0,
                startTime: getTimeW(7, 35),
                endTime: getTimeW(8, 5),
            },
            {
                classID: ClassIDS.Period,
                period: 1,
                startTime: getTimeW(8, 10),
                endTime: getTimeW(9, 5),
            },
            {
                classID: ClassIDS.Period,
                period: 2,
                startTime: getTimeW(9, 10),
                endTime: getTimeW(10, 10),
            },
            {
                classID: ClassIDS.Period,
                period: 3,
                startTime: getTimeW(10, 10),
                endTime: getTimeW(11, 55),
            },
            {
                classID: ClassIDS.Period,
                period: 4,
                startTime: getTimeW(12, 0),
                endTime: getTimeW(13, 0),
            },
            {
                classID: ClassIDS.Period,
                period: 5,
                startTime: getTimeW(13, 5),
                endTime: getTimeW(14, 5),
            },
            {
                classID: ClassIDS.Dismissal,
                period: 0,
                startTime: getTimeW(14, 5),
                endTime: getTimeW(14, 10),
            },
        ],
        overides: [
            {
                name: 'cambridge',
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                condition: (_event, config, sch) => {
                    if (config?.cambridgePeriods === undefined || config?.cambridgePeriods === null) return false;
                    return sch.filter((c) => (config.cambridgePeriods as number[]).includes(c.period)).length > 0;
                },
                overides: [
                    {
                        forGrade: 10,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 1 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 11,
                                        startTime: getTimeW(8, 10),
                                        endTime: getTimeW(8, 52),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 2 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 12,
                                        startTime: getTimeW(8, 57),
                                        endTime: getTimeW(9, 39),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 12 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 13,
                                        startTime: getTimeW(9, 43),
                                        endTime: getTimeW(10, 10),
                                    },
                                },
                            ],
                        },
                    },
                    {
                        forGrade: 11,
                        forceLunch: 3,
                        ignoreLunchConfig: true,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 2 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 11,
                                        startTime: getTimeW(9, 10),
                                        endTime: getTimeW(9, 52),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 3 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 12,
                                        startTime: getTimeW(9, 57),
                                        endTime: getTimeW(10, 39),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 12 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 13,
                                        startTime: getTimeW(10, 43),
                                        endTime: getTimeW(11, 25),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 13 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Lunch,
                                        period: 13,
                                        startTime: getTimeW(11, 25),
                                        endTime: getTimeW(11, 55),
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        ],
        lunch: {
            hasLunch: true,
            basedOnPeriod: 3,
            numberOfLunches: 3,
            lunches: {
                1: {
                    order: [
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(10, 10),
                            endTime: getTimeW(10, 40),
                        },
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 45),
                            endTime: getTimeW(11, 55),
                        },
                    ],
                },
                2: {
                    order: [
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 15),
                            endTime: getTimeW(10, 45),
                        },
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(10, 45),
                            endTime: getTimeW(11, 15),
                        },
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(11, 20),
                            endTime: getTimeW(11, 55),
                        },
                    ],
                },
                3: {
                    order: [
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 15),
                            endTime: getTimeW(11, 25),
                        },
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(11, 25),
                            endTime: getTimeW(11, 55),
                        },
                    ],
                },
            },
        },
    },

    // Pls verify cambridge times
    lateStart1Hour: {
        name: '1 Hour Late Start',
        classes: [
            {
                classID: ClassIDS.Arrival,
                period: 0,
                startTime: getTimeW(8, 15),
                endTime: getTimeW(8, 30),
            },
            {
                classID: ClassIDS.Period,
                period: 1,
                startTime: getTimeW(8, 35),
                endTime: getTimeW(9, 25),
            },
            {
                classID: ClassIDS.Period,
                period: 2,
                startTime: getTimeW(9, 30),
                endTime: getTimeW(10, 25),
            },
            {
                classID: ClassIDS.Period,
                period: 3,
                startTime: getTimeW(10, 25),
                endTime: getTimeW(12, 10),
            },
            {
                classID: ClassIDS.Period,
                period: 4,
                startTime: getTimeW(12, 15),
                endTime: getTimeW(13, 10),
            },
            {
                classID: ClassIDS.Period,
                period: 5,
                startTime: getTimeW(13, 15),
                endTime: getTimeW(14, 5),
            },
            {
                classID: ClassIDS.Dismissal,
                period: 0,
                startTime: getTimeW(14, 5),
                endTime: getTimeW(14, 10),
            },
        ],
        overides: [
            {
                name: 'cambridge',
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                condition: (_event, config, sch) => {
                    if (config?.cambridgePeriods === undefined || config?.cambridgePeriods === null) return false;
                    return sch.filter((c) => (config.cambridgePeriods as number[]).includes(c.period)).length > 0;
                },
                overides: [
                    {
                        forGrade: 10,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 1 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 11,
                                        startTime: getTimeW(8, 10),
                                        endTime: getTimeW(8, 40),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 2 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 12,
                                        startTime: getTimeW(8, 45),
                                        endTime: getTimeW(9, 25),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 12 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 13,
                                        startTime: getTimeW(9, 30),
                                        endTime: getTimeW(10, 10),
                                    },
                                },
                            ],
                        },
                    },
                    {
                        forGrade: 11,
                        forceLunch: 3,
                        ignoreLunchConfig: true,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 2 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 11,
                                        startTime: getTimeW(9, 10),
                                        endTime: getTimeW(9, 40),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 3 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 12,
                                        startTime: getTimeW(9, 45),
                                        endTime: getTimeW(10, 25),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 12 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 13,
                                        startTime: getTimeW(10, 30),
                                        endTime: getTimeW(11, 25),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 13 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Lunch,
                                        period: 13,
                                        startTime: getTimeW(11, 25),
                                        endTime: getTimeW(11, 55),
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        ],
        lunch: {
            hasLunch: true,
            basedOnPeriod: 3,
            numberOfLunches: 3,
            lunches: {
                1: {
                    order: [
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(10, 25),
                            endTime: getTimeW(10, 55),
                        },
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(11, 0),
                            endTime: getTimeW(12, 10),
                        },
                    ],
                },
                2: {
                    order: [
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 30),
                            endTime: getTimeW(11, 0),
                        },
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(11, 0),
                            endTime: getTimeW(11, 30),
                        },
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(11, 35),
                            endTime: getTimeW(12, 10),
                        },
                    ],
                },
                3: {
                    order: [
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 30),
                            endTime: getTimeW(11, 40),
                        },
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(11, 40),
                            endTime: getTimeW(12, 10),
                        },
                    ],
                },
            },
        },
    },
    lateStart2Hour: {
        name: '2 Hour Late Start',
        classes: [
            {
                classID: ClassIDS.Arrival,
                period: 0,
                startTime: getTimeW(9, 15),
                endTime: getTimeW(9, 30),
            },
            {
                classID: ClassIDS.Period,
                period: 1,
                startTime: getTimeW(9, 35),
                endTime: getTimeW(10, 15),
            },
            {
                classID: ClassIDS.Period,
                period: 2,
                startTime: getTimeW(10, 20),
                endTime: getTimeW(11, 0),
            },
            {
                classID: ClassIDS.Period,
                period: 3,
                startTime: getTimeW(11, 0),
                endTime: getTimeW(12, 35),
            },
            {
                classID: ClassIDS.Period,
                period: 4,
                startTime: getTimeW(12, 40),
                endTime: getTimeW(13, 20),
            },
            {
                classID: ClassIDS.Period,
                period: 5,
                startTime: getTimeW(13, 25),
                endTime: getTimeW(14, 5),
            },
            {
                classID: ClassIDS.Dismissal,
                period: 0,
                startTime: getTimeW(14, 5),
                endTime: getTimeW(14, 10),
            },
        ],
        overides: [
            {
                name: 'cambridge',
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                condition: (_event, config, sch) => {
                    if (config?.cambridgePeriods === undefined || config?.cambridgePeriods === null) return false;
                    return sch.filter((c) => (config.cambridgePeriods as number[]).includes(c.period)).length > 0;
                },
                overides: [
                    {
                        forGrade: 10,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 1 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 11,
                                        startTime: getTimeW(8, 10),
                                        endTime: getTimeW(8, 40),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 2 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 12,
                                        startTime: getTimeW(8, 45),
                                        endTime: getTimeW(9, 25),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 12 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 13,
                                        startTime: getTimeW(9, 30),
                                        endTime: getTimeW(10, 10),
                                    },
                                },
                            ],
                        },
                    },
                    {
                        forGrade: 11,
                        forceLunch: 3,
                        ignoreLunchConfig: true,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 2 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 11,
                                        startTime: getTimeW(9, 10),
                                        endTime: getTimeW(9, 40),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 3 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 12,
                                        startTime: getTimeW(9, 45),
                                        endTime: getTimeW(10, 25),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 12 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 13,
                                        startTime: getTimeW(10, 30),
                                        endTime: getTimeW(11, 25),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 13 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Lunch,
                                        period: 13,
                                        startTime: getTimeW(11, 25),
                                        endTime: getTimeW(11, 55),
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        ],
        lunch: {
            hasLunch: true,
            basedOnPeriod: 3,
            numberOfLunches: 3,
            lunches: {
                1: {
                    order: [
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(11, 0),
                            endTime: getTimeW(11, 30),
                        },
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(11, 35),
                            endTime: getTimeW(12, 35),
                        },
                    ],
                },
                2: {
                    order: [
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(11, 5),
                            endTime: getTimeW(11, 30),
                        },
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(11, 30),
                            endTime: getTimeW(12, 0),
                        },
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(12, 5),
                            endTime: getTimeW(12, 35),
                        },
                    ],
                },
                3: {
                    order: [
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(11, 5),
                            endTime: getTimeW(12, 5),
                        },
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(12, 5),
                            endTime: getTimeW(12, 35),
                        },
                    ],
                },
            },
        },
    },
    assemblyPM: {
        name: 'PM Assembly',
        classes: [
            {
                classID: ClassIDS.Zero,
                period: 0,
                startTime: getTimeW(6, 35),
                endTime: getTimeW(7, 30),
            },
            {
                classID: ClassIDS.Period,
                period: 1,
                startTime: getTimeW(7, 35),
                endTime: getTimeW(8, 35),
            },
            {
                classID: ClassIDS.Period,
                period: 2,
                startTime: getTimeW(8, 40),
                endTime: getTimeW(9, 35),
            },
            {
                classID: ClassIDS.Period,
                period: 3,
                startTime: getTimeW(9, 40),
                endTime: getTimeW(11, 20),
            },
            {
                classID: ClassIDS.Period,
                period: 4,
                startTime: getTimeW(11, 25),
                endTime: getTimeW(12, 15),
            },
            {
                classID: ClassIDS.Period,
                period: 5,
                startTime: getTimeW(12, 20),
                endTime: getTimeW(13, 10),
            },
            {
                classID: ClassIDS.Passing,
                period: 0,
                startTime: getTimeW(13, 10),
                endTime: getTimeW(13, 20),
            },
            {
                classID: ClassIDS.Assembly,
                period: 0,
                startTime: getTimeW(13, 20),
                endTime: getTimeW(14, 5),
            },
            {
                classID: ClassIDS.Dismissal,
                period: 0,
                startTime: getTimeW(14, 5),
                endTime: getTimeW(14, 10),
            },
        ],
        overides: [
            {
                name: 'cambridge',
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                condition: (_event, config, sch) => {
                    if (config?.cambridgePeriods === undefined || config?.cambridgePeriods === null) return false;
                    return sch.filter((c) => (config.cambridgePeriods as number[]).includes(c.period)).length > 0;
                },
                overides: [
                    {
                        forGrade: 10,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 1 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 11,
                                        startTime: getTimeW(8, 10),
                                        endTime: getTimeW(8, 40),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 2 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 12,
                                        startTime: getTimeW(8, 45),
                                        endTime: getTimeW(9, 25),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 12 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 13,
                                        startTime: getTimeW(9, 30),
                                        endTime: getTimeW(10, 10),
                                    },
                                },
                            ],
                        },
                    },
                    {
                        forGrade: 11,
                        forceLunch: 3,
                        ignoreLunchConfig: true,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 2 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 11,
                                        startTime: getTimeW(9, 10),
                                        endTime: getTimeW(9, 40),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 3 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 12,
                                        startTime: getTimeW(9, 45),
                                        endTime: getTimeW(10, 25),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 12 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 13,
                                        startTime: getTimeW(10, 30),
                                        endTime: getTimeW(11, 25),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 13 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Lunch,
                                        period: 13,
                                        startTime: getTimeW(11, 25),
                                        endTime: getTimeW(11, 55),
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        ],
        lunch: {
            hasLunch: true,
            basedOnPeriod: 3,
            numberOfLunches: 3,
            lunches: {
                1: {
                    order: [
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(9, 40),
                            endTime: getTimeW(10, 10),
                        },
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 15),
                            endTime: getTimeW(11, 20),
                        },
                    ],
                },
                2: {
                    order: [
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(9, 40),
                            endTime: getTimeW(10, 15),
                        },
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(10, 15),
                            endTime: getTimeW(10, 45),
                        },
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 50),
                            endTime: getTimeW(11, 20),
                        },
                    ],
                },
                3: {
                    order: [
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(9, 40),
                            endTime: getTimeW(10, 50),
                        },
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(10, 50),
                            endTime: getTimeW(11, 20),
                        },
                    ],
                },
            },
        },
    },
    assemblyPM_Lunch4: {
        name: 'PM Assembly',
        classes: [
            {
                classID: ClassIDS.Zero,
                period: 0,
                startTime: getTimeW(6, 35),
                endTime: getTimeW(7, 30),
            },
            {
                classID: ClassIDS.Period,
                period: 1,
                startTime: getTimeW(7, 35),
                endTime: getTimeW(8, 30),
            },
            {
                classID: ClassIDS.Period,
                period: 2,
                startTime: getTimeW(8, 35),
                endTime: getTimeW(9, 25),
            },
            {
                classID: ClassIDS.Period,
                period: 3,
                startTime: getTimeW(9, 30),
                endTime: getTimeW(10, 20),
            },
            {
                classID: ClassIDS.Period,
                period: 4,
                startTime: getTimeW(10, 25),
                endTime: getTimeW(12, 5),
            },
            {
                classID: ClassIDS.Period,
                period: 5,
                startTime: getTimeW(12, 10),
                endTime: getTimeW(13, 0),
            },
            {
                classID: ClassIDS.Passing,
                period: 0,
                startTime: getTimeW(13, 0),
                endTime: getTimeW(13, 10),
            },
            {
                classID: ClassIDS.Assembly,
                period: 0,
                startTime: getTimeW(13, 10),
                endTime: getTimeW(14, 5),
            },
            {
                classID: ClassIDS.Dismissal,
                period: 0,
                startTime: getTimeW(14, 5),
                endTime: getTimeW(14, 10),
            },
        ],
        overides: [
            {
                name: 'cambridge',
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                condition: (_event, config, sch) => {
                    if (config?.cambridgePeriods === undefined || config?.cambridgePeriods === null) return false;
                    return sch.filter((c) => (config.cambridgePeriods as number[]).includes(c.period)).length > 0;
                },
                overides: [
                    {
                        forGrade: 10,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 1 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 11,
                                        startTime: getTimeW(7, 10),
                                        endTime: getTimeW(8, 20),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 2 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 12,
                                        startTime: getTimeW(8, 25),
                                        endTime: getTimeW(9, 0),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 12 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 13,
                                        startTime: getTimeW(9, 0),
                                        endTime: getTimeW(9, 25),
                                    },
                                },
                            ],
                        },
                    },
                    {
                        forGrade: 11,
                        forceLunch: 3,
                        ignoreLunchConfig: true,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 2 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 11,
                                        startTime: getTimeW(8, 35),
                                        endTime: getTimeW(9, 25),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 3 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 12,
                                        startTime: getTimeW(9, 25),
                                        endTime: getTimeW(10, 0),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 12 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 13,
                                        startTime: getTimeW(10, 0),
                                        endTime: getTimeW(10, 20),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 13 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Lunch,
                                        period: 13,
                                        startTime: getTimeW(10, 20),
                                        endTime: getTimeW(10, 50),
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        ],
        lunch: {
            hasLunch: true,
            basedOnPeriod: 4,
            numberOfLunches: 3,
            lunches: {
                1: {
                    order: [
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(10, 20),
                            endTime: getTimeW(10, 50),
                        },
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 55),
                            endTime: getTimeW(12, 5),
                        },
                    ],
                },
                2: {
                    order: [
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 25),
                            endTime: getTimeW(10, 55),
                        },
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(10, 55),
                            endTime: getTimeW(11, 25),
                        },
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(11, 30),
                            endTime: getTimeW(12, 5),
                        },
                    ],
                },
                3: {
                    order: [
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 25),
                            endTime: getTimeW(11, 35),
                        },
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(11, 35),
                            endTime: getTimeW(12, 5),
                        },
                    ],
                },
            },
        },
    },
    assemblyAM: {
        name: 'AM Assembly',
        classes: [
            {
                classID: ClassIDS.Zero,
                period: 0,
                startTime: getTimeW(6, 35),
                endTime: getTimeW(7, 30),
            },
            {
                classID: ClassIDS.Period,
                period: 1,
                startTime: getTimeW(7, 35),
                endTime: getTimeW(8, 25),
            },
            {
                classID: ClassIDS.Passing,
                period: 0,
                startTime: getTimeW(8, 25),
                endTime: getTimeW(8, 35),
            },
            {
                classID: ClassIDS.Assembly,
                period: 0,
                startTime: getTimeW(8, 40),
                endTime: getTimeW(9, 30),
            },
            {
                classID: ClassIDS.Period,
                period: 2,
                startTime: getTimeW(9, 35),
                endTime: getTimeW(10, 25),
            },
            {
                classID: ClassIDS.Period,
                period: 3,
                startTime: getTimeW(10, 25),
                endTime: getTimeW(12, 10),
            },
            {
                classID: ClassIDS.Period,
                period: 4,
                startTime: getTimeW(12, 15),
                endTime: getTimeW(13, 10),
            },
            {
                classID: ClassIDS.Period,
                period: 5,
                startTime: getTimeW(13, 15),
                endTime: getTimeW(14, 5),
            },
            {
                classID: ClassIDS.Dismissal,
                period: 0,
                startTime: getTimeW(14, 5),
                endTime: getTimeW(14, 10),
            },
        ],
        overides: [
            {
                name: 'cambridge',
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                condition: (_event, config, sch) => {
                    if (config?.cambridgePeriods === undefined || config?.cambridgePeriods === null) return false;
                    return sch.filter((c) => (config.cambridgePeriods as number[]).includes(c.period)).length > 0;
                },
                overides: [
                    {
                        forGrade: 10,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 1 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 11,
                                        startTime: getTimeW(7, 35),
                                        endTime: getTimeW(8, 25),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 2 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 12,
                                        startTime: getTimeW(9, 35),
                                        endTime: getTimeW(10, 0),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 12 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 13,
                                        startTime: getTimeW(10, 0),
                                        endTime: getTimeW(10, 25),
                                    },
                                },
                            ],
                        },
                    },
                    {
                        forGrade: 11,
                        forceLunch: 3,
                        ignoreLunchConfig: true,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 2 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 11,
                                        startTime: getTimeW(9, 35),
                                        endTime: getTimeW(10, 25),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 3 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 12,
                                        startTime: getTimeW(10, 25),
                                        endTime: getTimeW(10, 55),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 12 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 13,
                                        startTime: getTimeW(11, 0),
                                        endTime: getTimeW(11, 40),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 13 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Lunch,
                                        period: 13,
                                        startTime: getTimeW(11, 40),
                                        endTime: getTimeW(12, 10),
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        ],
        lunch: {
            hasLunch: true,
            basedOnPeriod: 3,
            numberOfLunches: 3,
            lunches: {
                1: {
                    order: [
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(10, 25),
                            endTime: getTimeW(10, 55),
                        },
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(11, 0),
                            endTime: getTimeW(12, 10),
                        },
                    ],
                },
                2: {
                    order: [
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 30),
                            endTime: getTimeW(11, 0),
                        },
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(11, 0),
                            endTime: getTimeW(11, 30),
                        },
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(11, 35),
                            endTime: getTimeW(12, 10),
                        },
                    ],
                },
                3: {
                    order: [
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 30),
                            endTime: getTimeW(11, 40),
                        },
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(11, 40),
                            endTime: getTimeW(12, 10),
                        },
                    ],
                },
            },
        },
    },
    assemblySeniorAwardsCountdown: {
        name: 'Senior Awards Assembly and Senior Countdown',
        classes: [
            {
                classID: ClassIDS.Zero,
                period: 0,
                startTime: getTimeW(6, 35),
                endTime: getTimeW(7, 30),
            },
            {
                classID: ClassIDS.Period,
                period: 1,
                startTime: getTimeW(7, 35),
                endTime: getTimeW(8, 25),
            },
            {
                classID: ClassIDS.Period,
                period: 2,
                startTime: getTimeW(8, 30),
                endTime: getTimeW(9, 20),
            },
            {
                classID: ClassIDS.Period,
                period: 4,
                startTime: getTimeW(9, 25),
                endTime: getTimeW(10, 15),
            },
            {
                classID: ClassIDS.Period,
                period: 3,
                startTime: getTimeW(10, 15),
                endTime: getTimeW(11, 55),
            },
            {
                classID: ClassIDS.Period,
                period: 5,
                startTime: getTimeW(12, 0),
                endTime: getTimeW(12, 50),
            },
            {
                classID: ClassIDS.Assembly,
                period: 0,
                startTime: getTimeW(12, 55),
                endTime: getTimeW(14, 5),
            },
            {
                classID: ClassIDS.Dismissal,
                period: 0,
                startTime: getTimeW(14, 5),
                endTime: getTimeW(14, 10),
            },
        ],
        overides: [
            {
                name: 'cambridge',
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                condition: (_event, config, sch) => {
                    if (config?.cambridgePeriods === undefined || config?.cambridgePeriods === null) return false;
                    return sch.filter((c) => (config.cambridgePeriods as number[]).includes(c.period)).length > 0;
                },
                overides: [
                    {
                        forGrade: 10,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 1 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 11,
                                        startTime: getTimeW(8, 10),
                                        endTime: getTimeW(8, 40),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 2 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 12,
                                        startTime: getTimeW(8, 45),
                                        endTime: getTimeW(9, 25),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 12 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 13,
                                        startTime: getTimeW(9, 30),
                                        endTime: getTimeW(10, 10),
                                    },
                                },
                            ],
                        },
                    },
                    {
                        forGrade: 11,
                        forceLunch: 3,
                        ignoreLunchConfig: true,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 2 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 11,
                                        startTime: getTimeW(9, 10),
                                        endTime: getTimeW(9, 40),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 3 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 12,
                                        startTime: getTimeW(9, 45),
                                        endTime: getTimeW(10, 25),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 12 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 13,
                                        startTime: getTimeW(10, 30),
                                        endTime: getTimeW(11, 25),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 13 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Lunch,
                                        period: 13,
                                        startTime: getTimeW(11, 25),
                                        endTime: getTimeW(11, 55),
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        ],
        lunch: {
            hasLunch: true,
            basedOnPeriod: 3,
            numberOfLunches: 3,
            lunches: {
                1: {
                    order: [
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(10, 15),
                            endTime: getTimeW(10, 45),
                        },
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 50),
                            endTime: getTimeW(11, 55),
                        },
                    ],
                },
                2: {
                    order: [
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 20),
                            endTime: getTimeW(10, 50),
                        },
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(10, 50),
                            endTime: getTimeW(11, 20),
                        },
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(11, 25),
                            endTime: getTimeW(11, 55),
                        },
                    ],
                },
                3: {
                    order: [
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 20),
                            endTime: getTimeW(11, 25),
                        },
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(11, 25),
                            endTime: getTimeW(11, 55),
                        },
                    ],
                },
            },
        },
    },
    earlyDissmissal: {
        name: 'Early Dissmissal',
        classes: [
            {
                classID: ClassIDS.Zero,
                period: 0,
                startTime: getTimeW(6, 35),
                endTime: getTimeW(7, 30),
            },
            {
                classID: ClassIDS.Period,
                period: 1,
                startTime: getTimeW(7, 35),
                endTime: getTimeW(8, 0),
            },
            {
                classID: ClassIDS.Period,
                period: 2,
                startTime: getTimeW(8, 5),
                endTime: getTimeW(8, 30),
            },
            {
                classID: ClassIDS.Period,
                period: 3,
                startTime: getTimeW(8, 35),
                endTime: getTimeW(9, 0),
            },
            {
                classID: ClassIDS.Period,
                period: 4,
                startTime: getTimeW(9, 5),
                endTime: getTimeW(9, 30),
            },
            {
                classID: ClassIDS.Period,
                period: 5,
                startTime: getTimeW(9, 35),
                endTime: getTimeW(10, 5),
            },
            {
                classID: ClassIDS.Dismissal,
                period: 0,
                startTime: getTimeW(10, 5),
                endTime: getTimeW(10, 10),
            },
        ],
        overides: [
            {
                name: 'cambridge',
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                condition: (_event, config, sch) => {
                    if (config?.cambridgePeriods === undefined || config?.cambridgePeriods === null) return false;
                    return sch.filter((c) => (config.cambridgePeriods as number[]).includes(c.period)).length > 0;
                },
                overides: [
                    {
                        forGrade: 10,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 1 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 11,
                                        startTime: getTimeW(7, 35),
                                        endTime: getTimeW(7, 50),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 2 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 12,
                                        startTime: getTimeW(7, 55),
                                        endTime: getTimeW(8, 10),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 12 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 13,
                                        startTime: getTimeW(8, 15),
                                        endTime: getTimeW(8, 30),
                                    },
                                },
                            ],
                        },
                    },
                    {
                        forGrade: 11,
                        forceLunch: 3,
                        ignoreLunchConfig: true,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 2 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 11,
                                        startTime: getTimeW(8, 5),
                                        endTime: getTimeW(8, 20),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 3 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 12,
                                        startTime: getTimeW(8, 25),
                                        endTime: getTimeW(8, 40),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 12 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 13,
                                        startTime: getTimeW(8, 45),
                                        endTime: getTimeW(9, 0),
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        ],
        lunch: {
            hasLunch: false,
        },
    },
    earlyDiss_A_1: {
        name: 'Early Dissmissal [Advisory, Period 1]',
        classes: [
            {
                classID: ClassIDS.Zero,
                period: 0,
                startTime: getTimeW(6, 35),
                endTime: getTimeW(7, 30),
            },
            {
                classID: ClassIDS.Advisory,
                period: 0,
                startTime: getTimeW(7, 35),
                endTime: getTimeW(8, 45),
            },
            {
                classID: ClassIDS.Period,
                period: 1,
                startTime: getTimeW(8, 50),
                endTime: getTimeW(10, 5),
            },
            {
                classID: ClassIDS.Dismissal,
                period: 0,
                startTime: getTimeW(10, 5),
                endTime: getTimeW(10, 10),
            },
        ],
        overides: [
            {
                name: 'cambridge',
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                condition: (_event, config, sch) => {
                    if (config?.cambridgePeriods === undefined || config?.cambridgePeriods === null) return false;
                    return sch.filter((c) => (config.cambridgePeriods as number[]).includes(c.period)).length > 0;
                },
                overides: [], // Figure out cambridge
            },
        ],
        lunch: {
            hasLunch: false,
        },
    },
    earlyDiss_2_3: {
        name: 'Early Dissmissal [Period 2, Period 3]',
        classes: [
            {
                classID: ClassIDS.Zero,
                period: 0,
                startTime: getTimeW(6, 35),
                endTime: getTimeW(7, 30),
            },
            {
                classID: ClassIDS.Period,
                period: 2,
                startTime: getTimeW(7, 35),
                endTime: getTimeW(8, 45),
            },
            {
                classID: ClassIDS.Period,
                period: 3,
                startTime: getTimeW(8, 50),
                endTime: getTimeW(10, 5),
            },
            {
                classID: ClassIDS.Dismissal,
                period: 0,
                startTime: getTimeW(10, 5),
                endTime: getTimeW(10, 10),
            },
        ],
        overides: [
            {
                name: 'cambridge',
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                condition: (_event, config, sch) => {
                    if (config?.cambridgePeriods === undefined || config?.cambridgePeriods === null) return false;
                    return sch.filter((c) => (config.cambridgePeriods as number[]).includes(c.period)).length > 0;
                },
                overides: [], // Figure out cambridge
            },
        ],
        lunch: {
            hasLunch: false,
        },
    },
    earlyDiss_4_5: {
        name: 'Early Dissmissal [Period 4, Period 5]',
        classes: [
            {
                classID: ClassIDS.Zero,
                period: 0,
                startTime: getTimeW(6, 35),
                endTime: getTimeW(7, 30),
            },
            {
                classID: ClassIDS.Period,
                period: 4,
                startTime: getTimeW(7, 35),
                endTime: getTimeW(8, 45),
            },
            {
                classID: ClassIDS.Period,
                period: 5,
                startTime: getTimeW(8, 50),
                endTime: getTimeW(10, 5),
            },
            {
                classID: ClassIDS.Dismissal,
                period: 0,
                startTime: getTimeW(10, 5),
                endTime: getTimeW(10, 10),
            },
        ],
        overides: [], // Figure out cambridge
        lunch: {
            hasLunch: false,
        },
    },

    /* Messed up schedules that I had to write more code to support */
    careerOneHourLateStart: {
        name: 'Career Fair 1 Hour Late Start',
        classes: [
            // correct the times
            {
                classID: ClassIDS.Arrival,
                period: 0,
                startTime: getTimeW(8, 15),
                endTime: getTimeW(8, 30),
            },
            {
                classID: ClassIDS.Period,
                period: 1,
                startTime: getTimeW(8, 35),
                endTime: getTimeW(9, 15),
            },
            {
                classID: ClassIDS.Period,
                period: 2,
                startTime: getTimeW(9, 20),
                endTime: getTimeW(10, 0),
            },
            {
                classID: ClassIDS.Period,
                period: 3,
                startTime: getTimeW(10, 5),
                endTime: getTimeW(10, 45),
            },
            {
                classID: ClassIDS.Advisory,
                period: 0,
                startTime: getTimeW(10, 45),
                endTime: getTimeW(12, 25),
            },
            {
                classID: ClassIDS.Period,
                period: 4,
                startTime: getTimeW(12, 30),
                endTime: getTimeW(13, 15),
            },
            {
                classID: ClassIDS.Period,
                period: 5,
                startTime: getTimeW(13, 20),
                endTime: getTimeW(14, 5),
            },
            {
                classID: ClassIDS.Dismissal,
                period: 0,
                startTime: getTimeW(14, 5),
                endTime: getTimeW(14, 10),
            },
        ],
        overides: [
            {
                name: 'career',
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                condition: (event, _config) => {
                    return event.schedule.name === 'Career Fair 1 Hour Late Start';
                },
                overides: [
                    {
                        // All 9th graders have 2nd lunch
                        forGrade: 9,
                        forceLunch: 2,
                        ignoreLunchConfig: true,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Advisory, period: 0 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Advisory,
                                        period: 0,
                                        startTime: getTimeW(10, 50),
                                        endTime: getTimeW(11, 20),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Advisory, period: 0 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Lunch,
                                        period: 0,
                                        startTime: getTimeW(11, 25),
                                        endTime: getTimeW(11, 50),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Lunch, period: 0 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Advisory,
                                        period: 0,
                                        startTime: getTimeW(11, 55),
                                        endTime: getTimeW(12, 25),
                                    },
                                },
                            ],
                        },
                    },
                    {
                        // 10th graders lunch is based on their advisory teacher
                        // They should only get 1st or 3rd lunch
                        // lunch config for this is in lunches.ts
                        forGrade: 10, // this one will be fun
                    },
                    {
                        forGrade: 11,
                        forceLunch: 1,
                        ignoreLunchConfig: true,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Advisory, period: 0 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Lunch,
                                        period: 0,
                                        startTime: getTimeW(10, 45),
                                        endTime: getTimeW(11, 15),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Lunch, period: 0 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Advisory,
                                        period: 0,
                                        startTime: getTimeW(11, 20),
                                        endTime: getTimeW(11, 30),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Advisory, period: 0 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Custom,
                                        customID: 0,
                                        period: 0,
                                        name: 'College & Career Fair',
                                        startTime: getTimeW(11, 30),
                                        endTime: getTimeW(12, 10),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Custom, customID: 0, period: 0 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Advisory,
                                        period: 0,
                                        startTime: getTimeW(12, 15),
                                        endTime: getTimeW(12, 25),
                                    },
                                },
                            ],
                        },
                    },
                    {
                        forGrade: 12,
                        forceLunch: 3,
                        ignoreLunchConfig: true,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Advisory, period: 0 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Custom,
                                        customID: 0,
                                        period: 0,
                                        name: 'College & Career Fair',
                                        startTime: getTimeW(10, 45),
                                        endTime: getTimeW(11, 25),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Custom, customID: 0, period: 0 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Advisory,
                                        period: 0,
                                        startTime: getTimeW(11, 30),
                                        endTime: getTimeW(11, 55),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Advisory, period: 0 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Lunch,
                                        period: 0,
                                        startTime: getTimeW(11, 55),
                                        endTime: getTimeW(12, 25),
                                    },
                                },
                            ],
                        },
                    },
                    {
                        forGrade: 'manual',
                        forceLunch: 2,
                        ignoreLunchConfig: true,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Advisory, period: 0 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Custom,
                                        customID: 0,
                                        period: 0,
                                        name: 'Grades 11 & 12 College & Career Fair',
                                        startTime: getTimeW(10, 45),
                                        endTime: getTimeW(12, 25),
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
            {
                name: 'cambridge',
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                condition: (_event, config, sch) => {
                    if (config?.cambridgePeriods === undefined || config?.cambridgePeriods === null) return false;
                    return sch.filter((c) => (config.cambridgePeriods as number[]).includes(c.period)).length > 0;
                },
                overides: [
                    {
                        forGrade: 10,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 1 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 11,
                                        startTime: getTimeW(8, 10),
                                        endTime: getTimeW(8, 40),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 2 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 12,
                                        startTime: getTimeW(8, 45),
                                        endTime: getTimeW(9, 25),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 12 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 13,
                                        startTime: getTimeW(9, 30),
                                        endTime: getTimeW(10, 10),
                                    },
                                },
                            ],
                        },
                    },
                    {
                        forGrade: 11,
                        forceLunch: 3,
                        ignoreLunchConfig: true,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 2 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 11,
                                        startTime: getTimeW(9, 10),
                                        endTime: getTimeW(9, 40),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 3 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 12,
                                        startTime: getTimeW(9, 45),
                                        endTime: getTimeW(10, 25),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 12 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 13,
                                        startTime: getTimeW(10, 30),
                                        endTime: getTimeW(11, 25),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 13 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Lunch,
                                        period: 13,
                                        startTime: getTimeW(11, 25),
                                        endTime: getTimeW(11, 55),
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        ],
        lunch: {
            hasLunch: true,
            basedOnPeriod: 0,
            basedOnPeriodID: ClassIDS.Advisory,
            numberOfLunches: 3,
            lunches: {
                1: {
                    order: [
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(10, 45),
                            endTime: getTimeW(11, 15),
                        },
                        {
                            classID: ClassIDS.Advisory,
                            startTime: getTimeW(11, 20),
                            endTime: getTimeW(12, 25),
                        },
                    ],
                },
                2: {
                    order: [
                        {
                            classID: ClassIDS.Advisory,
                            startTime: getTimeW(10, 50),
                            endTime: getTimeW(11, 20),
                        },
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(11, 20),
                            endTime: getTimeW(11, 50),
                        },
                        {
                            classID: ClassIDS.Advisory,
                            startTime: getTimeW(11, 55),
                            endTime: getTimeW(12, 25),
                        },
                    ],
                },
                3: {
                    order: [
                        {
                            classID: ClassIDS.Advisory,
                            startTime: getTimeW(10, 50),
                            endTime: getTimeW(11, 55),
                        },
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(11, 55),
                            endTime: getTimeW(12, 25),
                        },
                    ],
                },
            },
        },
    },

    assemblyBHM: {
        name: 'Black History Month Assembly',
        classes: [
            {
                classID: ClassIDS.Arrival,
                period: 0,
                startTime: getTimeW(7, 5),
                endTime: getTimeW(7, 30),
            },
            {
                classID: ClassIDS.Period,
                period: 1,
                startTime: getTimeW(7, 35),
                endTime: getTimeW(8, 30),
            },
            {
                classID: ClassIDS.Period,
                period: 2,
                startTime: getTimeW(8, 35),
                endTime: getTimeW(9, 25),
            },
            {
                classID: ClassIDS.Period,
                period: 3,
                startTime: getTimeW(9, 30),
                endTime: getTimeW(10, 20),
            },
            {
                classID: ClassIDS.Period,
                period: 4,
                startTime: getTimeW(10, 25),
                endTime: getTimeW(12, 5),
            },
            {
                classID: ClassIDS.Period,
                period: 5,
                startTime: getTimeW(12, 10),
                endTime: getTimeW(14, 5),
            },
            {
                classID: ClassIDS.Dismissal,
                period: 0,
                startTime: getTimeW(14, 5),
                endTime: getTimeW(14, 10),
            },
        ],
        overides: [
            {
                name: 'assembly A',
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                condition: (_event, _config, sch) => {
                    const fithPeriod = sch.filter((e) => {
                        return e.period === 5;
                    });

                    if (fithPeriod.length === 0) return false;

                    if (fithPeriod[0].teacher.id === teachers.Angotti_Rachel_A.id) {
                        // _event.info.message += ' (A)';
                        return true;
                    }

                    switch (fithPeriod[0].teacher.id) {
                        // East Bleachers
                        case teachers.Angotti_Rachel_A.id:
                            return true;
                        case teachers.Barnette_Carlotta_A.id:
                            return true;
                        case teachers.Beatty_Matthew.id:
                            return true;
                        case teachers.Benson_Katherine_E.id:
                            return true;
                        case teachers.Blake_Ashley_L.id:
                            return true;
                        case teachers.Bland_James_W.id:
                            return true;
                        case teachers.Brendible_Jacklyn_V.id:
                            return true;
                        case teachers.Bridgman_Jonathan_I.id:
                            return true;
                        case teachers.Brokaw_David_C.id:
                            return true;
                        case teachers.Cain_Brandon_M.id:
                            return true;
                        case teachers.Calos_Brandon_N.id:
                            return true;
                        case teachers.Cambra_Christine_A.id:
                            return true;
                        case teachers.Carrell_Jason_D.id:
                            return true;
                        case teachers.Chege_Mary_W.id:
                            return true;

                        // West Bleachers
                        case teachers.Doyle_Suzanne_M.id:
                            return true;
                        case teachers.Estrada_Jennifer_B.id:
                            return true;
                        case teachers.Fernandez_Zesty_A.id:
                            return true;
                        case teachers.Forse_Lita_L.id:
                            return true;
                        case teachers.Fowler_Krystall.id:
                            return true;
                        case teachers.Fowler_Raylene_K.id:
                            return true;
                        case teachers.Fowler_Ethan_T.id:
                            return true;
                        case teachers.Frady_Sadie_L.id:
                            return true;
                        case teachers.Gardner_Kenneth_A.id:
                            return true;
                        case teachers.Greenland_Roy_F.id:
                            return true;
                        case teachers.Grimaldi_Marseille.id:
                            return true;
                        case teachers.Hilsabeck_Erika_M.id:
                            return true;
                        case teachers.Iverson_Kenneth_B.id:
                            return true;
                        case teachers.Jin_Heather_A.id:
                            return true;
                        case teachers.Jolly_Morgan_D.id:
                            return true;
                        case '':
                            // Must be manual data entry then
                            return false;
                        default: {
                            console.log('Not assembly A. Teacher: ' + fithPeriod[0].teacher.id);
                            return false;
                        }
                    }

                    return false;
                },
                overides: [
                    {
                        forGrade: 'all',
                        ignoreLunchConfig: false,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 5 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Custom,
                                        customID: 10,
                                        name: 'Go To Class For Attendance',
                                        period: 0,
                                        startTime: getTimeW(12, 10),
                                        endTime: getTimeW(12, 15),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Custom, period: 0, customID: 10 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Passing,
                                        period: 0,
                                        startTime: getTimeW(12, 15),
                                        endTime: getTimeW(12, 20),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Passing, period: 0 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Assembly,
                                        period: 0,
                                        name: 'Assembly A',
                                        startTime: getTimeW(12, 20),
                                        endTime: getTimeW(13, 5),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Assembly, period: 0 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 5,
                                        startTime: getTimeW(13, 10),
                                        endTime: getTimeW(14, 5),
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
            {
                name: 'assembly B',
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                condition: (_event, _config, sch) => {
                    const fithPeriod = sch.filter((e) => {
                        return e.period === 5;
                    });

                    if (fithPeriod.length === 0) return false;

                    if (fithPeriod[0].teacher.id === teachers.Angotti_Rachel_A.id) {
                        // _event.info.message += ' (A)';
                        return true;
                    }

                    switch (fithPeriod[0].teacher.id) {
                        // East Bleachers
                        case teachers.Knox_Caleb_M.id:
                            return true;
                        case teachers.Kubena_Nanette_M.id:
                            return true;
                        case teachers.Loiselle_Ryan_A.id:
                            return true;
                        case teachers.Matthews_Tyler_M.id:
                            return true;
                        case teachers.Mcmullen_Michael_L.id:
                            return true;
                        case teachers.Morrison_Jennifer_M.id:
                            return true;
                        case teachers.Partin_Mariah_F.id:
                            return true;
                        case teachers.Pelandini_Rebecca_M.id:
                            return true;
                        case teachers.Pike_Stephanie_R.id:
                            return true;
                        case teachers.Racus_Britni_E.id:
                            return true;
                        case teachers.Reisch_Rebecca_D.id:
                            return true;
                        case teachers.Rexus_Daniel_R.id:
                            return true;
                        case teachers.Ridgway_Thomas_G.id:
                            return true;
                        case teachers.Riggle_Brian.id:
                            return true;
                        case teachers.Tkach_Stephen_J.id:
                            return true;
                        case teachers.Roberts_Lori_C.id:
                            return true;
                        case teachers.Sacks_Michael_J.id:
                            return true;
                        case teachers.Welborn_Scott_T.id:
                            return true;

                        // West Bleachers
                        case teachers.Saffle_Teal_H.id:
                            return true;
                        case teachers.Schwoch_Kevin_R.id:
                            return true;
                        case teachers.Shelley_Bonnie_R.id:
                            return true;
                        case teachers.Shoot_Andrew_L.id:
                            return true;
                        case teachers.Soriero_Sabrina_L.id:
                            return true;
                        case teachers.Southworth_Gregory_W.id:
                            return true;
                        case teachers.Stickney_Christopher_L.id:
                            return true;
                        case teachers.Stumpf_John_R.id:
                            return true;
                        case teachers.Talen_Michael_H.id:
                            return true;
                        case teachers.Taylor_Claire_V.id:
                            return true;
                        // case teachers.Japanese.id: return true; What ???
                        // case teachers.Science.id: return true; What ???
                        case teachers.Mooy_Michelle_L.id:
                            return true;
                        case teachers.Thorn_Danielle_E.id:
                            return true;
                        case teachers.Watson_Hayley_J.id:
                            return true;
                        case teachers.Whitehead_Ryan_D.id:
                            return true;
                        // Theres 3 Wilsons ...
                        case teachers.Wilson_Anne_M.id:
                            return true;
                        case teachers.Wilson_Dominique_A.id:
                            return true;
                        case teachers.Wilson_Zuleica_E.id:
                            return true;

                        case '':
                            // Must be manual data entry then
                            return false;
                        default: {
                            console.log('Not assembly B. Teacher: ' + fithPeriod[0].teacher.id);
                            return false;
                        }
                    }

                    return false;
                },
                overides: [
                    {
                        forGrade: 'all',
                        ignoreLunchConfig: false,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 5 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 5,
                                        startTime: getTimeW(12, 10),
                                        endTime: getTimeW(13, 10),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 5 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Passing,
                                        period: 0,
                                        startTime: getTimeW(13, 10),
                                        endTime: getTimeW(13, 15),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Passing, period: 0 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Assembly,
                                        period: 0,
                                        name: 'Assembly B',
                                        startTime: getTimeW(13, 20),
                                        endTime: getTimeW(14, 5),
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
            {
                name: 'No teacher ID / Default',
                condition: (_event, _config, sch) => {
                    // const fithPeriod = sch.filter((e) => {
                    //     return e.period === 5;
                    // });

                    // if (fithPeriod.length === 0) return true;
                    // if (fithPeriod[0].teacher.id === '') return true;

                    // if (Object.values(teachers).filter((e) => e.id === fithPeriod[0].teacher.id).length === 0) return true;

                    // return false;
                    return true;
                },
                overides: [
                    {
                        forGrade: 'all',
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 5 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Custom,
                                        customID: 11,
                                        name: 'Assembly A or 5th Period',
                                        period: 5,
                                        startTime: getTimeW(12, 10),
                                        endTime: getTimeW(13, 10),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Custom, period: 5, customID: 11 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Custom,
                                        customID: 12,
                                        name: 'Assembly B or 5th Period',
                                        period: 5,
                                        startTime: getTimeW(13, 10),
                                        endTime: getTimeW(14, 5),
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        ],
        lunch: {
            hasLunch: true,
            basedOnPeriod: 4,
            basedOnPeriodID: ClassIDS.Period,
            useLunchConfigId: 'BHM',
            numberOfLunches: 3,
            lunches: {
                1: {
                    order: [
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(10, 20),
                            endTime: getTimeW(10, 50),
                        },
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 55),
                            endTime: getTimeW(12, 5),
                        },
                    ],
                },
                2: {
                    order: [
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 25),
                            endTime: getTimeW(10, 55),
                        },
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(10, 55),
                            endTime: getTimeW(11, 25),
                        },
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(11, 30),
                            endTime: getTimeW(12, 5),
                        },
                    ],
                },
                3: {
                    order: [
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 25),
                            endTime: getTimeW(11, 35),
                        },
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(11, 35),
                            endTime: getTimeW(12, 5),
                        },
                    ],
                },
            },
        },
    },

    onehourAdvisory: {
        name: 'One Hour Advisory',
        classes: [
            {
                classID: ClassIDS.Zero,
                period: 0,
                startTime: getTimeW(6, 35),
                endTime: getTimeW(7, 30),
            },
            {
                classID: ClassIDS.Advisory,
                period: 0,
                startTime: getTimeW(7, 35),
                endTime: getTimeW(8, 35),
            },
            {
                classID: ClassIDS.Period,
                period: 1,
                startTime: getTimeW(8, 40),
                endTime: getTimeW(9, 30),
            },
            {
                classID: ClassIDS.Period,
                period: 2,
                startTime: getTimeW(9, 35),
                endTime: getTimeW(10, 25),
            },
            {
                classID: ClassIDS.Period,
                period: 3,
                startTime: getTimeW(10, 25),
                endTime: getTimeW(12, 10),
            },
            {
                classID: ClassIDS.Period,
                period: 4,
                startTime: getTimeW(12, 15),
                endTime: getTimeW(13, 10),
            },
            {
                classID: ClassIDS.Period,
                period: 5,
                startTime: getTimeW(13, 15),
                endTime: getTimeW(14, 5),
            },
            {
                classID: ClassIDS.Dismissal,
                period: 0,
                startTime: getTimeW(14, 5),
                endTime: getTimeW(14, 10),
            },
        ],
        overides: [
            {
                name: 'cambridge',
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                condition: (_event, config, sch) => {
                    if (config?.cambridgePeriods === undefined || config?.cambridgePeriods === null) return false;
                    return sch.filter((c) => (config.cambridgePeriods as number[]).includes(c.period)).length > 0;
                },
                overides: [
                    {
                        forGrade: 10,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 1 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 11,
                                        startTime: getTimeW(8, 10),
                                        endTime: getTimeW(8, 52),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 2 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 12,
                                        startTime: getTimeW(8, 57),
                                        endTime: getTimeW(9, 39),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 12 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 13,
                                        startTime: getTimeW(9, 43),
                                        endTime: getTimeW(10, 10),
                                    },
                                },
                            ],
                        },
                    },
                    {
                        forGrade: 11,
                        forceLunch: 3,
                        ignoreLunchConfig: true,
                        overides: {
                            replace: [
                                {
                                    base: { classID: ClassIDS.Period, period: 2 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 11,
                                        startTime: getTimeW(9, 10),
                                        endTime: getTimeW(9, 52),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 3 },
                                    type: ReplaceType.Replace,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 12,
                                        startTime: getTimeW(9, 57),
                                        endTime: getTimeW(10, 39),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 12 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Period,
                                        period: 13,
                                        startTime: getTimeW(10, 43),
                                        endTime: getTimeW(11, 25),
                                    },
                                },
                                {
                                    base: { classID: ClassIDS.Period, period: 13 },
                                    type: ReplaceType.After,
                                    with: {
                                        classID: ClassIDS.Lunch,
                                        period: 13,
                                        startTime: getTimeW(11, 25),
                                        endTime: getTimeW(11, 55),
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        ],
        lunch: {
            hasLunch: true,
            basedOnPeriod: 3,
            numberOfLunches: 3,
            lunches: {
                1: {
                    order: [
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(10, 25),
                            endTime: getTimeW(10, 55),
                        },
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(11, 0),
                            endTime: getTimeW(12, 10),
                        },
                    ],
                },
                2: {
                    order: [
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 30),
                            endTime: getTimeW(11, 0),
                        },
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(11, 0),
                            endTime: getTimeW(11, 30),
                        },
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(11, 35),
                            endTime: getTimeW(12, 10),
                        },
                    ],
                },
                3: {
                    order: [
                        {
                            classID: ClassIDS.Period,
                            startTime: getTimeW(10, 30),
                            endTime: getTimeW(11, 40),
                        },
                        {
                            classID: ClassIDS.Lunch,
                            startTime: getTimeW(11, 40),
                            endTime: getTimeW(12, 10),
                        },
                    ],
                },
            },
        },
    },

    examSchedule: examSchedule,
    /* =========== */

    weekend: {
        name: 'Weekend',
        noOverride: true,
        classes: [
            {
                classID: ClassIDS.Weekend,
                period: 0,
                startTime: getTimeW(0, 0),
                endTime: getTimeW(24, 0),
            },
        ],
        lunch: {
            hasLunch: false,
        },
    },

    noSchool: {
        name: 'No School',
        classes: [
            {
                classID: ClassIDS.NoSchool,
                period: 0,
                startTime: getTimeW(0, 0),
                endTime: getTimeW(24, 0),
            },
        ],
        lunch: {
            hasLunch: false,
        },
    },

    summer: {
        name: 'Summer',
        noOverride: true,
        classes: [
            {
                classID: ClassIDS.Summer,
                period: 0,
                startTime: getTimeW(0, 0),
                endTime: getTimeW(24, 0),
            },
        ],
        lunch: {
            hasLunch: false,
        },
    },

    /* DOES NOT WORK YET */
    testMuliLunch: {
        name: 'test multi lunch',
        classes: [
            {
                classID: ClassIDS.Zero,
                period: 0,
                startTime: getTimeW(6, 35),
                endTime: getTimeW(7, 30),
            },
            {
                classID: ClassIDS.Period,
                period: 1,
                startTime: getTimeW(7, 35),
                endTime: getTimeW(8, 45),
            },
            {
                classID: ClassIDS.Period,
                period: 2,
                startTime: getTimeW(8, 50),
                endTime: getTimeW(9, 55),
            },
            {
                classID: ClassIDS.Period,
                period: 3,
                startTime: getTimeW(9, 55),
                endTime: getTimeW(11, 40),
            },
            {
                classID: ClassIDS.Period,
                period: 4,
                startTime: getTimeW(11, 45),
                endTime: getTimeW(12, 55),
            },
            {
                classID: ClassIDS.Period,
                period: 5,
                startTime: getTimeW(13, 0),
                endTime: getTimeW(14, 5),
            },
            {
                classID: ClassIDS.Dismissal,
                period: 0,
                startTime: getTimeW(14, 5),
                endTime: getTimeW(14, 10),
            },
        ],
        lunch: {
            hasLunch: true,
            isMultiLunch: true,
            basedOnPeriod: [3, 4],
            numberOfLunches: 3,
            multiLunches: {
                3: {
                    1: {
                        order: [
                            {
                                classID: ClassIDS.Lunch,
                                startTime: getTimeW(9, 55),
                                endTime: getTimeW(10, 25),
                            },
                            {
                                classID: ClassIDS.Period,
                                startTime: getTimeW(10, 30),
                                endTime: getTimeW(11, 40),
                            },
                        ],
                    },
                    2: {
                        order: [
                            {
                                classID: ClassIDS.Period,
                                startTime: getTimeW(10, 0),
                                endTime: getTimeW(10, 30),
                            },
                            {
                                classID: ClassIDS.Lunch,
                                startTime: getTimeW(10, 30),
                                endTime: getTimeW(11, 0),
                            },
                            {
                                classID: ClassIDS.Period,
                                startTime: getTimeW(11, 5),
                                endTime: getTimeW(11, 40),
                            },
                        ],
                    },
                    3: {
                        order: [
                            {
                                classID: ClassIDS.Period,
                                startTime: getTimeW(10, 0),
                                endTime: getTimeW(11, 10),
                            },
                            {
                                classID: ClassIDS.Lunch,
                                startTime: getTimeW(11, 10),
                                endTime: getTimeW(11, 40),
                            },
                        ],
                    },
                },
                4: {
                    1: {
                        order: [
                            {
                                classID: ClassIDS.Lunch,
                                startTime: getTimeW(11, 40),
                                endTime: getTimeW(12, 10),
                            },
                            {
                                classID: ClassIDS.Period,
                                startTime: getTimeW(12, 15),
                                endTime: getTimeW(12, 55),
                            },
                        ],
                    },
                    2: {
                        order: [
                            {
                                classID: ClassIDS.Period,
                                startTime: getTimeW(11, 45),
                                endTime: getTimeW(12, 10),
                            },
                            {
                                classID: ClassIDS.Lunch,
                                startTime: getTimeW(12, 15),
                                endTime: getTimeW(12, 30),
                            },
                            {
                                classID: ClassIDS.Period,
                                startTime: getTimeW(12, 35),
                                endTime: getTimeW(12, 55),
                            },
                        ],
                    },
                    3: {
                        order: [
                            {
                                classID: ClassIDS.Period,
                                startTime: getTimeW(11, 45),
                                endTime: getTimeW(12, 10),
                            },
                            {
                                classID: ClassIDS.Lunch,
                                startTime: getTimeW(12, 35),
                                endTime: getTimeW(12, 55),
                            },
                        ],
                    },
                },
            },
        },
    },
};
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
    { day: 0, schedule: schedules.weekend, noOverride: true }, // Sunday
    { day: 6, schedule: schedules.weekend, noOverride: true }, // Saturday

    // Weekdays
    { day: 1, schedule: schedules.normal }, // Monday
    { day: 2, schedule: schedules.advisory }, // Tuesday
    { day: 3, schedule: schedules.normal }, // Wednesday
    { day: 4, schedule: schedules.advisory }, // Thursday
    { day: 5, schedule: schedules.normal }, // Friday
];
