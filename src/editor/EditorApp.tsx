import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import Center from "../components/Center"
import { DateEditor } from "./DateEditor"
import { ScheduleEditor } from "./ScheduleEditor"

import { ScheduleEvent } from '../config/events';
import { SchedulesType, schedules } from "../config/schedules"

export function EditorApp() {
    // const [events, setEvents] = useState<ScheduleEvents>(scheduleEvents)
    const [date, setDate] = useState(new Date())
    const [schedule, setSchedule] = useState<SchedulesType>(schedules.normal)
    // const [time, setTime] = useState<Date | string>(new Date())
    
    const [resultEvent, setResultEvent] = useState<ScheduleEvent>({
        schedule: schedules.noSchool,
        info: {
            message: '',
            date: new Date(),
        }
    });
    
    // somehow display the object as a string (not JSON.stringify because that makes it not copy pasteable into the events.ts file)
    useEffect(() => {
        setResultEvent({
            schedule: schedules.noSchool,
            info: {
                message: '',
                date: new Date(),
            }
        })
    }, [date, schedule])

    return (<Center><h1>Schedule Editor</h1>
                <div className="mb-2 mt-3"><DateEditor setDate={ setDate } date={ date } /></div>
                <div><ScheduleEditor setSchedule={ setSchedule } schedule={ schedule } /></div>
                <br /> <br />
                <h2> Output </h2>
                <div className="paper">{JSON.stringify(resultEvent, null, 2)}</div>
                <div className="paper">{/*JSON.stringify(events)*/}</div>
                <Button href="./">Back to schedule</Button>
                </Center>)
}
