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
    Dev,
}

export type StorageDataLunch = {
    lunch: number;
};
export type StorageDataStudentvue = {
    password: string;
    username: string;
    stayLoggedIn: boolean;
    isLoggedIn: boolean;
};
export type StorageDataCustomizations = {
    colors?: {
        currentClass?: string;
        zeroHour?: string;
        lunch?: string;
        normalClass?: string;
        dismissal?: string;
        arrival?: string;
        background?: string;
    };
};
export type SetUpComplete = boolean;

export type StorageData = {
    //terms: StorageDataTerms
    lunch: StorageDataLunch;
    studentVue: StorageDataStudentvue;
    customizations: StorageDataCustomizations;
    setUpComplete: boolean;
};
/* eslint-disable @typescript-eslint/no-explicit-any */

// we dont actually need like, anything in this file.

export function resetStorage() {
    //TODO: reset storage, maybe clear localstorage then reload?
    alert('TODO: resetStorage()');
}

// maybe put all of the stores on the window object? for debugging?
