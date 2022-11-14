// bunch of reusable functions
import { addSeconds, format, isAfter, isBefore, parse, set } from 'date-fns';
import { dateToTime, Stdata, Time, timeToDate, Class, ClassIDS, Terms } from '../types';
/*
import * as api from './studentvue/studentVueAPI';
import { StudentVueAPIDataUserDate } from './studentvue/studentVueAPI';
*/
import { isEqual } from 'lodash';

import { today } from './today';

export function getCurrentTerm(t: Stdata, d?: Date): number {
    if (!d) {
        d = new Date();
    }
    return 2; // gamer
}

export function formatTime(t: Time | Date): string {
    if (!(t instanceof Date)) {
        t = timeToDate(t);
    }
    return format(t, 'h:mm');
}

export function formatClassPeriodName(classData: Class): string {
    if (classData.classID === ClassIDS.Zero) return 'Zero Hour';
    if (classData.classID === ClassIDS.Arrival) return 'Arrival';
    if (classData.classID === ClassIDS.Advisory) return 'Advisory';
    if (classData.classID === ClassIDS.NoSchool) return 'No School';
    if (classData.classID === ClassIDS.Dismissal) return 'Dismissal';
    if (classData.classID === ClassIDS.Assembly) return 'Assembly';
    if (classData.classID === ClassIDS.Weekend) return 'Weekend';
    if (classData.classID === ClassIDS.Summer) return 'Summer';
    if (classData.classID === ClassIDS.Passing) return 'Passing';
    return 'Period ' + classData.period;
}

export function formatClassTime(start: Time, end: Time): string {
    return formatTime(start) + ' - ' + formatTime(end);
}

export function parseTime(timeString: string): Time {
    return dateToTime(parse(timeString, 'hh:mm', set(today(), { seconds: 0 })));
}

export function identifyCommit(): string | undefined {
    if (process.env.GITHUB_SHA) {
        // we are running in gh actions
        return process.env.GITHUB_SHA;
    } else if (process.env.CF_PAGES_COMMIT_SHA) {
        // cloudflare pages
        return process.env.CF_PAGES_COMMIT_SHA;
    } else {
        return undefined;
    }
}
// https://stackoverflow.com/a/13627586
export function ordinal_suffix_of(i: number): string {
    const j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + 'st';
    }
    if (j == 2 && k != 12) {
        return i + 'nd';
    }
    if (j == 3 && k != 13) {
        return i + 'rd';
    }
    return i + 'th';
}

/*
export const lunches: string[][] = _lunches; // probably a better spot for this but eh
export function fixLunch(classes: CL[], lunch: number): CL[] { // returns the classes with the ids of all the classes changed to detect to the specified lunch
    // The hell is this function even for?
    return classes.map(c => {
        c.teacher.id = lunches[lunch][0] // wow!
        return c;
    })
}
*/

export function formatClassTimeHideElement(classData: Class): string {
    if (classData.classID === ClassIDS.NoSchool) return 'hidden';
    if (classData.classID === ClassIDS.Weekend) return 'hidden';
    if (classData.classID === ClassIDS.Summer) return 'hidden';
    return '';
}

export type refreshedStudentVueData = {
    successful: boolean;
    terms?: Terms;
};
/*
export function refreshStudentVueSchedules(username: string, password: string): refreshedStudentVueData {
    let output: refreshedStudentVueData = {
        successful: false,
    };

    api.getAllSchedules(username, password)
        .then((res: api.StudentVueAPIData) => {
            output = {
                terms: api.convertStudentvueDataToTerms(res),
                successful: true,
            };
        })
        .catch((err: string) => {
            console.log('Unable to get schedules from studentvue.' + err);
            output = {
                successful: false,
            };
        });

    return output;
}*/

export function toTitleCase(str: string | null | undefined): string {
    if (str === undefined || str === null) return '';

    const lowercase = str.toLowerCase().split(' ');
    if (lowercase.length < 1) return str;

    return lowercase
        .map(function (word) {
            if (word === '') return word;
            return word.replace(word[0], word[0].toUpperCase());
        })
        .join(' ');
}

export function courseTitleNameCase(str: string): string {
    // add for loop or something with a list of things
    // str = str.replace('ENG', 'ENGLISH');

    str = toTitleCase(str);

    // to do: make this actually do what its supposed to do
    // str = str.replace('Ap', 'AP');
    // str = str.replace('Ela ', 'ELA');

    return str;
}

export function displayRoomsCol(sch: Class[]): boolean {
    let value = true;

    const emptyRoomNamedClasses = sch.filter((c) => c.room === '');
    if (emptyRoomNamedClasses.length === sch.length) value = false;

    return value;
}

export function displayTeacherNamesCol(sch: Class[]): boolean {
    let value = true;

    const emptyTeacherNamedClasses = sch.filter((c) => c.teacher.name === '');
    if (emptyTeacherNamedClasses.length === sch.length) value = false;

    return value;
}

// TO DO: move to settings file
const InfoToKeep = ['CounselorEmail', 'CurrentSchool', 'FormattedName', 'Grade'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function redactStructure(obj: any): any {
    // recursively redact an object by replacing all values that are not an object with "REDACTED"

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let newObj: any = {};
    if (typeof obj === 'object') {
        newObj = { ...obj };
    } else {
        newObj = obj;
    }
    if (typeof newObj === 'object') {
        for (const key in newObj) {
            if (Object.prototype.hasOwnProperty.call(newObj, key)) {
                newObj[key] = redactStructure(newObj[key]);
            }
        }
    } else if (Array.isArray(newObj)) {
        return newObj.map(redactStructure);
    } else {
        return '<REDACTED ' + typeof newObj + '>';
    }

    return newObj;
}
/*
export function redactStudentInfo(data: StudentVueAPIDataUserDate): StudentVueAPIDataUserDate {
    // add types pl\
    // eslint-disable-next-line prefer-const
    let out: Record<string, unknown> = {};
    Object.entries(data.content).forEach(([key, value]) => {
        if (InfoToKeep.includes(key)) {
            //console.log("keeping", key)
            out[key] = value;
        } else {
            //console.log("redacting", key)
            out[key] = redactStructure(value); // mm js
            //console.log(key,"redacted to",out[key])
        }
    });
    return { code: data.code, content: out };
}
*/
export function isCurrentClass(sch: Class[], period: Class, currentClassDateAndTime: Date): boolean {
    const index = sch.indexOf(period);
    const lastClass = sch[index - 1];
    if (
        (isAfter(currentClassDateAndTime, addSeconds(timeToDate(lastClass?.endTime || period.startTime, currentClassDateAndTime), 1)) ||
            isEqual(currentClassDateAndTime, addSeconds(timeToDate(lastClass?.endTime || period.startTime, currentClassDateAndTime), 1))) &&
        (isBefore(currentClassDateAndTime, timeToDate(period.endTime, currentClassDateAndTime)) ||
            isEqual(currentClassDateAndTime, timeToDate(period.endTime, currentClassDateAndTime)))
    ) {
        return true;
    }
    return false;
}

export function updateSW() {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.getRegistration().then((reg) => {
            if (reg) {
                reg.unregister().then((didun) => {
                    if (!didun) {
                        console.error('lmafo it didnt unregister');
                    }
                    location.reload();
                    return;
                });
                location.reload();
                return;
            }
        });
    }
    location.reload();
}
