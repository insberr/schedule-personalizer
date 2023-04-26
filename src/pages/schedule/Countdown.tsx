import { useInterval } from 'react-use';
import { Time, timeToDate } from '../../types';
import { useState } from 'preact/hooks';
import { format } from 'date-fns';

export default function Countdown(props: { destDate: Time }) {
    const [time, setTime] = useState('');
    useInterval(() => {
        const now = new Date();
        const dest = timeToDate(props.destDate);
        const diff = dest.getTime() - now.getTime();
        setTime(format(diff, 'hh:mm:ss'));
    }, 1000);
    return <div>{time}</div>;
}

