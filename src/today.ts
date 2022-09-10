// this needs to be in its own file for some goddamn reason

import { dateToTime, timeToDate, Time, getTimeW } from "./types";

declare global {
    interface Window { devDate: {date: Date | null, 
                                time: Time | null, 
                                dateToTime: (arg0: Date) => Time, 
                                getTimeW: (arg0: number, arg1: number, arg2?: number) => Time
                            }; }
}

// \/ this doesnt actually do anything, but it might confuse someone in the future so i'm leaving it here :)
// @parcel-inline
export function today(): Date {
    if (process.env.NODE_ENV != "production") {
        //console.log("today() called");
        return timeToDate(window.devDate.time || dateToTime(new Date()), window.devDate.date || new Date());
    }
    //console.log("today prod");
    return new Date();
}


window.devDate = {
    date: null,
    time: null,
    dateToTime,
    getTimeW,
}