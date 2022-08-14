import { CL } from './types';

// I left off here, trying to implement terms now. shouldve done that from the beginning
// Also adding the storage manager to the rest of the code

export enum StorageQuery {
    All,
    Init,
    Setup,
    Terms,
    Lunch,
    Studentvue,
    Customizations,
    Dev
}

export type Term = {
    termIndex: number
    startDate: Date
    endDate: Date
    classes: CL[] | undefined | []
}
export type Terms = Term[]
export type StorageDataTerms = Term[];
export type StorageDataLunch = {
    lunch: number
};
export type StorageDataStudentvue = {
    password: string
    username: string
    stayLoggedIn: boolean
    isLoggedIn: boolean
};
export type StorageDataCustomizations = {
    colors?: {
        currentClass?: string
        zeroHour?: string
        lunch?: string
        normalClass?: string
        dismissal?: string
        arrival?: string
        background?: string
    }
};
export type SetUpComplete = boolean;
export type StorageDataTypes = StorageDataTerms | StorageDataLunch | StorageDataStudentvue | StorageDataCustomizations | SetUpComplete;
export type StorageData = {
    terms: StorageDataTerms
    lunch: StorageDataLunch
    studentVue: StorageDataStudentvue
    customizations: StorageDataCustomizations
    setUpComplete: boolean
}

export function getV1Data(): string | null {
    return localStorage.getItem('data') || null
}

export function getV5Data(query: StorageQuery): StorageData |  StorageDataTypes { // FOR NOW SO ITLL STOP COMPLAINING FOR A DAMN SECOND
    const v5Data: StorageData = JSON.parse(localStorage.getItem('v5Data-v1') || JSON.stringify(setV5Data(StorageQuery.Init, {})));
    
    if (query === StorageQuery.All) {
        return v5Data;
    }
    
    if (query === StorageQuery.Init) {
        throw Error('You shouldnt be using that query on this function, dunno what youre thinking dumb dumb');
    }

    if (query === StorageQuery.Dev) {
        return JSON.parse(localStorage.getItem('dev') || "{}")
    }

    switch(query) {
        case StorageQuery.Terms:
            return v5Data.terms;
        case StorageQuery.Lunch:
            return v5Data.lunch;
        case StorageQuery.Studentvue:
            return v5Data.studentVue;
        case StorageQuery.Customizations:
            return v5Data.customizations;
        case StorageQuery.Setup:
            return v5Data.setUpComplete;
        default:
            throw Error('That query doesnt exist, How TF did that not happen');
    }

}

export function setV5Data(query: StorageQuery, data: StorageData | StorageDataTypes): StorageData {
    console.log("set: " + JSON.stringify(data));

    if (query === StorageQuery.Init) {
        if (localStorage.getItem('v5Data-v1') !== null) return getV5Data(StorageQuery.All) as StorageData; //actually set data
        localStorage.setItem('v5Data-v1', JSON.stringify({
            terms: [{termIndex: 1, classes: [], startDate: new Date(), endDate: new Date()}, {termIndex: 2, classes: [], startDate: new Date(), endDate: new Date()}, { termIndex: 3, classes: [], startDate: new Date(), endDate: new Date()}],
            lunch: { lunch: 1 },
            setUpComplete: false,
            studentVue: { password: '', username: '', stayLoggedIn: false, isLoggedIn: false },
            customizations: { }
        }));
        return getV5Data(StorageQuery.All) as StorageData; //actually set data
    }

    if (query === StorageQuery.All) {
        localStorage.setItem('v5Data-v1', JSON.stringify(data));
        return getV5Data(StorageQuery.All) as StorageData;
    }

    const v5Data: StorageData = getV5Data(StorageQuery.All) as StorageData;

    switch(query) {
        case StorageQuery.Terms:
            v5Data.terms = data;
            break;
        case StorageQuery.Lunch:
            v5Data.lunch = data;
            break;
        case StorageQuery.Studentvue:
            v5Data.studentVue = data;
            break;
        case StorageQuery.Customizations:
            v5Data.customizations = data;
            break;
        case StorageQuery.Setup:
            v5Data.setUpComplete = data;
            break;
        default:
            throw Error(`Invalid query ${query.toString()}, How TF did this happen??`);
    }

    localStorage.setItem('v5Data-v1', JSON.stringify(v5Data));
    return getV5Data(StorageQuery.All) as StorageData;

}

export function clearV5Data(): void {
    localStorage.removeItem('v5Data-v1');
}
