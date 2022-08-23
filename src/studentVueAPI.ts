import { Terms, emptyCL } from "./types";
import * as settings from "./config/settings";

function generateFetch(username: string, password: string): RequestInit {
    return {
        body: JSON.stringify({
            username, password
        }),
        method: "POST",

    }
}

export async function validateCredentials(username: string, password: string): Promise<boolean> {
    const response = await fetch("https://studentvue.wackery.com/validate", generateFetch(username, password));
    const data = await response.json();
    console.log('ValidateCredentials: ' + JSON.stringify(data));
    if (data.code !== "SUCCESS") {
        return false;
    }
    return true; // data;
}

// Propbably should change args to take a StorageDataStudentvue object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getAllSchedules(username: string, password: string): Promise<Terms> {
    const data = await (await fetch("https://studentvue.wackery.com/get_all_schedules", generateFetch(username, password))).json();
    if (data.code != "SUCCESS") {
        // Change this so it doesnt stop the login process and just show a UI error to the user and use the defauklt schedule details
        throw new Error(data.content.code + ": " + data.content.error);
    }
    console.log(data)

    // Convert api data to terms data
    //

    /* TEMPOARY UNTILL STUDENTVUE GET SCHEDULES WORKS */
    const newTerms = settings.termsDates.map(t => {
        t.classes = emptyCL(settings.numberOfPeriods, settings.hasAdvisory);
        return t;
    });

    return newTerms;
    /* END TEMPORARY */
}

// Propbably should change args to take a StorageDataStudentvue object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getStudentInfo(username: string, password: string): Promise<any> {
    const data = await (await fetch("https://studentvue.wackery.com/get_student_info", generateFetch(username, password))).json();
    if (data.code != "SUCCESS") {
        throw new Error(data.content.code + ": " + data.content.error);
    }
    return data
}
