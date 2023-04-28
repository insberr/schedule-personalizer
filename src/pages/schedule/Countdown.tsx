import { useInterval } from 'react-use';
import { Time, timeToDate } from '../../types';
import { useState } from 'preact/hooks';
import { formatDuration, intervalToDuration } from 'date-fns';

export default function Countdown(props: { destDate: Time }) {
    const [time, setTime] = useState('');
    useInterval(() => {
        const now = new Date();
        const dest = timeToDate(props.destDate);
        const duration = intervalToDuration({ start: now, end: dest });
        setTime(formatDuration(duration));
    }, 1000);
    return <div>{time}</div>;
}

