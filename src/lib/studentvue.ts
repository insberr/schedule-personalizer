/* eslint-disable @typescript-eslint/no-explicit-any */

import { xml2js } from 'xml-js';


let settings = { // this 100% should be loaded from scs
    studentVueAdvisoryPeriod: 8,
    numberOfPeriods: 6,
    hasAdvisory: true,
    lastDayOfSchool: new Date('June 23, 2023'),
    InfoToKeep: ['CounselorEmail', 'CurrentSchool', 'FormattedName', 'Grade'],
    termsDates: [
    {
        termIndex: 0,
        startDate: new Date('September 6, 2022'),
        endDate: new Date('December 6, 2022'),
        classes: [],
    },
    {
        termIndex: 1,
        startDate: new Date('December 8, 2022'),
        endDate: new Date('March 27, 2023'),
        classes: [],
    },
    { termIndex: 2, startDate: new Date('March 28, 2023'), endDate: new Date('June 23, 2023'), classes: [] },
    ] as Terms,
    loginURL: "https://wa-beth-psv.edupoint.com/Service/PXPCommunication.asmx"
}

export async function doOperation({
    url,
    username,
    password,
    method,
    args,
}: {
    url: string;
    username: string;
    password: string;
    method: string;
    args: Record<string, any>;
}): Promise<any> {
    let paramStr = '&lt;Parms&gt;';
    Object.entries(args).forEach(([key, value]) => {
        paramStr += '&lt;' + key + '&gt;';
        paramStr += value;
        paramStr += '&lt;/' + key + '&gt;';
    });
    paramStr += '&lt;/Parms&gt;';
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            SOAPAction: 'http://edupoint.com/webservices/ProcessWebServiceRequest',
        },
        body:
            '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tns="http://edupoint.com/webservices/" xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/"><soap:Body><ProcessWebServiceRequest xmlns="http://edupoint.com/webservices/"><userID>' +
            username +
            '</userID><password>' +
            password +
            '</password><skipLoginLog>1</skipLoginLog><parent>0</parent><webServiceHandleName>PXPWebServices</webServiceHandleName><methodName>' +
            method +
            '</methodName><paramStr>' +
            paramStr +
            '</paramStr></ProcessWebServiceRequest></soap:Body></soap:Envelope>',
    });
    const rawxml = await resp.text();
    const rbody: any = xml2js(rawxml, { compact: true });
    const body = rbody['soap:Envelope']['soap:Body']['ProcessWebServiceRequestResponse']['ProcessWebServiceRequestResult']['_text'];
    const rbody2: any = xml2js(body, { compact: true });
    return fixThatDamnXML(rbody2);
}

function fixThatDamnXML(xml: any): any {
    const thisObj: Record<any, any> = {};
    Object.keys(xml).forEach((key: any) => {
        const obj = xml[key];
        if (Array.isArray(obj)) {
            thisObj[key] = obj.map((o: any) => fixThatDamnXML({ tmp: o }).tmp);
        } else if (obj._text) {
            thisObj[key] = obj._text;
        } else if (obj._attributes) {
            thisObj[key] = Object.assign(fixThatDamnXML(obj), obj._attributes);
            delete thisObj[key]._attributes;
        } else if (typeof obj == 'object') {
            thisObj[key] = fixThatDamnXML(obj);
        } else {
            thisObj[key] = obj;
        }
    });
    //console.log(JSON.stringify(thisObj, null, 2))
    return thisObj;
}
export function isError(obj: any): boolean {
    return Object.keys(obj).includes('RT_ERROR');
}

export async function StudentInfo({ url, username, password }: { url: string; username: string; password: string }): Promise<any> {
    return await doOperation({ url, username, password, method: 'StudentInfo', args: {} });
}

export async function validate({ url, username, password }: { url: string; username: string; password: string }): Promise<boolean> {
    const r = await StudentInfo({ url, username, password });
    return !isError(r);
}

export async function Calendar({ url, username, password }: { url: string; username: string; password: string }): Promise<any> {
    return await doOperation({
        url,
        username,
        password,
        method: 'StudentCalendar',
        args: {
            childIntId: 0,
            RequestDate: '2023-06-23T07:00:00.000Z',
        },
    });
}

export async function StudentClassList({
    url,
    username,
    password,
    term,
}: {
    url: string;
    username: string;
    password: string;
    term?: number;
}): Promise<any> {
    const args: Record<string, unknown> = {};
    if (term !== undefined) {
        args['TermIndex'] = term;
    }
    return await doOperation({ url, username, password, method: 'StudentClassList', args });
}

