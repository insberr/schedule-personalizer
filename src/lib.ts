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

export function identifyCommit(): string | undefined  {
    if (process.env.GITHUB_SHA) {
        // we are running in gh actions
        return process.env.GITHUB_SHA
    } else if (process.env.CF_PAGES_COMMIT_SHA) {
        // cloudflare pages
        return process.env.CF_PAGES_COMMIT_SHA
    } else {
        return undefined
    }

}