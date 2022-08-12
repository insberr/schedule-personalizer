]async function get_all_schedules(username: string, password: string): Promise<any> {
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