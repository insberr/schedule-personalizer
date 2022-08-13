import { CL } from './types';

// I left off here, trying to implement terms now. shouldve done that from the beginning
// Also adding the storage manager to the rest of the code

export enum StorageQuery {
    Terms,
    Lunch,
    Studentvue,
    Customizations
}

export type Term = {
    termIndex: number
    startDate: Date
    endDate: Date
    classes: CL[]
}
export type Terms = Term[]
export type StorageDataTerms = CL[];
export type StorageDataLunch = {
    lunch: number
};
export type StorageDataStudentvue = {
    password: string
    username: string
    stayLoggedIn: boolean
};
export type StorageDataCustomizations = {
    colors: {
        currentClass: string
        zeroHour: string
        lunch: string
        normalClass: string
        dismissal: string
        arrival: string
        background: string
    }
};
export type StorageData = StorageDataTerms | StorageDataLunch | StorageDataStudentvue | StorageDataCustomizations;

export function getV1Data(): string | null {
    return localStorage.getItem('data') || null
}

export function getV5Data(query: StorageQuery): StorageData | null | string {
    switch (query) {
        case StorageQuery.Terms:
            return localStorage.getItem('terms');
        case StorageQuery.Lunch:
            return localStorage.getItem('lunch');
        case StorageQuery.Studentvue:
            return localStorage.getItem('studentvue');
        case StorageQuery.Customizations:
            return localStorage.getItem('customizations');
        default:
            return null;
    }

}

export function setV5Data(data: StorageData, query: StorageQuery): StorageData | null | string {
    console.log("set: " + JSON.stringify(data));
    switch (query) {
        case StorageQuery.Terms:
            localStorage.setItem('courses', JSON.stringify(data));
            break;
        case StorageQuery.Lunch:
            localStorage.setItem('lunch', JSON.stringify(data));
            break;
        case StorageQuery.Studentvue:
            localStorage.setItem('studentvue', JSON.stringify(data));
            break;
        case StorageQuery.Customizations:
            localStorage.setItem('customizations', JSON.stringify(data));
            break;
        default:
            return data;
    }

    return data

}


