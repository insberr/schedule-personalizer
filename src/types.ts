import set from "date-fns/set"


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
    startDate: Date
    endDate: Date
    classes: Class[]
}

export type Class = {
    period: string
    room: string | null
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
    seconds: number
}

export type Customizations = {
    theme: {
        color: string
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

export function getTimeW(h: number, m: number, s: number): Time {
    return {
        hours: h,
        minutes: m,
        seconds: s
    }
}