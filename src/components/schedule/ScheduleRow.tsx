import { Class } from '../../types';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { formatClassTime } from '../../lib/lib';

type props = {
    cls: Class;
};

export function ScheduleRow(props: props) {
    return (
        <Grid container spacing={2}>
            <Grid xs="auto" display="flex" justifyContent="center" alignItems="center">
                {formatClassTime(props.cls.startTime, props.cls.endTime)}
            </Grid>
            <Grid xs></Grid>
            <Grid xs="auto" display="flex" justifyContent="center" alignItems="center">
                {props.cls.name}
            </Grid>
            <Grid xs></Grid>
            <Grid xs="auto" display="flex" justifyContent="center" alignItems="center">
                {props.cls.teacher.name}
            </Grid>
            <Grid xs></Grid>
            <Grid xs="auto" display="flex" justifyContent="center" alignItems="center">
                {props.cls.room}
            </Grid>
        </Grid>
    );
}
