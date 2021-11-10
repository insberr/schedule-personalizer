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

const lunches = {
    // lunch, these are teacher ids that identify teachers within the district.
    "1522F63C-385F-4A8F-B89D-3E6F46012FE3": 1,
    "E2899865-11A1-4C45-A63B-25BFBE878157": 1,
    "1FD1AA82-942A-40EE-95D4-F34305640AF6": 1,
    "A7ABDA74-2925-42EF-AC7C-6326DC6E4B20": 1,
    "05B18ACF-4FB0-4D48-A97B-5E8A295FE753": 1,
    "8FAC9753-5B46-44FB-A649-1AF4A8CC1541": 1,
    "292C3235-37B1-4475-B807-708D0A336D0D": 1,
    "E348AC0E-CC2C-4EC4-B3FE-122982161F4E": 1,
    "EA675775-8E99-489C-94E4-86228C4F1892": 1,
    "8C2BA073-F252-4166-9AA0-8BAA32010154": 1,
    "BE947D94-A04C-425F-B91F-5AA4402F312F": 1,
    "FB630C19-B6B5-4206-BAAA-760A36CF2891": 1,
    "D6880979-2D55-48BB-AEC1-85AE6DA526FE": 1,
    "AB98701E-A3DE-47A9-99DB-5AAC7397EB11": 1,
    "05CB9140-0555-459A-8EF4-906E4CC765FA": 1,
    "554D6D51-BA62-414B-AE85-4359EECBEBAD": 1,
    "10B967EC-7856-481F-A582-B084362DE8E0": 1,
    "49512926-C5E3-42C7-90FA-AEE628D72717": 1,
    "833B4D50-83AF-4973-8C0B-917FEA73A621": 1,
    "2082227C-4340-4A77-9BFD-2A91DE42E5F4": 2,
    "743247FA-3794-433D-B93B-3B8F928D51CC": 2,
    "0AD4E730-8F18-4E95-AEEA-2ED5C337C151": 2,
    "3ED4A9A4-1C03-4B3A-AB2C-394FBAD20616": 2,
    "818785EB-41A3-441F-A1CF-3444C9EC66EF": 2,
    "684B20C2-BAB0-4E22-BFE0-22F8CBB994C5": 2,
    "D271A345-ED7C-412A-BB26-27A41FE3399D": 2,
    "5A278915-6DA9-45BF-967A-D3C6909CAE36": 2,
    "EF0E762D-7A7D-4BBD-864B-4C6D6743E9FF": 2,
    "4CE7FB9A-1C6F-4174-9C50-9F32F056B707": 2,
    "429ED605-7245-4A99-A876-BA180822D7B8": 2,
    "67BF212C-EB81-4FE3-AC0D-03AB4AD5F8F4": 2,
    "F0887088-6E68-4CB7-82A1-EFD647AA0DD4": 2,
    "D81A4ABA-8EAB-40D1-8DCA-AEA24D5DF935": 2,
    "E7E3184B-A6CD-4DC5-8DCF-E7EED29B1043": 2,
    "3A021C70-1EBB-4EC3-A30F-1D3BCBC75B55": 2,
    "E0322F38-B08D-4A24-8ECD-C5C51CBB91BF": 2,
    "A84A6028-B7A1-4216-BA17-83FCC23E5CF4": 2,
    "CBDFA846-B3CB-45C5-BB36-C870B5AC4099": 2,
    "8D601451-1F29-44C4-9F33-B40659143F33": 2,
    "D628E698-735A-4FA3-903F-CC04C4FF1487": 2,
    "EBE2A4EF-690D-4A4D-B0FC-6DDD9941FF65": 2,
    "5055B0DF-34AB-42AA-8AD4-07E7FB95293E": 3,
    "9C064163-370F-4D03-96A0-A57D0E06B8F7": 3,
    "E3741ADD-A38D-4CF3-8628-80E31B902401": 3,
    "11F13E4A-D3C2-44C2-B85E-E42D044C4A7D": 3,
    "5ED1F075-B1E6-4012-9F25-F9BD96DE3CB7": 3,
    "1B5BFD83-2919-4A21-85A0-CD82D6364AF2": 3,
    "736302BF-89B1-4FC3-BC31-ED8CFA8D4E6C": 3,
    "ED394502-C892-444F-988E-528DD1D4655A": 3,
    "6C0E7AA5-FB41-46C7-A017-125B4590EF87": 3,
    "87361F26-64B4-4245-BD95-A20E8495F86B": 3,
    "EB696A7C-FD7F-4A05-B60C-217D04FDD7FF": 3,
    "31132696-3038-4611-9A5D-4F07D3D57F0A": 3,
    "CDE89AD0-1D63-4DB7-8C89-A66F1C5C41E2": 3,
    "F315657A-F3F1-459E-ABE8-003D4D3ECF81": 3,
    "E597CBAA-D3C7-4C74-B0B3-9DAAAE85CCF2": 3,
    "02E56D4C-FFAD-4A44-A7B9-9927CB1B2787": 3,
};

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
            placeholder: "december events not added yet",
        },
    },
    2022: {
        placeholder: "no events added",
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
