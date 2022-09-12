import { doOperation } from "./soap";

export function isError(obj: any): boolean {
    return Object.keys(obj).includes("RT_ERROR")
}

export async function StudentInfo(username: string, password: string): Promise<any> {
    return await doOperation(username, password, "StudentInfo", {});
}

export async function validate(username: string, password: string): Promise<boolean> {
    const r = await StudentInfo(username, password);
    return !isError(r)
}
export async function Calendar(username: string, password: string): Promise<any> {
    return await doOperation(username, password, "StudentCalendar", {"childIntId":0, "RequestDate":"2023-06-23T07:00:00.000Z"});
}

export async function StudentClassList(username: string, password: string, term: number | undefined): Promise<any> {
    const params: Record<string, unknown> = {}
    if (term != undefined) {
        params["TermIndex"] = term
    }
    return await doOperation(username, password, "StudentClassList", params);
}

export async function StudentSchoolInfo(username: string, password: string): Promise<any> {
    return await doOperation(username, password, "StudentSchoolInfo", {});
}