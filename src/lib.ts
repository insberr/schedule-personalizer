// bunch of reusable functions
import { isAfter, isBefore, format, parse, set } from "date-fns"
import { dateToTime, Stdata, Time, timeToDate } from "./types";

export function getCurrentTerm (t: Stdata, d?: Date): number {
    if (!d) {
        d = new Date()
    }
    return 2 // gamer
}

export function formatTime(t: Time | Date): string {
    if (!(t instanceof Date)) {
        t = timeToDate(t)
    }
    return format(t, "hh:mm")

}

export function formatClassTime(start: Time, end: Time): string {
    return formatTime(start) + " - " + formatTime(end)
}

export function parseTime(timeString: string): Time {
    return dateToTime(parse(timeString, "hh:mm",set(new Date(), { seconds: 0 } )))
}