import * as types from '../types';
/*
    Required Config Values
*/

// This is for the number of classes in the day
// advisory should be included
export const numberOfPeriods= 6;

// The usual period lunch is based on.
export const normalLunchBasedOnPeriod = 3;

// Settings To Implement

// StudentVue API URL (You can host it yourself (WE SHOULD PUBLISH THE SERVER CODE OR SOMETHING IDK))
// Do Not Add Trailing Slash (/), else the code will error [IMPLEMENT THIS]
//     (I should make sure the code auto detects a trailing slash, this is just a reminder)
// If no api url is provided, then the studentvue login page will not be shown in setup [IMPLEMENT THIS]
export const studentVueApiURL = 'https://studentvue.wackery.com';

// Sentry.io DSN if you want to use it [IMPLEMENT THIS]
export const sentryDSN = 'https://a5ab5a1946bd4e31a06ca456fc5b30fc@o1233680.ingest.sentry.io/6382608';

// Terms
// This is also used to determine the number of terms in the school year
// This valuse is REQUIRED else there will be an error
// I DID NOT WRITE THE DATES ACCURATE PLEASE CAHNGE THEM LATER
export const termsDates: types.Terms = [
    { termIndex: 0, startDate: new Date("September 6, 2022"), endDate: new Date("December 1, 2022"), classes: [] },
    { termIndex: 1, startDate: new Date("December 2, 2022"), endDate: new Date("March 1, 2023"), classes: [] },
    { termIndex: 2, startDate: new Date("March 2, 2023"), endDate: new Date("June 23, 2023"), classes: [] },
];
