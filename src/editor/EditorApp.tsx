import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Center from "../components/Center";
import { DateEditor } from "./DateEditor";
import { ScheduleEditor } from "./ScheduleEditor";
import { ScheduleEvent } from "../config/events";
import { SchedulesType, schedules } from "../config/schedules";
import { Calendar } from "../components/Calendar/Calendar";
import stringifyObject from '../stringify-object';

export function EditorApp() {
    // const [events, setEvents] = useState<ScheduleEvents>(scheduleEvents)
    const [date, setDate] = useState(new Date());
    const [schedule, setSchedule] = useState<SchedulesType>(schedules.normal);
    // const [time, setTime] = useState<Date | string>(new Date())

    const [resultEvent, setResultEvent] = useState<ScheduleEvent>({});

    // somehow display the object as a string (not JSON.stringify because that makes it not copy pasteable into the events.ts file)
    useEffect(() => {
        // setResultEvent(stringifyEvent(date, schedule));
        
        setResultEvent({
            schedule: schedules.noSchool,
            info: {
                message: "",
                date: date,
            },
        });
        
    }, [date, schedule]);

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
            <h2> Output </h2>
            <pre style={{textAlign: "left"}} className="paper">{stringifyObject(resultEvent, {
                indent: '  ',
                singleQuotes: true,
                inlineCharacterLimit: 80,
                transform: (object, property, originalResult) => {
                    if (property === 'schedule') {
                        return 'schedules.noSchool'
                    }
            
                    return originalResult;
                }
            })}</pre>
            <div className="paper">{/*JSON.stringify(events)*/}</div>
            <Button href="../">Back to schedule</Button>
            <Calendar />
        </Center>
    );
}

function stringifyEvent(date: Date, schedule: SchedulesType): string {
    // somehow detect if the schedule is one that is defined in config/schedules.ts or if its custom
    // if its defined in config, then just write the value (ie. schedule.normal)
    // if not then maybe make it so its one that can be defined in config ??? so we can save display space 

    // make date as new Date("MonthName Day, Year")
    return `{
        schedule: schedule.normal,
        info: {
            message: "test event editor",
            date: new Date("${date.toISOString()}"),
        }
}`;
}
