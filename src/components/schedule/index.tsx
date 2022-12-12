import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Class } from '../../types';
import { ScheduleBody } from './ScheduleBody';
import { ScheduleHeader } from './ScheduleHeader';
import styles from './schedule.module.scss';
type props = {
    clses: Class[];
};

export function Schedule(props: props) {
    return (
        <div style={{ padding: '3em', width: '75vw', margin: 'auto' }}>
            <Stack spacing={3}>
                <ScheduleHeader />
                <ScheduleBody clses={props.clses} />
            </Stack>
        </div>
    );
}
