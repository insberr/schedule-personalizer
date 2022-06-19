import { Class, Stdata } from "./types";
import sch,{ Schedule, SchedulePeriod } from "./data/schedule_data/schedule";
import { isThursday, isTuesday, isWeekend } from "date-fns";
import { getCurrentTerm } from "./lib";
export type StudentScheduleEntry = SchedulePeriod & {
    teacher?: string,
    room?: string,
    l: undefined // there should be, NO LUNCHES.
}



export type StudentSchedule = StudentScheduleEntry[] // this should be the data we give to the rendererererererer.


const defaultSchedules: Record<string, Schedule> = {
    noadv: [],
    adv: [],
    we: []
}

export async function get_day_merged_schedule(sdata: Stdata, date?: Date): Promise<StudentSchedule> {
    if (!date) date = new Date()
    const event = await sch.getSchedule(date)
    const term = getCurrentTerm(sdata, date)
    const classData = sdata.terms[term].classes;
    if (!event) {
        if (isThursday(date) || isTuesday(date)) {
            return merge_schedule(classData, defaultSchedules.adv)
        } else if (isWeekend(date)) {
            return merge_schedule(classData, defaultSchedules.we)
        } else {
            return merge_schedule(classData, defaultSchedules.noadv)
        }
    } else {
        return merge_schedule(classData, event);
    }
}
// actually merge the schedules here
function merge_schedule(sc: Class[], sc2: Schedule): StudentSchedule {
    return []
}