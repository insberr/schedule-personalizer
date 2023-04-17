import { format } from 'date-fns';
import { ClassIDS, getTimeW } from '../../types';
import { ScheduleOverride, SchedulesType } from '../schedules';

const examScheduleClasses = [
    {
        classID: ClassIDS.Zero,
        period: 0,
        startTime: getTimeW(6, 35),
        endTime: getTimeW(7, 30),
    },
    {
        classID: ClassIDS.Advisory,
        period: 0,
        startTime: getTimeW(7, 30),
        endTime: getTimeW(9, 35),
    },
    {
        classID: ClassIDS.Period,
        period: 1,
        startTime: getTimeW(9, 40),
        endTime: getTimeW(10, 15),
    },
    {
        classID: ClassIDS.Period,
        period: 2,
        startTime: getTimeW(10, 20),
        endTime: getTimeW(11, 0),
    },
    {
        classID: ClassIDS.Period,
        period: 3,
        startTime: getTimeW(11, 0),
        endTime: getTimeW(12, 40),
    },
    {
        classID: ClassIDS.Period,
        period: 4,
        startTime: getTimeW(12, 45),
        endTime: getTimeW(13, 25),
    },
    {
        classID: ClassIDS.Period,
        period: 5,
        startTime: getTimeW(13, 30),
        endTime: getTimeW(14, 5),
    },
    {
        classID: ClassIDS.Dismissal,
        period: 0,
        startTime: getTimeW(14, 5),
        endTime: getTimeW(14, 10),
    },
];

