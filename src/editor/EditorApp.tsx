import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Center from "../components/Center";
import { DateEditor } from "./DateEditor";
import { ScheduleEditor } from "./ScheduleEditor";
import { scheduleEvents, ScheduleEvents, ScheduleEvent, DateRange } from "../config/events";
import { SchedulesType, schedules } from "../config/schedules";
import { Calendar } from "../components/Calendar/Calendar";
import stringifyObject from '../stringify-object';

export function EditorApp() {
    // const [events, setEvents] = useState<ScheduleEvents>(scheduleEvents)
    const [date, setDate] = useState(new Date());
    const [schedule, setSchedule] = useState<SchedulesType>(schedules.normal);
    const [message, setMessage] = useState<string>("");
    // const [time, setTime] = useState<Date | string>(new Date())

    const [resultEvent, setResultEvent] = useState<ScheduleEvent>({});
    const [newEvents, setNewEvents] = useState<ScheduleEvents>(scheduleEvents);

    // somehow display the object as a string (not JSON.stringify because that makes it not copy pasteable into the events.ts file)
    useEffect(() => {
        // setResultEvent(stringifyEvent(date, schedule));

        setResultEvent({
            schedule: schedule,
            info: {
                message: message,
                date: date,
            },
        });
        
    }, [date, schedule, message]);

    function createNewEvents() {
        if (resultEvent.schedule === undefined) return;


        let evenNewerEvents = [...newEvents, resultEvent];
        console.log(newEvents.filter(evt => {
            return (evt.info.message === resultEvent.info.message && (evt.info.date?.start || evt.info.date).getTime() === (resultEvent.info.date?.start || resultEvent.info.date).getTime())
        }).length)
        if (newEvents.filter(evt => {
            return (evt.info.message === resultEvent.info.message && (evt.info.date?.start || evt.info.date).getTime() === (resultEvent.info.date?.start || resultEvent.info.date).getTime())
        }).length > 0) {
            evenNewerEvents = [...newEvents];
        }



        evenNewerEvents.sort((e, pe) => {
            if (e.info === undefined) {
                return 1;
            }
            if (pe.info === undefined) {
                return 1;
            }
            // console.log(e)
            return (e.info.date?.start || e.info.date).getTime() - (pe.info.date?.start || pe.info.date).getTime();
        })
        // console.log("evenNewerEvents: ", evenNewerEvents)
        setNewEvents(evenNewerEvents);
    }

    return (
        <Center>
            <h1>Schedule Editor</h1>
            <div className="mb-2 mt-3">
                <DateEditor setDate={setDate} date={date} />
            </div>
            <div>
                <ScheduleEditor setSchedule={setSchedule} schedule={schedule} />
            </div>
            <br /> <br />
            <Button onClick={() => {
                    setDate(new Date("August 29, 2022"));
                }}>set new event date</Button>
            <Button onClick={() => {
                createNewEvents();
            }}>add new event</Button>
            <h2> Output Events </h2>
            <pre style={{textAlign: "left"}} className="paper">{stringifyObject(newEvents, {
                indent: '  ',
                singleQuotes: true,
                inlineCharacterLimit: 90,
                transform: (object, property, originalResult) => {
                    if (property === 'schedule') {
                        // console.log((object as ScheduleEvent)[property])
                        for (const [i, sc] of Object.entries(schedules)) {
                            if (object.schedule === sc) return `schedules.${i}`;
                        }
                        return 'schedules.noSchool';
                    }
            
                    return originalResult;
                }
            })}</pre>
            <h2> Output Event </h2>
            <pre style={{textAlign: "left"}} className="paper">{stringifyObject(resultEvent, {
                indent: '  ',
                singleQuotes: true,
                transform: (object, property, originalResult) => {
                    if (property === 'schedule') {
                        // console.log((object as ScheduleEvent)[property])
                        for (const [i, sc] of Object.entries(schedules)) {
                            if (object.schedule === sc) return `schedules.${i}`;
                        }
                        return 'schedules.noSchool';
                    }
            
                    return originalResult;
                }
            })}</pre>
            <Button href="../">Back to schedule</Button>
            <Calendar date={date} setDate={setDate} />
        </Center>
    );
}
