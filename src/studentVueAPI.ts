
function generateFetch(username: string, password: string): RequestInit {
    return {
        body: JSON.stringify({
            username, password
        }),
        method: "POST",

    }
}

// Propbably should change args to take a StorageDataStudentvue object
export async function get_all_schedules(username: string, password: string): Promise<any> {
    const data = await (await fetch("https://studentvue.wackery.com/get_all_schedules", generateFetch(username, password))).json();
    if (data.code != "SUCCESS") {
        // Change this so it doesnt stop the login process and just show a UI error to the user and use the defauklt schedule details
        throw new Error(data.content.code + ": " + data.content.error);
    }
    return data
}

// Propbably should change args to take a StorageDataStudentvue object
export async function get_student_info(username: string, password: string): Promise<any> {
    const data = await (await fetch("https://studentvue.wackery.com/get_student_info", generateFetch(username, password))).json();
    if (data.code != "SUCCESS") {
        throw new Error(data.content.code + ": " + data.content.error);
    }
    return data
}
