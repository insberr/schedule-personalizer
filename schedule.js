
const noadv = [
    {
        p: "zero",
        time: "6:35 - 7:30",
    },
    {
        p: "1",
        time: "7:35 - 8:45",
    },
    {
        p: "2",
        time: "8:50 - 9:55",
    },

    // p 3 and lunch
    {
        p: "lnc",
        time: "9:55 - 10:25",
        l: "1",
    },
    {
        p: "3",
        time: "10:30 - 11:40",
        l: "1",
    },

    {
        p: "3",
        time: "10:00 - 10:30",
        l: "2",
    },
    {
        p: "lnc",
        time: "10:30 - 11:00",
        l: "2",
    },
    {
        p: "3",
        time: "11:05 - 11:40",
        l: "2",
    },

    {
        p: "3",
        time: "10:00 - 11:10",
        l: "3",
    },
    {
        p: "lnc",
        time: "11:10 - 11:40",
        l: "3",
    },

    {
        p: "4",
        time: "11:45 - 12:55",
    },
    {
        p: "5",
        time: "1:00 - 2:05",
    },
    {
        p: "dism",
        time: "2:05 - 2:10",
    },
];

const adv = [
    {
        p: "zero",
        time: "6:35 - 7:30",
    },
    {
        p: "adv",
        time: "7:35 - 8:05",
    },
    {
        p: "1",
        time: "8:10 - 9:05",
    },
    {
        p: "2",
        time: "9:10 - 10:10",
    },

    // p 3 and lunch
    {
        p: "lnc",
        time: "10:10 - 10:40",
        l: "1",
    },
    {
        p: "3",
        time: "10:45 - 11:55",
        l: "1",
    },

    {
        p: "3",
        time: "10:15 - 10:45",
        l: "2",
    },
    {
        p: "lnc",
        time: "10:45 - 11:15",
        l: "2",
    },
    {
        p: "3",
        time: "11:20 - 11:55",
        l: "2",
    },

    {
        p: "3",
        time: "10:15 - 11:25",
        l: "3",
    },
    {
        p: "lnc",
        time: "11:25 - 11:55",
        l: "3",
    },

    {
        p: "4",
        time: "12:00 - 1:00",
    },
    {
        p: "5",
        time: "1:05 - 2:05",
    },
    {
        p: "dism",
        time: "2:05 - 2:10",
    },
];

const lateStart = [
    { p: "arr", time: "8:15 - 8:30" },
    { p: "1", time: "8:35 - 9:25" },
    { p: "2", time: "9:30 - 10:25" },

    { p: "lnc", time: "10:25 - 10:55", l: "1" },
    { p: "3", time: "11:00 - 12:10", l: "1" },

    { p: "3", time: "10:30 - 11:00", l: "2" },
    { p: "lnc", time: "11:00 - 11:30", l: "2" },
    { p: "3", time: "11:35 - 12:10", l: "2" },

    { p: "3", time: "10:30 - 11:40", l: "3" },
    { p: "lnc", time: "11:40 - 12:10", l: "3" },

    { p: "4", time: "12:15 - 1:10" },
    { p: "5", time: "1:15 - 2:05" },
    { p: "dism", time: "2:05 - 2:10" },
];

const earlyDismissal = [
    { p: "zero", time: "6:35 - 7:30" },
    { p: "1", time: "7:35 - 8:00" },
    { p: "2", time: "8:05 - 8:30" },
    { p: "3", time: "8:35 - 9:00" },
    { p: "4", time: "9:05 - 9:30" },
    { p: "5", time: "9:35 - 10:05" },
    { p: "dism", time: "10:05 - 10:10" },
];
let lunchraw = [
    [
        "E2899865-11A1-4C45-A63B-25BFBE878157", // BLAND
        "5055B0DF-34AB-42AA-8AD4-07E7FB95293E", // BROKAW
        "9C064163-370F-4D03-96A0-A57D0E06B8F7", // DANSEREAU
        "05B18ACF-4FB0-4D48-A97B-5E8A295FE753", // GIBBS
        "5ED1F075-B1E6-4012-9F25-F9BD96DE3CB7", // HAMILTON
        "561420AA-D874-468B-9456-D52910FE8633", // HODGES
        "1B5BFD83-2919-4A21-85A0-CD82D6364AF2", // HUBEEK
        "736302BF-89B1-4FC3-BC31-ED8CFA8D4E6C", // LANTZ
        "8C2BA073-F252-4166-9AA0-8BAA32010154", // LOISELLE
        "09441DB3-3CF9-409B-A292-5592502AE241", // MCCANN
        "6C0E7AA5-FB41-46C7-A017-125B4590EF87", // MORRISON
        "7DAD4E68-6A68-4823-A933-C6864652D72F", // NORTHINGTON
        "D8215B42-7E71-4527-96BA-19B5CABA8C9B", // O'DONNELL
        "FB630C19-B6B5-4206-BAAA-760A36CF2891", // PIKE
        "E3741ADD-A38D-4CF3-8628-80E31B902401", // R. FOWLER
        "87361F26-64B4-4245-BD95-A20E8495F86B", // RATH
        "EB696A7C-FD7F-4A05-B60C-217D04FDD7FF", // REXUS
        "3E7413CA-5771-4987-9E1C-91F97715C589", // SCHREIBER
        "BE947D94-A04C-425F-B91F-5AA4402F312F", // SORIERO
        "AD4CA338-FDFF-47E8-8378-306F91D7CC6C", // TALEN
        "10B967EC-7856-481F-A582-B084362DE8E0", // VALLIER
    ],
    [],
    []
]
function generateLunches(lraw) { 
    let out = {}
    lraw.forEach((l, i) => {
        l.forEach(p => { 
            out[p] = i+1
        })
    })
    return out
}
const lunches = generateLunches(lunchraw);

