// implement
// I havent a clue how cambridge schedules wore

// For now

import { SchedulesType } from '../../config/schedules';
import * as config from '../../config/settings';
import { CL, Class } from '../../types';

export function translateCambridgeClassesToCLList__TEMPORARYYYYY__(classes: CL[]): CL[] {
    const newClasses = classes.map((cl) => {
        if (config.cambridgePeriods.includes(cl.period)) {
            return {
                ...cl,
                period: config.cambridgePeriods.indexOf(cl.period)
            }
        }
        return cl;
    });

    // console.log(newClasses);
    return newClasses;
}

export function cambridgeMergeDataWithSchedule(displayTermClasses: CL[], displayDaySchedule: SchedulesType, userGrade: string): void {
    const scheduleForDisplay: Class[] = [];
    
    const cambridgeClasses = displayTermClasses.filter(c => config.cambridgePeriods.includes(c.period));
    const gradeAsNumber = parseInt(userGrade);

    if (cambridgeClasses.length === 0) return; // probably should also error
    if (cambridgeClasses.length !== config.cambridgePeriods.length) return; // probably should also error

    for (const period of displayDaySchedule.classes) {
        const periodNeeded = displayTermClasses.filter(p => (p.classID == period.classID) && (p.period == period.period));
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

    // console.log("cambridge scheduleify: ", scheduleForDisplay);

    return;
}