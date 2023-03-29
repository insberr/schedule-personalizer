import { Terms, emptyCL, ClassIDS, CL, generateASingleEmptyClass_CL } from '../../types';
import * as settings from '../../config/settings';
import { courseTitleNameCase, redactStudentInfo, toTitleCase } from '../../lib/lib';
import { StudentInfo, StudentClassList, validate, isError, StudentSchoolInfo } from './api';
import * as Sentry from '@sentry/react';

export async function validateCredentials(username: string, password: string): Promise<boolean> {
    return await validate(username, password); // mm
}

// Propbably should change args to take a StorageDataStudentvue object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StudentVueAPIDataClassListsTermClass = {
    AdditionalStaffInformationXMLs: Record<string, unknown>; // find waht this should be
    CourseTitle: string;
    Period: string;
    RoomName: string;
    SectionGU: string;
    Teacher: string;
    TeacherEmail: string;
    TeacherStaffGU: string;
};
export type StudentVueAPIDataClassListsTerm = StudentVueAPIDataClassListsTermClass[] | StudentVueAPIDataClassListsTermClass;
export type StudentVueAPIDataClassLists = StudentVueAPIDataClassListsTerm[];
export type StudentVueAPIData = {
    code: string;
    content: {
        code?: string;
        error?: string;
        ClassLists: StudentVueAPIDataClassLists;
        ConcurrentSchoolStudentClassSchedules: Record<string, unknown>; // find waht this should be
        ErrorMessage: string;
        IncludeAdditionalStaffWhenEmailingTeachers: 'true';
        TermIndex: string;
        TermIndexName: 'Trimester 1';
        TermLists: {
            TermListing: unknown[];
        };
        TodayScheduleInfoData: Record<string, unknown>; // find waht this should be
        'xmlns:xsd': string;
        'xmlns:xsi': string;
    };
};

export type StudentVueAPIDataUserDate = {
    code: string;
    content: {
        code?: string;
        error?: string;
        BirthDate: string;
        CounselorEmail: string;
        CounselorName: string;
        CounselorStaffGU: string;
        CurrentSchool: string;
        EMail: string;
        FormattedName: string;
        Grade: string;
        PermID: string;
    };
};

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

    const newTerms = settings.termsDates.map((term) => {
        term.classes = emptyCL(settings.numberOfPeriods, settings.hasAdvisory);
        return term;
    });

    const combinedStudentvue = newTerms.map((term, i) => {
        // doing it this way means if there are more or less periods returned by studenvue then there might be problems displaying them (i think only if there are extra)
        if ((studentvueTerms[i] as StudentVueAPIDataClassListsTermClass[])?.length === undefined) {
            const errMsg = `studentvueTerms[${i}] is not an array: ${JSON.stringify(studentvueTerms[i])}`;
            Sentry.captureException(new Error(errMsg));
            console.log(errMsg);
            // studentvueTerms[i] = [studentvueTerms[i] as StudentVueAPIDataClassListsTermClass];
        }

        if ((studentvueTerms[i] as StudentVueAPIDataClassListsTermClass[]) === undefined) {
            console.log(`studentvueTerms[${i}] is undefined: ${JSON.stringify(studentvueTerms[i])}`);
        }

        if ((studentvueTerms[i] as StudentVueAPIDataClassListsTermClass)?.Period !== undefined) {
            const errMsg = `For some reason studentvue returned a class instead of an array of classes: studentvueTerms[${i}] is not an array: ${JSON.stringify(
                studentvueTerms[i]
            )}`;
            Sentry.captureException(new Error(errMsg));
            console.log(errMsg);

            const studentVueClass = studentvueTerms[i] as StudentVueAPIDataClassListsTermClass;
            term.classes = [
                {
                    classID:
                        parseInt(studentVueClass.Period) === 0
                            ? ClassIDS.Zero
                            : parseInt(studentVueClass.Period) === settings.studentVueAdvisoryPeriod
                            ? ClassIDS.Advisory
                            : ClassIDS.Period,
                    period: parseInt(studentVueClass.Period) === settings.studentVueAdvisoryPeriod ? 0 : parseInt(studentVueClass.Period),
                    name: courseTitleNameCase(studentVueClass.CourseTitle) || '',
                    room: studentVueClass.RoomName || '',
                    teacher: {
                        name: toTitleCase(studentVueClass.Teacher),
                        email: studentVueClass.TeacherEmail,
                        id: studentVueClass.TeacherStaffGU,
                    },
                },
            ];
            return term;
        }

        if ((studentvueTerms[i] as StudentVueAPIDataClassListsTermClass[]).length < 1) {
            const errMsg = `studentvueTerms[${i}] is empty. This should not happen: ${JSON.stringify(studentvueTerms[i])}`;
            Sentry.captureException(new Error(errMsg));
            console.log(errMsg);
            return term;
        }

        term.classes = (studentvueTerms[i] as StudentVueAPIDataClassListsTermClass[]).map((studentVueClass) => {
            // console.log('studentVueTerms.map => (c): ', c)
            // if (studentVueClass === undefined) return generateASingleEmptyClass_CL();
            return {
                classID:
                    parseInt(studentVueClass.Period) === 0
                        ? ClassIDS.Zero
                        : parseInt(studentVueClass.Period) === settings.studentVueAdvisoryPeriod
                        ? ClassIDS.Advisory
                        : ClassIDS.Period,
                period: parseInt(studentVueClass.Period) === settings.studentVueAdvisoryPeriod ? 0 : parseInt(studentVueClass.Period),
                name: courseTitleNameCase(studentVueClass.CourseTitle) || '',
                room: studentVueClass.RoomName || '',
                teacher: {
                    name: toTitleCase(studentVueClass.Teacher),
                    email: studentVueClass.TeacherEmail,
                    id: studentVueClass.TeacherStaffGU,
                },
            };
        });
        return term;
    });

    // Convert api data to terms data
    //

    return combinedStudentvue;
}

export async function getAllSchedules(username: string, password: string): Promise<StudentVueAPIData> {
    const studentVueSchedules = await Promise.all([
        StudentClassList(username, password, 0),
        StudentClassList(username, password, 1),
        StudentClassList(username, password, 2),
    ]);
    if (!(isError(studentVueSchedules[0]) || isError(studentVueSchedules[1]) || isError(studentVueSchedules[2]))) {
        const studentVueSchedulesMinimized = studentVueSchedules.map((s) => s['StudentClassSchedule']['ClassLists']['ClassListing']);
        // should probably do this
        const newSch = studentVueSchedulesMinimized.map((studentVueSchedule) => {
            if (studentVueSchedule === undefined) console.log('studentVueSchedule is undefined: ', studentVueSchedule);
            return studentVueSchedule?.length === undefined ? [studentVueSchedule] : studentVueSchedule;
        });
        const fullsch = studentVueSchedules[0];
        fullsch['StudentClassSchedule']['ClassLists'] = newSch;
        return { code: 'SUCCESS', content: fullsch['StudentClassSchedule'] };
    } else {
        throw new Error(studentVueSchedules[0].RT_ERROR.ERROR_MESSAGE);
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

/*
// this might need to be turned into an async function
export function generateTeachers(username: string, password: string): { [key: string]: { id: string } } {
    const teachers: { [key: string]: { id: string } } = {};
    
    getSchoolInfo(username, password).then(res => {
        for (const teach of res.content.StaffLists.StaffList) {
            */
// teachers[toTitleCase(teach.Name).replace(/ |(, )|-/ig, '_').replace(/[^a-z_]*/ig, '')] = { id: teach.StaffGU };
/*
        }
    })
    
    return teachers;
}
*/
