import { getTimeW, Stdata } from "./types"

// This can be used as the default values until data is saved to local storage
export const testData: Stdata = {
    studentVue: {
        stayLoggedIn: true,
        username: "",
        password: "",
    },
    terms: [
        {
            term: 1,
            startDate: "do something with time",
            endDate: "do something with time",
            classes: [
                {
                    period: "1",
                    name: "Math",
                    room: "Earth",
                    teacher: {
                        name: "Tester",
                        email: "shitfart14@wackery.com",
                        id: "boomer"
                    },
                    startTime: getTimeW(0,0,0),
                    endTime: getTimeW(23,59,59),
                }
            ]
        },
        {
            term: 2,
            startDate: "do something with time",
            endDate: "do something with time",
            classes: [
                {
                    period: "1",
                    name: "ELA",
                    // should use null for things that dont have any data. idk how to do that
                    room: null,
                    teacher: null,
                    startTime: getTimeW(0,0,0),
                    endTime: getTimeW(23,59,59),
                }
            ]
        },
        {
            term: 3,
            startDate: "do something with time",
            endDate: "do something with time",
            classes: [
                {
                    period: "advisory",
                    name: "Advisory",
                    room: "210",
                    teacher: {
                        name: "Teach",
                        email: "shitfart14@wackery.com",
                        id: "boomer"
                    },
                    startTime: getTimeW(0,0,0),
                    endTime: getTimeW(23,59,59),
                },
                {
                    period: "1",
                    name: "Science",
                    room: "Earth",
                    teacher: {
                        name: "Tester",
                        email: "shitfart14@wackery.com",
                        id: "boomer"
                    },
                    startTime: getTimeW(0,0,0),
                    endTime: getTimeW(23,59,59),
                }
            ]
        }
    ],
    customizations: {
        theme: {
            color: "ill do this later",
        },
        showInfoOnSchedule: true,
    }
};

// import this file when you need test data