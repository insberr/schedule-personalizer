import { useEffect, useState } from 'react';

// Types
import { Terms } from '../../types';

// Redux
import { useDispatch } from "react-redux";
import { setSetupComplete, useMisc } from '../../storage/misc';

// Components
import { IntroPonent } from './components/Introponent';
import Button from 'react-bootstrap/Button';

// Steps
import { AddToHomeScreen } from './steps/AddToHomeScreen';
import { Features } from './steps/Features';
import { Login } from './steps/Login';
import { Manual } from './steps/Manual';
import { useNavigate } from "../../router/hooks";
import { setTerms, useSchedule } from '../../storage/schedule';
import { Page } from '../../storage/page';
import LoadSpinner from '../../components/LoadSpinner';

export enum SetupStages {
    AddToHomeScreen,
    Features,
    Login,
    Manual,
    Schedule,
    Edit,
}

function SetupPage() {
    const sch = useSchedule();
    const [stage, setStage] = useState(0);
    const [schedule, setLocalSchedule] = useState<Terms>(sch.terms);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // This prevents the user from entering the setup page if they have already completed setup
    // They schould really learn how to go to the settings page and click the reset button smh
    const misc = useMisc();
    if (misc.setupComplete) {
        navigate(Page.SCHEDULE);
    }

    useEffect(() => {
        if (stage != 69) {
            return;
        }
        dispatch(setSetupComplete(true));
        dispatch(setTerms(schedule));
        navigate(Page.SCHEDULE);
    })

    // TO DO: maybe use enum for stages valuse??
    let thing = <LoadSpinner />
    switch (stage) { 
        case -1: { // fork you no importing manually
            thing = <Manual setStage={setStage} />
            break;
        }
        case 0: {
            if (window.matchMedia('(display-mode: standalone)').matches) {
                setStage(420)
            } else {
                thing = <AddToHomeScreen setStage={setStage}></AddToHomeScreen>
            }
            break;
        }
        case 1: {
            thing = <Features setStage={setStage} />
            break;
        }
        case 69: // The schedule will only be set in this state
            thing = <LoadSpinner />
            break;
        case 420:
            thing = <Login setSchedule={ setLocalSchedule } setStage={setStage} />
            break;
        default: 
            thing = (<div>Unknown Setup Page! How did we get here? <Button onClick={ () => { setStage(0) } } variant="primary">Back To Beginning</Button></div>)
    }
    return (
        <IntroPonent>
            { thing }
        </IntroPonent>
    )
}
export default SetupPage;
