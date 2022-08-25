import { useState, useEffect } from 'react';
import { Time, getTimeW, timeToDate } from '../../../types';
import { intervalToDuration, Duration,formatDuration } from 'date-fns';

export function Timer(props: { time: Time, basedDate?: Date }) {
    const [timer, setTimer] = useState<Duration>(getTimeW(0,0,0))
    useEffect(() => {
        function upTime() {
            const dur = intervalToDuration({
                start: new Date(),
                end: timeToDate(props.time, props.basedDate)
            })
            setTimer(dur)
       }
        const t = setInterval(() => {
            upTime()
        }, 1000)
        upTime()
        return () => {
            clearInterval(t)
        }
    }, [props.basedDate])
    return (<span> {formatDuration(timer)} </span>)
}