import { useEffect, useMemo, useState } from 'react'; 
import { Class, ClassIDS,Terms, Term, emptyCL  } from "../../types";
import Schedule from "./components/Schedule";
import LoadSpinner from '../../components/LoadSpinner';
import { defaultSchedule, schedules, SchedulesType, weekSchedule } from '../../config/schedules';
import { scheduleEvents, DateRange, scheduleEventsDateRange,  } from '../../config/events';
import { useSchedule, ScheduleStorage, setLunch } from '../../storage/schedule';
import * as settingsConfig from '../../config/settings';
import * as lunchesConfig from '../../config/lunches';
import { useStudentvue, StorageDataStudentvue } from '../../storage/studentvue';
import { isAfter, isBefore, isSameDay } from 'date-fns'
import { StudentVueReloader } from "../../components/StudentVueReloader"
import { useDispatch, useSelector } from 'react-redux';
import * as Sentry from '@sentry/react';
import { useSTV, StvDataStorage } from '../../storage/studentvueData';
import {useToggle, useInterval} from 'react-use'
import { cambridgeMergeDataWithSchedule, translateCambridgeClassesToCLList__TEMPORARYYYYY__ } from './cambridge';
import { RootState } from '../../storage/store';
import { today } from "../../today";
import { useNavigate } from '../../router/hooks';
import { Page } from '../../storage/page';
import { overidesMergeDataWithSchedule } from './handleOverides';

export type EventSchedule = {
    isEvent: boolean,
    hasError?: boolean
    schedule: SchedulesType
    info: {
        error?: string
        message: string
        date?: Date | DateRange
    }
}

type MergedSchedule = {
    schedule: Class[]
    event: EventSchedule
    sch: Terms
}

function SchedulePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sch = useSchedule();
    const stv = useStudentvue();
    const studentInfo = useSTV();
    const presentationMode = useSelector((state: RootState) => state.misc.presentationMode)
    const isSetupComplete = useSelector(
        (state: RootState) => state.misc.setupComplete
    );
    const [userLunch, setUserLunch] = useState(sch.lunch);
    useEffect(() => {
        dispatch(setLunch(userLunch))
    }, [userLunch, dispatch])
    useEffect(() => {
        setUserLunch(sch.lunch)
    }, [sch.lunch])

    const [currentDisplayDate, setCurrentDisplayDate] = useState<Date>(today());
    // probably a bad way to do ths
    const [t, tick] = useToggle(false)
    useInterval(()=> {
        if (presentationMode) {
            tick();
        }
    }, 1000)
    useEffect(() => {
        if (presentationMode) {
            if (!isSameDay(currentDisplayDate, today())) {
                setCurrentDisplayDate(today());
            }
        }
    }, [presentationMode, currentDisplayDate, t])

    const [currentDisplayDayEvent, lunchifiedSchedule] = useMemo(() => {
        if (sch.terms.length == 0) {
            return [undefined, undefined]
        }
        const newScheduleFromDoSchedule = doSchedule(sch, currentDisplayDate, stv, userLunch, setUserLunch, studentInfo);
        return [newScheduleFromDoSchedule.currentDisplayDayEvent, newScheduleFromDoSchedule.lunchifiedSchedule];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDisplayDate, sch, stv, userLunch]);

    useEffect(() => {
        if (!isSetupComplete) {
            navigate(Page.SETUP);
        }
    },[isSetupComplete, navigate])
    // if loading shows blank schedule for a bit, maybe add a loading screen?

    //const [showSettings, setShowSettings] = useState(false);
    //window.show = setShowSettings;

    if (!lunchifiedSchedule) {
        return <LoadSpinner />
    } else {
        // to do: convert the schedule from CL[] to Class[], by merging it with the data in the database/studentvue data
        return <><Schedule setup={() => {navigate(Page.SETUP)}} event={ currentDisplayDayEvent as EventSchedule } sch={ lunchifiedSchedule.schedule } displayDate={ currentDisplayDate } setDisplayDate={ setCurrentDisplayDate } /><StudentVueReloader /></>
    }
}

