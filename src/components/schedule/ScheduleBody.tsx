import Stack from '@mui/material/Stack';
import { cyrb53 } from '../../lib/lib';
import { Class } from '../../types';
import { ScheduleRow } from './ScheduleRow';
import * as styles from './schedule.module.scss';
type props = {
    clses: Class[];
};

export function ScheduleBody(props: props) {
    return (
        <Stack className={styles.lr} spacing={0.5}>
            {props.clses.map((cls) => {
                return (
                    <div key={cyrb53(JSON.stringify(cls))}>
                        <ScheduleRow cls={cls} />
                    </div>
                );
            })}
        </Stack>
    );
}
