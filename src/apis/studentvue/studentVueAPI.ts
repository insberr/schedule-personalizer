import { Terms, emptyCL, ClassIDS } from "../../types";
import * as settings from "../../config/settings";
import { courseTitleNameCase, toTitleCase } from "../../lib";
import { StudentInfo, StudentClassList, validate, isError, StudentSchoolInfo } from "./api"

export async function validateCredentials(username: string, password: string): Promise<boolean> {
    return await validate(username, password); // mm
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
    const schs = await Promise.all([
        StudentClassList(username, password, 0),
        StudentClassList(username, password, 1),
        StudentClassList(username, password, 2),
    ])
    if (!(isError(schs[0]) || isError(schs[1]) || isError(schs[2]))) {
        const sch = schs.map((s) => s["StudentClassSchedule"]["ClassLists"]["ClassListing"])
        const fullsch = schs[0]
        fullsch["StudentClassSchedule"]["ClassLists"] = sch
        return {"code": "SUCCESS", "content":fullsch["StudentClassSchedule"]}
    } else {
        throw new Error(schs[0].RT_ERROR.ERROR_MESSAGE)
    }
}

// Propbably should change args to take a StorageDataStudentvue object
export async function getStudentInfo(username: string, password: string): Promise<StudentVueAPIDataUserDate> {
    const info = await StudentInfo(username, password);
    if (!isError(info)) {
        return {"code": "SUCCESS", "content":info["StudentInfo"]}
    } else {
        throw new Error(info.RT_ERROR.ERROR_MESSAGE)
    }
}

export async function getSchoolInfo(username: string, password: string): Promise<Record<string, unknown>> {
    const info = await StudentSchoolInfo(username, password);
    if (!isError(info)) {
        return {"code": "SUCCESS", "content":info["StudentSchoolInfoListing"]}
    } else {
        throw new Error(info.RT_ERROR.ERROR_MESSAGE)
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
