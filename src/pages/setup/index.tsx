import { useState, useEffect } from 'preact/hooks';
// Types
import { Terms } from '../../types';

// Signals - Storage
import { setupComplete } from '../../storage/misc';
import { scheduleDataTerms } from '../../storage/schedule';
import { Page, currentPage } from '../../storage/page';

// Components
import { IntroPonent } from './components/Introponent';
import { Button, Skeleton } from '@mui/material';

// Steps
import { AddToHomeScreen } from './steps/AddToHomeScreen';
import { Features } from './steps/Features';
import { Login } from './steps/Login';
// import { Manual } from './steps/Manual';

export enum SetupSteps {
    Welcome,
    AddToHomeScreen,
    EnableNotifications,
    Features,
    Login,
    Manual,
    Schedule,
}

function SetupPage() {
    const [setupStep, setSetupStep] = useState<SetupSteps>(SetupSteps.AddToHomeScreen);

    if (setupComplete.value) {
        currentPage.value = Page.SCHEDULE;
    }

    let thing = <Skeleton variant="rectangular" width={210} height={118} />;
    switch (setupStep) {
        case SetupSteps.Welcome: {
            thing = <div>How did this happen ...</div>;
            break;
        }
        case SetupSteps.Manual: {
            thing = <div>Comming Soon</div>; // <Manual setStage={setSetupStep} />;
            break;
        }
        case SetupSteps.AddToHomeScreen: {
            if (window.matchMedia('(display-mode: standalone)').matches) {
                setSetupStep(SetupSteps.Login);
            } else {
                thing = <AddToHomeScreen setStage={setSetupStep}></AddToHomeScreen>;
            }
            break;
        }
        case SetupSteps.Features: {
            thing = <Features setStage={setSetupStep} />;
            break;
        }
        case SetupSteps.Schedule: // The schedule will only be set in this state
            setupComplete.value = true;
            currentPage.value = Page.SCHEDULE;
            break;
        case SetupSteps.Login:
            thing = <Login setStage={setSetupStep} />;
            break;
        default:
            thing = (
                <div>
                    Unknown Setup Page! How did we get here?{' '}
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            setSetupStep(SetupSteps.Welcome);
                        }}
                    >
                        Back To Beginning
                    </Button>
                </div>
            );
    }
    return <IntroPonent>{thing}</IntroPonent>;
}
export default SetupPage;