function doSchedule(sch: ScheduleStorage, currentDisplayDate: Date, stv: StorageDataStudentvue, userLunch: number, setUserLunch: (lunch: number) => void, studentInfo: StvDataStorage): { currentDisplayDayEvent: EventSchedule, lunchifiedSchedule: MergedSchedule } {

    // Check the day and use the schedule for that day, ie. if its tuesday or thurseday its an advisory day
    const currentDisplayDaySchedule: { schedule: SchedulesType, noOverride: boolean }  = getDisplayDaySchedule(currentDisplayDate /* make this the date thats being displayed */);

    // Override the schedule with the events scheduled for the current displayed day
    /* make this the date thats being displayed */
    let currentDisplayDayEvent: EventSchedule = getDisplayDayEvent(currentDisplayDaySchedule.schedule, currentDisplayDaySchedule.noOverride, currentDisplayDate);
    // console.log(currentDisplayDayEvent);

    const displayTerm = determineDisplayTerm(sch.terms, currentDisplayDate);
    if (displayTerm.isFake) {
        console.warn("No term found for the current date");
        if (!currentDisplayDayEvent.isEvent) {
            currentDisplayDayEvent = {
                isEvent: true,
                schedule: schedules.summer,
                info: {
                    message: "Its summer, or something is broken"
                }
            }
        }
    }

    // Check for Cambridge
    if (currentDisplayDayEvent.schedule.overides !== undefined) {
        const mergedOverideSchedule = overidesMergeDataWithSchedule(displayTerm.classes, currentDisplayDayEvent.schedule, studentInfo.info?.content.Grade || 'manual', currentDisplayDayEvent);

        let lunchifiedScheduleOveride: MergedSchedule = {
            schedule: [],
            event: currentDisplayDayEvent,
            sch: sch.terms,
        }

        if (mergedOverideSchedule === null) {
            console.log('overide schedule is null');
            const mergedSchedule: MergedSchedule = mergeDataWithSchedule(sch.terms, displayTerm, currentDisplayDayEvent);
            lunchifiedScheduleOveride = lunchify(mergedSchedule, displayTerm, userLunch, stv, setUserLunch, studentInfo);
        } else {
            const cambridgeCurrentDisplayDayEvent = {
                ...currentDisplayDayEvent,
                schedule: {
                    ...currentDisplayDayEvent.schedule,
                    classes: mergedOverideSchedule.newClasses
                },
            }

            lunchifiedScheduleOveride = {
                schedule: mergedOverideSchedule.scheduleForDisplay,
                event: cambridgeCurrentDisplayDayEvent,
                sch: sch.terms,
            }

            if (mergedOverideSchedule.overideForGrade.ignoreLunchConfig !== true) {
                lunchifiedScheduleOveride = lunchify(lunchifiedScheduleOveride, displayTerm, userLunch, stv, setUserLunch, studentInfo);
            }
        }

        return { currentDisplayDayEvent: lunchifiedScheduleOveride.event, lunchifiedSchedule: lunchifiedScheduleOveride };
   
    } else if (displayTerm.classes.filter(p => settingsConfig.cambridgePeriods.includes(p.period)).length > 0) {
        const mergedCambridgeSchedule = cambridgeMergeDataWithSchedule(displayTerm.classes, currentDisplayDayEvent.schedule, studentInfo.info?.content.Grade || "0");
        let lunchifiedScheduleCambridge: MergedSchedule = {
            schedule: [],
            event: currentDisplayDayEvent,
            sch: sch.terms,
        }
        
        if (mergedCambridgeSchedule === null) {
            const mergedSchedule: MergedSchedule = mergeDataWithSchedule(sch.terms, displayTerm, currentDisplayDayEvent);
            lunchifiedScheduleCambridge = lunchify(mergedSchedule, displayTerm, userLunch, stv, setUserLunch, studentInfo);
        } else {
            const cambridgeCurrentDisplayDayEvent = {
                ...currentDisplayDayEvent,
                schedule: {
                    ...currentDisplayDayEvent.schedule,
                    classes: mergedCambridgeSchedule.newClasses
                },
            }

            lunchifiedScheduleCambridge = {
                schedule: mergedCambridgeSchedule.scheduleForDisplay,
                event: cambridgeCurrentDisplayDayEvent,
                sch: sch.terms,
            }

            if (mergedCambridgeSchedule.overides.ignoreLunchConfig !== true) {
                lunchifiedScheduleCambridge = lunchify(lunchifiedScheduleCambridge, displayTerm, userLunch, stv, setUserLunch, studentInfo);
            }
        }

        const msg = '<br>Cambridge schedule support is in beta.<br>Class times are not correct, and the order of periods 11, 12, and 13 mqy not be correct.'
        lunchifiedScheduleCambridge = {
            ...lunchifiedScheduleCambridge,
            event: {
                ...lunchifiedScheduleCambridge.event,
                hasError: true,
                info: {
                    ...lunchifiedScheduleCambridge.event.info,
                    error: (lunchifiedScheduleCambridge.event.info?.error || '').includes(msg) ? (lunchifiedScheduleCambridge.event.info.error || '') : (lunchifiedScheduleCambridge.event.info.error || '') + msg,
                }
            }
        }

        return { currentDisplayDayEvent: lunchifiedScheduleCambridge.event, lunchifiedSchedule: lunchifiedScheduleCambridge };
    }

    // Merge the schedule with the data and the days schedule (which would be from the days schedule or an override schedule from the events thing)
    const mergedSchedule: MergedSchedule = mergeDataWithSchedule(sch.terms, displayTerm, currentDisplayDayEvent);

    // Do lunch related frickery to the schedule
    const lunchifiedSchedule: MergedSchedule = lunchify(mergedSchedule, displayTerm, userLunch, stv, setUserLunch, studentInfo);

    return { currentDisplayDayEvent, lunchifiedSchedule };
}

