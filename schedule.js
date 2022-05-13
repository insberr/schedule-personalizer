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

// March 30 - April 1
const earlyDismissalT3_1 = [
    { p: "zero", time: "6:35 - 7:30" },
    { p: "adv", time: "7:35 - 8:45" },
    { p: "1", time: "8:50 - 10:05" },
    { p: "dism", time: "10:05 - 10:10" },
];

const earlyDismissalT3_2 = [
    { p: "arr", time: "7:15 - 7:30" },
    { p: "2", time: "7:35 - 8:45" },
    { p: "3", time: "8:50 - 10:05" },
    { p: "dism", time: "10:05 - 10:10" },
];

const earlyDismissalT3_3 = [
    { p: "arr", time: "7:15 - 7:30" },
    { p: "4", time: "7:35 - 8:45" },
    { p: "5", time: "8:50 - 10:05" },
    { p: "dism", time: "10:05 - 10:10" },
];

/*  ----  end  ----  */

let twohr = [
    { p: "arr", time: "9:15 - 9:30" },
    { p: "1", time: "9:35 - 10:15" },
    { p: "2", time: "10:20 - 11:00" },

    { p: "lnc", time: "11:00 - 11:30", l: "1" },
    { p: "3", time: "11:35 - 12:35", l: "1" },

    { p: "3", time: "11:05 - 11:30", l: "2" },
    { p: "lnc", time: "11:30 - 12:00", l: "2" },
    { p: "3", time: "12:05 - 12:35", l: "2" },

    { p: "3", time: "11:05 - 12:05", l: "3" },
    { p: "lnc", time: "12:05 - 12:35", l: "3" },

    { p: "4", time: "12:40 - 1:20" },
    { p: "5", time: "1:25 - 2:05" },
    { p: "dism", time: "2:05 - 2:10" },
];

const fuckedUpJuniorCareerDay = [
    { p: "zero", time: "6:35 - 7:30" },
    { p: "adv", time: "7:35 - 8:35" },
    { p: "1", time: "8:40 - 9:30" },
    { p: "2", time: "9:35 - 10:25" },

    { p: "lnc", time: "10:25 - 10:55", l: "1" },
    { p: "3", time: "11:30 - 12:10", l: "1" },

    { p: "3", time: "10:30 - 11:00", l: "2" },
    { p: "lnc", time: "11:00 - 11:30", l: "2" },
    { p: "3", time: "11:35 - 12:10", l: "2" },

    { p: "3", time: "10:30 - 11:40", l: "3" },
    { p: "lnc", time: "11:40 - 12:10", l: "3" },

    { p: "4", time: "12:15 - 1:10" },
    { p: "5", time: "1:15 - 2:05" },
    { p: "dism", time: "2:05 - 2:10" },
];

const messedUpPepAssembly = [
    { p: "zero", time: "6:35 - 7:30" },
    { p: "1", time: "7:35 - 8:35" },
    { p: "2", time: "8:40 - 9:35" },

    { p: "lnc", time: "9:40 - 10:10", l: "1" },
    { p: "3", time: "10:15 - 11:20", l: "1" },

    { p: "3", time: "9:40 - 10:15", l: "2" },
    { p: "lnc", time: "10:15 - 10:45", l: "2" },
    { p: "3", time: "10:50 - 11:20", l: "2" },

    { p: "3", time: "9:45 - 10:55", l: "3" },
    { p: "lnc", time: "10:50 - 11:20", l: "3" },

    { p: "4", time: "11:25 - 12:15" },
    { p: "5", time: "12:20 - 1:10" },
    { p: "assem", time: "1:15 - 2:05" },
    { p: "dism", time: "2:05 - 2:10" },
];

