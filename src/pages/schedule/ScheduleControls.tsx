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
                            displayDate.value.setDate(displayDate.value.getDate() - 1);
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
                            displayDate.value.setDate(displayDate.value.getDate() + 1);
                        }}
                    >
                        <ArrowForward />
                    </IconButton>
                </Grid2>
            </Grid2>
        </div>
    );
}

