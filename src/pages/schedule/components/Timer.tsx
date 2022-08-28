import { useState, useEffect } from 'react';
import { Time, getTimeW, timeToDate } from '../../../types';
import { intervalToDuration, Duration,formatDuration } from 'date-fns';

export function Timer(props: { time: Time, basedDate?: Date, hidden?: boolean }) {
    const [timer, setTimer] = useState<Duration>(getTimeW(0,0,0))
    const [stop, setStop] = useState<boolean>(false)

    useEffect(() => {
        function upTime() {
            if (stop) return;
            const dur = intervalToDuration({
                start: new Date(),
                end: timeToDate(props.time, props.basedDate)
            })
            setTimer(dur)
       }
        const t = setInterval(() => {
            if (stop) return;
            upTime()
        }, 1000)
        upTime()
        return () => {
            clearInterval(t)
        }
    }, [props.basedDate, stop])

    useEffect(() => {
        if (props.hidden) {
            setTimeout(() => {
                setStop(true)
            }, 1000)
        } else {
            setStop(false)
        }
    }, [props.hidden])

    return (<span> {formatDuration(timer)} </span>)
}