let sbaTestingSchedule = [
    { p: "zero", time: "6:35 - 7:30" },
    { p: "adv", time: "7:35 - 8:50" },
    { p: "1", time: "8:55 - 9:45" },
    { p: "2", time: "9:50 - 10:40" },

    { p: "lnc", time: "10:40 - 11:10", l: "1" },
    { p: "3", time: "11:15 -12:20", l: "1" },

    { p: "3", time: "10:45 - 11:15", l: "2" },
    { p: "lnc", time: "11:15 - 11:45", l: "2" },
    { p: "3", time: "11:50 - 12:20", l: "2" },

    { p: "3", time: "10:45 - 11:50", l: "3" },
    { p: "lnc", time: "11:50 - 12:20", l: "3" },

    { p: "4", time: "12:25 - 1:15" },
    { p: "5", time: "1:20 - 2:05" },
    { p: "dism", time: "2:05 - 2:10" }
]

let lunchraw = [
    [
        "1FD1AA82-942A-40EE-95D4-F34305640AF6", // BRENDIBLE
        "5055B0DF-34AB-42AA-8AD4-07E7FB95293E", // BROKAW
        "9C064163-370F-4D03-96A0-A57D0E06B8F7", // DANSEREAU
        "05B18ACF-4FB0-4D48-A97B-5E8A295FE753", // GIBBS
        "5ED1F075-B1E6-4012-9F25-F9BD96DE3CB7", // HAMILTON
        "561420AA-D874-468B-9456-D52910FE8633", // HODGES
        "292C3235-37B1-4475-B807-708D0A336D0D", // HOWARD
        "6EDDF615-60D5-45AA-8B3F-A3D04DDF1533", // KINTZ
        "8C2BA073-F252-4166-9AA0-8BAA32010154", // LOISELLE
        "E7E3184B-A6CD-4DC5-8DCF-E7EED29B1043", // MORFORD
        "6C0E7AA5-FB41-46C7-A017-125B4590EF87", // MORRISON
        "AB752D13-733E-442E-BF28-4F0D007240E2", // NEU
        "7DAD4E68-6A68-4823-A933-C6864652D72F", // NORTHINGTON
        "FB630C19-B6B5-4206-BAAA-760A36CF2891", // PIKE
        "E3741ADD-A38D-4CF3-8628-80E31B902401", // R. FOWLER
        "87361F26-64B4-4245-BD95-A20E8495F86B", // RATH
        "3E7413CA-5771-4987-9E1C-91F97715C589", // SCHREIBER
        "BE947D94-A04C-425F-B91F-5AA4402F312F", // SORIERO
        "8D601451-1F29-44C4-9F33-B40659143F33", // STERN
        "AD4CA338-FDFF-47E8-8378-306F91D7CC6C", // TALEN
        "10B967EC-7856-481F-A582-B084362DE8E0", // VALLIER

        // NO LUNCH ASSIGNED ???
        "09441DB3-3CF9-409B-A292-5592502AE241", // MCCANN
        "D8215B42-7E71-4527-96BA-19B5CABA8C9B", // O'DONNELL
        "EB696A7C-FD7F-4A05-B60C-217D04FDD7FF", // REXUS
    ],
    [
        "2082227C-4340-4A77-9BFD-2A91DE42E5F4", // ANDERSON
        "743247FA-3794-433D-B93B-3B8F928D51CC", // BARNETTE
        "0AD4E730-8F18-4E95-AEEA-2ED5C337C151", // BEATTY
        "3ED4A9A4-1C03-4B3A-AB2C-394FBAD20616", // BECKWITH
        "E2899865-11A1-4C45-A63B-25BFBE878157", // BLAND
        "E348AC0E-CC2C-4EC4-B3FE-122982161F4E", // CAIN
        "684B20C2-BAB0-4E22-BFE0-22F8CBB994C5", // CAMBRA
        "D271A345-ED7C-412A-BB26-27A41FE3399D", // CARREL
        "11FF7A1C-7D63-4644-BAAE-D59851A2DC6A", // E. FOWLER
        "4CE7FB9A-1C6F-4174-9C50-9F32F056B707", // GLADFELTER
        "87E25A49-8848-4168-B443-268B35535C85", // ITO
        "F0887088-6E68-4CB7-82A1-EFD647AA0DD4", // IVERSON
        "D81A4ABA-8EAB-40D1-8DCA-AEA24D5DF935", // JOLLY
        "EF0E762D-7A7D-4BBD-864B-4C6D6743E9FF", // K. FOWLER
        "67BF212C-EB81-4FE3-AC0D-03AB4AD5F8F4", // REISCH
        "47EC4DD6-02A2-414F-8427-1B3B8838A429", // RUIZ ???
        "3A021C70-1EBB-4EC3-A30F-1D3BCBC75B55", // SNEDIGAR
        "E0322F38-B08D-4A24-8ECD-C5C51CBB91BF", // SNOW
        "CDE89AD0-1D63-4DB7-8C89-A66F1C5C41E2", // STUMPF
        "D628E698-735A-4FA3-903F-CC04C4FF1487", // TAYLOR
        "49512926-C5E3-42C7-90FA-AEE628D72717", // A. WILSON
        "833B4D50-83AF-4973-8C0B-917FEA73A621", // G. WILSON
        "EBE2A4EF-690D-4A4D-B0FC-6DDD9941FF65", // WOOD

        // NO LUNCH ASSIGNED ???
        "429ED605-7245-4A99-A876-BA180822D7B8", // KOBER
    ],
    [
        "1522F63C-385F-4A8F-B89D-3E6F46012FE3", // ALLEN
        "02E56D4C-FFAD-4A44-A7B9-9927CB1B2787", // APOSTOLIDES (ON DOC AS: APOSTILIDES)
        "A7ABDA74-2925-42EF-AC7C-6326DC6E4B20", // DOYLE
        "5A278915-6DA9-45BF-967A-D3C6909CAE36", // ESTRADA
        "11F13E4A-D3C2-44C2-B85E-E42D044C4A7D", // HAEGELE
        "1B5BFD83-2919-4A21-85A0-CD82D6364AF2", // HUBEEK
        "EA675775-8E99-489C-94E4-86228C4F1892", // KNOX
        "736302BF-89B1-4FC3-BC31-ED8CFA8D4E6C", // LANTZ
        "ED394502-C892-444F-988E-528DD1D4655A", // MISELY
        "A84A6028-B7A1-4216-BA17-83FCC23E5CF4", // PARKER
        "D6880979-2D55-48BB-AEC1-85AE6DA526FE", // RIDGWAY -- RIDGEWAY, (not in get_school_info, wth???)
        "F5C93D23-A66E-4BBF-8D00-9863CE0822C0", // SAUER
        "554D6D51-BA62-414B-AE85-4359EECBEBAD", // SCHWOCH
        "31132696-3038-4611-9A5D-4F07D3D57F0A", // SHOOT
        "CBDFA846-B3CB-45C5-BB36-C870B5AC4099", // SOUTHWORTH
        "F315657A-F3F1-459E-ABE8-003D4D3ECF81", // THORN
        "05CB9140-0555-459A-8EF4-906E4CC765FA", // WETHERINGTON

        // NO LUNCH ASSIGNED ???
        "6A3A1070-A936-4DC5-9DB3-9D0DF300406C", // GARDNER
        "0D9677FA-FC67-46A0-8884-2F9A5DD1B78B", // TKACH
        "AB98701E-A3DE-47A9-99DB-5AAC7397EB11", // SAFFLE
    ],
];

