import Grid from '@mui/material/Unstable_Grid2';
import { addDays } from 'date-fns';
import format from 'date-fns/format';
import { store } from '../../storage';
import * as styles from './schedule.module.scss';

export function ScheduleHeader() {
    const displayDate = store.displayDate.value as Date;
    return (
        <Grid container spacing={2}>
            <Grid
                xs="auto"
                className={styles.leftButton}
                onClick={() => {
                    store.displayDate.value = addDays(displayDate, -1);
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                {'<'}
            </Grid>
            <Grid xs className={styles.topOther} />
            <Grid
                xs="auto"
                className={styles.centerButton}
                onClick={() => {
                    alert(1);
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                {format(displayDate, 'MMMM do, yyyy')}
            </Grid>
            <Grid xs className={styles.topOther} />
            <Grid
                xs="auto"
                className={styles.rightButton}
                onClick={() => {
                    store.displayDate.value = addDays(displayDate, 1);
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                {'>'}
            </Grid>
        </Grid>
    );
}
