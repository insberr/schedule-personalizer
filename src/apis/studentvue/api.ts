/* eslint-disable @typescript-eslint/no-explicit-any */
import { doOperation } from './soap';

export function isError(obj: any): boolean {
    return Object.keys(obj).includes('RT_ERROR');
}

export async function StudentInfo(username: string, password: string): Promise<any> {
    return await doOperation({ url: 'temp', username, password, method: 'StudentInfo', args: {} });
}

export async function validate(username: string, password: string): Promise<boolean> {
    const r = await StudentInfo(username, password);
    return !isError(r);
}

export async function Calendar(username: string, password: string): Promise<any> {
    return await doOperation({
        url: 'temp',
        username,
        password,
        method: 'StudentCalendar',
        args: {
            childIntId: 0,
            RequestDate: '2023-06-23T07:00:00.000Z',
        },
    });
}

export async function StudentClassList(username: string, password: string, term: number | undefined): Promise<any> {
    const args: Record<string, unknown> = {};
    if (term != undefined) {
        args['TermIndex'] = term;
    }
    return await doOperation({ url: 'temp', username, password, method: 'StudentClassList', args });
}

export async function StudentSchoolInfo(username: string, password: string): Promise<any> {
    return await doOperation({ url: 'temp', username, password, method: 'StudentSchoolInfo', args: {} });
}

export async function StudentGradebook(username: string, password: string, term: number | undefined): Promise<any> {
    const args: Record<string, unknown> = {};
    if (term != undefined) {
        args['ReportPeriod'] = term;
    }
    return await doOperation({ url: 'temp', username, password, method: 'Gradebook', args });
}

