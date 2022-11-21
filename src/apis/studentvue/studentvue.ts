// REWRITE THIS PLS

// import { Terms, emptyCL, ClassIDS } from '../../types';
// import * as settings from '../../config/settings';
// import { courseTitleNameCase, redactStudentInfo, toTitleCase } from '../../lib/lib';
import { StudentInfo, StudentClassList, validate, isError, StudentSchoolInfo, StudentGradebook } from './api';
import { StudentVueAPIData, StudentVueAPIDataClassListsTermClass } from './studentvueTypes';
// import * as Sentry from '@sentry/react';

export async function validateCredentials({ url, username, password }: { url: string; username: string; password: string }): Promise<boolean> {
    return await validate({ url, username, password }); // mm
}

// Propbably should change args to take a StorageDataStudentvue object
// eslint-disable-next-line @typescript-eslint/no-explicit-any

export function convertStudentvueDataToTerms(data: StudentVueAPIData): Terms {
    // Hopefully this will catch any instance of studentvue returning an object instead of an array for the term.
    // If theres one class in a term it retuns the calss instead of the class in an array
    // This should fix that and probably get rid of that annoying error
    const studentvueTerms = data.content.ClassLists.map((svueTerm) => {
        if ((svueTerm as StudentVueAPIDataClassListsTermClass[])?.length === undefined) {
            return [svueTerm];
        }
        return svueTerm;
    });

    // console.log('studentVueTerms.length: ', studentvueTerms.length);
    // console.log('studentVueTerms: ', JSON.stringify(studentvueTerms, null, 2));

    const newTerms = settings.termsDates.map((t) => {
        t.classes = emptyCL(settings.numberOfPeriods, settings.hasAdvisory);
        return t;
    });

    const combinedStudentvue = newTerms.map((t, i) => {
        // doing it this way means if there are more or less periods returned by studenvue then there might be problems displaying them (i think only if there are extra)
        if ((studentvueTerms[i] as StudentVueAPIDataClassListsTermClass[])?.length === undefined) {
            const errMsg = `studentvueTerms[${i}] is not an array: ${JSON.stringify(studentvueTerms[i])}`;
            Sentry.captureException(new Error(errMsg));
            console.log(errMsg);
            // studentvueTerms[i] = [studentvueTerms[i] as StudentVueAPIDataClassListsTermClass];
        }

        if ((studentvueTerms[i] as StudentVueAPIDataClassListsTermClass)?.Period !== undefined) {
            const errMsg = `For some reason studentvue returned a class instead of an array of classes: studentvueTerms[${i}] is not an array: ${JSON.stringify(
                studentvueTerms[i]
            )}`;
            Sentry.captureException(new Error(errMsg));
            console.log(errMsg);

            const c = studentvueTerms[i] as StudentVueAPIDataClassListsTermClass;
            t.classes = [
                {
                    classID:
                        parseInt(c.Period) === 0
                            ? ClassIDS.Zero
                            : parseInt(c.Period) === settings.studentVueAdvisoryPeriod
                            ? ClassIDS.Advisory
                            : ClassIDS.Period,
                    period: parseInt(c.Period) === settings.studentVueAdvisoryPeriod ? 0 : parseInt(c.Period),
                    name: courseTitleNameCase(c.CourseTitle) || '',
                    room: c.RoomName || '',
                    teacher: {
                        name: toTitleCase(c.Teacher),
                        email: c.TeacherEmail,
                        id: c.TeacherStaffGU,
                    },
                },
            ];
            return t;
        }

        if ((studentvueTerms[i] as StudentVueAPIDataClassListsTermClass[]).length < 1) {
            const errMsg = `studentvueTerms[${i}] is empty. This should not happen: ${JSON.stringify(studentvueTerms[i])}`;
            Sentry.captureException(new Error(errMsg));
            console.log(errMsg);
            return t;
        }

        t.classes = (studentvueTerms[i] as StudentVueAPIDataClassListsTermClass[]).map((c) => {
            // console.log('studentVueTerms.map => (c): ', c)
            return {
                classID:
                    parseInt(c.Period) === 0
                        ? ClassIDS.Zero
                        : parseInt(c.Period) === settings.studentVueAdvisoryPeriod
                        ? ClassIDS.Advisory
                        : ClassIDS.Period,
                period: parseInt(c.Period) === settings.studentVueAdvisoryPeriod ? 0 : parseInt(c.Period),
                name: courseTitleNameCase(c.CourseTitle) || '',
                room: c.RoomName || '',
                teacher: {
                    name: toTitleCase(c.Teacher),
                    email: c.TeacherEmail,
                    id: c.TeacherStaffGU,
                },
            };
        });
        return t;
    });

    // Convert api data to terms data
    //

    return combinedStudentvue;
}

export async function getAllSchedules(username: string, password: string): Promise<StudentVueAPIData> {
    // ! TO DO  get for all specified terms not just what we defined here lol
    const schs = await Promise.all([
        StudentClassList(username, password, 0),
        StudentClassList(username, password, 1),
        StudentClassList(username, password, 2),
    ]);
    if (!(isError(schs[0]) || isError(schs[1]) || isError(schs[2]))) {
        const sch = schs.map((s) => s['StudentClassSchedule']['ClassLists']['ClassListing']);
        // should probably do this
        const newSch = sch.map((t) => (t?.length === undefined ? [t] : t));
        const fullsch = schs[0];
        fullsch['StudentClassSchedule']['ClassLists'] = newSch;
        return { code: 'SUCCESS', content: fullsch['StudentClassSchedule'] };
    } else {
        throw new Error(schs[0].RT_ERROR.ERROR_MESSAGE);
    }
}

// Propbably should change args to take a StorageDataStudentvue object
export async function getStudentInfo(username: string, password: string): Promise<StudentVueAPIDataUserDate> {
    const info = await StudentInfo(username, password);
    if (!isError(info)) {
        return redactStudentInfo({ code: 'SUCCESS', content: info['StudentInfo'] });
    } else {
        throw new Error(info.RT_ERROR.ERROR_MESSAGE);
    }
}

export async function getSchoolInfo(username: string, password: string): Promise<Record<string, unknown>> {
    const info = await StudentSchoolInfo(username, password);
    if (!isError(info)) {
        return { code: 'SUCCESS', content: info['StudentSchoolInfoListing'] };
    } else {
        throw new Error(info.RT_ERROR.ERROR_MESSAGE);
    }
}

export type StudentVueAPIDataGradesContentTerm = {
    TermIndex: string;
};

export type StudentVueAPIDataGrades = {
    code: string;
    content: StudentVueAPIDataGradesContentTerm[];
};

export async function getStudentGrades(username: string, password: string): Promise<StudentVueAPIDataGrades> {
    const grades0 = await StudentGradebook(username, password, 0);
    const grades1 = await StudentGradebook(username, password, 1);
    const grades2 = await StudentGradebook(username, password, 2);
    if (!isError(grades0) && !isError(grades1) && !isError(grades2)) {
        return { code: 'SUCCESS', content: [grades0['Gradebook'], grades1['Gradebook'], grades2['Gradebook']] };
    } else {
        throw new Error(grades0.RT_ERROR.ERROR_MESSAGE || grades1.RT_ERROR.ERROR_MESSAGE || grades2.RT_ERROR.ERROR_MESSAGE);
    }
}