function lunchify(mergedSchedule: MergedSchedule, displayTerm: Term, lunch: number, stv: StorageDataStudentvue, setUserLunch: (lunch: number) => void, studentInfo: StvDataStorage): MergedSchedule {
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

    if (displayTerm.classes.filter(c => c.period === lunchValue.basedOnPeriod).length === 0) {
        const temp_Message = '<br />You dont have a period ' + lunchValue.basedOnPeriod + ', so lunch can not be displayed.'

        const errMsg = `User does not have a period "${lunchValue.basedOnPeriod}", so lunch can not be displayed.`;
        Sentry.addBreadcrumb({category: "extra", message: JSON.stringify(displayTerm.classes), level: "info",});
        Sentry.captureException(new Error(errMsg))
        console.log(errMsg);

        mergedSchedule.event.info.message = mergedSchedule.event.info.message.includes(temp_Message) ? mergedSchedule.event.info.message : mergedSchedule.event.info.message + temp_Message;
        return mergedSchedule;
    }

    let userLunch: number = lunch;
    if (stv.isLoggedIn && displayTerm.classes.length > 0) {
        const temp_basedOnPeriodLunch = lunchesConfig.lunches[displayTerm.termIndex].filter((lunches) => {
            return lunches.basedOnPeriod === lunchValue.basedOnPeriod && (lunchValue.basedOnPeriodID !== undefined ? lunches.basedOnPeriodID === lunchValue.basedOnPeriodID : true);
        });

        if (temp_basedOnPeriodLunch.length > 0) {
            const temp_possibleLunches = temp_basedOnPeriodLunch[0].lunches.filter((lnc) => {
                return lnc.teachers.map(t => t.id).includes(displayTerm.classes.filter(cl => { return cl.period === lunchValue.basedOnPeriod && (lunchValue.basedOnPeriodID !== undefined ? cl.classID === lunchValue.basedOnPeriodID : true) })[0].teacher.id);
            });

            if (temp_possibleLunches.length > 0) {
                if (temp_possibleLunches.length > 1) {
                    const errMsg = `Teacher "${displayTerm.classes.filter(cl => { return cl.period === lunchValue.basedOnPeriod && (lunchValue.basedOnPeriodID !== undefined ? cl.classID === lunchValue.basedOnPeriodID : true) })[0].teacher.name}" is listed for multiple lunches: ${Object.values(temp_possibleLunches.map(p => p.lunch)).join(', ')}`
                    Sentry.captureException(new Error(errMsg))
                    console.log(errMsg);
                }

                userLunch = temp_possibleLunches[0].lunch;
                if (userLunch !== lunch) {
                    setUserLunch(userLunch);
                }
            } else {
                const errMsgTeacher = displayTerm.classes.filter(cl => { return cl.period === lunchValue.basedOnPeriod && (lunchValue.basedOnPeriodID !== undefined ? cl.classID === lunchValue.basedOnPeriodID : true) })[0].teacher;
                if (errMsgTeacher.id === '') {
                    console.log('StudentVue login mustve failed for some reason...')
                }
                const errMsg = `Teacher is missing from lunches config. \nName: ${errMsgTeacher.name}, ID: ${errMsgTeacher.id}, Email: ${errMsgTeacher.email}. Users school: ${studentInfo.info?.content.CurrentSchool}`;
                Sentry.captureException(new Error(errMsg));
                console.log(errMsg);
            }
        }
    } else if (mergedSchedule.event.isEvent || settingsConfig.normalLunchBasedOnPeriod !== lunchValue.basedOnPeriod) {
        // NOTE: THIS IS NOT TESTED, PLEASE TEST
        const temp_Message = '<br />Lunch may not be correct'
        mergedSchedule.event.info.message = mergedSchedule.event.info.message.includes(temp_Message) ? mergedSchedule.event.info.message : mergedSchedule.event.info.message + temp_Message;
    }

    const lunchSchedule = lunchValue.lunches[userLunch];

    const indexOfLunchPeriod = mergedSchedule.event.schedule.classes.findIndex(period => period.period === lunchValue.basedOnPeriod && (lunchValue.basedOnPeriodID !== undefined ? period.classID === lunchValue.basedOnPeriodID : true));

    const lunchPeriod = mergedSchedule.schedule[indexOfLunchPeriod];
    const replacePeriodClassEntries = lunchSchedule.order.map((p) => {
        return {
            classID: p.classID,
            startTime: p.startTime,
            endTime: p.endTime,
            period: lunchValue.basedOnPeriod,
            name: p.classID === ClassIDS.Lunch ? "Lunch "+ userLunch : lunchPeriod.name,
            room: p.classID === ClassIDS.Lunch ? '' : lunchPeriod.room,
            teacher: p.classID === ClassIDS.Lunch ? {...lunchPeriod.teacher, name: ''} : lunchPeriod.teacher,
        }
    })
    
    
    // Because the way JS works, this modifies the value of mergedSchedule.schedule.
    mergedSchedule.schedule.splice(indexOfLunchPeriod, 1, ...replacePeriodClassEntries);

    return mergedSchedule;
}

