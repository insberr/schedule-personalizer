import { ClassIDS, getTimeW, Time } from '../types';
import '../types/schedulesTypes';

export type CLIdentifier = {
    classID: ClassIDS;
    period: number;
}

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

export enum ReplaceType {
    Switch,
    Before,
    After,
}
export type Replace = {
    type: ReplaceType
    base: CLIdentifier
    with: SCHCL;
}

export type Overides = {
    replace: Replace[]
}

export type CambridgeOverideGrade = {
    forceLunch?: number,
    ignoreLunchConfig?: boolean,
    overides: Overides,
}

export type CambridgeOveride = {
    // grade number
    [key: number]: CambridgeOverideGrade;
}

export type SchedulesType = {
    name: string, // This is used by the event editor
    noOverride?: boolean, // This is to be used for schedules that should not be overridden by any event, really only for weekends and summer
    classes: SCHCL[],
    // Might be a bade idea having it optional ...
    cambridge?: CambridgeOveride,
    lunch: {
        hasLunch: boolean,
        basedOnPeriod?: number | number[],
        numberOfLunches?: number,
        lunches?: {
            [key: number]: Lunch
        }

        /* DOES NOT WORK YET */
        isMultiLunch?: boolean,
        multiLunches?: {
            /// <basedOnPeriod>: { <lunch>: { order: [] } }
            [key: number]: {
                [key: number]: Lunch
            }
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

// TODO: Correct cambridge class times ...
export const schedules: Schedules = {
    normal: {
        name: 'Normal',
        classes: [
            { classID: ClassIDS.Zero, period: 0, startTime: getTimeW(6, 35), endTime: getTimeW(7, 30) },
            { classID: ClassIDS.Period, period: 1, startTime: getTimeW(7, 35), endTime: getTimeW(8, 45) },
            { classID: ClassIDS.Period, period: 2, startTime: getTimeW(8, 50), endTime: getTimeW(9, 55) },
            { classID: ClassIDS.Period, period: 3, startTime: getTimeW(9, 55), endTime: getTimeW(11, 40) },
            { classID: ClassIDS.Period, period: 4, startTime: getTimeW(11, 45), endTime: getTimeW(12, 55) },
            { classID: ClassIDS.Period, period: 5, startTime: getTimeW(13, 0), endTime: getTimeW(14, 5) },
            { classID: ClassIDS.Dismissal, period: 0, startTime: getTimeW(14, 5), endTime: getTimeW(14, 10) },
        ],
        cambridge: {
            10: {
                overides: {
                    replace: [
                        {
                            base: { classID: ClassIDS.Period, period: 1 },
                            type: ReplaceType.Switch,
                            with: { classID: ClassIDS.Period, period: 11, startTime: getTimeW(8, 10), endTime: getTimeW(8, 40) }
                        },
                        {
                            base: { classID: ClassIDS.Period, period: 2 },
                            type: ReplaceType.Switch,
                            with: { classID: ClassIDS.Period, period: 12, startTime: getTimeW(8, 45), endTime: getTimeW(9, 25) }
                        },
                        {
                            base: { classID: ClassIDS.Period, period: 12 },
                            type: ReplaceType.After,
                            with: { classID: ClassIDS.Period, period: 13, startTime: getTimeW(9, 30), endTime: getTimeW(10, 10) }
                        },
                    ]
                }
            },
            11: {
                forceLunch: 3,
                ignoreLunchConfig: true,
                overides: {
                    replace: [
                        {
                            base: { classID: ClassIDS.Period, period: 2 },
                            type: ReplaceType.Switch,
                            with: { classID: ClassIDS.Period, period: 11, startTime: getTimeW(9, 10), endTime: getTimeW(9, 40) }
                        },
                        {
                            base: { classID: ClassIDS.Period, period: 3 },
                            type: ReplaceType.Switch,
                            with: { classID: ClassIDS.Period, period: 12, startTime: getTimeW(9, 45), endTime: getTimeW(10, 25) }
                        },
                        {
                            base: { classID: ClassIDS.Period, period: 12 },
                            type: ReplaceType.After,
                            with: { classID: ClassIDS.Period, period: 13, startTime: getTimeW(10, 30), endTime: getTimeW(11, 25) }

                        },
                        {
                            base: { classID: ClassIDS.Period, period: 13 },
                            type: ReplaceType.After,
                            with: { classID: ClassIDS.Lunch, period: 13, startTime: getTimeW(11, 25), endTime: getTimeW(11, 55) }
                        },
                    ]
                }
            }
        },
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
        name: 'Advisory',
        classes: [
            { classID: ClassIDS.Zero, period: 0, startTime: getTimeW(6, 35), endTime: getTimeW(7, 30) },
            { classID: ClassIDS.Advisory, period: 0, startTime: getTimeW(7, 35), endTime: getTimeW(8, 5) },
            { classID: ClassIDS.Period, period: 1, startTime: getTimeW(8, 10), endTime: getTimeW(9, 5) },
            { classID: ClassIDS.Period, period: 2, startTime: getTimeW(9, 10), endTime: getTimeW(10, 10) },
            { classID: ClassIDS.Period, period: 3, startTime: getTimeW(10, 10), endTime: getTimeW(11, 55) },
            { classID: ClassIDS.Period, period: 4, startTime: getTimeW(12, 0), endTime: getTimeW(13, 0) },
            { classID: ClassIDS.Period, period: 5, startTime: getTimeW(13, 5), endTime: getTimeW(14, 5) },
            { classID: ClassIDS.Dismissal, period: 0, startTime: getTimeW(14, 5), endTime: getTimeW(14, 10) },
        ],
        cambridge: {
            10: {
                overides: {
                    replace: [
                        {
                            base: { classID: ClassIDS.Period, period: 1 },
                            type: ReplaceType.Switch,
                            with: { classID: ClassIDS.Period, period: 11, startTime: getTimeW(8, 10), endTime: getTimeW(8, 40) }
                        },
                        {
                            base: { classID: ClassIDS.Period, period: 2 },
                            type: ReplaceType.Switch,
                            with: { classID: ClassIDS.Period, period: 12, startTime: getTimeW(8, 45), endTime: getTimeW(9, 25) }
                        },
                        {
                            base: { classID: ClassIDS.Period, period: 12 },
                            type: ReplaceType.After,
                            with: { classID: ClassIDS.Period, period: 13, startTime: getTimeW(9, 30), endTime: getTimeW(10, 10) }
                        },
                    ]
                }
            },
            11: {
                forceLunch: 3,
                ignoreLunchConfig: true,
                overides: {
                    replace: [
                        {
                            base: { classID: ClassIDS.Period, period: 2 },
                            type: ReplaceType.Switch,
                            with: { classID: ClassIDS.Period, period: 11, startTime: getTimeW(9, 10), endTime: getTimeW(9, 40) }
                        },
                        {
                            base: { classID: ClassIDS.Period, period: 3 },
                            type: ReplaceType.Switch,
                            with: { classID: ClassIDS.Period, period: 12, startTime: getTimeW(9, 45), endTime: getTimeW(10, 25) }
                        },
                        {
                            base: { classID: ClassIDS.Period, period: 12 },
                            type: ReplaceType.After,
                            with: { classID: ClassIDS.Period, period: 13, startTime: getTimeW(10, 30), endTime: getTimeW(11, 25) }

                        },
                        {
                            base: { classID: ClassIDS.Period, period: 13 },
                            type: ReplaceType.After,
                            with: { classID: ClassIDS.Lunch, period: 13, startTime: getTimeW(11, 25), endTime: getTimeW(11, 55) }
                        },
                    ]
                }
            }
        },
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
    lateStart1Hour: {
        name: '1 Hour Late Start',
        classes: [
            { classID: ClassIDS.Arrival, period: 0, startTime: getTimeW(8, 15), endTime: getTimeW(8, 30) },
            { classID: ClassIDS.Period, period: 1, startTime: getTimeW(8, 35), endTime: getTimeW(9, 25) },
            { classID: ClassIDS.Period, period: 2, startTime: getTimeW(9, 30), endTime: getTimeW(10, 25) },
            { classID: ClassIDS.Period, period: 3, startTime: getTimeW(10, 25), endTime: getTimeW(12, 10) },
            { classID: ClassIDS.Period, period: 4, startTime: getTimeW(12, 15), endTime: getTimeW(13, 10) },
            { classID: ClassIDS.Period, period: 5, startTime: getTimeW(13, 15), endTime: getTimeW(14, 5) },
            { classID: ClassIDS.Dismissal, period: 0, startTime: getTimeW(14, 5), endTime: getTimeW(14, 10) },
        ],
        cambridge: {
            10: {
                overides: {
                    replace: [
                        {
                            base: { classID: ClassIDS.Period, period: 1 },
                            type: ReplaceType.Switch,
                            with: { classID: ClassIDS.Period, period: 11, startTime: getTimeW(8, 10), endTime: getTimeW(8, 40) }
                        },
                        {
                            base: { classID: ClassIDS.Period, period: 2 },
                            type: ReplaceType.Switch,
                            with: { classID: ClassIDS.Period, period: 12, startTime: getTimeW(8, 45), endTime: getTimeW(9, 25) }
                        },
                        {
                            base: { classID: ClassIDS.Period, period: 12 },
                            type: ReplaceType.After,
                            with: { classID: ClassIDS.Period, period: 13, startTime: getTimeW(9, 30), endTime: getTimeW(10, 10) }
                        },
                    ]
                }
            },
            11: {
                forceLunch: 3,
                ignoreLunchConfig: true,
                overides: {
                    replace: [
                        {
                            base: { classID: ClassIDS.Period, period: 2 },
                            type: ReplaceType.Switch,
                            with: { classID: ClassIDS.Period, period: 11, startTime: getTimeW(9, 10), endTime: getTimeW(9, 40) }
                        },
                        {
                            base: { classID: ClassIDS.Period, period: 3 },
                            type: ReplaceType.Switch,
                            with: { classID: ClassIDS.Period, period: 12, startTime: getTimeW(9, 45), endTime: getTimeW(10, 25) }
                        },
                        {
                            base: { classID: ClassIDS.Period, period: 12 },
                            type: ReplaceType.After,
                            with: { classID: ClassIDS.Period, period: 13, startTime: getTimeW(10, 30), endTime: getTimeW(11, 25) }

                        },
                        {
                            base: { classID: ClassIDS.Period, period: 13 },
                            type: ReplaceType.After,
                            with: { classID: ClassIDS.Lunch, period: 13, startTime: getTimeW(11, 25), endTime: getTimeW(11, 55) }
                        },
                    ]
                }
            }
        },
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
    lateStart2Hour: {
        name: '2 Hour Late Start',
        classes: [
            { classID: ClassIDS.Arrival, period: 0, startTime: getTimeW(9, 15), endTime: getTimeW(9, 30) },
            { classID: ClassIDS.Period, period: 1, startTime: getTimeW(9, 35), endTime: getTimeW(10, 15) },
            { classID: ClassIDS.Period, period: 2, startTime: getTimeW(10, 20), endTime: getTimeW(11, 0) },
            { classID: ClassIDS.Period, period: 3, startTime: getTimeW(11, 0), endTime: getTimeW(12, 35) },
            { classID: ClassIDS.Period, period: 4, startTime: getTimeW(12, 40), endTime: getTimeW(13, 20) },
            { classID: ClassIDS.Period, period: 5, startTime: getTimeW(13, 25), endTime: getTimeW(14, 5) },
            { classID: ClassIDS.Dismissal, period: 0, startTime: getTimeW(14, 5), endTime: getTimeW(14, 10) },
        ],
        cambridge: {
            10: {
                overides: {
                    replace: [
                        {
                            base: { classID: ClassIDS.Period, period: 1 },
                            type: ReplaceType.Switch,
                            with: { classID: ClassIDS.Period, period: 11, startTime: getTimeW(8, 10), endTime: getTimeW(8, 40) }
                        },
                        {
                            base: { classID: ClassIDS.Period, period: 2 },
                            type: ReplaceType.Switch,
                            with: { classID: ClassIDS.Period, period: 12, startTime: getTimeW(8, 45), endTime: getTimeW(9, 25) }
                        },
                        {
                            base: { classID: ClassIDS.Period, period: 12 },
                            type: ReplaceType.After,
                            with: { classID: ClassIDS.Period, period: 13, startTime: getTimeW(9, 30), endTime: getTimeW(10, 10) }
                        },
                    ]
                }
            },
            11: {
                forceLunch: 3,
                ignoreLunchConfig: true,
                overides: {
                    replace: [
                        {
                            base: { classID: ClassIDS.Period, period: 2 },
                            type: ReplaceType.Switch,
                            with: { classID: ClassIDS.Period, period: 11, startTime: getTimeW(9, 10), endTime: getTimeW(9, 40) }
                        },
                        {
                            base: { classID: ClassIDS.Period, period: 3 },
                            type: ReplaceType.Switch,
                            with: { classID: ClassIDS.Period, period: 12, startTime: getTimeW(9, 45), endTime: getTimeW(10, 25) }
                        },
                        {
                            base: { classID: ClassIDS.Period, period: 12 },
                            type: ReplaceType.After,
                            with: { classID: ClassIDS.Period, period: 13, startTime: getTimeW(10, 30), endTime: getTimeW(11, 25) }

                        },
                        {
                            base: { classID: ClassIDS.Period, period: 13 },
                            type: ReplaceType.After,
                            with: { classID: ClassIDS.Lunch, period: 13, startTime: getTimeW(11, 25), endTime: getTimeW(11, 55) }
                        },
                    ]
                }
            }
        },
        lunch: {
            hasLunch: true,
            basedOnPeriod: 3,
            numberOfLunches: 3,
            lunches: {
                1: { order: [
                    { classID: ClassIDS.Lunch, startTime: getTimeW(11, 0), endTime: getTimeW(11, 30) },
                    { classID: ClassIDS.Period, startTime: getTimeW(11, 35), endTime: getTimeW(12, 35) }
                ]},
                2: { order: [
                    { classID: ClassIDS.Period, startTime: getTimeW(11, 5), endTime: getTimeW(11, 30) },
                    { classID: ClassIDS.Lunch, startTime: getTimeW(11, 30), endTime: getTimeW(12, 0) },
                    { classID: ClassIDS.Period, startTime: getTimeW(12, 5), endTime: getTimeW(12, 35) }
                ]},
                3: { order: [
                    { classID: ClassIDS.Period, startTime: getTimeW(11, 5), endTime: getTimeW(12, 5) },
                    { classID: ClassIDS.Lunch, startTime: getTimeW(12, 5), endTime: getTimeW(12, 35) }
                ]},
            }
        }
    },

    earlyDissmissal: {
        name: 'Early Dissmissal',
        classes: [
            { classID: ClassIDS.Zero, period: 0, startTime: getTimeW(6, 35), endTime: getTimeW(7, 30) },
            { classID: ClassIDS.Period, period: 1, startTime: getTimeW(7, 35), endTime: getTimeW(8, 0) },
            { classID: ClassIDS.Period, period: 2, startTime: getTimeW(8, 5), endTime: getTimeW(8, 30) },
            { classID: ClassIDS.Period, period: 3, startTime: getTimeW(8, 35), endTime: getTimeW(9, 0) },
            { classID: ClassIDS.Period, period: 4, startTime: getTimeW(9, 5), endTime: getTimeW(9, 30) },
            { classID: ClassIDS.Period, period: 5, startTime: getTimeW(9, 35), endTime: getTimeW(10, 5) },
            { classID: ClassIDS.Dismissal, period: 0, startTime: getTimeW(10, 5), endTime: getTimeW(10, 10) },
        ],
        cambridge: {
            10: {
                overides: {
                    replace: [
                        {
                            base: { classID: ClassIDS.Period, period: 1 },
                            type: ReplaceType.Switch,
                            with: { classID: ClassIDS.Period, period: 11, startTime: getTimeW(8, 10), endTime: getTimeW(8, 40) }
                        },
                        {
                            base: { classID: ClassIDS.Period, period: 2 },
                            type: ReplaceType.Switch,
                            with: { classID: ClassIDS.Period, period: 12, startTime: getTimeW(8, 45), endTime: getTimeW(9, 25) }
                        },
                        {
                            base: { classID: ClassIDS.Period, period: 12 },
                            type: ReplaceType.After,
                            with: { classID: ClassIDS.Period, period: 13, startTime: getTimeW(9, 30), endTime: getTimeW(10, 10) }
                        },
                    ]
                }
            },
            11: {
                forceLunch: 3,
                ignoreLunchConfig: true,
                overides: {
                    replace: [
                        {
                            base: { classID: ClassIDS.Period, period: 2 },
                            type: ReplaceType.Switch,
                            with: { classID: ClassIDS.Period, period: 11, startTime: getTimeW(9, 10), endTime: getTimeW(9, 40) }
                        },
                        {
                            base: { classID: ClassIDS.Period, period: 3 },
                            type: ReplaceType.Switch,
                            with: { classID: ClassIDS.Period, period: 12, startTime: getTimeW(9, 45), endTime: getTimeW(10, 25) }
                        },
                        {
                            base: { classID: ClassIDS.Period, period: 12 },
                            type: ReplaceType.After,
                            with: { classID: ClassIDS.Period, period: 13, startTime: getTimeW(10, 30), endTime: getTimeW(11, 25) }

                        },
                    ]
                }
            }
        },
        lunch: {
            hasLunch: false,
        }
    },
    weekend: {
        name: 'Weekend',
        noOverride: true,
        classes: [
            { classID: ClassIDS.Weekend, period: 0, startTime: getTimeW(0, 0), endTime: getTimeW(24, 0) },
        ],
        lunch: {
            hasLunch: false
        }
    },
    
    noSchool: {
        name: 'No School',
        classes: [
            { classID: ClassIDS.NoSchool, period: 0, startTime: getTimeW(0, 0), endTime: getTimeW(24, 0) },
        ],
        lunch: {
            hasLunch: false,
        }
    },

    summer: {
        name: 'Summer',
        noOverride: true,
        classes: [
            { classID: ClassIDS.Summer, period: 0, startTime: getTimeW(0, 0), endTime: getTimeW(24, 0) },
        ],
        lunch: {
            hasLunch: false,
        }
    },

    /* DOES NOT WORK YET */
    testMuliLunch: {
        name: 'test multi lunch',
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
            isMultiLunch: true,
            basedOnPeriod: [3, 4],
            numberOfLunches: 3,
            multiLunches: {
                3: {
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
                },
                4: {
                    1: { order: [
                        { classID: ClassIDS.Lunch, startTime: getTimeW(11, 40), endTime: getTimeW(12, 10) },
                        { classID: ClassIDS.Period, startTime: getTimeW(12, 15), endTime: getTimeW(12, 55) }
                    ]},
                    2: { order: [
                        { classID: ClassIDS.Period, startTime: getTimeW(11, 45), endTime: getTimeW(12, 10) },
                        { classID: ClassIDS.Lunch, startTime: getTimeW(12, 15), endTime: getTimeW(12, 30) },
                        { classID: ClassIDS.Period, startTime: getTimeW(12, 35), endTime: getTimeW(12, 55) }
                    ]},
                    3: { order: [
                        { classID: ClassIDS.Period, startTime: getTimeW(11, 45), endTime: getTimeW(12, 10) },
                        { classID: ClassIDS.Lunch, startTime: getTimeW(12, 35), endTime: getTimeW(12, 55) }
                    ]},
                }
            }
        }
    },
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
    { day: 0, schedule: schedules.weekend, noOverride: true }, // Sunday
    { day: 6, schedule: schedules.weekend, noOverride: true }, // Saturday

    // Weekdays
    { day: 1, schedule: schedules.normal }, // Monday
    { day: 2, schedule: schedules.advisory }, // Tuesday
    { day: 3, schedule: schedules.normal }, // Wednesday
    { day: 4, schedule: schedules.advisory }, // Thursday
    { day: 5, schedule: schedules.normal }, // Friday
]
