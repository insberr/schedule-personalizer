import { getTimeW, Stdata } from "./types";

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
                        id: "boomer",
                    },
                    startTime: getTimeW(0, 0, 0),
                    endTime: getTimeW(23, 59, 59),
                },
            ],
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
                    startTime: getTimeW(0, 0, 0),
                    endTime: getTimeW(23, 59, 59),
                },
            ],
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
                        id: "boomer",
                    },
                    startTime: getTimeW(6, 0, 0),
                    endTime: getTimeW(14, 0, 0),
                },
                {
                    period: "1",
                    name: "Science",
                    room: "Earth",
                    teacher: {
                        name: "Tester",
                        email: "shitfart14@wackery.com",
                        id: "boomer",
                    },
                    startTime: getTimeW(6, 0, 0),
                    endTime: getTimeW(14, 0, 0),
                },
            ],
        },
    ],
    customizations: {
        theme: {
            colors: {},
        },
        showInfoOnSchedule: true,
    },
};

export const exampleStudentVueScheduleData: any = {
    content: {
        ClassLists: [
            [
                {
                    Period: "1",
                    RoomName: "111",
                    Teacher: "Crabby",
                    TeacherEmail: "example@gmail.com",
                    TeacherStaffGU: "sdfsdfsdfsdfsdf",
                    CourseTitle: "ADV ALGB A",
                },
                {
                    Period: "2",
                    CourseTitle: "AP Comp Sci A B",
                    RoomName: "334",
                    Teacher: "Arthur Simon",
                    TeacherEmail: "SIMONA1@sfusd.edu",
                    SectionGU: "2549B62B-A20A-4A0C-A203-ECDE3EB0C8BE",
                    TeacherStaffGU: "37E8254B-CFC0-4DEC-926C-CDCAEB238444"
                },
                {
                    Period: "3",
                    CourseTitle: "MATH",
                    RoomName: "111",
                    Teacher: "Timmy Rod",
                    TeacherEmail: "ROD@gmail.com",
                    SectionGU: "2549B62B-A20A-4A0C-A203-ECDE3EB0C8BE",
                    TeacherStaffGU: "37E8254B-CFC0-4DEC-926C-CDCAEB238444"
                }
            ],
            [
                {
                    Period: "1",
                    RoomName: "111",
                    Teacher: "Crabby",
                    TeacherEmail: "example@gmail.com",
                    TeacherStaffGU: "sdfsdfsdfsdfsdf",
                    CourseTitle: "PHYSICS",
                },
                {
                    Period: "2",
                    CourseTitle: "BAND",
                    RoomName: "346",
                    Teacher: "Arth urimon",
                    TeacherEmail: "SIMONA1@sfusd.lol",
                    SectionGU: "2549B62B-A20A-4A0C-A203-ECDE3EB0C8BE",
                    TeacherStaffGU: "37E8254B-CFC0-4DEC-926C-CDCAEB238444"
                },
                {
                    Period: "3",
                    CourseTitle: "ELA",
                    RoomName: "222",
                    Teacher: "Timmy Rod",
                    TeacherEmail: "ROD@gmail.com",
                    SectionGU: "2549B62B-A20A-4A0C-A203-ECDE3EB0C8BE",
                    TeacherStaffGU: "37E8254B-CFC0-4DEC-926C-CDCAEB238444"
                }
            ],
            [
                {
                    Period: "1",
                    RoomName: "444",
                    Teacher: "Shammmmet",
                    TeacherEmail: "sdgfsdfexample@gmail.com",
                    TeacherStaffGU: "sdfsdfsdfsdfsdf",
                    CourseTitle: "GAMING",
                },
                {
                    Period: "2",
                    CourseTitle: "CODING",
                    RoomName: "999",
                    Teacher: "Camath uristomn",
                    TeacherEmail: "SIMONA3331@sfusd.lol",
                    SectionGU: "2549B62B-A20A-4A0C-A203-ECDE3EB0C8BE",
                    TeacherStaffGU: "37E8254B-CFC0-4DEC-926C-CDCAEB238444"
                },
                {
                    Period: "3",
                    CourseTitle: "PE",
                    RoomName: "333",
                    Teacher: "Tim myod",
                    TeacherEmail: "TOD@gmail.com",
                    SectionGU: "2549B62B-A20A-4A0C-A203-ECDE3EB0C8BE",
                    TeacherStaffGU: "37E8254B-CFC0-4DEC-926C-CDCAEB238444"
                }
            ],
        ],
    },
};

// import this file when you need test data
