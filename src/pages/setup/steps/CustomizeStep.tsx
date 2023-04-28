// In the setup process, it would be nice to have the user configure a few things to their desires
// Enable notifications, and what notifications
// Progress bars
// I want ice ceream so ill think of more ideas later

import { Button } from '@mui/material';
import { SetupSteps, setupStep } from '..';

export default function CustomizeStep() {
    return (
        <div>
            Text
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    setupStep.value = SetupSteps.Login;
                }}
            >
                Next
            </Button>
        </div>
    );
}

