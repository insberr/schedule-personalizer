// implement
// I havent a clue how cambridge schedules wore

// For now

import { ReplaceType, SchedulesType, SCHCL, CambridgeOveride, CambridgeOverideGrade } from '../../config/schedules';
import * as config from '../../config/settings';
import { CL, Class, ClassIDS } from '../../types';

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

// Should only return null if there is no cambridge overide for the display day schedule
export function cambridgeMergeDataWithSchedule(displayTermClasses: CL[], displayDaySchedule: SchedulesType, userGrade: string): null | { newClasses: SCHCL[], scheduleForDisplay: Class[], overides: CambridgeOverideGrade } {
    // log to sentry user grade and schedule

    const scheduleForDisplay: Class[] = [];
    
    const cambridgeClasses = displayTermClasses.filter(c => config.cambridgePeriods.includes(c.period));

    const gradeAsNumber = parseInt(userGrade);

    if (cambridgeClasses.length === 0) {
        console.log('Cambridge classes length is 0')
        // TODO: ACTUALLY HANDLE THIS PROBLEM RATHER THAN GIVING AN ERROR
        throw Error('Cambridge classes length is 0'); // probably should also error
    }
    if (cambridgeClasses.length !== config.cambridgePeriods.length) {
        console.log('Cambridge classes length is not to config.cambridgePeriods.length')
        // TODO: ACTUALLY HANDLE THIS PROBLEM RATHER THAN GIVING AN ERROR
        throw Error('Cambridge classes length is not to config.cambridgePeriods.length') // probably should also error
    }

    const newClasses = [ ...displayDaySchedule.classes ]

    if (displayDaySchedule?.cambridge === undefined) {
        console.log('displayDaySchedule?.cambridge === undefined')
        return null; // probably should also error
    }
    const overides: CambridgeOverideGrade = displayDaySchedule.cambridge[gradeAsNumber];
    // check if overides is undefined and throw error to sentry
    if (overides === undefined) return null; // probably should also error

    // apply overides
    for (const overide of overides.overides.replace) {
        const index = newClasses.findIndex(c => c.classID === overide.base.classID && c.period === overide.base.period);
        switch (overide.type) {
            case ReplaceType.Switch: {
                newClasses.splice(index, 1, overide.with);
                break;
            }
            case ReplaceType.Before: {
                newClasses.splice(index, 0, overide.with);
                break;
            }
            case ReplaceType.After: {
                newClasses.splice(index + 1, 0, overide.with);
                break;
            }
            default: {
                // sentry error
                console.log('How did this happen? Missing Cambridge overide type \'' + overide.type + '\'');
                break;
            }
        }
    }

    console.log(newClasses);

    for (const period of newClasses) {
        if (period.classID === ClassIDS.Lunch) {
            scheduleForDisplay.push({
                classID: period.classID,
                period: period.period,
                name: 'Lunch ' + overides?.forceLunch,
                room: 'Cafeteria',
                teacher: {
                    name: '',
                    email: '',
                    id: '',
                },
                startTime: period.startTime,
                endTime: period.endTime,
            });
            continue;
        }
        
        const periodNeeded = displayTermClasses.filter(p => (p.classID == period.classID) && (p.period == period.period));

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

    console.log("cambridge scheduleify: ", scheduleForDisplay);

    return { newClasses, scheduleForDisplay, overides };
}