import { format } from 'date-fns'
import { useState } from 'react'
import Calendar from 'react-calendar'
export function DateEditor() {
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState<Date | string>(new Date())
    return (<div>
        <h2> Date Editor </h2>
        <Calendar onChange={setDate}/>
        <br />
        <div>{format(date,"MM-dd-yyyy")}</div>
        <div> actual editor goes here </div>
        </div>)
}