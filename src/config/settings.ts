import * as types from '../types';
import { ClassIDS } from '../types';
import { schedules, SchedulesType } from './schedules';

/* Required Config Values */

// The usual period lunch is based on.
export const normalLunchBasedOnPeriod = 3;

export const studentvueAPIEndpoint = 'https://wa-beth-psv.edupoint.com/Service/PXPCommunication.asmx';

// School Name
export const forSchoolName = 'Bethel High School';

// The period number that studentvue uses for advisory
export const studentVueAdvisoryPeriod = 8;

// While site is loaded refresh from studentvue afetr this much time in milliseconds
// setting it to a value less than 5 minutes is just cringe
export const studentvueRefreshInterval = 2 * 60 * 1000; // 2 minutes

// Sentry.io DSN if you want to use it [IMPLEMENT THIS]
export const sentryDSN = 'https://a5ab5a1946bd4e31a06ca456fc5b30fc@o1233680.ingest.sentry.io/6382608';

// scrape url thingy
export const scrapeUrl = 'https://api-scrape-thing.insberr.repl.co/';

// Alert message schedule corrilation
// the key is contained in the alert message
// case insensitive
export const alertMessageSchedules: { contains: string; schedule: SchedulesType }[] = [
    {
        contains: 'two-hour delay',
        schedule: schedules.lateStart2Hour,
    },
    {
        contains: 'two hour delay',
        schedule: schedules.lateStart2Hour,
    },
    {
        contains: '2-hour delay',
        schedule: schedules.lateStart2Hour,
    },
    {
        contains: '2 hour delay',
        schedule: schedules.lateStart2Hour,
    },
    {
        contains: 'cancelled',
        schedule: schedules.noSchool,
    },
    {
        contains: 'closed',
        schedule: schedules.noSchool,
    },
];

// This is for the number of classes in the day
// advisory should be included
export const numberOfPeriods = 6;

// School start and end times
export const schoolStartTime = types.getTimeW_Input12Hour(7, 45);
export const schoolStartTime_1HourLate = types.getTimeW_Input12Hour(8, 45);
export const schoolEndTime = types.getTimeW_Input12Hour(2, 15);
export const schoolEndTime_EarlyDismissal = types.getTimeW_Input12Hour(11, 15);

// For adding cambridge support, thatll be fun
export const cambridgePeriods = [11, 12, 13];

// If your school has an advisory period, set this to true
export const hasAdvisory = true;

// NOT IMPLEMENTED
export const scheduleConfigs = {
    normal: {
        // Should not include advisory or zero hour
        numberOfPeriods: 5,
        hasAdvisory: true,
        hasZeroHour: false,
    },
    /* Overides */
    overides: [
        {
            nameame: 'Cambridge',
            valueName: 'cambridge',
            trigger: {
                hasPeriods: [11, 12, 13],
            },
        },
    ],
};

export const lastDayOfSchool = new Date('June 23, 2024 23:59');
// Terms
// This is also used to determine the number of terms in the school year
// This valuse is REQUIRED else there will be an error
//
// `endDate` is by default set with an end time of 00:00 (12am)
//   due to the way the code works, it is advised that you specify the time
//   this would in most cases be 23:59 (11:59pm)
//   See const lastDayOfSchool for time example
export const termsDates: types.Terms = [
    {
        termIndex: 0,
        startDate: new Date('August 30, 2023'),
        endDate: new Date('December 6, 2023'),
        classes: [],
    },
    {
        termIndex: 1,
        startDate: new Date('December 8, 2023'),
        endDate: new Date('March 23, 2024'),
        classes: [],
    },
    { termIndex: 2, startDate: new Date('March 24, 2024'), endDate: lastDayOfSchool, classes: [] },
];

const defaultColor: types.RGBA = {
    enabled: false,
    c: {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
    },
    t: {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
    },
};
const defaultIcon: types.Icon = {
    enabled: true,
    color: {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
    },
};

export const defaultCustomizations: types.Customizations = {
    theme: {
        colors: {
            schedule: {
                [ClassIDS.Zero]: defaultColor,
                [ClassIDS.Advisory]: defaultColor,
                [ClassIDS.Period]: defaultColor,
                [ClassIDS.Lunch]: defaultColor,
                [ClassIDS.Arrival]: defaultColor,
                [ClassIDS.Assembly]: defaultColor,
                [ClassIDS.Dismissal]: defaultColor,
                [ClassIDS.NoSchool]: defaultColor,
                [ClassIDS.Weekend]: defaultColor,
                [ClassIDS.Summer]: defaultColor,
                [ClassIDS.Passing]: defaultColor,
                [ClassIDS.Custom]: defaultColor,
            },
            currentClass: defaultColor,
            scheduleFrame: defaultColor,
        },
        icons: {
            class: defaultIcon,
            lunch: defaultIcon,
            currentClass: defaultIcon,
        },
    },
    keybinds: {
        goBackOneDay: 'ArrowLeft',
        goForwardOneDay: 'ArrowRight',
        goToToday: 't',
    },
    showInfoOnSchedule: true,
    tutorial: {
        moreMap: true,
    },
};

// This is partly a joke,,,, (I think)
export const multiplayer = true;
