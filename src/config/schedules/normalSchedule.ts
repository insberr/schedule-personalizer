import { format } from 'date-fns';
import { ClassIDS, getTimeW } from '../../types';
import { ScheduleOverride, SchedulesType } from '../schedules';

const normalScheduleClasses = [
    {
        classID: ClassIDS.Zero,
        period: 0,
        startTime: getTimeW(6, 45),
        endTime: getTimeW(7, 40),
    },
    {
        classID: ClassIDS.Advisory,
        period: 0,
        startTime: getTimeW(7, 45),
        endTime: getTimeW(8, 15),
    },
    {
        classID: ClassIDS.Period,
        period: 1,
        startTime: getTimeW(8, 20),
        endTime: getTimeW(9, 20),
    },
    {
        classID: ClassIDS.Period,
        period: 2,
        startTime: getTimeW(9, 25),
        endTime: getTimeW(10, 25),
    },
    {
        classID: ClassIDS.Period,
        period: 3,
        startTime: getTimeW(10, 30),
        endTime: getTimeW(12, 5),
    },
    {
        classID: ClassIDS.Period,
        period: 4,
        startTime: getTimeW(12, 10),
        endTime: getTimeW(13, 10),
    },
    {
        classID: ClassIDS.Period,
        period: 5,
        startTime: getTimeW(13, 15),
        endTime: getTimeW(14, 15),
    },
    {
        classID: ClassIDS.Dismissal,
        period: 0,
        startTime: getTimeW(14, 15),
        endTime: getTimeW(14, 20),
    },
];

const normalScheduleLunch = {
    hasLunch: true,
    basedOnPeriod: 3,
    numberOfLunches: 3,
    lunches: {
        1: {
            order: [
                {
                    classID: ClassIDS.Lunch,
                    startTime: getTimeW(10, 25),
                    endTime: getTimeW(10, 55),
                },
                {
                    classID: ClassIDS.Period,
                    startTime: getTimeW(11, 0),
                    endTime: getTimeW(12, 5),
                },
            ],
        },
        2: {
            order: [
                {
                    classID: ClassIDS.Period,
                    startTime: getTimeW(10, 30),
                    endTime: getTimeW(11, 0),
                },
                {
                    classID: ClassIDS.Lunch,
                    startTime: getTimeW(11, 0),
                    endTime: getTimeW(11, 30),
                },
                {
                    classID: ClassIDS.Period,
                    startTime: getTimeW(11, 35),
                    endTime: getTimeW(12, 5),
                },
            ],
        },
        3: {
            order: [
                {
                    classID: ClassIDS.Period,
                    startTime: getTimeW(10, 30),
                    endTime: getTimeW(11, 35),
                },
                {
                    classID: ClassIDS.Lunch,
                    startTime: getTimeW(11, 35),
                    endTime: getTimeW(12, 5),
                },
            ],
        },
    },
};

export const normalSchedule: SchedulesType = {
    name: 'Normal Schedule',
    classes: normalScheduleClasses,
    // overides: normalScheduleClasses,
    lunch: normalScheduleLunch,
};
