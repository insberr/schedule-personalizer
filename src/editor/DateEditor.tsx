import { format } from 'date-fns'
import { useState, useEffect, useMemo } from 'react'
import Calendar from 'react-calendar'
import { SchedulesType, schedules } from '../config/schedules'
import { ScheduleEvents, ScheduleEvent } from '../config/events';

type Props = {
    setDate: (date: Date) => void
    date: Date
    setSchedule: (schedule: SchedulesType) => void
}

export function DateEditor(props: Props) {

    return (<div>
        <h2> Date Editor </h2>
        <Calendar onChange={props.setDate}/>
        <br />
        <div>{/*format(props.date,"MM-dd-yyyy")*/}</div>
        <div> actual editor goes here </div>
        </div>)
}