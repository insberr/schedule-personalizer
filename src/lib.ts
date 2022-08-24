// bunch of reusable functions
import { format, parse, set } from "date-fns"
import { dateToTime, Stdata, Time, timeToDate, CL, Class, ClassIDS, Terms } from "./types";
import _lunches from "./lunches.json"

import * as api from './studentVueAPI';


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
    return format(t, "h:mm")

}

export function formatClassPeriodName(classData: Class): string {
    if (classData.classID === ClassIDS.Zero) return "Zero Hour"
    if (classData.classID === ClassIDS.Advisory) return "Advisory"
    if (classData.classID === ClassIDS.NoSchool) return "No School"
    if (classData.classID === ClassIDS.Dismissal) return "Dismissal"
    if (classData.classID === ClassIDS.Assembly) return "Assembly"
    if (classData.classID === ClassIDS.Weekend) return "Weekend"
    if (classData.classID === ClassIDS.Summer) return "Summer"
    return "Period " + classData.period;
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
// https://stackoverflow.com/a/13627586
export function ordinal_suffix_of(i: number): string {
    const j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

export const lunches: string[][] = _lunches; // probably a better spot for this but eh

export function fixLunch(classes: CL[], lunch: number): CL[] { // returns the classes with the ids of all the classes changed to detect to the specified lunch
    // The hell is this function even for?
    return classes.map(c => {
        c.teacher.id = lunches[lunch][0] // wow!
        return c;
    })
}

export function formatClassTimeHideElement(classData: Class): string {
    if (classData.classID === ClassIDS.NoSchool) return 'hidden';
    if (classData.classID  === ClassIDS.Weekend) return 'hidden';
    if (classData.classID  === ClassIDS.Summer) return 'hidden';
    return '';
}

export type refreshedStudentVueData = {
    successful: boolean
    terms?: Terms
}
export function refreshStudentVueSchedules(username: string, password: string): refreshedStudentVueData {
    let output: refreshedStudentVueData = {
        successful: false
    };

    api.getAllSchedules(username, password).then((res: api.StudentVueAPIData) => {
        output = {
            terms: api.convertStudentvueDataToTerms(res),
            successful: true
        }
    }).catch((err: string) => {
        // TODO: handle this error and send to sentry
        console.log('Unable to get schedules from studentvue.' + err);
        output = {
            successful: false
        }
    });

    return output;
}

export function toTitleCase(str: string): string {
    return str.replace(
        /\w\S*/g,
        function(str) {
            return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
        }
    );
}

export function courseTitleNameCase(str: string): string {
    // add for loop or something with a list of things
    str = str.replace('ENG', 'ENGLISH');

    str = toTitleCase(str);
    str = str.replace('Ap', 'AP');
    str = str.replace('Ela', 'ELA');
    
    return str
}

export function displayRoomsCol(sch: Class[]): boolean {
    let value = true;

    const emptyRoomNamedClasses = sch.filter(c => c.room === '');
    if (emptyRoomNamedClasses.length === sch.length) value = false;

    return value;
}

export function displayTeacherNamesCol(sch: Class[]): boolean {
    let value = true;

    const emptyTeacherNamedClasses = sch.filter(c => c.teacher.name === '');
    if (emptyTeacherNamedClasses.length === sch.length) value = false;

    return value;
}
