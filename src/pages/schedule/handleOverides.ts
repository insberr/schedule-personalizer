import { ReplaceType, SchedulesType, SCHCL, OverideForName } from '../../config/schedules';
import * as config from '../../config/settings';
import { CL, Class, ClassIDS } from '../../types';
import { EventSchedule } from './index';

// Should only return null if there is no overide for the display day schedule or user grade
export function overidesMergeDataWithSchedule(
    displayTermClasses: CL[],
    displayDaySchedule: SchedulesType,
    userGrade: string,
    displayDayEvent: EventSchedule
): null | { newClasses: SCHCL[]; scheduleForDisplay: Class[]; overideForGrade: OverideForName } {
    // log to sentry user grade and schedule

    const scheduleForDisplay: Class[] = [];

    const gradeAsNumber = userGrade === 'manual' ? userGrade : parseInt(userGrade);

    const newClasses = [...displayDaySchedule.classes];

    // No overides on the schedule
    if (displayDaySchedule?.overides === undefined) return null;
    if (displayDaySchedule?.overides.length === 0) return null;

    // PROBably need a condition to detect which overide name to use
    const overidesForCondition = displayDaySchedule.overides.filter((o) => o.condition(displayDayEvent, config, displayTermClasses));
    if (overidesForCondition.length > 1) {
        console.log('Why are there multiple overides for the same condition?');
        // probably should error
    }

    // Check if there are any overides that might apply to this user
    if (overidesForCondition === undefined) return null; // No matching overides for this user
    if (overidesForCondition.length === 0) return null; // No matching overides for this user
    if (overidesForCondition[0].overides.length === 0) return null; // No overides for condition specified
    // Check if there are any overides for the users grade level
    const overideForGrade = overidesForCondition[0].overides.filter((o) => o.forGrade === gradeAsNumber)[0];
    if (overideForGrade === undefined) return null; // No overide for this grade, use default schedule

    // If no overides are given. That should mean theres some other config values that are used after the function
    if (overideForGrade.overides !== undefined) {
        //return { newClasses, scheduleForDisplay, overideForGrade }; // uh

        // apply overides
        /// i left off here how tf is overides not a value oh well i figure it out later grrrrrr
        for (const overide of overideForGrade.overides.replace) {
            const index = newClasses.findIndex(
                (c) =>
                    c.classID === overide.base.classID &&
                    c.period === overide.base.period &&
                    (c.customID && overide.base.customID ? c.customID === overide.base.customID : true)
            );
            if (index === -1) continue;

            switch (overide.type) {
                case ReplaceType.Remove: {
                    newClasses.splice(index, 1);
                    break;
                }
                case ReplaceType.Replace: {
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
                    console.log(`How did this happen? Missing '${overidesForCondition[0].name}' overide type '${overide.type}'`);
                    break;
                }
            }
        }
    }

    for (const period of newClasses) {
        if (period.classID === ClassIDS.Lunch) {
            const h: Class = {
                classID: period.classID,
                customID: period.customID,
                period: period.period,
                name: 'Lunch ' + overideForGrade?.forceLunch,
                room: 'Cafeteria',
                teacher: {
                    name: '',
                    email: '',
                    id: '',
                },
                startTime: period.startTime,
                endTime: period.endTime,
            };

            scheduleForDisplay.push(h);
            continue;
        }

        const periodNeeded = displayTermClasses.filter((p) => p.classID == period.classID && p.period == period.period);

        if (periodNeeded.length === 0) {
            const h: Class = {
                classID: period.classID,
                customID: period.customID,
                period: period.period,
                name: period.classID === ClassIDS.Custom && period.name !== undefined ? period.name : '',
                room: '',
                teacher: {
                    name: '',
                    email: '',
                    id: '',
                },
                startTime: period.startTime,
                endTime: period.endTime,
            };

            scheduleForDisplay.push(h);
            continue;
        }

        for (const pd of periodNeeded) {
            const h: Class = {
                classID: period.classID,
                customID: period.customID,
                period: period.period,
                name: pd?.name || '',
                room: pd?.room || '',
                teacher: {
                    name: pd?.teacher.name || '',
                    email: pd?.teacher.email || '',
                    id: pd?.teacher.id || '',
                },
                startTime: period.startTime,
                endTime: period.endTime,
            };

            scheduleForDisplay.push(h);
        }
    }
    console.log(scheduleForDisplay);

    return { newClasses, scheduleForDisplay, overideForGrade };
}
