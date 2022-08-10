import { defaultStruct } from "./defaultValues";
import { testData, exampleStudentVueScheduleData } from "./testData";
import { getTimeW, Stdata } from "./types";

export async function refresh(data: Stdata): Promise<Stdata> {
    if (!data.studentVue.username || !data.studentVue.password) {
        return data
    }
    return fetchData(data.studentVue.username, data.studentVue.password, data);
}

export async function fetchData(username: string, password: string, base?: Stdata): Promise<Stdata> {
    if (!base) {
        base = Object.assign({},defaultStruct);
    }
    // things to fetch:
    // * student info
    // * schedule info
    // other things:
    // * load default settings/use the settings from the base struct

    // schedule info
    console.time("fetching schedule info");
    const [schedule, student_info] = await Promise.all([
        await get_all_schedules(username, password),
        get_student_info(username, password)
    ])
    console.timeEnd("fetching schedule info");
    
    base.studentVue.username = username
    base.studentVue.password = password

    for (const [term_index, term] of schedule.content.ClassLists.entries()) {
        for (const [class_index, term_class] of term.entries()) {
            const class_info = {
                period: term_class.Period,
                name: term_class.CourseTitle,
                room: term_class.RoomName,
                teacher: {
                    name: term_class.Teacher,
                    email: term_class.TeacherEmail,
                    id: term_class.TeacherStaffGU,
                },
                startTime: getTimeW(6, 0, 0),
                endTime: getTimeW(14, 0, 0),
            }
            // this causes an error prob because of types and the array is empy or something like that. i got too tired so i am stopping here for the night
            base.terms[term_index].classes[class_index] = class_info;
        }
    }
    

    console.log("schedule", schedule);
    console.log("student info", student_info);

    // just return the default because im lazy!
    return base
}


function generateFetch(username: string, password: string): RequestInit {
    return {
        body: JSON.stringify({
            username, password
        }),
        method: "POST",

    }
}

async function get_all_schedules(username: string, password: string): Promise<any> {
    const data = await (await fetch("https://studentvue.wackery.com/get_all_schedules", generateFetch(username, password))).json();
    if (data.code != "SUCCESS") {
        // /* TEMPORARY EDITED OUT, TESTING PURPOSES ONLY. DO NOT DELETE THIS LINE */ throw new Error(data.content.code + ": " + data.content.error);
        return exampleStudentVueScheduleData;
    }
    return data
}

async function get_student_info(username: string, password: string): Promise<any> {
    const data = await (await fetch("https://studentvue.wackery.com/get_student_info", generateFetch(username, password))).json();
    if (data.code != "SUCCESS") {
        throw new Error(data.content.code + ": " + data.content.error);
    }
    return data
}