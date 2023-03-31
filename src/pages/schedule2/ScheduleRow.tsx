import { Button, Stack } from '@mui/material';
import { format, isAfter, parse } from 'date-fns';
import { useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';

export default function ScheduleRow(props: { alt: boolean; data: { name: string; teacher: string; room: string; start: string; end: string } }) {
    const [hide, setHide] = useState(true);
    const currentDate = new Date();
    const displayDate = new Date();
    const startTime = parse(props.data.start, 'HH:mm', displayDate);
    const endTime = parse(props.data.end, 'HH:mm', displayDate);
    const isNow = isAfter(currentDate, startTime) && isAfter(endTime, currentDate);

    return (
        <div className={props.alt ? 'scheduleRowAlternate' : ''}>
            <Grid2
                container
                spacing={0}
                onClick={() => {
                    setHide(!hide);
                }}
            >
                <Grid2 xs></Grid2>
                <Grid2 xs={2}>
                    <div>
                        <strong>
                            {format(startTime, 'h:mm')} - {format(endTime, 'h:mm')}
                        </strong>
                    </div>
                </Grid2>
                <Grid2 xs={2}>
                    <div>
                        <strong>{props.data.name}</strong>
                    </div>
                </Grid2>
                <Grid2 xs={2}>
                    <div>
                        <strong>teacher name</strong>
                    </div>
                </Grid2>
                <Grid2 xs={2}>
                    <div>
                        <strong>room number</strong>
                    </div>
                </Grid2>
                <Grid2 xs></Grid2>
            </Grid2>
            {!hide ? (
                <div>
                    <div>Details about class, grades, and other stuff here</div>
                    <div>
                        <strong> Current Grade A+ (todo) </strong>
                    </div>
                    <div>
                        <strong>
                            <a href={'mailto:' + 'teacher email'}>Email teacher name</a>
                        </strong>
                    </div>
                    <div>
                        <strong>Room number</strong>
                    </div>
                    <div>
                        {isAfter(currentDate, endTime) ? (
                            <strong>Class Ended</strong>
                        ) : (
                            <div>
                                <strong>{isNow ? 'Ending' : 'Beginning'} in</strong>
                                {/* <Countdown destDate={isNow ? endTime : startTime} /> */}
                            </div>
                        )}
                    </div>
                    <div>{isNow ? <div>progress bar{/*<DateBar startDate={startTime} destDate={endTime} /> */}</div> : ''}</div>
                </div>
            ) : (
                ''
            )}
        </div>
    );
}