/**
 * Day of the week schedule 
 * 
 * ie. if its tuesday or thurseday its an advisory day or if its a weekend
*/
function getDisplayDaySchedule(date: Date): { schedule: SchedulesType, noOverride: boolean } {
    
    const weekDaySchedule = weekSchedule.filter(s => s.day === date.getDay());
    
    if (weekDaySchedule.length === 0) {
        console.log(`For some odd reason the day of the week '${date.getDay()}' is not defined in weekSchedule.\nThis is probably because some dumbass forgot to add it to the weekSchedule array in 'src/config/schedules.ts'.`);
        return { schedule: defaultSchedule, noOverride: false };
    }
    return { schedule: weekDaySchedule[0].schedule, noOverride: weekDaySchedule[0]?.noOverride || false };
}

function getDisplayDayEvent(schedule: SchedulesType, noOverride: boolean, date: Date): EventSchedule {
    // ie. late start, early dismissal, etc.
    // this will return either the schedule passed in or it will return the event

    const displayDateEvents = scheduleEvents.filter(event => {
        let eventDate = event.info.date;
        if ((eventDate as DateRange).start !== undefined) {
            eventDate = scheduleEventsDateRange(event.info.date as DateRange, date) as Date;
        }

        // to keep vscode from complaining
        eventDate = eventDate as Date;

        return (isSameDay(eventDate, date))
    });

    // TO DO: make it so if there are more than one event on the same day, combine them into one event of choose one over the other
    // Its probably best to send an error to sentry if there are more than one event on the same day
    // or we could implement something to tell it we intentionally ment to overlap them and in that case also tell it what to do
    // but at that point just write the events properly????

    let event = {
        isEvent: false,
        schedule: schedule,
        info: {
            message: ""
        }
    }

    if (displayDateEvents.length > 1) {
        // console.log("Why are there multiple evnts??? " + JSON.stringify(displayDateEvents)) // We should send this "error" to sentry

        const messages = displayDateEvents.map(event => event.info.message).join('<br />');
        const eventNotNull = displayDateEvents.filter(event => event.schedule !== null)[0];

        event = {
            isEvent: true,
            schedule: noOverride ? schedule : eventNotNull.schedule || schedule,
            info: {
                message: messages,
            }
        }
    } else if (displayDateEvents.length !== 0) return {
        isEvent: true,
        schedule: noOverride ? schedule : displayDateEvents[0]?.schedule || schedule,
        info: displayDateEvents[0].info
    }
    
    return event;
}