function userGrade9EventMessage(displayDate: Date): string | boolean {
    switch (format(displayDate, 'MMMM d, yyyy')) {
        case 'April 17, 2023': {
            return 'Spring Testing - Advisory';
        }
        case 'April 18, 2023': {
            return 'Spring Testing - Advisory';
        }
        case 'April 20, 2023': {
            return 'Spring Testing - Advisory';
        }
        case 'April 24, 2023': {
            return 'Spring Testing - STAR Reading';
        }
        case 'April 25, 2023': {
            return 'Spring Testing - STAR Math';
        }
        case 'April 27, 2023': {
            return 'Spring Testing - Advisory';
        }
        default: {
            return false;
        }
    }
}
function userGrade10EventMessage(displayDate: Date): string | boolean {
    switch (format(displayDate, 'MMMM d, yyyy')) {
        case 'April 17, 2023': {
            return 'Spring Testing - ELA CAT';
        }
        case 'April 18, 2023': {
            return 'Spring Testing - ELA CAT/PT';
        }
        case 'April 20, 2023': {
            return 'Spring Testing - ELA PT';
        }
        case 'April 24, 2023': {
            return 'Spring Testing - Math CAT';
        }
        case 'April 25, 2023': {
            return 'Spring Testing - Math PT';
        }
        case 'April 27, 2023': {
            return 'Spring Testing - Math PT';
        }
        default: {
            return false;
        }
    }
}
function userGrade11EventMessage(displayDate: Date): string | boolean {
    switch (format(displayDate, 'MMMM d, yyyy')) {
        case 'April 17, 2023': {
            return 'Spring Testing - WCAS Practice';
        }
        case 'April 18, 2023': {
            return 'Spring Testing - WCAS';
        }
        case 'April 20, 2023': {
            return 'Spring Testing - WCAS';
        }
        case 'April 24, 2023': {
            return 'Spring Testing - Math SBA Make-ups / Advisory';
        }
        case 'April 25, 2023': {
            return 'Spring Testing - Arrive Alive';
        }
        case 'April 27, 2023': {
            return 'Spring Testing - Math SBA Make-ups / Advisory';
        }
        default: {
            return false;
        }
    }
}
function userGrade12EventMessage(displayDate: Date): string | boolean {
    switch (format(displayDate, 'MMMM d, yyyy')) {
        case 'April 17, 2023': {
            return 'Spring Testing - Advisory';
        }
        case 'April 18, 2023': {
            return 'Spring Testing - Advisory';
        }
        case 'April 20, 2023': {
            return 'Spring Testing - Advisory';
        }
        case 'April 24, 2023': {
            return 'Spring Testing - Advisory And Counselor Presentation In Auditorium';
        }
        case 'April 25, 2023': {
            return 'Spring Testing - Arrive Alive';
        }
        case 'April 27, 2023': {
            return 'Spring Testing - Advisory';
        }
        default: {
            return false;
        }
    }
}
const examScheduleOverides: ScheduleOverride[] = [
    {
        name: 'Exams',
        condition: (event, _config, _termSchedule, displayDate, userGrade) => {
            if (event.info.date === undefined) {
                console.log('How is the event date undefined?');
                return false;
            }

            if (userGrade === '9') {
                const testingMessage = userGrade9EventMessage(displayDate);
                if (testingMessage === false || typeof testingMessage === 'boolean') {
                    return false;
                }
                const eventMessage = event.info.message;
                if (!eventMessage.includes(testingMessage)) {
                    if (eventMessage.length > 0) {
                        event.info.message += '<br>' + testingMessage;
                    } else {
                        event.info.message = testingMessage;
                    }
                }
                return true;
            }
            if (userGrade === '10') {
                const testingMessage = userGrade10EventMessage(displayDate);
                if (testingMessage === false || typeof testingMessage === 'boolean') {
                    return false;
                }
                const eventMessage = event.info.message;
                if (!eventMessage.includes(testingMessage)) {
                    if (eventMessage.length > 0) {
                        event.info.message += '<br>' + testingMessage;
                    } else {
                        event.info.message = testingMessage;
                    }
                }
                return true;
            }
            if (userGrade === '11') {
                const testingMessage = userGrade11EventMessage(displayDate);
                if (testingMessage === false || typeof testingMessage === 'boolean') {
                    return false;
                }
                const eventMessage = event.info.message;
                if (!eventMessage.includes(testingMessage)) {
                    if (eventMessage.length > 0) {
                        event.info.message += '<br>' + testingMessage;
                    } else {
                        event.info.message = testingMessage;
                    }
                }
                return true;
            }
            if (userGrade === '12') {
                const testingMessage = userGrade12EventMessage(displayDate);
                if (testingMessage === false || typeof testingMessage === 'boolean') {
                    return false;
                }
                const eventMessage = event.info.message;
                if (!eventMessage.includes(testingMessage)) {
                    if (eventMessage.length > 0) {
                        event.info.message += '<br>' + testingMessage;
                    } else {
                        event.info.message = testingMessage;
                    }
                }
                return true;
            }
            return false;
        },
        overides: [],
    },
];

const examScheduleLunch = {
    hasLunch: true,
    basedOnPeriod: 3,
    numberOfLunches: 3,
    lunches: {
        1: {
            order: [
                {
                    classID: ClassIDS.Lunch,
                    startTime: getTimeW(11, 0),
                    endTime: getTimeW(11, 30),
                },
                {
                    classID: ClassIDS.Period,
                    startTime: getTimeW(11, 35),
                    endTime: getTimeW(12, 40),
                },
            ],
        },
        2: {
            order: [
                {
                    classID: ClassIDS.Period,
                    startTime: getTimeW(11, 5),
                    endTime: getTimeW(11, 35),
                },
                {
                    classID: ClassIDS.Lunch,
                    startTime: getTimeW(11, 35),
                    endTime: getTimeW(12, 5),
                },
                {
                    classID: ClassIDS.Period,
                    startTime: getTimeW(12, 10),
                    endTime: getTimeW(12, 40),
                },
            ],
        },
        3: {
            order: [
                {
                    classID: ClassIDS.Period,
                    startTime: getTimeW(11, 0),
                    endTime: getTimeW(12, 5),
                },
                {
                    classID: ClassIDS.Lunch,
                    startTime: getTimeW(12, 10),
                    endTime: getTimeW(12, 40),
                },
            ],
        },
    },
};

export const examSchedule: SchedulesType = {
    name: 'Exam Schedule',
    classes: examScheduleClasses,
    overides: examScheduleOverides,
    lunch: examScheduleLunch,
};

