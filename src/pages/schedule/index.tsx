import { useEffect, useMemo, useState } from 'react'; 
import { CL, Class, ClassIDS,Terms, Term  } from "../../types";
import Schedule from "./components/Schedule";
import LoadSpinner from '../../components/LoadSpinner';
import { defaultSchedule, schedules, SchedulesType, weekSchedule } from '../../config/schedules';
import { scheduleEvents, DateRange, scheduleEventsDateRange,  } from '../../config/events';
import { useSchedule, ScheduleStorage } from '../../storage/schedule';
import * as settingsConfig from '../../config/settings';
import * as lunchesConfig from '../../config/lunches';
import { useStudentvue, StorageDataStudentvue } from '../../storage/studentvue';
import {isAfter, isBefore} from 'date-fns'
//import { StorageQuery, getV5Data, StorageDataLunch, StorageDataStudentvue, } from '../../storageManager';

// Probably move these to types.ts and stucture it better
export type EventSchedule = {
    isEvent: boolean,
    schedule: SchedulesType
    info: {
        message: string
    }
}

type MergedSchedule = {
    schedule: Class[]
    event: EventSchedule
    sch: Terms
}

// END OF PROBABLY MOVE


function SchedulePage(props: {setup: (b: boolean) => void}) {
    const sch = useSchedule();
    const stv = useStudentvue();

    const [currentDisplayDate, setCurrentDisplayDate] = useState<Date>(process.env.NODE_ENV === "development" ? new Date("September 6, 2022") : new Date());
    const [currentDisplayDayEvent, lunchifiedSchedule] = useMemo(() => {
        const newScheduleFromDoSchedule = doSchedule(sch, currentDisplayDate, stv);
        return [newScheduleFromDoSchedule.currentDisplayDayEvent, newScheduleFromDoSchedule.lunchifiedSchedule];
    }, [currentDisplayDate, sch, stv]);

    // if loading shows blank schedule for a bit, maybe add a loading screen?
    if (!lunchifiedSchedule) {
        return <LoadSpinner />
    } else {
        // todo: convert the schedule from CL[] to Class[], by merging it with the data in the database/studentvue data
        return <Schedule setup={props.setup} event={ currentDisplayDayEvent as EventSchedule } sch={ lunchifiedSchedule.schedule } displayDate={ currentDisplayDate } setDisplayDate={ setCurrentDisplayDate } />
    }
}

function doSchedule(sch: ScheduleStorage, currentDisplayDate: Date, stv: StorageDataStudentvue): { currentDisplayDayEvent: EventSchedule, lunchifiedSchedule: MergedSchedule } {

    // Check the day and use the schedule for that day, ie. if its tuesday or thurseday its an advisory day
    const currentDisplayDaySchedule: SchedulesType = getDisplayDaySchedule(currentDisplayDate /* make this the date thats being displayed */);

    // Override the schedule with the events scheduled for the current displayed day
    /* make this the date thats being displayed */
    let currentDisplayDayEvent: EventSchedule = getDisplayDayEvent(currentDisplayDaySchedule, currentDisplayDate);
    // console.log(currentDisplayDayEvent);

    const displayTerm = determineDisplayTerm(sch.terms, currentDisplayDate);
    if (displayTerm.isFake) {
        console.warn("No term found for the current date");
        currentDisplayDayEvent = {
            isEvent: true,
            schedule: schedules.summer,
            info: {
                message: "Its summer, or something is broken"
            }
        }
    }
    // Merge the schedule with the data and the days schedule (which would be from the days schedule or an override schedule from the events thing)
    const mergedSchedule: MergedSchedule = mergeDataWithSchedule(sch.terms, displayTerm, currentDisplayDayEvent);

    // Do lunch related frickery to the schedule
    const lunchifiedSchedule: MergedSchedule = lunchify(mergedSchedule, displayTerm, sch.lunch, stv);

    return { currentDisplayDayEvent, lunchifiedSchedule };
}

