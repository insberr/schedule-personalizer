import set from 'date-fns/set';
import { today } from './today';

// for config/settings.ts
export type cambridgeMapping = {
    [key: number]: {
        switch: number[];
        with: number[];
    };
};

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

export type Stdata = {
    studentVue: StudentVue;
    terms: Term[];
    customizations: Customizations;
};

export type StudentVue = {
    stayLoggedIn: boolean;
    username: string;
    password: string;
};

export type Class = {
    classID: ClassIDS;
    customID?: number;
    // number[] is because of my start at bnuilding multiLunches
    period: number | number[] | undefined;
    name: string;
    room: string | number;
    teacher: Teacher;
    // these times should be what studentvue says
    startTime: Time;
    endTime: Time;
};

export type Teacher = {
    name: string;
    email: string;
    id: string;
};

export type Time = {
    hours: number;
    minutes: number;
    seconds?: number;
};

export type RGBA = {
    enabled: boolean;
    // Highlight
    c: {
        r: number;
        g: number;
        b: number;
        a: number;
    };
    // Text
    t: {
        r: number;
        g: number;
        b: number;
        a: number;
    };
};

export type Colors = {
    schedule: {
        [key in ClassIDS]: RGBA;
    };
    currentClass: RGBA;
    scheduleFrame: RGBA;
};

export type Keybinds = {
    goForwardOneDay: string;
    goBackOneDay: string;
    goToToday: string;
};

export type Icon = {
    enabled: boolean;
    color: {
        r: number;
        g: number;
        b: number;
        a: number;
    };
};

export type Customizations = {
    theme: {
        colors: Colors;
        icons: {
            class: Icon;
            lunch: Icon;
            currentClass: Icon;
        };
    };
    keybinds: Keybinds;
    showInfoOnSchedule: boolean;
    tutorial: {
        moreMap: boolean;
    };
};

export function dateToTime(d: Date): Time {
    return {
        hours: d.getHours(),
        minutes: d.getMinutes(),
        seconds: d.getSeconds(),
    };
}

export function timeToDate(t: Time, d?: Date): Date {
    if (!d) {
        d = today();
    }
    return set(d, t);
}

export function getTimeW(h: number, m: number, s = 0): Time {
    return {
        hours: h,
        minutes: m,
        seconds: s,
    };
}

export function getTimeW_Input12Hour(h: number, m: number, isPM = false, s = 0): Time {
    return {
        hours: isPM && h < 12 ? h + 12 : h,
        minutes: m,
        seconds: s,
    };
}

export type schObject = {
    [key: string]: CL;
};

// Stages Types
export enum Stages {
    WhatsNew,
    Login,
    EnterManually,
    Schedule,
}

export type StageProps = {
    setStage: (stage: number) => void;
};

export type ManualResult = {
    classes: CL[];
    lunch: number;
};

export function generateASingleEmptyClass_CL(infoToAddIn?: {
    classID?: ClassIDS;
    period?: number;
    name?: string;
    teacher?: Teacher;
    room?: string;
}): CL {
    return {
        classID: infoToAddIn?.classID || ClassIDS.Period,
        period: infoToAddIn?.period || 0,
        name: infoToAddIn?.name || '',
        teacher: infoToAddIn?.teacher || {
            name: '',
            email: '',
            id: '',
        },
        room: infoToAddIn?.room || '',
    };
}

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

// STAGES TYPES END
