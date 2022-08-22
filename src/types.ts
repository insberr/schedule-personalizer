import set from "date-fns/set"

export type CL = {
    classID: ClassIDS
    period: number
    name: string
    teacher: {
        name: string,
        email: string,
        id: string
    }
    room: string,
}
export type Term = {
    isFake?: boolean
    termIndex: number
    startDate: Date
    endDate: Date
    classes: CL[] | []
}

export type Terms = Term[]
export enum ClassIDS {
    Zero,
    Arrival,
    Advisory,
    Lunch,
    Period,
    Assembly,
    Dismissal,
    NoSchool,
    Weekend,
    Summer
}

export type Stdata = {
    studentVue: StudentVue
    terms: Term[]
    customizations: Customizations
}

export type StudentVue = {
    stayLoggedIn: boolean
    username: string
    password: string
}

export type Class = {
    classID: ClassIDS
    period: number | undefined
    name: string
    room: string | number
    teacher: Teacher
    // these times should be what studentvue says
    startTime: Time
    endTime: Time
}

export type Teacher = {
    name: string
    email: string
    id: string
}

export type Time = {
    hours: number
    minutes: number
    seconds?: number
}

export type Colors = {
    currentClass: string
    zeroHour: string
    lunch: string
    normalClass: string
    dismissal: string
    arrival: string
    background: string
}

export type Customizations = {
    theme: {
        colors: Colors | Record<string, string>
    }
    showInfoOnSchedule: boolean
}

export function dateToTime(d: Date): Time {
    return {
        hours: d.getHours(),
        minutes: d.getMinutes(),
        seconds: d.getSeconds()
    }
}

export function timeToDate(t: Time, d?: Date): Date {
    if (!d) {
        d = new Date()
    }
    return set(d, t)
}

export function getTimeW(h: number, m: number, s = 0): Time {
    return {
        hours: h,
        minutes: m,
        seconds: s
    }
}

export type schObject = {
    [key: string]: CL
}

// Stages Types
export enum Stages {
    WhatsNew,
    Login,
    EnterManually,
    Schedule,
}

export type StageProps = {
    setStage: (stage: number) => void
}

export type ManualResult = {
    classes: CL[],
    lunch: number
}

export function emptyCL(amt: number, hasAdvisory: boolean): CL[] {
    const classes = [...Array(amt)].map((v, i) => {
        return {
            classID: ClassIDS.Period,
            period: i,
            name: "",
            teacher: {
                name: "",
                email: "",
                id: ""
            },
            room: ""
        }
    })
    if (hasAdvisory) {
        classes[0] = {
            ...classes[0],
            classID: ClassIDS.Advisory,
            name: "Advisory",
        }
    }

    return classes;
}

// STAGES TYPES END


