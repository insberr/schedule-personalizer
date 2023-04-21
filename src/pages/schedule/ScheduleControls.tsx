import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { displayDate } from '../../storage/schedule';

export default function ScheduleControls() {
    return (
        <div className={'ScheduleControlsHeader'}>
            <Grid2 container spacing={0} className={'ScheduleRowGrid'}>
                <Grid2 xs className={'ControlsCol TextCenter'}>
                    <IconButton
                        color="secondary"
                        onClick={() => {
                            const newDate = new Date(displayDate.value);
                            newDate.setDate(newDate.getDate() - 1);
                            displayDate.value = newDate;
                        }}
                    >
                        <ArrowBack />
                    </IconButton>
                </Grid2>
                <Grid2 xs className={'ControlsCol TextCenter'}>
                    {displayDate.value.toLocaleDateString()}
                </Grid2>
                <Grid2 xs className={'ControlsCol TextCenter'}>
                    <IconButton
                        color="secondary"
                        onClick={() => {
                            const newDate = new Date(displayDate.value);
                            newDate.setDate(newDate.getDate() + 1);
                            displayDate.value = newDate;
                        }}
                    >
                        <ArrowForward />
                    </IconButton>
                </Grid2>
            </Grid2>
        </div>
    );
}