export async function StudentSchoolInfo({ url, username, password }: { url: string; username: string; password: string }): Promise<any> {
    return await doOperation({ url, username, password, method: 'StudentSchoolInfo', args: {} });
}

export async function StudentGradebook({
    url,
    username,
    password,
    term,
}: {
    url: string;
    username: string;
    password: string;
    term?: number;
}): Promise<any> {
    const args: Record<string, unknown> = {};
    if (term != undefined) {
        args['ReportPeriod'] = term;
    }
    return await doOperation({ url, username, password, method: 'Gradebook', args });
}

export enum ClassIDS {
    Zero,
    Arrival,
    Advisory,
    Lunch,
    Period,
    Assembly,
    Passing,
    Dismissal,
    NoSchool,
    Weekend,
    Summer,
    Custom,
}

export type CL = {
    classID: ClassIDS;
    period: number;
    name: string;
    teacher: {
        name: string;
        email: string;
        id: string;
    };
    room: string;
};
export type Term = {
    isFake?: boolean;
    termIndex: number;
    startDate: Date;
    endDate: Date;
    classes: CL[] | [];
};

export type Terms = Term[];
export function emptyCL(amt: number, hasAdvisory: boolean): CL[] {
    const classes = [...Array(amt)].map((v, i) => {
        return {
            classID: ClassIDS.Period,
            period: i,
            name: '',
            teacher: {
                name: '',
                email: '',
                id: '',
            },
            room: '',
        };
    });
    if (hasAdvisory) {
        classes[0] = {
            ...classes[0],
            classID: ClassIDS.Advisory,
            name: 'Advisory',
        };
    }

    return classes;
}
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

export function redactStudentInfo(data: StudentVueAPIDataUserDate): StudentVueAPIDataUserDate {
    // add types pl\
    // eslint-disable-next-line prefer-const
    let out: Record<string, unknown> = {};
    Object.entries(data.content).forEach(([key, value]) => {
        if (settings.InfoToKeep.includes(key)) {
            //console.log("keeping", key)
            out[key] = value;
        } else {
            //console.log("redacting", key)
            out[key] = redactStructure(value); // mm js
            //console.log(key,"redacted to",out[key])
        }
    });
    // @ts-expect-error lmafo
    return { code: data.code, content: out };
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

export async function validateCredentials(username: string, password: string): Promise<boolean> {
    return await validate({url: settings.loginURL, username, password }); // mm
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

    const newTerms = settings.termsDates.map((t) => {
        t.classes = emptyCL(settings.numberOfPeriods, settings.hasAdvisory);
        return t;
    });

    const combinedStudentvue = newTerms.map((t, i) => {
        // doing it this way means if there are more or less periods returned by studenvue then there might be problems displaying them (i think only if there are extra)
        if ((studentvueTerms[i] as StudentVueAPIDataClassListsTermClass[])?.length === undefined) {
            const errMsg = `studentvueTerms[${i}] is not an array: ${JSON.stringify(studentvueTerms[i])}`;
            console.log(errMsg);
            // studentvueTerms[i] = [studentvueTerms[i] as StudentVueAPIDataClassListsTermClass];
        }

        if ((studentvueTerms[i] as StudentVueAPIDataClassListsTermClass)?.Period !== undefined) {
            const errMsg = `For some reason studentvue returned a class instead of an array of classes: studentvueTerms[${i}] is not an array: ${JSON.stringify(
                studentvueTerms[i]
            )}`;
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
    const schs = await Promise.all([
        StudentClassList({url: settings.loginURL, username, password, term: 0 }),
        StudentClassList({url: settings.loginURL, username, password, term: 1 }),
        StudentClassList({url: settings.loginURL, username, password, term: 2 }),
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
    const info = await StudentInfo({url: settings.loginURL, username, password });
    if (!isError(info)) {
        return redactStudentInfo({ code: 'SUCCESS', content: info['StudentInfo'] });
    } else {
        throw new Error(info.RT_ERROR.ERROR_MESSAGE);
    }
}

export async function getSchoolInfo(username: string, password: string): Promise<Record<string, unknown>> {
    const info = await StudentSchoolInfo({url: settings.loginURL, username, password });
    if (!isError(info)) {
        return { code: 'SUCCESS', content: info['StudentSchoolInfoListing'] };
    } else {
        throw new Error(info.RT_ERROR.ERROR_MESSAGE);
    }
}