// this needs to be in its own file for some goddamn reason

import { dateToTime, timeToDate, Time, getTimeW } from "./types";
import { add } from 'date-fns';
declare global {
    interface Window {
        devDate: {
            date: Date | null, 
            time: Time | null, 
            dateToTime: (arg0: Date) => Time, 
            getTimeW: (arg0: number, arg1: number, arg2?: number) => Time,
            enableTicking: () => void,
            disableTicking: () => void,
            ticker: number | null,
        };
    }
}

export function today(): Date {
    if (process.env.NODE_ENV != "production") {
        return timeToDate(window.devDate.time || dateToTime(new Date()), window.devDate.date || new Date());
    }
    return new Date();
}

window.devDate = {
    date: null,
    time: null,
    dateToTime,
    getTimeW,
    enableTicking: () => {
        if (window.devDate.ticker == null) {
            window.devDate.ticker = window.setInterval(() => {
                if (window.devDate.time != null) {
                    window.devDate.time = dateToTime(add(timeToDate(window.devDate.time), {seconds: 1}));
                }
            }, 1000);
        }
    },
    disableTicking: () => {
        if (window.devDate.ticker != null) {
            window.clearInterval(window.devDate.ticker);
            window.devDate.ticker = null;
        }
    },
    ticker: null
}
