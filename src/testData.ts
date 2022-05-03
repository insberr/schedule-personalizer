import { getTimeW, Stdata } from "./types"
export const testData: Stdata = {
    classes: [
        {
            room: "Earth",
            teacher: {
                name: "Tester",
                email: "shitfart14@wackery.com",
                id: "boomer"
            },
            startTime: getTimeW(0,0,0),
            endTime: getTimeW(23,59,59)
        }
    ]
};

// import this file when you need test data