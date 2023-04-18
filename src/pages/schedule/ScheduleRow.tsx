import { Button, Collapse, Stack } from '@mui/material';
import { format, isAfter, parse } from 'date-fns';
import { useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Class, Time, timeToDate } from '../../types';
import ScheduleRowInfo from './ScheduleRowInfo';

export function formatTimeTypeToString(time: Time): string {
    return format(timeToDate(time), 'HH:mm');
}
export default function ScheduleRow(props: { DisplayDate: Date; alt: boolean; data: Class }) {
    const [hide, setHide] = useState(true);
    const startTime = timeToDate(props.data.startTime, props.DisplayDate);
    const endTime = timeToDate(props.data.endTime, props.DisplayDate);

    return (
        <div className={(props.alt ? 'scheduleRowAlternate' : '') + ' ScheduleRow'}>
            <Grid2
                container
                spacing={0}
                onClick={() => {
                    setHide(!hide);
                }}
                className={'ScheduleRowGrid'}
            >
                <Grid2 md={3} sm xs className={'ScheduleCol TextCenter'}>
                    <div>
                        <strong>
                            {format(startTime, 'h:mm')} - {format(endTime, 'h:mm')}
                        </strong>
                    </div>
                </Grid2>
                <Grid2 xs className={'ScheduleCol TextCenter'}>
                    <div>
                        <strong>{props.data.name}</strong>
                    </div>
                </Grid2>
                <Grid2 xs className={'ScheduleCol TextCenter HideColOnSmallerSCreens TeacherCol'}>
                    <div>
                        <strong>{props.data.teacher.name}</strong>
                    </div>
                </Grid2>
                <Grid2 md={3} sm xs className={'ScheduleCol TextCenter HideColOnSmallerSCreens RoomCol'}>
                    <div>
                        <strong>{props.data.room}</strong>
                    </div>
                </Grid2>
            </Grid2>
            <Collapse
                in={!hide}
                onClick={() => {
                    setHide(!hide);
                }}
            >
                <ScheduleRowInfo DisplayDate={props.DisplayDate} SPDisplayClass={props.data} alt={props.alt} />
            </Collapse>
        </div>
    );
}
