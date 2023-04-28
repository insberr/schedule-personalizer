import { useState, useEffect } from 'preact/hooks';
import { signal } from '@preact/signals';
// Types
import { Terms } from '../../types';

// Signals - Storage
import { setupComplete } from '../../storage/misc';
import { Page, currentPage } from '../../storage/page';

// Components
import { IntroPonent } from './components/Introponent';
import { Button, Skeleton } from '@mui/material';

// Steps
import { AddToHomeScreen } from './steps/AddToHomeScreen';
// import { Features } from './steps/Features';
import { Login } from './steps/Login';
import CustomizeStep from './steps/CustomizeStep';
import { Manual } from './steps/Manual';
export enum SetupSteps {
    Welcome,
    AddToHomeScreen,
    EnableNotifications,
    Features,
    Login,
    Manual,
    Schedule,
    Customize,
}

export const setupStep = signal<SetupSteps>(SetupSteps.AddToHomeScreen);

function SetupPage() {
    if (setupComplete.value) {
        currentPage.value = Page.SCHEDULE;
    }

    let thing = <Skeleton variant="rectangular" width={210} height={118} />;
    switch (setupStep.value) {
        case SetupSteps.Welcome: {
            thing = <div>How did this happen ...</div>;
            break;
        }
        case SetupSteps.Manual: {
            thing = <Manual />;
            break;
        }
        case SetupSteps.AddToHomeScreen: {
            if (window.matchMedia('(display-mode: standalone)').matches) {
                setupStep.value = SetupSteps.Features;
            } else {
                thing = <AddToHomeScreen></AddToHomeScreen>;
            }
            break;
        }
        case SetupSteps.Customize: {
            thing = <CustomizeStep />;
            break;
        }
        case SetupSteps.Schedule:
            setupComplete.value = true;
            currentPage.value = Page.SCHEDULE;
            break;
        case SetupSteps.Login:
            thing = <Login />;
            break;
        default:
            thing = (
                <div>
                    Unknown Setup Page! How did we get here?{' '}
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            setupStep.value = SetupSteps.AddToHomeScreen;
                        }}
                    >
                        Back To Welcome Page
                    </Button>
                </div>
            );
    }
    return <IntroPonent>{thing}</IntroPonent>;
}
export default SetupPage;
