import { CL, Class, ClassIDS, getTimeW, schObject } from "../../types";
import Schedule from "./components/Schedule";
import { schedules, Schedules, SchedulesType } from '../../schedules';

type SchedulePageProps = {
    sch: CL[]
}

// Probably move these to types.ts and stucture it better
type EventSchedule = {
    isEvent: boolean,
    schedule: SchedulesType
    info: {
        message: string
    }
}

type MergedSchedule = {
    schedule: Class[]
    event: EventSchedule
    sch: CL[]
}

// END OF PROBABLY MOVE


function SchedulePage(props: SchedulePageProps) {

    // Check the day and use the schedule for that day, ie. if its tuesday or thurseday its an advisory day
    const currentDisplayDaySchedule: SchedulesType = getDisplayDaySchedule(new Date());

    // Override the schedule with the events scheduled for the current displayed day
    const currentDisplayDayEvent: EventSchedule = getDisplayDayEvent(currentDisplayDaySchedule);

    // Merge the schedule with the data and the days schedule (which would be from the days schedule or an override schedule from the events thing)
    const mergedSchedule: MergedSchedule = mergeDataWithSchedule(props.sch, currentDisplayDayEvent);

    // Do lunch related frickery to the schedule
    const lunchifiedSchedule: MergedSchedule = lunchify(mergedSchedule);

    // add event property
    return <Schedule sch={ lunchifiedSchedule.schedule }/> // todo: convert the schedule from CL[] to Class[], by merging it with the data in the database/studentvue data
}

function lunchify(mergedSchedule: MergedSchedule): MergedSchedule {
    // check if lunch is a thing for that day, if not return mergedSchedule
    
    const lunchValue = mergedSchedule.event.schedule.lunch;
    const lunch = 1 // mergedSchedule.sch.lunch /* Once we add lunched to the sch data thing, i need to convert it to an object and add a lunch property
    const lunchSchedule = lunchValue.lunches[lunch];

    const indexOfLunchPeriod = mergedSchedule.event.schedule.classes.findIndex(period => period.period === lunchValue.basedOnPeriod);

    const lunchPeriod = mergedSchedule.schedule[indexOfLunchPeriod];
    const replacePeriodClassEntries = lunchSchedule.order.map((p, i) => {
        return {
            ...p,
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

function getDisplayDaySchedule(date: Date): SchedulesType {
    // ie. if its tuesday or thurseday its an advisory day
    return schedules.normal; // For now, once we add the time stuff we can make this actually do something
}

function getDisplayDayEvent(schedule: SchedulesType, date?: number): EventSchedule { // for now. we need to create a type for this
    // ie. late start, early dismissal, etc.
    // this will return either the schedule passed in or it will return the event
    // for now it is just passthrough
    const event = {
        isEvent: false,
        schedule: schedule,
        info: {
            message: "No event scheduled"
        }
    }
    return event; // For now, once we add the time stuff we can make this actually do something
}


// if no schedule is passed, use the default (normal). TRY NOT TO RELY ON THIS AND MAYBE REQUIRE IT TO BE PASSED WITH NO DEFAULT FALLBACK
function mergeDataWithSchedule(sch: CL[], displayDaySchedule: EventSchedule): MergedSchedule{
    const scheduleForDisplay: Class[] = [];

    for (const period of displayDaySchedule.schedule.classes) {
        const periodNeeded = sch.filter(p => (p.classID === period.classID) && (p.period === period.period));
        const h: Class = {
            classID: period.classID,
            period: period.period,
            name: periodNeeded[0]?.name || "",
            room: periodNeeded[0]?.room || "",
            teacher: {
                name: periodNeeded[0]?.teacher.name || "",
                email: /* periodNeeded[0]?.teacher.email || "" */ "example@gmail.com",
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
    /*
    return sch.map((cl, i) => {
        return {
            period: (i == 0 ? 8 : i-1).toString(), // TODO: BAD BAD BAD BAD
            name: cl.name,
            teacher: {
                name: cl.teacher.name,
                email: "",
                id: cl.teacher.id
            },
            room: cl.room,
            startTime: getTimeW(7,0,0),
            endTime: getTimeW(14,0,0)
        }
    })
    */
}
export default SchedulePage