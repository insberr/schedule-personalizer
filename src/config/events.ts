import { isAfter, isBefore, isSameDay } from 'date-fns';
import { SchedulesType, schedules } from './schedules';

// Bassically schedules.ts, but it's for events

export type DateRange = {
    start: Date;
    end: Date;
};

export type ScheduleEvent = {
    schedule: SchedulesType | null;
    info: {
        date: Date | DateRange;
        message: string;
    };
};

export type ScheduleEvents = ScheduleEvent[];

export function scheduleEventsDateRange(range: DateRange, currentDate: Date): Date {
    if (
        (isAfter(currentDate, range.start) || isSameDay(currentDate, range.start)) &&
        (isBefore(currentDate, range.end) || isSameDay(currentDate, range.end))
    ) {
        return currentDate;
    } else {
        return range.start;
    }
    // return new Date();
}

// schedule can be written out or you can make the schedule in schedules.ts and use the vulue here
export const scheduleEvents: ScheduleEvents = [
    /*
    // TODO: Better Event Idea:
    {
        date: { start: Date, endL Data } | Date,
        events: [
            {
                type?: messgae, schedule, holiday, break// make enum for this
                schedule: SchedulesType | null,
                message: string
            }
        ]
    }
    */
    {
        schedule: schedules.summer,
        info: {
            message: 'Its Summer Silly',
            date: {
                start: new Date('August 20, 2022'),
                end: new Date('September 5, 2022'),
            },
        },
    },

    /* Start of first week of school */
    {
        schedule: null,
        info: {
            message: 'First Day Of School',
            date: new Date('September 6, 2022'),
        },
    },
    {
        schedule: schedules.advisory,
        info: {
            message: 'Advisory Schedule | First Week Of School',
            date: {
                start: new Date('September 6, 2022'),
                end: new Date('September 13, 2022'),
            },
        },
    },

    /* Assemblies */
    {
        schedule: null,
        info: {
            message: 'Freshman Assembly During Advisory',
            date: new Date('September 7, 2022'),
        },
    },
    {
        schedule: null,
        info: {
            message: 'Sophomore Assembly During Advisory',
            date: new Date('September 8, 2022'),
        },
    },
    {
        schedule: null,
        info: {
            message: 'Junior Assembly During Advisory',
            date: new Date('September 9, 2022'),
        },
    },
    {
        schedule: null,
        info: {
            message: 'Senior Assembly During Advisory',
            date: new Date('September 12, 2022'),
        },
    },
    /* END of first week of school */

    {
        schedule: schedules.lateStart1Hour,
        info: {
            message: 'Late Start',
            date: new Date('September 14, 2022'),
        },
    },
    {
        schedule: schedules.assemblyPM,
        info: {
            message: 'Pep Assembly',
            date: new Date('September 16, 2022'),
        },
    },
    {
        schedule: schedules.noSchool,
        info: {
            message: 'No School For Students | PD Day #2',
            date: new Date('September 23, 2022'),
        },
    },
    {
        schedule: schedules.lateStart1Hour,
        info: {
            message: 'Late Start',
            date: new Date('September 28, 2022'),
        },
    },

    // No advisory because the next day.
    {
        schedule: schedules.normal,
        info: {
            message: 'Normal Schedule | The Next Day Has Advisory : )',
            date: new Date('October 4, 2022'),
        },
    },

    // College/Career Fair, gunna be fun to make that schedule work.
    {
        schedule: schedules.careerOneHourLateStart,
        info: {
            message: 'Late Start & College/Career Fair',
            date: new Date('October 5, 2022'),
        },
    },

    // Homecoming Spirit Week
    {
        schedule: null,
        info: {
            message: 'Homecoming Spirit Week<br>Sidekick Day; Bring A Stuffed Animal',
            date: new Date('October 10, 2022'),
        },
    },
    {
        schedule: null,
        info: {
            message: 'Homecoming Spirit Week<br>PJs vs Profesional; Wear Your PJs or Formal Attire',
            date: new Date('October 11, 2022'),
        },
    },

    {
        schedule: schedules.lateStart1Hour,
        info: {
            message: 'Late Start',
            date: new Date('October 12, 2022'),
        },
    },
    {
        schedule: null,
        info: {
            message: '',
            date: new Date('October 12, 2022'),
        },
    },
    {
        schedule: null,
        info: {
            message: 'Homecoming Spirit Week<br>Miming Around; Twin With Someone',
            date: new Date('October 12, 2022'),
        },
    },

    {
        schedule: null,
        info: {
            message: 'Homecoming Spirit Week<br>Cotten Candy Day; Wear Something Pink',
            date: new Date('October 13, 2022'),
        },
    },

    {
        schedule: schedules.assemblyPM,
        info: {
            message: 'Hoco Pep Assemby',
            date: new Date('October 14, 2022'),
        },
    },
    {
        schedule: null,
        info: {
            message: '',
            date: new Date('October 14, 2022'),
        },
    },
    {
        schedule: null,
        info: {
            message: 'Homecoming Spirit Week<br>Color Wars; Freshmen: Crimson, Sophomores: Grey, Juniors: Black, Seniors: White, Staff: Gold',
            date: new Date('October 14, 2022'),
        },
    },

    {
        schedule: schedules.earlyDissmissal,
        info: {
            message: 'Early Dismissal (K-12) | Grade Prep',
            date: new Date('October 20, 2022'),
        },
    },
    {
        schedule: schedules.noSchool,
        info: {
            message: 'No School For Students | PD Day #3',
            date: new Date('October 21, 2022'),
        },
    },

    {
        schedule: schedules.earlyDiss_A_1,
        info: {
            message: 'Early Dismissal (6-12) | Conference Week',
            date: new Date('October 26, 2022'),
        },
    },
    {
        schedule: schedules.earlyDiss_2_3,
        info: {
            message: 'Early Dismissal (6-12) | Conference Week',
            date: new Date('October 27, 2022'),
        },
    },
    {
        schedule: schedules.earlyDiss_4_5,
        info: {
            message: 'Early Dismissal (6-12) | Conference Week',
            date: new Date('October 28, 2022'),
        },
    },

    {
        schedule: schedules.lateStart1Hour,
        info: {
            message: 'Late Start',
            date: new Date('November 2, 2022'),
        },
    },
    {
        schedule: schedules.assemblyAM,
        info: {
            message: 'Veterans Day Assembly',
            date: new Date('November 8, 2022'),
        },
    },
    {
        schedule: schedules.noSchool,
        info: {
            message: 'No School | Veterans Day',
            date: new Date('November 11, 2022'),
        },
    },
    {
        schedule: schedules.lateStart1Hour,
        info: {
            message: 'Late Start',
            date: new Date('November 16, 2022'),
        },
    },
    {
        schedule: schedules.noSchool,
        info: {
            message: 'Thanksgiving Break',
            date: {
                start: new Date('November 23, 2022'),
                end: new Date('November 25, 2022'),
            },
        },
    },
    {
        schedule: schedules.lateStart1Hour,
        info: {
            message: 'Late Start',
            date: new Date('November 30, 2022'),
        },
    },

    // 2 Hour Delay Due To Snow ---- Now its no school
    {
        schedule: schedules.noSchool, // schedules.lateStart2Hour,
        info: {
            message: 'School Closed Due To Snow',
            date: new Date('December 1, 2022'),
        },
    },
    {
        schedule: schedules.lateStart2Hour,
        info: {
            message: '2 Hour Delay Due To Anticipated Icy Roads',
            date: new Date('December 2, 2022'),
        },
    },

    // Snow routes and 2 hour delay
    {
        schedule: schedules.lateStart2Hour,
        info: {
            message: '2 Hour Delat Due To Icy Roads | Busses On Snow Routes',
            date: new Date('December 5, 2022'),
        },
    },

    {
        schedule: schedules.earlyDissmissal,
        info: {
            message: 'Early Dismissal (6-12) | End of Trimester 1',
            date: new Date('December 6, 2022'),
        },
    },
    {
        schedule: schedules.noSchool,
        info: {
            message: 'No School For Students | PL Day #1',
            date: new Date('December 7, 2022'),
        },
    },

    // welcome to tri2 and lunch warning
    {
        schedule: null,
        info: {
            message:
                'Welcome Back, Its Trimester 2!\
<br>Dont forget the map can be found in the "More" dropdown in the top left!',
            date: new Date('December 8, 2022'),
        },
    },

    // spirit week
    {
        schedule: null,
        info: {
            message: 'Spirit Week<br>Walking In A Winter Wonderland; Wear A Flannel',
            date: new Date('December 12, 2022'),
        },
    },
    {
        schedule: null,
        info: {
            message: 'Spirit Week<br>Santa vs Reindeer; Wear A Santa Hat or Reindeer Antlers',
            date: new Date('December 13, 2022'),
        },
    },

    {
        schedule: schedules.lateStart1Hour,
        info: {
            message: 'Late Start',
            date: new Date('December 14, 2022'),
        },
    },
    {
        schedule: null,
        info: {
            message: 'Spirit Week<br>The Unwanted Gift; Wear An Ugly Sweater',
            date: new Date('December 14, 2022'),
        },
    },
    {
        schedule: null,
        info: {
            message: 'Spirit Week<br>Home Alone Attire; Wear Your PJs',
            date: new Date('December 15, 2022'),
        },
    },

    {
        schedule: schedules.assemblyPM_Lunch4,
        info: {
            message: 'Winter Wishes Assembly',
            date: new Date('December 16, 2022'),
        },
    },
    {
        schedule: null,
        info: {
            message: 'Spirit Week<br>Holiday Pictures; Match With A Friend or A Group of Friends',
            date: new Date('December 16, 2022'),
        },
    },

    /* Winter Break */
    {
        schedule: schedules.noSchool,
        info: {
            message: 'Winter Break',
            date: {
                start: new Date('December 19, 2022'),
                end: new Date('January 2, 2023'),
            },
        },
    },
    {
        schedule: null,
        info: {
            message: 'Merry Christmas!',
            date: new Date('December 25, 2022'),
        },
    },
    {
        schedule: null,
        info: {
            message: 'Happy New Year!',
            date: new Date('December 31, 2022'),
        },
    },
    {
        schedule: null,
        info: {
            message: 'Happy New Year!',
            date: new Date('January 1, 2023'),
        },
    },
    /* END of Winter Break */

    {
        schedule: schedules.lateStart1Hour,
        info: {
            message: 'Late Start',
            date: new Date('January 4, 2023'),
        },
    },
    {
        schedule: schedules.lateStart1Hour,
        info: {
            message: 'Late Start',
            date: new Date('January 11, 2023'),
        },
    },
    {
        schedule: schedules.noSchool,
        info: {
            message: 'No School | MLK Jr. Day',
            date: new Date('January 16, 2023'),
        },
    },
    {
        schedule: schedules.lateStart1Hour,
        info: {
            message: 'Late Start',
            date: new Date('January 18, 2023'),
        },
    },
    {
        schedule: schedules.noSchool,
        info: {
            message: 'No School | PL Day #2',
            date: new Date('January 25, 2023'),
        },
    },
    {
        schedule: schedules.lateStart1Hour,
        info: {
            message: 'Late Start',
            date: new Date('February 8, 2023'),
        },
    },
    {
        schedule: schedules.lateStart1Hour,
        info: {
            message: 'Late Start',
            date: new Date('February 15, 2023'),
        },
    },
    {
        schedule: schedules.noSchool,
        info: {
            message: 'Snow Makeup Day or No School',
            date: new Date('February 17, 2023'),
        },
    },
    {
        schedule: schedules.noSchool,
        info: {
            message: "No School | President's Day",
            date: new Date('February 20, 2023'),
        },
    },
    {
        schedule: schedules.noSchool,
        info: {
            message: 'No School | Waiver Day #2',
            date: new Date('February 21, 2023'),
        },
    },
    {
        schedule: schedules.lateStart1Hour,
        info: {
            message: 'Late Start',
            date: new Date('March 1, 2023'),
        },
    },
    {
        schedule: schedules.lateStart1Hour,
        info: {
            message: 'Late Start',
            date: new Date('March 8, 2023'),
        },
    },
    {
        schedule: schedules.earlyDissmissal,
        info: {
            message: 'Early Dismissal (K-12) | End of Trimester 2',
            date: new Date('March 23, 2023'),
        },
    },
    {
        schedule: schedules.earlyDissmissal,
        info: {
            message: 'Early Dismissal | Conference Week',
            date: {
                start: new Date('March 29, 2023'),
                end: new Date('March 31, 2023'),
            },
        },
    },
    {
        schedule: schedules.noSchool,
        info: {
            message: 'Spring Break',
            date: {
                start: new Date('April 3, 2023'),
                end: new Date('April 7, 2023'),
            },
        },
    },
    {
        schedule: schedules.lateStart1Hour,
        info: {
            message: 'Late Start',
            date: new Date('April 12, 2023'),
        },
    },
    {
        schedule: schedules.lateStart1Hour,
        info: {
            message: 'Late Start',
            date: new Date('April 19, 2023'),
        },
    },
    {
        schedule: schedules.lateStart1Hour,
        info: {
            message: 'Late Start',
            date: new Date('April 26, 2023'),
        },
    },
    {
        schedule: schedules.lateStart1Hour,
        info: {
            message: 'Late Start',
            date: new Date('May 3, 2023'),
        },
    },
    {
        schedule: schedules.lateStart1Hour,
        info: {
            message: 'Late Start',
            date: new Date('May 10, 2023'),
        },
    },
    {
        schedule: schedules.lateStart1Hour,
        info: {
            message: 'Late Start',
            date: new Date('May 17, 2023'),
        },
    },
    {
        schedule: schedules.noSchool,
        info: {
            message: 'Snow Makeup Day or No School',
            date: new Date('May 26, 2023'),
        },
    },
    {
        schedule: schedules.noSchool,
        info: {
            message: 'No School  Memorial Day',
            date: new Date('May 29, 2023'),
        },
    },
    {
        schedule: schedules.lateStart1Hour,
        info: {
            message: 'Late Start',
            date: new Date('June 7, 2023'),
        },
    },
    {
        schedule: schedules.noSchool,
        info: {
            message: 'No School | Juneteenth',
            date: new Date('June 19, 2023'),
        },
    },
    {
        schedule: schedules.earlyDissmissal,
        info: {
            message: 'Early Dismissal (K-12) | Grade Prep',
            date: new Date('June 20, 2023'),
        },
    },
    {
        schedule: schedules.earlyDissmissal,
        info: {
            message: 'Early Dismissal | Last Day of School!!!',
            date: new Date('June 23, 2023'),
        },
    },
];