function determineDisplayTerm(sch: Terms, displayDate: Date, ): Term {
    /*
        If you go passed the first term or the last term, return a fake term
        This prevents the site from crashing lol
    */
    if (isBefore(displayDate, sch[0].startDate) || isAfter(displayDate, sch[sch.length-1].endDate)) {
        console.log('A fake term was created because there was no term for the current display date');
        return {
            isFake: true,
            termIndex: 0,
            startDate: displayDate,
            endDate: displayDate,
            classes: emptyCL(settingsConfig.numberOfPeriods, settingsConfig.hasAdvisory)
        }
    }

    let newTerm = sch.filter(term => {
        return (isAfter(displayDate, term.startDate) || isSameDay(displayDate, term.startDate)) && (isBefore(displayDate, term.endDate) || isSameDay(displayDate, term.endDate))
    });

    
    if (newTerm[0] === undefined) {
        console.log('newterm created (this shouldnt run)')
        newTerm = [{ termIndex: 0, classes: emptyCL(settingsConfig.numberOfPeriods, settingsConfig.hasAdvisory), startDate: today(), endDate: today() }];
    }
    // console.log(newTerm[0])
    return newTerm[0];
}

function mergeDataWithSchedule(sch: Terms, displayTerm: Term, displayDaySchedule: EventSchedule): MergedSchedule{
    const scheduleForDisplay: Class[] = [];

    // Alert the user of unknown classes from studentvue
    const periodsFromEmptyCL = emptyCL(settingsConfig.numberOfPeriods, settingsConfig.hasAdvisory).map(c => c.period);
    const unknownPeriods = displayTerm.classes.filter(p => !periodsFromEmptyCL.includes(p.period));

    // NOTE: TEMPORARY TEMORARY TEMPORARY TEMPORARY - Not the BEST PLACE for this at all, super temorary!!!!!! - TEMPORARY TEMORARY TEMPORARY TEMPORARY
    const cambridge_ified = translateCambridgeClassesToCLList__TEMPORARYYYYY__(displayTerm.classes);
    displayTerm.classes = cambridge_ified;

    if (unknownPeriods.length > 1) {
        // Ceck for cambridge .. let the user know we dont support it yet, but are working on implementing it
        const cambridgePeriods = unknownPeriods.filter(p => settingsConfig.cambridgePeriods.includes(p.period))
        let errMsg = 'StudentVue has returned classes that are unknown.'
        let addMessage = `<span style='color: red'>StudentVue has returned classes that are unknown. Schedule Peronalizer does not display them due to the complexity of such a problem.</span>`
        if (cambridgePeriods.length > 0) {
            // user has cambridge
            errMsg = 'It appears this student is a Cambridge student.'
            addMessage = `<span style='color: red'>Cambridge schedule support is in beta.<br>Class Times are not correct and periods 11, 12, 13 may not be in the correct order.</span>`
        }
        
        Sentry.addBreadcrumb({ category: 'displayTerm.classes', message: JSON.stringify(displayTerm.classes), level: 'info' })
        Sentry.addBreadcrumb({ category: 'unknown-classes', message: JSON.stringify(unknownPeriods), level: 'info' })
        Sentry.captureException(new Error(errMsg));
        displayDaySchedule.hasError = true;
        displayDaySchedule.info.error = (displayDaySchedule.info?.error || '').includes(addMessage) ? displayDaySchedule.info.error : (displayDaySchedule.info?.error || '') + '<br />' + addMessage;
    }

    for (const period of displayDaySchedule.schedule.classes) {

        const periodNeeded = displayTerm.classes.filter(p => (p.classID == period.classID) && (p.period == period.period));

        if (periodNeeded.length > 1) {
            const addMessage = `<span style='color: red'>Period '${period.period}' has multiple classes and is highlighted red. (This should not happen, and is likely an issue with your schedule in StudentVue)</span>`
            displayDaySchedule.hasError = true;
            displayDaySchedule.info.error = (displayDaySchedule.info?.error || '').includes(addMessage) ? displayDaySchedule.info.error : displayDaySchedule.info.error + '<br />' + addMessage;
        }

        if (periodNeeded.length === 0) {
            scheduleForDisplay.push({
                classID: period.classID,
                period: period.period,
                name: "",
                room: "",
                teacher: {
                    name: "",
                    email: "",
                    id: ""
                },
                startTime: period.startTime,
                endTime: period.endTime
            })
            continue;
        }

        for (const pd of periodNeeded) {
            const h: Class = {
                classID: period.classID,
                period: period.period,
                name: pd?.name || "",
                room: pd?.room || "",
                teacher: {
                    name: pd?.teacher.name || "",
                    email: pd?.teacher.email || "",
                    id: pd?.teacher.id || ""
                },
                startTime: period.startTime,
                endTime: period.endTime
            }
            scheduleForDisplay.push(h)
        }
    }

    return {
        schedule: scheduleForDisplay,
        event: displayDaySchedule,
        sch: sch
    }
}

export default SchedulePage
