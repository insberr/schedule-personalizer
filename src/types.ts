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
