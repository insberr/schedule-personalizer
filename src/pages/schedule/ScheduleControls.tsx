import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

export default function ScheduleControls(props: { DisplayDate: Date; setDisplayDate: (date: Date) => void }) {
    return (
        <div className={'ScheduleControlsHeader'}>
            <Grid2 container spacing={0} className={'ScheduleRowGrid'}>
                <Grid2 xs className={'ControlsCol TextCenter'}>
                    <IconButton
                        color="secondary"
                        onClick={() => {
                            const newDate = new Date(props.DisplayDate);
                            newDate.setDate(newDate.getDate() - 1);
                            props.setDisplayDate(newDate);
                        }}
                    >
                        <ArrowBack />
                    </IconButton>
                </Grid2>
                <Grid2 xs className={'ControlsCol TextCenter'}>
                    {props.DisplayDate.toLocaleDateString()}
                </Grid2>
                <Grid2 xs className={'ControlsCol TextCenter'}>
                    <IconButton
                        color="secondary"
                        onClick={() => {
                            const newDate = new Date(props.DisplayDate);
                            newDate.setDate(newDate.getDate() + 1);
                            props.setDisplayDate(newDate);
                        }}
                    >
                        <ArrowForward />
                    </IconButton>
                </Grid2>
            </Grid2>
        </div>
    );
}