function lunchify(mergedSchedule: MergedSchedule, displayTerm: Term, lunch: number, stv: StorageDataStudentvue): MergedSchedule {
    // This will prevent an error if there are no lunches on the schedule
    // Check if lunch is a thing for that day, if not return mergedSchedule
    const lunchValue = mergedSchedule.event.schedule.lunch;
    if (lunchValue.hasLunch === false) return mergedSchedule;

    // This is only here to keep vscode from complaining
    if (lunchValue.lunches === undefined) return mergedSchedule;

    //const lunch = (getV5Data(StorageQuery.Lunch) as StorageDataLunch).lunch; // mergedSchedule.sch.lunch /* Once we add lunched to the sch data thing, i need to convert it to an object and add a lunch property
    
    // if logged into studentvue we can determine the lunch automatically
    // just realized that students who enter their data manually will have to figure out what lunch they have. maybe we could implement a "teacher" selector to automatically put teacher ids into the valuse???
    // for now, only auto detects lunch if logged into studentvue.
    let userLunch: number = lunch;
    if (stv.isLoggedIn &&  displayTerm.classes.length > 0) {
        const temp_basedOnPeriodLunch = lunchesConfig.lunches.filter((lunches) => {
            return lunches.basedOnPeriod === lunchValue.basedOnPeriod;
        });

        if (temp_basedOnPeriodLunch.length > 0) {
            const temp_possibleLunches = temp_basedOnPeriodLunch[0].lunches.filter((lnc) => {
                return lnc.teacherIDs.includes(displayTerm.classes.filter(cl => { return cl.period === lunchValue.basedOnPeriod })[0].teacher.id);
            });

            if (temp_possibleLunches.length > 0) {
                userLunch = temp_possibleLunches[0].lunch;
                // TODO: SAVE LUNCH TO LOCALSTORAGE
            } else {
                console.log('This should be an error because it means that the teacher id is missing from the lunches config')
            }
        }
    } else if (mergedSchedule.event.isEvent || settingsConfig.normalLunchBasedOnPeriod !== lunchValue.basedOnPeriod) {
        // NOTE: THIS IS NOT TESTED, PLEASE TEST
        mergedSchedule.event.info.message = mergedSchedule.event.info.message + '\n' + 'Lunch may not be correct';
    }

    console.log('lnc ' + userLunch);

    const lunchSchedule = lunchValue.lunches[lunch+1];

    const indexOfLunchPeriod = mergedSchedule.event.schedule.classes.findIndex(period => period.period === lunchValue.basedOnPeriod);

    const lunchPeriod = mergedSchedule.schedule[indexOfLunchPeriod];
    const replacePeriodClassEntries = lunchSchedule.order.map((p) => {
        return {
            classID: p.classID,
            startTime: p.startTime,
            endTime: p.endTime,
            period: lunchValue.basedOnPeriod,
            name: p.classID === ClassIDS.Lunch ? "Lunch" : lunchPeriod.name,
            room: lunchPeriod.room,
            teacher: lunchPeriod.teacher
        }
    })
    
    
    // Because the way JS works, this modifies the value of mergedSchedule.schedule.
    mergedSchedule.schedule.splice(indexOfLunchPeriod, 1, ...replacePeriodClassEntries);
    
    return mergedSchedule; // For now, once we add the time stuff we can make this actually do something
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDisplayDaySchedule(date: Date): SchedulesType {
    /* Day of the week schedule */
    const weekDaySchedule = weekSchedule.filter(s => s.day === date.getDay());
    // ie. if its tuesday or thurseday its an advisory day or if its a weekend
    if (weekDaySchedule.length === 0) {
        console.log(`For some odd reason the day of the week '${date.getDay()}' is not defined in weekSchedule.\nThis is probably because some dumbass forgot to add it to the weekSchedule array in 'src/config/schedules.ts'.`);
        return defaultSchedule;
    }
    return weekDaySchedule[0].schedule; // For now, once we add the time stuff we can make this actually do something
}

function getDisplayDayEvent(schedule: SchedulesType, date: Date): EventSchedule {
    // ie. late start, early dismissal, etc.
    // this will return either the schedule passed in or it will return the event

    const displayDateEvents = scheduleEvents.filter(event => {
        let eventDate = event.info.date;
        if ((eventDate as DateRange).start !== undefined) {
            eventDate = scheduleEventsDateRange(eventDate as DateRange, date) as Date;
        }

        // to keep vscode from complaining
        eventDate = eventDate as Date;

        return (eventDate.getDate() === date.getDate()) && (eventDate.getMonth() === date.getMonth()) && (eventDate.getFullYear() === date.getFullYear())
    });

    // TODO: make it so if there are more than one event on the same day, combine them into one event of choose one over the other
    // Its probably best to send an error to sentry if there are more than one event on the same day
    // or we could implement something to tell it we intentionally ment to overlap them and in that case also tell it what to do
    // but at that point just write the events properly????

    if (displayDateEvents.length > 1) console.log("Why are there multiple evnts??? " + JSON.stringify(displayDateEvents)) // We should send this "error" to sentry
    if (displayDateEvents.length !== 0) return {
        isEvent: true,
        schedule: displayDateEvents[0].schedule,
        info: displayDateEvents[0].info
    };

    const event = {
        isEvent: false,
        schedule: schedule,
        info: {
            message: "No event scheduled"
        }
    }
    return event;
}

function determineDisplayTerm(sch: Terms, displayDate: Date, ): Term {
    if (isAfter(displayDate, sch[sch.length-1].endDate) || isBefore(displayDate, sch[0].startDate)) {
        return {
            isFake: true,
            termIndex: 0,
            startDate: displayDate,
            endDate: displayDate,
            classes: [{ classID: ClassIDS.Advisory, period: 0, name: 'Advisory', room: "", teacher: {name: "", email:"", id:""} }].concat(Array(5).fill({
                classID: ClassIDS.Period,
                period: 1, 
                name: "Summer", 
                room: "Home", 
                teacher: { name: "you", email: "you@you.com", id: "you" }
            }).map((x: CL, i) => {
                return { ...x, period: i };
            }))
        }
    }

    let newTerm = sch.filter(term => {
        return (
            term.startDate.getTime() <= displayDate.getTime()
        ) && (
            term.endDate.getTime() >= displayDate.getTime()
        )
    });

    // If you go passed the first term or the last term, return a fake term
    if (newTerm[0] === undefined) {
        console.log('newterm created')
        newTerm = [{ termIndex: 0, classes: [ { classID: ClassIDS.Period, period: 1, name: "", room: "", teacher: { name: "", email: "", id: "" } }], startDate: new Date(), endDate: new Date() }];
    }
    console.log(newTerm[0])
    return newTerm[0];
}

function mergeDataWithSchedule(sch: Terms, displayTerm: Term, displayDaySchedule: EventSchedule): MergedSchedule{
    const scheduleForDisplay: Class[] = [];

    for (const period of displayDaySchedule.schedule.classes) {

        const periodNeeded = displayTerm.classes.filter(p => (p.classID == period.classID) && (p.period == period.period));
        const h: Class = {
            classID: period.classID,
            period: period.period,
            name: periodNeeded[0]?.name || "",
            room: periodNeeded[0]?.room || "",
            teacher: {
                name: periodNeeded[0]?.teacher.name || "",
                email: periodNeeded[0]?.teacher.email || "",
                id: periodNeeded[0]?.teacher.id || ""
            },
            startTime: period.startTime,
            endTime: period.endTime
        }
        scheduleForDisplay.push(h)
    }

    return {
        schedule: scheduleForDisplay,
        event: displayDaySchedule,
        sch: sch
    }
}
export default SchedulePage
