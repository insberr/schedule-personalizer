import { Terms, emptyCL, ClassIDS } from "../../types";
import * as settings from "../../config/settings";
import { courseTitleNameCase, redactStudentInfo, toTitleCase } from "../../lib";
import { StudentInfo, StudentClassList, validate, isError, StudentSchoolInfo } from "./api"
import * as Sentry from '@sentry/react';

const fakeData = {
    "code": "SUCCESS",
    "content": {
     "TodayScheduleInfoData": {
      "SchoolInfos": {}
     },
     "ClassLists": [
      [
       {
        "AdditionalStaffInformationXMLs": {},
        "Period": "1",
        "CourseTitle": "WIND ENSEMBLE A",
        "RoomName": "124 BAND",
        "Teacher": "RYAN WHITEHEAD",
        "TeacherEmail": "RWHITEHEAD@bethelsd.org",
        "SectionGU": "5FC6A372-CEDC-410F-AD67-F3428F672939",
        "TeacherStaffGU": "961F3156-7FD9-40E9-A296-651C27259733"
       },
       {
        "AdditionalStaffInformationXMLs": {},
        "Period": "2",
        "CourseTitle": "PRE CALCULUS A",
        "RoomName": "201",
        "Teacher": "RACHEL STROM",
        "TeacherEmail": "RSTROM@BETHELSD.ORG",
        "SectionGU": "E2308477-1BB9-42A6-95F9-EA0167B68994",
        "TeacherStaffGU": "9B795071-1EAF-492B-A84B-209DE77148BC"
       },
       {
        "AdditionalStaffInformationXMLs": {},
        "Period": "3",
        "CourseTitle": "ECONOMICS",
        "RoomName": "P7",
        "Teacher": "KEVIN SCHWOCH",
        "TeacherEmail": "KSCHWOCH@bethelsd.org",
        "SectionGU": "7880BD3A-3B6D-48D5-B671-2700AC6D3A74",
        "TeacherStaffGU": "554D6D51-BA62-414B-AE85-4359EECBEBAD"
       },
       {
        "AdditionalStaffInformationXMLs": {},
        "Period": "4",
        "CourseTitle": "CYBERSECURITY A",
        "RoomName": "219",
        "Teacher": "ZESTY FERNANDEZ",
        "TeacherEmail": "ZFERNANDEZ@bethelsd.org",
        "SectionGU": "B51C5579-1A04-4548-AA09-7933B1541B69",
        "TeacherStaffGU": "918E6D22-B9A4-433C-AABF-A9B89FF5B6EF"
       },
       {
        "AdditionalStaffInformationXMLs": {},
        "Period": "5",
        "CourseTitle": "AP ENG LIT A",
        "RoomName": "118",
        "Teacher": "SABRINA SORIERO",
        "TeacherEmail": "SSORIERO@bethelsd.org",
        "SectionGU": "5C65CD24-B293-485A-893F-3206C33C0F3C",
        "TeacherStaffGU": "BE947D94-A04C-425F-B91F-5AA4402F312F"
       },
       {
        "AdditionalStaffInformationXMLs": {},
        "Period": "8",
        "CourseTitle": "ADVISORY 12",
        "RoomName": "120",
        "Teacher": "JOHN STUMPF",
        "TeacherEmail": "JSTUMPF@BETHELSD.ORG",
        "SectionGU": "ADEA4167-C1F8-4ABE-A3FF-DB2B90F9D21A",
        "TeacherStaffGU": "CDE89AD0-1D63-4DB7-8C89-A66F1C5C41E2"
       }
      ],
      [
       {
        "AdditionalStaffInformationXMLs": {},
        "Period": "1",
        "CourseTitle": "WIND ENSEMBLE B",
        "RoomName": "",
        "Teacher": "RYAN WHITEHEAD",
        "TeacherEmail": "RWHITEHEAD@bethelsd.org",
        "SectionGU": "CC658524-83D4-475F-85C8-9438C9CF2831",
        "TeacherStaffGU": "961F3156-7FD9-40E9-A296-651C27259733"
       },
       {
        "AdditionalStaffInformationXMLs": {},
        "Period": "2",
        "CourseTitle": "VIDEO PRODUCTION 1",
        "RoomName": "115",
        "Teacher": "DENISE GIBBS",
        "TeacherEmail": "DGIBBS@bethelsd.org",
        "SectionGU": "85D980F1-1B8A-4EAD-919E-22591D29E2B5",
        "TeacherStaffGU": "05B18ACF-4FB0-4D48-A97B-5E8A295FE753"
       },
       {
        "AdditionalStaffInformationXMLs": {},
        "Period": "3",
        "CourseTitle": "INTRO TO PHY FIT TECH",
        "RoomName": "B BLDG",
        "Teacher": "WHITNEY HUBEEK",
        "TeacherEmail": "WHUBEEK@BETHELSD.ORG",
        "SectionGU": "2DF00EF7-4E3D-4648-8453-947A6DF8C7F0",
        "TeacherStaffGU": "1B5BFD83-2919-4A21-85A0-CD82D6364AF2"
       },
       {
        "AdditionalStaffInformationXMLs": {},
        "Period": "4",
        "CourseTitle": "CYBERSECURITY B",
        "RoomName": "",
        "Teacher": "ZESTY FERNANDEZ",
        "TeacherEmail": "ZFERNANDEZ@bethelsd.org",
        "SectionGU": "F574F33C-18DC-4022-ACE8-8A51CF0420FF",
        "TeacherStaffGU": "918E6D22-B9A4-433C-AABF-A9B89FF5B6EF"
       },
       {
        "AdditionalStaffInformationXMLs": {},
        "Period": "5",
        "CourseTitle": "AP ENG LIT B",
        "RoomName": "",
        "Teacher": "SABRINA SORIERO",
        "TeacherEmail": "SSORIERO@bethelsd.org",
        "SectionGU": "2E1576CB-E919-4D15-8D36-BB5E64057DFE",
        "TeacherStaffGU": "BE947D94-A04C-425F-B91F-5AA4402F312F"
       },
       {
        "AdditionalStaffInformationXMLs": {},
        "Period": "8",
        "CourseTitle": "ADVISORY 12",
        "RoomName": "120",
        "Teacher": "JOHN STUMPF",
        "TeacherEmail": "JSTUMPF@BETHELSD.ORG",
        "SectionGU": "ADEA4167-C1F8-4ABE-A3FF-DB2B90F9D21A",
        "TeacherStaffGU": "CDE89AD0-1D63-4DB7-8C89-A66F1C5C41E2"
       }
      ],
        {
        "AdditionalStaffInformationXMLs": {},
        "Period": "1",
        "CourseTitle": "WIND ENSEMBLE C",
        "RoomName": "",
        "Teacher": "RYAN WHITEHEAD",
        "TeacherEmail": "RWHITEHEAD@bethelsd.org",
        "SectionGU": "1F39F7A5-7486-4C37-ADA6-8E02544089BC",
        "TeacherStaffGU": "961F3156-7FD9-40E9-A296-651C27259733"
       }
     ],
     "TermLists": {
      "TermListing": [
       {
        "TermDefCodes": {
         "TermDefCode": [
          {
           "TermDefName": "T1H"
          },
          {
           "TermDefName": "YRH"
          }
         ]
        },
        "TermIndex": "0",
        "TermCode": "1",
        "TermName": "Trimester 1",
        "BeginDate": "09/06/2022",
        "EndDate": "12/06/2022",
        "SchoolYearTrmCodeGU": "A00216D4-8B51-418F-B184-E8453A16593E"
       },
       {
        "TermDefCodes": {
         "TermDefCode": [
          {
           "TermDefName": "T2H"
          },
          {
           "TermDefName": "YRH"
          }
         ]
        },
        "TermIndex": "1",
        "TermCode": "2",
        "TermName": "Trimester 2",
        "BeginDate": "12/08/2022",
        "EndDate": "03/27/2023",
        "SchoolYearTrmCodeGU": "4B53AD0C-A7C0-4138-A03D-2C7A5580DEA0"
       },
       {
        "TermDefCodes": {
         "TermDefCode": [
          {
           "TermDefName": "T3H"
          },
          {
           "TermDefName": "YRH"
          }
         ]
        },
        "TermIndex": "2",
        "TermCode": "3",
        "TermName": "Trimester 3",
        "BeginDate": "03/28/2023",
        "EndDate": "06/23/2023",
        "SchoolYearTrmCodeGU": "9570BAFB-5132-49B7-8F99-E2797E251986"
       }
      ]
     },
     "ConcurrentSchoolStudentClassSchedules": {},
     "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
     "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
     "TermIndex": "0",
     "TermIndexName": "Trimester 1",
     "ErrorMessage": "",
     "IncludeAdditionalStaffWhenEmailingTeachers": "true"
    }
   }
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
export type StudentVueAPIDataClassListsTerm = StudentVueAPIDataClassListsTermClass[] | StudentVueAPIDataClassListsTermClass;
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
    const studentvueTerms = fakeData.content.ClassLists // data.content.ClassLists;
    console.log('studentVueTerms.length: ', studentvueTerms.length);

    const newTerms = settings.termsDates.map(t => {
        t.classes = emptyCL(settings.numberOfPeriods, settings.hasAdvisory);
        return t;
    });

    const combinedStudentvue = newTerms.map((t, i) => {

        // doing it this way means if there are more or less periods returned by studenvue then there might be problems displaying them (i think only if there are extra)
        if ((studentvueTerms[i] as StudentVueAPIDataClassListsTermClass[])?.length === undefined) {
            const errMsg = `studentvueTerms[${i}] is not an array: ${JSON.stringify(studentvueTerms[i])}`;
            Sentry.captureException(new Error(errMsg));
            console.log(errMsg);
            // do something ... ?
        }
        
        if ((studentvueTerms[i] as StudentVueAPIDataClassListsTermClass)?.Period !== undefined) {
            const errMsg = `For some reason studentvue returned a class instead of an array of classes: studentvueTerms[${i}] is not an array: ${JSON.stringify(studentvueTerms[i])}`;
            Sentry.captureException(new Error(errMsg));
            console.log(errMsg);

            const c = studentvueTerms[i] as StudentVueAPIDataClassListsTermClass;
            t.classes = [{
                classID: (parseInt(c.Period) === 0 ? ClassIDS.Zero : parseInt(c.Period) === settings.studentVueAdvisoryPeriod ? ClassIDS.Advisory : ClassIDS.Period),
                period: parseInt(c.Period) === settings.studentVueAdvisoryPeriod ? 0 : parseInt(c.Period),
                name: courseTitleNameCase(c.CourseTitle) || "",
                room: c.RoomName || "",
                teacher: {
                    name: toTitleCase(c.Teacher),
                    email: c.TeacherEmail,
                    id: c.TeacherStaffGU
                }
            }]
            return t;
        }
        t.classes = (studentvueTerms[i] as StudentVueAPIDataClassListsTermClass[]).map(c => {
            console.log('studentVueTerms.map => (c): ', c)
            return {
                classID: (parseInt(c.Period) === 0 ? ClassIDS.Zero : parseInt(c.Period) === settings.studentVueAdvisoryPeriod ? ClassIDS.Advisory : ClassIDS.Period),
                period: parseInt(c.Period) === settings.studentVueAdvisoryPeriod ? 0 : parseInt(c.Period),
                name: courseTitleNameCase(c.CourseTitle) || "",
                room: c.RoomName || "",
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

    return combinedStudentvue;
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
        return redactStudentInfo({ code: "SUCCESS", content: info["StudentInfo"]})
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