const noSchool = [
    { we: true },
    { p: "study", time: "Theres no school today, Silly!" },
];

const end = [{ we: true }, { p: "study", time: "Its The Weekend, Silly!" }];

/* 
	REMEMBER Months 0 - 11
			Days 1 - 30/31 (F Febuary has 29 days or something)
*/

/*
	events: {
		month: {
			day: {
				details: "",
				schedule: []
			}
		}
	}
*/

const eventLateStartDay = {
    details: "1 Hour Late Start",
    schedule: lateStart,
};

/*
events varuable
{
    [year]: {
        [month]: {
            [day]: [Type 1 || Type 2]
        }
    }
}

Type 1 - No cohort differant schedules
{
    details: "Event Details",
    schedule: []
}

Type 2 - If there are cohort specific schedules
{
    [cohort]: [Type 1],
    ...cohorts
}

*/
const events = {
    2021: {
        10: {
            3: eventLateStartDay,
            9: {
                details: "School Canceled - Due to power outages",
                schedule: [
                    {
                        we: true,
                    },
                    {
                        p: "study",
                        time: "No school today, you better study for that quiz : )",
                    },
                ],
            },
            11: {
                details: "Veterans Day – No School",
                schedule: noSchool,
            },
            17: eventLateStartDay,
            24: {
                details: "Thanksgiving Break - No School",
                schedule: noSchool,
            },
            25: {
                details: "Thanksgiving Break - No School",
                schedule: noSchool,
            },
            26: {
                details: "Thanksgiving Break - No School",
                schedule: noSchool,
            },
        },
        11: {
            1: eventLateStartDay,
            7: {
                details: "End of Trimester 1 - Early Dismissal (6-12)",
                schedule: earlyDismissal,
            },
            8: {
                details: "No School",
                schedule: noSchool,
            },
            15: eventLateStartDay,
            // 20th - 31st is No School - Winter Break
            20: {
                details: "Winter Break - No School",
                schedule: noSchool,
            },
            21: {
                details: "Winter Break - No School",
                schedule: noSchool,
            },
            22: {
                details: "Winter Break - No School",
                schedule: noSchool,
            },
            23: {
                details: "Winter Break - No School",
                schedule: noSchool,
            },
            24: {
                details: "Winter Break - No School",
                schedule: noSchool,
            },
            27: {
                details: "Winter Break - No School",
                schedule: noSchool,
            },
            28: {
                details: "Winter Break - No School",
                schedule: noSchool,
            },
            29: {
                details: "Winter Break - No School",
                schedule: noSchool,
            },
            30: {
                details: "Winter Break - No School",
                schedule: noSchool,
            },
            31: {
                details: "Winter Break - No School",
                schedule: noSchool,
            },
        },
    },
    2022: {
        0: {
            5: eventLateStartDay,
            12: eventLateStartDay,
            17: {
                details: "Martin Luther King, Jr. Day - No School",
                schedule: noSchool,
            },
            19: eventLateStartDay,
            26: {
                details: "No School",
                schedule: noSchool,
            },
        }
    },
};

// Return the event for the given day
function getEventFor(day, month, year, cohort) {
    let event = events[year]?.[month]?.[day];

    if (event === undefined) {
        return null;
    }

    if (event[cohort] !== undefined) {
        return event[cohort];
    }

    return event;
}

function compareDates(year, month, day) {
    let currentDate = new Date();
    let compareDate = new Date(year, month, day);

    return ((currentDate.getDate() === compareDate.getDate()) && (currentDate.getMonth() === compareDate.getMonth()) && (currentDate.getFullYear() === compareDate.getFullYear()))
}
