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