function generateLunches(lraw) {
    let out = {};
    lraw.forEach((l, i) => {
        l.forEach((p) => {
            out[p] = i + 1;
        });
    });
    return out;
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
            14: {
                details: "Icy Roads - 2 Hour Delay",
                schedule: twohr,
            },
            15: eventLateStartDay,
            17: {
                details: "For some reason its advisory today",
                schedule: adv,
            },
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
            3: {
                details: "Icy Roads - 2 Hr delay",
                schedule: twohr,
            },
            4: {
                details: "Icy Roads - 2 Hr delay",
                schedule: twohr,
            },
            // 5: eventLateStartDay,
            5: { schedule: twohr, details: "Ice and Stuff - 2 Hour Delay" },
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
        },
        1: {
            9: eventLateStartDay,
            16: eventLateStartDay,
            21: { details: "President's Day - No School", schedule: noSchool },
            22: { details: "Waiver Day #2 - No School", schedule: noSchool },
        },
        2: {
            2: eventLateStartDay,
            9: eventLateStartDay,
            18: { details: "PD Day #3 - No School", schedule: noSchool },
            24: {
                details: "Elem/MS/HS Grade Prep – Early Dismissal (K-12)",
                schedule: earlyDismissal,
            },
            28: {
                details: "Elem Conference Week – Early Dismissal (K-5)",
                schedule: "normal",
            },
            29: {
                details: "Elem Conference Week – Early Dismissal (K-5)",
                schedule: "normal",
            },
            30: {
                details: "Secondary Conferences – Early Dismissal (K-12)",
                schedule: earlyDismissalT3_1,
            },
            31: {
                details: "Secondary Conferences – Early Dismissal (K-12)",
                schedule: earlyDismissalT3_2,
            },
        },
        3: {
            1: {
                details: "Secondary Conferences – Early Dismissal (K-12)",
                schedule: earlyDismissalT3_3,
            },
            6: eventLateStartDay,
            11: { details: "Spring Break - No School", schedule: noSchool },
            12: { details: "Spring Break - No School", schedule: noSchool },
            13: { details: "Spring Break - No School", schedule: noSchool },
            14: { details: "Spring Break - No School", schedule: noSchool },
            15: { details: "Spring Break - No School", schedule: noSchool },
            19: { details: "Junior Career Day", schedule: fuckedUpJuniorCareerDay },
            20: eventLateStartDay,
            21: { details: "Normal Schedule Because School Hates Us", schedule: noadv },
            27: eventLateStartDay,
        },
        /*
        month 4:
        4, 11, 18 are late start days
        6 is a Pep Assembly - Schedule Unknown
        30 is no school

        month 5:
        1 is late start
        23 last day of school
        */
        4: {
            2: { details: "Spirit Day - Marvel Monday", schedule: "normal" },
            3: { details: "Spirit Day - BBQ Dads vs Soccer Moms", schedule: "normal" },
            4: { details: "1 Hour Late Start & Spirit Day - Adam Sandler Day", schedule: lateStart },
            5: { details: "Spirit Day - Country vs Country Club", schedule: "normal" },
            6: { details: "Spirit Day - Bison Out! & Pep Assembly", schedule: messedUpPepAssembly },
            11: eventLateStartDay,
            16: { details: "Grade 10 ELA CAT", schedule: sbaTestingSchedule },
            17: { details: "Grade 10 ELA PT 1", schedule: sbaTestingSchedule },
            18: eventLateStartDay,
            19: { details: "Grade 10 ELA PT 2", schedule: sbaTestingSchedule },
            24: { details: "Grade 9 STAR Reading, Grade 10 Math CAT, Grade 11 WCAS", schedule: sbaTestingSchedule },
            26: { details: "Grade 9 STAR Math, Grade 10 Math PT, Grade 11 WCAS", schedule: sbaTestingSchedule },
        },
        5: {
            1: eventLateStartDay,
            23: { details: "Last Day of School - Schedule Unknown", schedule: "normal" },
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

    return (
        currentDate.getDate() === compareDate.getDate() &&
        currentDate.getMonth() === compareDate.getMonth() &&
        currentDate.getFullYear() === compareDate.getFullYear()
    );
}
