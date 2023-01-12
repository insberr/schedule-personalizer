export enum ClassIDS {
    Zero,
    Arrival,
    Advisory,
    Lunch,
    Period,
    Assembly,
    Passing,
    Dismissal,
    NoSchool,
    Weekend,
    Summer,
    Custom,
}

export type CL = {
    classID: ClassIDS;
    period: number;
    name: string;
    teacher: {
        name: string;
        email: string;
        id: string;
    };
    room: string;
};
export type Term = {
    isFake?: boolean;
    termIndex: number;
    startDate: Date;
    endDate: Date;
    classes: CL[] | [];
};

export type Terms = Term[];
export function emptyCL(amt: number, hasAdvisory: boolean): CL[] {
    const classes = [...Array(amt)].map((v, i) => {
        return {
            classID: ClassIDS.Period,
            period: i,
            name: '',
            teacher: {
                name: '',
                email: '',
                id: '',
            },
            room: '',
        };
    });
    if (hasAdvisory) {
        classes[0] = {
            ...classes[0],
            classID: ClassIDS.Advisory,
            name: 'Advisory',
        };
    }

    return classes;
}

export type MasterSettings = {
    studentVueUrl: string;
    schools: MasterSettingsSchool[];
};

export type MasterSettingsSchool = {
    stvName: string;
    terms: MasterSettingsTerms;
    studentVueAdvisoryPeriod: number;
    numberOfPeriods: number;
    hasAdvisory: boolean;
    scheduleURL: string;
};

export type MasterSettingsTerms = {
    start: string;
    end: string; // fuck you json, and your lack of dates
}[];

export type SchoolScheduleConfig = {
    schedules: { [key: string]: Schedule };
    events: Partial<SEvent>[];
    default: SEvent;
};
export type SEvent = {
    schedule: OptionalMatcher<string>;
};
export type Schedule = {
    name: string;
    periods: Period[];
};

export type Period = {
    id: ClassIDS;
    num: number;
};
export type OptionalMatcher<T> = T | Matcher<T>;

export type Matcher<T> = DOWMatcher<T> | TermMatcher<T>;

export type DOWMatcher<T> = {
    matchtype: 'DOW';
    mon: T;
    tue: T;
    wed: T;
    thu: T;
    fri: T;
    sat: T;
    sun: T;
};

export type TermMatcher<T> = {
    matchtype: 'TERM';
    [key: number]: T;
};
