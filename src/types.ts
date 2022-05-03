import set from "date-fns/set"


export type Stdata = {
    classes: Class[]
}

export type Class = {
    room: string
    teacher: Teacher
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