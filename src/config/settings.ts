import * as types from '../types';
import { ClassIDS } from '../types';

/* Required Config Values */

// The usual period lunch is based on.
export const normalLunchBasedOnPeriod = 3;


// StudentVue API URL (You can host it yourself (WE SHOULD PUBLISH THE SERVER CODE OR SOMETHING IDK))
// Do Not Add Trailing Slash (/), else the code will error [IMPLEMENT THIS]
//     (I should make sure the code auto detects a trailing slash, this is just a reminder)
// If no api url is provided, then the studentvue login page will not be shown in setup [IMPLEMENT THIS]
export const studentVueApiURL = 'https://studentvue.wackery.com';

// The period number that studentvue uses for advisory
export const studentVueAdvisoryPeriod = 8;

// While site is loaded refresh from studentvue afetr this much time in milliseconds
// setting it to a value less than 5 minutes is just cringe
export const studentvueRefreshInterval = 10 * 60 * 1000; // 10 minutes
// When the page is loading, refresh from studentvue if its been this long since the last refresh
export const studentvueRefreshOnLoad = 1 * 60 * 60 * 1000; // 1 hour

// Sentry.io DSN if you want to use it [IMPLEMENT THIS]
export const sentryDSN = 'https://a5ab5a1946bd4e31a06ca456fc5b30fc@o1233680.ingest.sentry.io/6382608';


// This is for the number of classes in the day
// advisory should be included
export const numberOfPeriods= 6;

// If your school has an advisory period, set this to true
export const hasAdvisory = true;

export const lastDayOfSchool = new Date('June 23, 2023');
// Terms
// This is also used to determine the number of terms in the school year
// This valuse is REQUIRED else there will be an error
// I DID NOT WRITE THE DATES ACCURATE PLEASE CAHNGE THEM LATER
export const termsDates: types.Terms = [
    { termIndex: 0, startDate: new Date("September 6, 2022"), endDate: new Date("December 6, 2022"), classes: [] },
    { termIndex: 1, startDate: new Date("December 8, 2022"), endDate: new Date("March 27, 2023"), classes: [] },
    { termIndex: 2, startDate: new Date("March 28, 2023"), endDate: lastDayOfSchool, classes: [] },
];

export const defaultCustomizations = {
    theme: {
        backgroundColor: '#ffffff',
        schedule: {
            backgroundColor: '#ffffff',
            classColors: {
                [ClassIDS.Zero]: '#ffffff',
                [ClassIDS.Advisory]: '#ffffff',
                [ClassIDS.Period]: '#ffffff',
                [ClassIDS.Lunch]: '#ffffff',
                [ClassIDS.Arrival]: '#ffffff',
                [ClassIDS.Assembly]: '#ffffff',
                [ClassIDS.Dismissal]: '#ffffff',
                [ClassIDS.NoSchool]: '#ffffff',
                [ClassIDS.Weekend]: '#ffffff',
                current: '#ffffff',
            },
        },
    },
    keyboardShortcuts: {
        //
    },
    showInfoOnSchedule: true,
}