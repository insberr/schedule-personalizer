import { useMemo, useState } from 'react';
import { Class, Term } from '../../types';
import ScheduleDisplay from './ScheduleDisplay';
import { displaySchedule, scheduleTerms } from '../../storage/schedule';
import { ScheduleEvent } from '../../config/events';
import { schedules } from '../../config/schedules';

export default function Schedule2() {
    const [DisplayDate, SetDisplaydate] = useState(new Date());

    const SPClasses = scheduleTerms.value;
    const EventMessages_TEMP = useMemo(() => {
        return DisplayDate.getDay() === 6 || DisplayDate.getDay() === 0 ? ['Its The Weekend'] : [];
    }, [DisplayDate]);
    return (
        <>
            <ScheduleDisplay
                DisplayDate={DisplayDate}
                SetDisplayDate={SetDisplaydate}
                DisplayEventMessages={EventMessages_TEMP}
                SPClassesForDisplay={TEMP_CreateDisplaySchedule(SPClasses[2], {
                    schedule: DisplayDate.getDay() === 6 || DisplayDate.getDay() === 0 ? schedules.weekend : schedules.advisory, // temporary lol
                    info: { date: new Date(), message: 'Test' },
                })}
            />
        </>
    );
}

function TEMP_CreateDisplaySchedule(displayTerm: Term, displayDaySchedule: ScheduleEvent): Class[] {
    const scheduleForDisplay: Class[] = [];
    if (displayDaySchedule.schedule === null) return scheduleForDisplay; // TEMP FOR SURE FOR SURE
    for (const period of displayDaySchedule.schedule.classes) {
        const periodNeeded = displayTerm.classes.filter((p) => p.classID == period.classID && p.period == period.period);

        for (const pd of periodNeeded) {
            const h: Class = {
                classID: period.classID,
                period: period.period,
                studentVuePeriod: pd?.studentVuePeriod || null,
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
    return scheduleForDisplay;
}

