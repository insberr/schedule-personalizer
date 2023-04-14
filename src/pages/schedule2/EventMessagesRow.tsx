import { Divider } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

export default function EventMessagesRow(props: { messages: string[]; alt: boolean }) {
    return (
        <div className={(props.alt ? 'scheduleRowAlternate' : '') + ' ScheduleRow'}>
            <Divider variant="middle" />
            <Grid2 container spacing={0} className={'ScheduleRowGrid'}>
                <Grid2 xs className={'ScheduleCol TextCenter'}>
                    <div>
                        {props.messages.map((message, index) => (
                            <div key={'event-message-row-' + index}>
                                <strong>{message}</strong>
                            </div>
                        ))}
                    </div>
                </Grid2>
            </Grid2>
        </div>
    );
}
