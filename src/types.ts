import set from "date-fns/set"

export type CL = {
    classID: ClassIDS
    period: number
    name: string
    teacher: {
        name: string,
        id: string
    }
    room: string,

}

export enum ClassIDS {
    Zero,
    Advisory,
    Lunch,
    Period,
    Assembly,
    Dismissal,
    NoSchool,
    Weekend
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

export type Term = {
    term: number
    // remove the | string  later since yeah its not supposed to be a string
    startDate: Date | string
    endDate: Date | string
    classes: Class[]
}

export type Class = {
    classID: ClassIDS
    period: string | number
    name: string
    room: string | number | null
    teacher: Teacher | null
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

export function emptyCL(amt: number): CL[] {
    return [...Array(amt)].map((v, i) => {
        return {
            classID: ClassIDS.Period,
            period: i,
            name: "",
            teacher: {
                name: "",
                id: ""
            },
            room: ""
        }
    })
    
}

// STAGES TYPES END


