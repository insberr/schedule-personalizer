import { Terms, emptyCL, ClassIDS } from "./types";
import * as settings from "./config/settings";
import { courseTitleNameCase, toTitleCase } from "./lib";

const apiURL = settings.studentVueApiURL.endsWith('/') ? settings.studentVueApiURL.slice(0, -1) : settings.studentVueApiURL;

function generateFetch(username: string, password: string): RequestInit {
    return {
        body: JSON.stringify({
            username, password
        }),
        method: "POST",

    }
}

export async function validateCredentials(username: string, password: string): Promise<boolean> {
    const response = await fetch(apiURL + "/validate", generateFetch(username, password));
    const data = await response.json();
    if (data.code !== "SUCCESS") {
        return false;
    }
    return true; // data;
}

// Propbably should change args to take a StorageDataStudentvue object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StudentVueAPIDataClassListsTermClass = {
    AdditionalStaffInformationXMLs: Record<string, unknown> // find waht this should be
    CourseTitle: string
    Period: string
    RoomName: string
    SectionGU: string
    Teacher: string
    TeacherEmail: string
    TeacherStaffGU: string 
};
export type StudentVueAPIDataClassListsTerm = StudentVueAPIDataClassListsTermClass[]
export type StudentVueAPIDataClassLists = StudentVueAPIDataClassListsTerm[]
export type StudentVueAPIData = {
    code: string
    content: {
        code?: string
        error?: string
        ClassLists: StudentVueAPIDataClassLists
        ConcurrentSchoolStudentClassSchedules: Record<string, unknown> // find waht this should be
        ErrorMessage: string
        IncludeAdditionalStaffWhenEmailingTeachers: "true"
        TermIndex: string
        TermIndexName: "Trimester 1"
        TermLists: {
            TermListing: unknown[]
        }
        TodayScheduleInfoData: Record<string, unknown> // find waht this should be
        'xmlns:xsd': string
        'xmlns:xsi': string
    }
}

export type StudentVueAPIDataUserDate = {
    code: string
    content: {
        code?: string
        error?: string
        BirthDate: string
        CounselorEmail: string
        CounselorName: string
        CounselorStaffGU: string
        CurrentSchool: string
        EMail: string
        FormattedName: string
        Grade: string
        PermID: string
    }
}

export function convertStudentvueDataToTerms(data: StudentVueAPIData): Terms {
    const studentvueTerms = data.content.ClassLists;

    const newTerms = settings.termsDates.map(t => {
        t.classes = emptyCL(settings.numberOfPeriods, settings.hasAdvisory);
        return t;
    });

    const combinedStudentvue = newTerms.map((t, i) => {

        // doing it this way means if there are more or less periods returned by studenvue then there might be problems displaying them (i think only if there are extra)
        t.classes = studentvueTerms[i].map(c => {
            return {
                classID: (parseInt(c.Period) === 0 ? ClassIDS.Zero : parseInt(c.Period) === settings.studentVueAdvisoryPeriod ? ClassIDS.Advisory : ClassIDS.Period),
                period: parseInt(c.Period) === settings.studentVueAdvisoryPeriod ? 0 : parseInt(c.Period),
                name: courseTitleNameCase(c.CourseTitle),
                room: c.RoomName,
                teacher: {
                    name: toTitleCase(c.Teacher),
                    email: c.TeacherEmail,
                    id: c.TeacherStaffGU
                }
            }
        })
        return t;
    })

    // Convert api data to terms data
    //

    /* TEMPOARY UNTILL STUDENTVUE GET SCHEDULES WORKS */
    

    return combinedStudentvue;
    /* END TEMPORARY */
}

export async function getAllSchedules(username: string, password: string): Promise<StudentVueAPIData> {
    const data: StudentVueAPIData = await (await fetch(apiURL + "/get_all_schedules", generateFetch(username, password))).json();
    if (data.code != "SUCCESS") {
        // Change this so it doesnt stop the login process and just show a UI error to the user and use the defauklt schedule details
        throw new Error(data.content.code + ": " + data.content.error);
    }
    return data;
}

// Propbably should change args to take a StorageDataStudentvue object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getStudentInfo(username: string, password: string): Promise<StudentVueAPIDataUserDate> {
    const data = await (await fetch(apiURL + "/get_student_info", generateFetch(username, password))).json();
    if (data.code != "SUCCESS") {
        throw new Error(data.content.code + ": " + data.content.error);
    }
    return data
}

export async function getSchoolInfo(username: string, password: string): Promise<unknown> {
    const data = await (await fetch(apiURL + "/get_school_info", generateFetch(username, password))).json();
    if (data.code != "SUCCESS") {
        throw new Error(data.content.code + ": " + data.content.error);
    }
    return data
}
