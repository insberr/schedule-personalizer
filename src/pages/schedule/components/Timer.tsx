import { useState } from 'react';
import { Time, getTimeW, timeToDate } from '../../../types';
import { intervalToDuration, Duration,formatDuration } from 'date-fns';
import { useHarmonicIntervalFn } from 'react-use';
import { today } from "../../../today";

export function Timer(props: { time: Time, basedDate?: Date, hidden?: boolean }) {
    const [timer, setTimer] = useState<Duration>(getTimeW(0,0,0))
    //const [stop, setStop] = useState<boolean>(false)

    useHarmonicIntervalFn(() => {
            const dur = intervalToDuration({
                start: today(),
                end: timeToDate(props.time, props.basedDate)
            })
            setTimer(dur)
    },props.hidden ? null : 250)

    /*useEffect(() => {
        if (props.hidden) {
            setTimeout(() => {
                setStop(true)
            }, 1000)
        } else {
            setStop(false)
        }
    }, [props.hidden])*/

    return (<span> {formatDuration(timer)} </span>)
}